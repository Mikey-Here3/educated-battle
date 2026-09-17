import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionUserId = req.cookies.get("eg_session_user_id")?.value;
    const adminCookie = req.cookies.get("eg_admin")?.value;
    if (!adminCookie && !sessionUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");
    if (!tournamentId) {
      return NextResponse.json({ success: false, error: "tournamentId is required." }, { status: 400 });
    }

    if (sessionUserId) {
      const admin = await prisma.user.findUnique({ where: { id: sessionUserId }, select: { role: true } });
      if (admin && admin.role !== "admin" && !adminCookie) {
        return NextResponse.json({ success: false, error: "Admin access required." }, { status: 403 });
      }
    }

    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        slots: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                ign: true,
                uid: true,
                balancePKR: true,
                reservedPKR: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ success: false, error: "Tournament not found." }, { status: 404 });
    }

    const players = tournament.slots.map((slot, idx) => ({
      registrationNumber: idx + 1,
      slotId: slot.id,
      slotNumber: slot.slotNumber,
      registeredAt: slot.createdAt.toISOString(),
      userId: slot.userId,
      name: slot.user.name,
      email: slot.user.email,
      phone: slot.user.phone || "N/A",
      ign: slot.ign,
      uid: slot.uid,
      balancePKR: slot.user.balancePKR,
      entryFee: tournament.entryFee,
      paymentStatus: "RESERVED",
    }));

    return NextResponse.json({
      success: true,
      tournament: {
        id: tournament.id,
        title: tournament.title,
        category: tournament.category,
        format: tournament.format,
        mode: tournament.mode,
        status: tournament.status,
        entryFee: tournament.entryFee,
        totalSlots: tournament.totalSlots,
        slotsFilled: tournament.slots.length,
        slotsRemaining: tournament.totalSlots - tournament.slots.length,
        prizePool: tournament.prizePool,
        winnerPrize: tournament.winnerPrize,
        perKill: tournament.perKill,
        matchDate: tournament.matchDate,
        matchTime: tournament.matchTime,
      },
      players,
      total: players.length,
    });
  } catch (error: any) {
    console.error("Admin tournament players error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Server error." }, { status: 500 });
  }
}
