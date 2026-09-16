import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, method, accountTitle, accountNumber, userId: rawUserId } = body;

    const sessionUserId = req.cookies.get('eg_session_user_id')?.value;
    const userId = rawUserId || sessionUserId;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to request a withdrawal.' },
        { status: 401 }
      );
    }

    const withdrawAmt = Number(amount);
    if (isNaN(withdrawAmt) || withdrawAmt < 200) {
      return NextResponse.json(
        { success: false, error: 'Minimum withdrawal amount is PKR 200.' },
        { status: 400 }
      );
    }

    const cleanMethod = method === 'EasyPaisa' ? 'EasyPaisa' : 'JazzCash';
    const cleanTitle = (accountTitle || '').trim();
    const cleanNumber = (accountNumber || '').trim().replace(/[\s-]/g, '');

    if (!cleanTitle || cleanTitle.length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Account Title (full name on account).' },
        { status: 400 }
      );
    }

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(cleanNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid mobile account number. Must be 11 digits starting with 03 (e.g. 03190799711).' },
        { status: 400 }
      );
    }

    // Atomic withdrawal transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User account not found in database.');
      }

      if (user.winningsPKR < withdrawAmt) {
        throw new Error(
          `Insufficient withdrawable winnings! Your current winnings balance is PKR ${user.winningsPKR.toLocaleString()}, but you requested PKR ${withdrawAmt.toLocaleString()}.`
        );
      }

      // Deduct from winnings
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          winningsPKR: { decrement: withdrawAmt },
        },
      });

      // Create transaction record
      const trxId = `WD-${Date.now().toString().slice(-8)}`;
      const transaction = await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'WITHDRAWAL',
          amountPKR: withdrawAmt,
          status: 'PENDING',
          method: cleanMethod,
          accountTitle: cleanTitle,
          accountNumber: cleanNumber,
          trxId,
          note: `Cashout request to ${cleanMethod} (${cleanNumber}) - Title: ${cleanTitle}`,
        },
      });

      return { updatedUser, transaction };
    });

    return NextResponse.json({
      success: true,
      message: `Withdrawal request of PKR ${withdrawAmt.toLocaleString()} via ${cleanMethod} submitted successfully. Payout will be processed within 1-2 hours.`,
      data: {
        transactionId: result.transaction.id,
        trxId: result.transaction.trxId,
        amount: withdrawAmt,
        remainingWinnings: result.updatedUser.winningsPKR,
        status: 'PENDING',
      },
    });
  } catch (error: any) {
    console.error('Withdrawal error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit withdrawal request.' },
      { status: 400 }
    );
  }
}
