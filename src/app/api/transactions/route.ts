import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryUserId = searchParams.get('userId');
    const sessionUserId = req.cookies.get('eg_session_user_id')?.value;
    const isAdmin = req.cookies.get('eg_admin')?.value === '1';

    const targetUserId = queryUserId || sessionUserId;

    if (!targetUserId && !isAdmin) {
      return NextResponse.json({ success: true, transactions: [] });
    }

    const where: any = {};
    if (!isAdmin || (isAdmin && queryUserId)) {
      if (targetUserId) where.userId = targetUserId;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
            ign: true,
            uid: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      transactions: transactions.map((t) => ({
        id: t.id,
        userId: t.userId,
        userName: t.user?.name,
        ign: t.user?.ign,
        uid: t.user?.uid,
        type: t.type,
        amountPKR: t.amountPKR,
        status: t.status,
        method: t.method,
        trxId: t.trxId,
        proofUrl: t.proofUrl,
        accountTitle: t.accountTitle,
        accountNumber: t.accountNumber,
        note: t.note,
        createdAt: t.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error('Transactions fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
