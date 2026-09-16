import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        slots: {
          select: { id: true, slotNumber: true, userId: true, createdAt: true },
        },
      },
    });

    const report = tournaments.map((t) => {
      const actualCount = t.slots.length;
      const storedCount = t.slotsFilled || 0;
      const mismatch = actualCount !== storedCount;

      return {
        tournamentId: t.id,
        title: t.title,
        storedCount,
        actualCount,
        totalSlots: t.totalSlots,
        status: mismatch ? 'MISMATCH' : 'HEALTHY',
      };
    });

    const totalMismatches = report.filter((r) => r.status === 'MISMATCH').length;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      totalTournaments: report.length,
      totalMismatches,
      reconciliationReport: report,
    });
  } catch (error: any) {
    console.error('Reconciliation report error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Reconciliation check failed.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: { slots: true },
    });

    let repairedCount = 0;

    for (const t of tournaments) {
      const actualCount = t.slots.length;
      if (t.slotsFilled !== actualCount) {
        await prisma.tournament.update({
          where: { id: t.id },
          data: { slotsFilled: actualCount },
        });
        repairedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully reconciled database. Repaired ${repairedCount} tournament slot count mismatches.`,
      repairedCount,
    });
  } catch (error: any) {
    console.error('Reconciliation repair error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Repair failed.' }, { status: 500 });
  }
}
