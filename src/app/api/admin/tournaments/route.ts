import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, game, type, map, entryFee, prizePool, perKill, totalSlots, startTime } = body;

    if (!title || !game || !type) {
      return NextResponse.json(
        { success: false, error: 'Tournament title, game, and type are required.' },
        { status: 400 }
      );
    }

    const newTournament = {
      id: `eg-ff-${Date.now().toString().slice(-4)}`,
      title: title.toUpperCase(),
      game: game || 'Free Fire MAX',
      type: type || 'Squad',
      map: map || 'Bermuda',
      status: 'upcoming',
      prizePool: Number(prizePool) || 10000,
      perKill: Number(perKill) || 50,
      entryFee: Number(entryFee) || 100,
      slotsFilled: 0,
      totalSlots: Number(totalSlots) || 48,
      startTime: startTime || 'Today, 9:00 PM PST',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'New Free Fire tournament created successfully.',
      data: newTournament,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error creating tournament.' },
      { status: 500 }
    );
  }
}
