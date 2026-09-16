import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@educatedgamer.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Password123!';

    // Check if Admin Login
    if (cleanEmail === adminEmail && password === adminPassword) {
      // Find or create admin user in DB
      let adminUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (!adminUser) {
        adminUser = await prisma.user.create({
          data: {
            name: 'Educated Gamer Admin',
            email: cleanEmail,
            phone: '03190799711',
            ign: 'EG_ADMIN_PK',
            uid: '100000001',
            role: 'admin',
            balancePKR: 0,
            reservedPKR: 0,
            winningsPKR: 0,
          },
        });
      }

      const response = NextResponse.json({
        success: true,
        role: 'admin',
        user: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          phone: adminUser.phone || '03190799711',
          ign: adminUser.ign,
          uid: adminUser.uid,
          role: 'admin',
          balancePKR: adminUser.balancePKR,
          reservedPKR: adminUser.reservedPKR,
          winningsPKR: adminUser.winningsPKR,
        },
      });

      response.cookies.set('eg_admin', '1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      response.cookies.set('eg_session_user_id', adminUser.id, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    // Player Authentication from PostgreSQL
    let dbUser = await prisma.user.findFirst({
      where: {
        email: cleanEmail,
      },
    });

    // Support demo player auto-seeding if credentials match
    if (!dbUser && cleanEmail === 'player@educatedgamer.com' && password === 'Player123!') {
      dbUser = await prisma.user.create({
        data: {
          name: 'Asad Ali',
          email: 'player@educatedgamer.com',
          phone: '03190799711',
          ign: 'PK_LEGEND_FF',
          uid: '592810482',
          passwordHash: 'Player123!',
          role: 'player',
          balancePKR: 250,
          reservedPKR: 0,
          winningsPKR: 450,
        },
      });
    }

    if (!dbUser) {
      return NextResponse.json({ error: 'No account found with this email. Please register first.' }, { status: 404 });
    }

    if (dbUser.passwordHash && dbUser.passwordHash !== password) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      role: dbUser.role || 'player',
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone || '',
        ign: dbUser.ign,
        uid: dbUser.uid,
        role: dbUser.role || 'player',
        balancePKR: dbUser.balancePKR,
        reservedPKR: dbUser.reservedPKR,
        winningsPKR: dbUser.winningsPKR,
      },
    });

    response.cookies.set('eg_session_user_id', dbUser.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error during authentication: ' + (error?.message || '') }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('eg_admin', '', { maxAge: 0, path: '/' });
  response.cookies.set('eg_session_user_id', '', { maxAge: 0, path: '/' });
  return response;
}
