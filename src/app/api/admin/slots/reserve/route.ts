import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tournamentId, slotNumber, uid, ign, reason, userId } = body;

    // Verify Admin cookie / session
    const sessionUserId = req.cookies.get('eg_session_user_id')?.value;
    const adminCookie = req.cookies.get('eg_admin')?.value;

    if (!sessionUserId && adminCookie !== '1') {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    if (!tournamentId || !slotNumber || !uid || !ign) {
      return NextResponse.json(
        { success: false, error: 'Tournament ID, Slot Number, Player UID, and IGN are required.' },
        { status: 400 }
      );
    }

    const slotNum = parseInt(slotNumber, 10);
    if (isNaN(slotNum) || slotNum < 1) {
      return NextResponse.json({ success: false, error: 'Invalid slot number.' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const tournament = await tx.tournament.findUnique({
        where: { id: tournamentId },
        include: { slots: true },
      });

      if (!tournament) throw new Error('Tournament not found.');
      if (slotNum > tournament.totalSlots) throw new Error(`Slot #${slotNum} exceeds tournament capacity (${tournament.totalSlots}).`);

      const slotOccupied = tournament.slots.some((s) => s.slotNumber === slotNum);
      if (slotOccupied) throw new Error(`Slot #${slotNum} is already occupied.`);

      // Find user if userId passed or find by UID
      let targetUserId = userId;
      if (!targetUserId) {
        const foundUser = await tx.user.findFirst({ where: { uid: uid.trim() } });
        if (foundUser) targetUserId = foundUser.id;
      }

      if (!targetUserId) {
        // Fallback to admin user id for explicit manual reservation
        const adminUser = await tx.user.findFirst({ where: { role: 'admin' } });
        targetUserId = adminUser?.id || sessionUserId;
      }

      const newSlot = await tx.slot.create({
        data: {
          tournamentId: tournament.id,
          userId: targetUserId!,
          slotNumber: slotNum,
          ign: ign.trim(),
          uid: uid.trim(),
        },
      });

      const updatedCount = tournament.slots.length + 1;
      const updatedTournament = await tx.tournament.update({
        where: { id: tournament.id },
        data: { slotsFilled: updatedCount },
      });

      // Audit log transaction entry
      await tx.transaction.create({
        data: {
          userId: targetUserId!,
          type: 'MATCH_FEE',
          amountPKR: 0,
          status: 'APPROVED',
          trxId: `ADMIN-RES-${tournament.id.slice(-4)}-S${slotNum}`,
          tournamentId: tournament.id,
          note: `ADMIN MANUAL RESERVATION: Slot #${slotNum} (${reason || 'Match Reservation'})`,
        },
      });

      return { slot: newSlot, tournament: updatedTournament };
    });

    return NextResponse.json({
      success: true,
      message: `Admin successfully reserved Slot #${result.slot.slotNumber} for ${ign} (${uid})`,
      data: result,
    });
  } catch (error: any) {
    console.error('Admin slot reservation error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to execute manual slot reservation.' },
      { status: 400 }
    );
  }
}
