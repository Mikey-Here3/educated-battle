import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PlayerRank } from '@/data/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'player',
      },
      orderBy: [
        { winningsPKR: 'desc' },
        { createdAt: 'asc' },
      ],
      take: 50,
      include: {
        _count: {
          select: { slots: true },
        },
      },
    });

    const leaderboard: PlayerRank[] = users.map((u, idx) => {
      const matchesPlayed = u._count.slots;
      const earnings = u.winningsPKR || 0;
      let badge = 'Diamond I';
      if (earnings >= 10000) badge = 'Grandmaster';
      else if (earnings >= 2500) badge = 'Master';
      else if (earnings >= 500) badge = 'Heroic';

      return {
        rank: idx + 1,
        name: u.name,
        ign: u.ign,
        uid: u.uid,
        avatar: u.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.ign || u.name)}`,
        earningsPKR: earnings,
        matchesPlayed,
        totalKills: 0,
        winRate: matchesPlayed > 0 && earnings > 0 ? Math.min(100, Math.round((earnings / (matchesPlayed * 100)) * 100)) : 0,
        badge,
      };
    });

    return NextResponse.json({
      success: true,
      source: 'database',
      data: leaderboard,
      total: leaderboard.length,
    });
  } catch (error: any) {
    console.error('Leaderboard fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leaderboard from database: ' + (error?.message || ''),
        data: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
