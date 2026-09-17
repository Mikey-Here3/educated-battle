import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: List matches for a tournament
export async function GET(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get("eg_admin")?.value;
    const sessionUserId = req.cookies.get("eg_session_user_id")?.value;
    if (!adminCookie && !sessionUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");
    if (!tournamentId) {
      return NextResponse.json({ success: false, error: "tournamentId is required." }, { status: 400 });
    }

    const matches = await prisma.tournamentMatch.findMany({
      where: { tournamentId },
      include: { participants: true },
      orderBy: { matchNumber: "asc" },
    });

    return NextResponse.json({ success: true, matches });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Server error." }, { status: 500 });
  }
}

// POST: Create a new match for a tournament
export async function POST(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get("eg_admin")?.value;
    const sessionUserId = req.cookies.get("eg_session_user_id")?.value;
    if (!adminCookie && !sessionUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { tournamentId, participants, teamIds, roomId, roomPassword } = body;

    if (!tournamentId) {
      return NextResponse.json({ success: false, error: "tournamentId is required." }, { status: 400 });
    }

    // Count existing matches
    const existingCount = await prisma.tournamentMatch.count({ where: { tournamentId } });
    const matchNumber = existingCount + 1;

    const match = await prisma.tournamentMatch.create({
      data: {
        tournamentId,
        matchNumber,
        status: "PENDING",
        roomId: roomId || null,
        roomPassword: roomPassword || null,
        participants: {
          create: [
            // participants = array of { userId } or { teamId }
            ...(participants || []).map((p: any) => ({ userId: p.userId || null, teamId: p.teamId || null })),
            ...(teamIds || []).map((tid: string) => ({ teamId: tid })),
          ],
        },
      },
      include: { participants: true },
    });

    return NextResponse.json({ success: true, match, matchNumber });
  } catch (error: any) {
    console.error("Create match error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to create match." }, { status: 500 });
  }
}

// PATCH: Update match status or room credentials
export async function PATCH(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get("eg_admin")?.value;
    const sessionUserId = req.cookies.get("eg_session_user_id")?.value;
    if (!adminCookie && !sessionUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { matchId, status, roomId, roomPassword, winnerId } = body;

    if (!matchId) {
      return NextResponse.json({ success: false, error: "matchId is required." }, { status: 400 });
    }

    const updated = await prisma.tournamentMatch.update({
      where: { id: matchId },
      data: {
        ...(status !== undefined && { status }),
        ...(roomId !== undefined && { roomId }),
        ...(roomPassword !== undefined && { roomPassword }),
        ...(winnerId !== undefined && { winnerId }),
      },
    });

    return NextResponse.json({ success: true, match: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to update match." }, { status: 500 });
  }
}
