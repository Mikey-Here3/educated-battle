import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, ign, uid, pass } = await req.json();

    if (!name || !email || !phone || !ign || !uid || !pass) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Phone, Free Fire IGN, UID, Password) are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUid = uid.trim();
    const cleanPhone = phone.trim();

    // Check if email or UID already exists in database
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          { uid: cleanUid },
          { phone: cleanPhone },
        ],
      },
    });

    if (existing) {
      if (existing.email.toLowerCase() === cleanEmail) {
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
      }
      if (existing.uid === cleanUid) {
        return NextResponse.json({ error: 'This Free Fire UID is already registered.' }, { status: 409 });
      }
      if (existing.phone === cleanPhone) {
        return NextResponse.json({ error: 'An account with this phone number already exists.' }, { status: 409 });
      }
    }

    // Create user in Neon PostgreSQL
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        ign: ign.trim(),
        uid: cleanUid,
        passwordHash: pass,
        role: 'player',
        balancePKR: 0,
        reservedPKR: 0,
        winningsPKR: 0,
        bonusPKR: 0,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        ign: true,
        uid: true,
        role: true,
        balancePKR: true,
        reservedPKR: true,
        winningsPKR: true,
        bonusPKR: true,
      },
    });

    const response = NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully in database.',
    });

    response.cookies.set('eg_session_user_id', user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user account: ' + (error?.message || 'Internal error') },
      { status: 500 }
    );
  }
}
