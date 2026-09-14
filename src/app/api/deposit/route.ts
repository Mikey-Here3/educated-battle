import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, method, trxId, screenshotUrl } = body;

    if (!amount || !method || !trxId) {
      return NextResponse.json(
        { success: false, error: 'Amount, payment method, and Trx ID are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Deposit verification receipt submitted successfully to Educated Gamer Finance.',
      data: {
        trxId,
        method,
        amountPKR: amount,
        proofUrl: screenshotUrl || 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        status: 'PENDING_VERIFICATION',
        submittedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error submitting deposit receipt.' },
      { status: 500 }
    );
  }
}
