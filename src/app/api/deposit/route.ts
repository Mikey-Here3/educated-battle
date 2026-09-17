import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, method, trxId, accountNumber, screenshotUrl, userId: rawUserId } = body;

    const sessionUserId = req.cookies.get('eg_session_user_id')?.value;
    const userId = rawUserId || sessionUserId;

    if (!amount || !trxId) {
      return NextResponse.json(
        { success: false, error: 'Deposit amount and Transaction ID (TID) are required.' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Please sign in to submit a deposit receipt.' },
        { status: 401 }
      );
    }

    const cleanAmt = Number(amount);
    if (isNaN(cleanAmt) || cleanAmt < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum deposit amount is PKR 100.' },
        { status: 400 }
      );
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User account not found in database.' },
        { status: 404 }
      );
    }

    // Check for duplicate trxId
    const existingTx = await prisma.transaction.findFirst({
      where: { trxId: trxId.trim() },
    });

    if (existingTx) {
      return NextResponse.json(
        { success: false, error: 'This Transaction ID (TID) has already been submitted.' },
        { status: 409 }
      );
    }

    // Save real transaction to PostgreSQL
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'DEPOSIT',
        amountPKR: cleanAmt,
        status: 'PENDING',
        method: method || 'JazzCash',
        trxId: trxId.trim(),
        accountNumber: accountNumber ? accountNumber.trim() : null,
        proofUrl: screenshotUrl || null,
        note: `Deposit of PKR ${cleanAmt} via ${method || 'JazzCash'} by ${user.ign} (${user.uid})`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Deposit receipt submitted successfully. Admin will verify and credit your coins within 5-10 minutes.',
      data: {
        id: transaction.id,
        trxId: transaction.trxId,
        amountPKR: transaction.amountPKR,
        status: transaction.status,
        createdAt: transaction.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Deposit submission error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error submitting deposit receipt.' },
      { status: 500 }
    );
  }
}
