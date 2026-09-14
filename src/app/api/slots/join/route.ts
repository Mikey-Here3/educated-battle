import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tournamentId, slotNumber, ign, uid } = body;

    if (!tournamentId || !slotNumber || !ign || !uid) {
      return NextResponse.json(
        { success: false, error: 'Missing required registration parameters.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Slot #${slotNumber} successfully registered for ${ign} (UID: ${uid}).`,
      data: {
        tournamentId,
        slotNumber,
        ign,
        uid,
        registeredAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error processing slot registration.' },
      { status: 500 }
    );
  }
}
