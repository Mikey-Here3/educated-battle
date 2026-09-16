import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial tournaments into Neon PostgreSQL...');

  // Tournament #1: CS 1V1 HEADSHOT
  await prisma.tournament.upsert({
    where: { id: 'eg-cs-1v1-hs' },
    update: {
      title: 'CS 1V1 HEADSHOT',
      category: 'Clash Squad',
      type: 'Solo',
      format: '1v1',
      mode: 'Headshot',
      map: 'Bermuda',
      allowedWeapons: 'Desert Eagle, M1887',
      status: 'live',
      entryFee: 50,
      winnerPrize: 90,
      prizePool: 90,
      perKill: 0,
      totalSlots: 2,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 30), // 30 min from now
      matchDate: 'Today (Live)',
      matchTime: '08:00 PM PKT',
      isFeatured: true,
      rules: '📱 Mobile only. No PC/Emulators.\n💥 Only Desert Eagle & M1887 allowed.\n🎯 Headshots only.\n⚡ Instant JazzCash/EasyPaisa payout.',
    },
    create: {
      id: 'eg-cs-1v1-hs',
      slug: 'cs-1v1-headshot',
      title: 'CS 1V1 HEADSHOT',
      category: 'Clash Squad',
      type: 'Solo',
      format: '1v1',
      mode: 'Headshot',
      platform: 'Mobile Only',
      map: 'Bermuda',
      allowedWeapons: 'Desert Eagle, M1887',
      status: 'live',
      entryFee: 50,
      winnerPrize: 90,
      prizePool: 90,
      perKill: 0,
      totalSlots: 2,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 30),
      matchDate: 'Today (Live)',
      matchTime: '08:00 PM PKT',
      isFeatured: true,
      rules: '📱 Mobile only. No PC/Emulators.\n💥 Only Desert Eagle & M1887 allowed.\n🎯 Headshots only.\n⚡ Instant JazzCash/EasyPaisa payout.',
    },
  });

  // Tournament #2: CS 2V2 HEADSHOT
  await prisma.tournament.upsert({
    where: { id: 'eg-cs-2v2-hs' },
    update: {
      title: 'CS 2V2 HEADSHOT',
      category: 'Clash Squad',
      type: 'Duo',
      format: '2v2',
      mode: 'Headshot',
      map: 'Bermuda',
      allowedWeapons: 'Desert Eagle, M1887',
      status: 'live',
      entryFee: 120,
      winnerPrize: 200,
      prizePool: 200,
      perKill: 0,
      totalSlots: 4,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
      matchDate: 'Today (Live)',
      matchTime: '09:00 PM PKT',
      isFeatured: false,
      rules: '📱 Mobile only. No PC/Emulators.\n💥 Only Desert Eagle & M1887 allowed.\n🎯 Headshots only.\n⚡ Duo partner must be registered.',
    },
    create: {
      id: 'eg-cs-2v2-hs',
      slug: 'cs-2v2-headshot',
      title: 'CS 2V2 HEADSHOT',
      category: 'Clash Squad',
      type: 'Duo',
      format: '2v2',
      mode: 'Headshot',
      platform: 'Mobile Only',
      map: 'Bermuda',
      allowedWeapons: 'Desert Eagle, M1887',
      status: 'live',
      entryFee: 120,
      winnerPrize: 200,
      prizePool: 200,
      perKill: 0,
      totalSlots: 4,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60),
      matchDate: 'Today (Live)',
      matchTime: '09:00 PM PKT',
      isFeatured: false,
      rules: '📱 Mobile only. No PC/Emulators.\n💥 Only Desert Eagle & M1887 allowed.\n🎯 Headshots only.\n⚡ Duo partner must be registered.',
    },
  });

  // Tournament #3: BR 48 ESPORTS
  await prisma.tournament.upsert({
    where: { id: 'eg-br-48-esports' },
    update: {
      title: 'BR 48 ESPORTS',
      category: 'Battle Royale',
      type: 'Solo',
      format: 'Solo',
      mode: 'Esports',
      map: 'Bermuda',
      status: 'upcoming',
      entryFee: 50,
      prizePool: 2500,
      perKill: 30,
      totalSlots: 48,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow night
      matchDate: 'Saturday Night',
      matchTime: '09:30 PM PKT',
      isFeatured: true,
      prizesJson: JSON.stringify({
        first: 1000,
        second: 600,
        third: 400,
        fourth: 250,
        fifth: 150,
        perKillBonus: 30,
      }),
      rules: '📱 Mobile verified devices only.\n🛡️ Anti-cheat strictly enforced.\n💀 PKR 30 bounty per verified kill.\n🏆 Placement rewards: 1st to 5th.',
    },
    create: {
      id: 'eg-br-48-esports',
      slug: 'br-48-esports',
      title: 'BR 48 ESPORTS',
      category: 'Battle Royale',
      type: 'Solo',
      format: 'Solo',
      mode: 'Esports',
      platform: 'Mobile Only',
      map: 'Bermuda',
      status: 'upcoming',
      entryFee: 50,
      prizePool: 2500,
      perKill: 30,
      totalSlots: 48,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
      matchDate: 'Saturday Night',
      matchTime: '09:30 PM PKT',
      isFeatured: true,
      prizesJson: JSON.stringify({
        first: 1000,
        second: 600,
        third: 400,
        fourth: 250,
        fifth: 150,
        perKillBonus: 30,
      }),
      rules: '📱 Mobile verified devices only.\n🛡️ Anti-cheat strictly enforced.\n💀 PKR 30 bounty per verified kill.\n🏆 Placement rewards: 1st to 5th.',
    },
  });

  // Tournament #4: BR 48 HEADSHOT
  await prisma.tournament.upsert({
    where: { id: 'eg-br-48-headshot' },
    update: {
      title: 'BR 48 HEADSHOT',
      category: 'Battle Royale',
      type: 'Solo',
      format: 'Solo',
      mode: 'Headshot',
      map: 'Bermuda',
      status: 'upcoming',
      entryFee: 50,
      prizePool: 2500,
      perKill: 30,
      totalSlots: 48,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 28), // Sunday night
      matchDate: 'Sunday Night',
      matchTime: '10:00 PM PKT',
      isFeatured: false,
      prizesJson: JSON.stringify({
        first: 1000,
        second: 600,
        third: 400,
        fourth: 250,
        fifth: 150,
        perKillBonus: 30,
      }),
      rules: '📱 Mobile devices only.\n🎯 Headshots mode enabled.\n💀 PKR 30 bounty per verified kill.\n🏆 Placement rewards 1st to 5th.',
    },
    create: {
      id: 'eg-br-48-headshot',
      slug: 'br-48-headshot',
      title: 'BR 48 HEADSHOT',
      category: 'Battle Royale',
      type: 'Solo',
      format: 'Solo',
      mode: 'Headshot',
      platform: 'Mobile Only',
      map: 'Bermuda',
      status: 'upcoming',
      entryFee: 50,
      prizePool: 2500,
      perKill: 30,
      totalSlots: 48,
      slotsFilled: 0,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 28),
      matchDate: 'Sunday Night',
      matchTime: '10:00 PM PKT',
      isFeatured: false,
      prizesJson: JSON.stringify({
        first: 1000,
        second: 600,
        third: 400,
        fourth: 250,
        fifth: 150,
        perKillBonus: 30,
      }),
      rules: '📱 Mobile devices only.\n🎯 Headshots mode enabled.\n💀 PKR 30 bounty per verified kill.\n🏆 Placement rewards 1st to 5th.',
    },
  });

  // Seed Admin User
  await prisma.user.upsert({
    where: { email: 'admin@educatedgamer.com' },
    update: {
      name: 'Educated Gamer Admin',
      phone: '03190799711',
      ign: 'EG_ADMIN_PK',
      uid: '100000001',
      role: 'admin',
    },
    create: {
      name: 'Educated Gamer Admin',
      email: 'admin@educatedgamer.com',
      phone: '03190799711',
      ign: 'EG_ADMIN_PK',
      uid: '100000001',
      role: 'admin',
      balancePKR: 0,
      reservedPKR: 0,
      winningsPKR: 0,
    },
  });

  // Seed Demo Player User
  await prisma.user.upsert({
    where: { email: 'player@educatedgamer.com' },
    update: {
      name: 'Asad Ali',
      phone: '03123456789',
      ign: 'PK_LEGEND_FF',
      uid: '592810482',
      passwordHash: 'Player123!',
      role: 'player',
      balancePKR: 250,
      winningsPKR: 450,
    },
    create: {
      name: 'Asad Ali',
      email: 'player@educatedgamer.com',
      phone: '03123456789',
      ign: 'PK_LEGEND_FF',
      uid: '592810482',
      passwordHash: 'Player123!',
      role: 'player',
      balancePKR: 250,
      reservedPKR: 0,
      winningsPKR: 450,
    },
  });

  console.log('✅ Seed successful: All 4 initial tournaments and official accounts seeded into Neon PostgreSQL!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
