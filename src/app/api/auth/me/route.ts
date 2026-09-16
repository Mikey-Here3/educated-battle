import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('eg_session_user_id')?.value || req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        slots: {
          select: {
            tournamentId: true,
            slotNumber: true,
            ign: true,
            uid: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        ign: user.ign,
        uid: user.uid,
        role: user.role,
        balancePKR: user.balancePKR,
        reservedPKR: user.reservedPKR,
        winningsPKR: user.winningsPKR,
        slots: user.slots,
      },
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null });
  }
}
