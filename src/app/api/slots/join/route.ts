import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tournamentId, slotNumber, userId: rawUserId } = body;

    // Get user id from body or cookie session
    const sessionUserId = req.cookies.get('eg_session_user_id')?.value;
    const userId = rawUserId || sessionUserId;

    if (!tournamentId || !slotNumber || !userId) {
      return NextResponse.json(
        { success: false, error: 'Tournament ID, Slot Number, and User Authentication are required.' },
        { status: 400 }
      );
    }

    const slotNum = parseInt(slotNumber, 10);
    if (isNaN(slotNum) || slotNum < 1) {
      return NextResponse.json(
        { success: false, error: 'Invalid slot number selected.' },
        { status: 400 }
      );
    }

    // Execute atomic reservation in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch User
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User profile not found in database. Please log in again.');
      }

      // 2. Fetch Tournament
      const tournament = await tx.tournament.findUnique({
        where: { id: tournamentId },
        include: {
          slots: {
            select: { slotNumber: true, userId: true },
          },
        },
      });

      if (!tournament) {
        throw new Error('Tournament not found in database.');
      }

      if (tournament.status === 'completed' || tournament.status === 'cancelled') {
        throw new Error(`Cannot register. Tournament is already ${tournament.status}.`);
      }

      if (slotNum > tournament.totalSlots) {
        throw new Error(`Slot #${slotNum} exceeds tournament capacity (${tournament.totalSlots} slots).`);
      }

      // 3. Concurrency check: Check if user is already registered in this tournament
      const alreadyRegistered = tournament.slots.some((s) => s.userId === user.id);
      if (alreadyRegistered) {
        throw new Error('You have already reserved a slot in this tournament.');
      }

      // 4. Concurrency check: Check if this slotNumber is already taken
      const slotOccupied = tournament.slots.some((s) => s.slotNumber === slotNum);
      if (slotOccupied) {
        throw new Error(`Slot #${slotNum} was just booked by another player. Please select an available slot.`);
      }

      // 5. Total capacity check
      if (tournament.slots.length >= tournament.totalSlots) {
        throw new Error('Tournament is completely FULL. Registration closed.');
      }

      // 6. Minimum Deposit Gate — user must have ever deposited ≥ PKR 100 (approved)
      const hasMinDeposit = await tx.transaction.findFirst({
        where: {
          userId: user.id,
          type: 'DEPOSIT',
          status: 'APPROVED',
          amountPKR: { gte: 100 },
        },
      });

      if (!hasMinDeposit) {
        throw new Error(
          'Please complete a minimum PKR 100 wallet deposit before entering tournaments. Go to Wallet → Deposit to add funds.'
        );
      }

      // 7. Financial Integrity & Balance Check
      const availableBalance = user.balancePKR - user.reservedPKR;
      const entryFee = tournament.entryFee || 0;

      if (entryFee > 0 && availableBalance < entryFee) {
        throw new Error(
          `Insufficient balance! Match entry fee is PKR ${entryFee}, but your available balance is PKR ${availableBalance.toFixed(0)}. Please add coins to confirm your slot.`
        );
      }

      // 7. Deduct Entry Fee atomically
      let updatedUser = user;
      if (entryFee > 0) {
        updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            balancePKR: { decrement: entryFee },
          },
        });
      }

      // 8. Create Slot Record (Protected by DB unique constraints)
      const newSlot = await tx.slot.create({
        data: {
          tournamentId: tournament.id,
          userId: user.id,
          slotNumber: slotNum,
          ign: user.ign,
          uid: user.uid,
        },
      });

      // 9. Create Transaction Audit Ledger
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'MATCH_FEE',
          amountPKR: entryFee,
          status: 'APPROVED',
          trxId: `JOIN-${tournament.id.slice(-6)}-S${slotNum}-${Date.now().toString().slice(-6)}`,
          tournamentId: tournament.id,
          note: `Slot #${slotNum} booked for ${tournament.title} (Fee: PKR ${entryFee})`,
        },
      });

      // 10. Update tournament slotsFilled count
      const updatedTournament = await tx.tournament.update({
        where: { id: tournament.id },
        data: {
          slotsFilled: tournament.slots.length + 1,
        },
      });

      return {
        slot: newSlot,
        user: updatedUser,
        tournament: updatedTournament,
      };
    });

    return NextResponse.json({
      success: true,
      message: `Slot #${result.slot.slotNumber} confirmed for ${result.user.ign}!`,
      data: {
        slotNumber: result.slot.slotNumber,
        tournamentId: result.tournament.id,
        remainingBalance: result.user.balancePKR,
        slotsFilled: result.tournament.slotsFilled,
      },
    });
  } catch (error: any) {
    console.error('Slot join error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Transaction failed. Please try again.' },
      { status: 400 }
    );
  }
}
