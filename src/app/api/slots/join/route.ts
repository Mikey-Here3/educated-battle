import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tournamentId, slotNumber, userId: rawUserId, teamName } = body;

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
          `Insufficient balance! Match entry fee is PKR ${entryFee}, but your available balance is PKR ${availableBalance.toFixed(0)}.`
        );
      }

      // 8. Deduct Entry Fee atomically (Charged ONCE, whether Solo or Team)
      let updatedUser = user;
      if (entryFee > 0) {
        updatedUser = await tx.user.update({
          where: { id: user.id },
          data: { balancePKR: { decrement: entryFee } },
        });
      }

      let createdTeam = null;
      let newSlot = null;

      // 9. Registration & Reservation Logic
      if (tournament.entryFeeModel === 'TEAM_ENTRY') {
        const tName = body.teamName || `${user.ign}'s Team`;
        
        // Prevent duplicate team registration by this leader
        const existingTeam = await tx.team.findFirst({
          where: { tournamentId: tournament.id, leaderId: user.id }
        });
        if (existingTeam) throw new Error("You have already registered a team for this tournament.");

        // Create Team
        createdTeam = await tx.team.create({
          data: {
            tournamentId: tournament.id,
            teamName: tName,
            leaderId: user.id,
          }
        });

        // Add leader as member
        await tx.teamMember.create({
          data: { teamId: createdTeam.id, userId: user.id, role: 'LEADER' }
        });

        // We still reserve the initial slot for the team leader
        newSlot = await tx.slot.create({
          data: {
            tournamentId: tournament.id,
            userId: user.id,
            slotNumber: slotNum,
            teamId: createdTeam.id,
            ign: user.ign,
            uid: user.uid,
          },
        });

        // NOTE: Additional teammates will be added to the TeamMember model 
        // without incurring additional entry fee charges for this team.
      } else {
        // PLAYER_ENTRY logic
        newSlot = await tx.slot.create({
          data: {
            tournamentId: tournament.id,
            userId: user.id,
            slotNumber: slotNum,
            ign: user.ign,
            uid: user.uid,
          },
        });
      }

      // 10. Create Transaction Audit Ledger
      const trxIdStr = `JOIN-${tournament.id.slice(-6)}-S${slotNum}-${Date.now().toString().slice(-6)}`;
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'MATCH_FEE',
          amountPKR: entryFee,
          status: 'APPROVED',
          trxId: trxIdStr,
          tournamentId: tournament.id,
          note: `Slot #${slotNum} booked for ${tournament.title} (${tournament.entryFeeModel}) (Fee: PKR ${entryFee})`,
        },
      });

      // Link payment to team if applicable
      if (createdTeam) {
        await tx.team.update({
          where: { id: createdTeam.id },
          data: { paymentTransactionId: trxIdStr }
        });
      }

      // 11. Update tournament slotsFilled count
      const updatedTournament = await tx.tournament.update({
        where: { id: tournament.id },
        data: { slotsFilled: tournament.slots.length + 1 },
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
