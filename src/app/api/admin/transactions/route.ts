import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { transactionId, action } = await req.json();

    if (!transactionId || !['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Valid transactionId and action (APPROVE or REJECT) are required.' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId },
        include: { user: true },
      });

      if (!transaction) {
        throw new Error('Transaction record not found.');
      }

      if (transaction.status !== 'PENDING') {
        throw new Error(`Transaction is already ${transaction.status}.`);
      }

      if (action === 'APPROVE') {
        if (transaction.type === 'DEPOSIT') {
          // Credit user deposit balance
          await tx.user.update({
            where: { id: transaction.userId },
            data: {
              balancePKR: { increment: transaction.amountPKR },
            },
          });
        }

        const updatedTx = await tx.transaction.update({
          where: { id: transactionId },
          data: { status: 'APPROVED' },
        });

        return { transaction: updatedTx, action: 'APPROVED' };
      } else {
        // REJECT
        if (transaction.type === 'WITHDRAWAL') {
          // Refund the winnings back to user
          await tx.user.update({
            where: { id: transaction.userId },
            data: {
              winningsPKR: { increment: transaction.amountPKR },
            },
          });
        }

        const updatedTx = await tx.transaction.update({
          where: { id: transactionId },
          data: { status: 'REJECTED' },
        });

        return { transaction: updatedTx, action: 'REJECTED' };
      }
    });

    return NextResponse.json({
      success: true,
      message: `Transaction successfully ${result.action.toLowerCase()}.`,
      data: result.transaction,
    });
  } catch (error: any) {
    console.error('Admin transaction review error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing transaction review.' },
      { status: 400 }
    );
  }
}
