import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Tournament } from '@/data/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const format = searchParams.get('format');
  const mode = searchParams.get('mode');
  const search = searchParams.get('search')?.toLowerCase();

  try {
    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (type && type !== 'all') where.type = type;
    if (category && category !== 'all') where.category = category;
    if (format && format !== 'all') where.format = format;
    if (mode && mode !== 'all') where.mode = mode;

    const dbTournaments = await prisma.tournament.findMany({
      where,
      include: {
        slots: {
          select: {
            slotNumber: true,
            ign: true,
            uid: true,
            userId: true,
            createdAt: true,
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    let mapped: (Tournament & { bookedSlots: number[]; registeredUsers: string[] })[] = dbTournaments.map((t) => {
      let prizes: any = { first: t.winnerPrize || t.prizePool, second: 0, third: 0, perKillBonus: t.perKill };
      if (t.prizesJson) {
        try {
          prizes = JSON.parse(t.prizesJson);
        } catch {}
      }

      const bookedSlots = t.slots.map((s) => s.slotNumber);
      const registeredUsers = t.slots.map((s) => s.userId);
      const realSlotsFilled = t.slots.length;

      return {
        id: t.id,
        slug: t.slug || undefined,
        title: t.title,
        game: (t.game as any) || 'Free Fire MAX',
        type: (t.type as any) || 'Solo',
        category: t.category || undefined,
        format: t.format || undefined,
        mode: t.mode || undefined,
        map: (t.map as any) || 'Bermuda',
        allowedWeapons: t.allowedWeapons ? t.allowedWeapons.split(',').map((s) => s.trim()) : undefined,
        status: (t.status as any) || 'upcoming',
        prizePool: t.prizePool,
        perKill: t.perKill,
        hasPerKill: t.perKill > 0,
        booyahPrize: t.winnerPrize || t.prizePool,
        entryFee: t.entryFee,
        slotsFilled: realSlotsFilled,
        totalSlots: t.totalSlots,
        startTime: t.matchDate ? `${t.matchDate}, ${t.matchTime || ''}` : t.startTime.toISOString(),
        matchDate: t.matchDate || undefined,
        matchTime: t.matchTime || undefined,
        isFeatured: t.isFeatured,
        roomId: t.roomId || undefined,
        roomPassword: t.roomPassword || undefined,
        bannerImage: t.bannerUrl || undefined,
        description: t.description || undefined,
        rules: t.rules ? t.rules.split('\n').filter(Boolean) : [],
        prizes,
        bookedSlots,
        registeredUsers,
      };
    });

    if (search) {
      mapped = mapped.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.map.toLowerCase().includes(search) ||
          (t.category && t.category.toLowerCase().includes(search)) ||
          (t.mode && t.mode.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      source: 'database',
      data: mapped,
      total: mapped.length,
    });
  } catch (error: any) {
    console.error('Database fetch error in /api/tournaments:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to load tournaments from database: ' + (error?.message || 'DB Error'),
        data: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
