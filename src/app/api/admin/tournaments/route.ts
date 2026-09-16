import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      type,
      format,
      mode,
      map,
      allowedWeapons,
      rules,
      entryFee,
      prizePool,
      winnerPrize,
      perKill,
      totalSlots,
      matchDate,
      matchTime,
      startTime,
      bannerUrl,
      prizesJson,
      isFeatured,
      roomId,
      roomPassword,
    } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Tournament title is required.' },
        { status: 400 }
      );
    }

    const id = `eg-${(category || 'ff').toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-5)}`;
    const parsedStartTime = startTime ? new Date(startTime) : new Date(Date.now() + 1000 * 60 * 60 * 24);

    const created = await prisma.tournament.create({
      data: {
        id,
        title: title.trim().toUpperCase(),
        slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
        game: 'Free Fire MAX',
        category: category || 'Clash Squad',
        type: type || 'Solo',
        format: format || '1v1',
        mode: mode || 'Classic',
        platform: 'Mobile Only',
        map: map || 'Bermuda',
        allowedWeapons: Array.isArray(allowedWeapons) ? allowedWeapons.join(', ') : allowedWeapons || null,
        rules: rules || null,
        status: 'upcoming',
        prizePool: Number(prizePool) || 0,
        winnerPrize: Number(winnerPrize) || Number(prizePool) || 0,
        perKill: Number(perKill) || 0,
        entryFee: Number(entryFee) || 0,
        totalSlots: Number(totalSlots) || 48,
        slotsFilled: 0,
        startTime: parsedStartTime,
        matchDate: matchDate || null,
        matchTime: matchTime || null,
        isFeatured: Boolean(isFeatured),
        bannerUrl: bannerUrl || null,
        prizesJson: prizesJson ? (typeof prizesJson === 'string' ? prizesJson : JSON.stringify(prizesJson)) : null,
        roomId: roomId || null,
        roomPassword: roomPassword || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Tournament successfully created in database.',
      data: created,
    });
  } catch (error: any) {
    console.error('Admin tournament creation error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error creating tournament.' },
      { status: 500 }
    );
  }
}
