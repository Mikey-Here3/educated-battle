export interface Tournament {
  id: string;
  title: string;
  game: 'Free Fire' | 'Free Fire MAX';
  type: 'Solo' | 'Duo' | 'Squad' | 'Clash Squad';
  map: 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra';
  status: 'live' | 'upcoming' | 'completed' | 'special';
  prizePool: number; // PKR
  perKill: number; // PKR
  entryFee: number; // PKR (0 = Free)
  slotsFilled: number;
  totalSlots: number;
  startTime: string; // ISO or readable
  isFeatured?: boolean;
  roomId?: string;
  roomPassword?: string;
  roomStatus?: 'waiting' | 'ready' | 'started';
  bannerImage?: string;
  prizes: {
    first: number;
    second: number;
    third: number;
    perKillBonus: number;
  };
  rules: string[];
}

export interface PlayerRank {
  rank: number;
  name: string;
  ign: string;
  uid: string;
  avatar: string;
  earningsPKR: number;
  matchesPlayed: number;
  totalKills: number;
  winRate: number;
  badge: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaAction: string;
  gradient: string;
  image: string;
}

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'eg-ff-101',
    title: 'PAKISTAN CHAMPIONS CLASH #101',
    game: 'Free Fire MAX',
    type: 'Squad',
    map: 'Bermuda',
    status: 'live',
    prizePool: 15000,
    perKill: 50,
    entryFee: 100,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'LIVE NOW',
    isFeatured: true,
    roomId: 'EG-984210',
    roomPassword: '777',
    roomStatus: 'ready',
    prizes: {
      first: 8000,
      second: 4000,
      third: 2000,
      perKillBonus: 50,
    },
    rules: [
      'Emulators strictly prohibited (Mobile devices only).',
      'Teammates must join using registered Free Fire UIDs.',
      'No teaming or cheating allowed. Violators will face immediate ban and balance forfeiture.',
      'Room ID & Password will lock 5 minutes before match start.',
    ]
  },
  {
    id: 'eg-ff-102',
    title: 'NIGHT WARRIORS SOLO BATTLE',
    game: 'Free Fire MAX',
    type: 'Solo',
    map: 'Purgatory',
    status: 'upcoming',
    prizePool: 5000,
    perKill: 30,
    entryFee: 0, // FREE ENTRY
    slotsFilled: 38,
    totalSlots: 48,
    startTime: 'Today, 8:00 PM PST',
    isFeatured: true,
    roomId: 'EG-SOLO-304',
    roomPassword: '555',
    roomStatus: 'waiting',
    prizes: {
      first: 2500,
      second: 1500,
      third: 1000,
      perKillBonus: 30,
    },
    rules: [
      'Free Entry tournament sponsored by Educated Gamer Arena.',
      'All players must submit valid Pakistan Mobile Number for cash delivery.',
      'Room ID will be revealed 15 minutes before launch.',
    ]
  },
  {
    id: 'eg-ff-103',
    title: 'CLASH SQUAD 4V4 SHOWDOWN',
    game: 'Free Fire',
    type: 'Clash Squad',
    map: 'Bermuda',
    status: 'upcoming',
    prizePool: 8000,
    perKill: 0,
    entryFee: 200,
    slotsFilled: 6,
    totalSlots: 8, // Teams
    startTime: 'Today, 9:30 PM PST',
    isFeatured: false,
    prizes: {
      first: 5500,
      second: 2500,
      third: 0,
      perKillBonus: 0,
    },
    rules: [
      'CS 4v4 format, Best of 7 Rounds.',
      'Character Skills: Turned ON.',
      'Gun Property: Turned OFF.',
      'Custom Room Referee decision is final.',
    ]
  },
  {
    id: 'eg-ff-104',
    title: 'KALAHARI DESERT DUOS #45',
    game: 'Free Fire MAX',
    type: 'Duo',
    map: 'Kalahari',
    status: 'upcoming',
    prizePool: 6500,
    perKill: 40,
    entryFee: 80,
    slotsFilled: 18,
    totalSlots: 24, // 24 teams
    startTime: 'Tomorrow, 6:00 PM PST',
    isFeatured: false,
    prizes: {
      first: 3500,
      second: 1800,
      third: 1200,
      perKillBonus: 40,
    },
    rules: [
      'Duo Survival match on Kalahari map.',
      'Both players must register together with accurate UIDs.',
      'Per kill cash bonus awarded automatically after room verification.',
    ]
  },
  {
    id: 'eg-ff-105',
    title: 'WEEKLY GRAND FINALE - PKR 50,000',
    game: 'Free Fire MAX',
    type: 'Squad',
    map: 'Nexterra',
    status: 'special',
    prizePool: 50000,
    perKill: 100,
    entryFee: 350,
    slotsFilled: 41,
    totalSlots: 48,
    startTime: 'Sunday, 7:00 PM PST',
    isFeatured: true,
    prizes: {
      first: 25000,
      second: 12000,
      third: 8000,
      perKillBonus: 100,
    },
    rules: [
      'Official Educated Gamer Weekly Major Event.',
      'Live streamed on YouTube with shoutcasting.',
      'Room credentials sent directly via SMS & App notification.',
    ]
  },
  {
    id: 'eg-ff-106',
    title: 'MIDNIGHT PRO SQUAD BATTLE',
    game: 'Free Fire',
    type: 'Squad',
    map: 'Bermuda',
    status: 'completed',
    prizePool: 12000,
    perKill: 45,
    entryFee: 150,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'Yesterday, 11:00 PM',
    isFeatured: false,
    prizes: {
      first: 6000,
      second: 3500,
      third: 2500,
      perKillBonus: 45,
    },
    rules: [
      'Completed tournament.',
      'All rewards disbursed to winner wallets via JazzCash/EasyPaisa.',
    ]
  }
];

export const MOCK_LEADERBOARD: PlayerRank[] = [
  {
    rank: 1,
    name: 'Shahzaib "CYBORG" Khan',
    ign: 'EG_CYBORG_FF',
    uid: '489210482',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 142500,
    matchesPlayed: 184,
    totalKills: 612,
    winRate: 38.4,
    badge: '👑 CHAMPION'
  },
  {
    rank: 2,
    name: 'Hamza "PHANTOM" Ali',
    ign: 'PK_PHANTOM_99',
    uid: '129481902',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 118000,
    matchesPlayed: 162,
    totalKills: 540,
    winRate: 34.1,
    badge: '🥈 ELITE LEGEND'
  },
  {
    rank: 3,
    name: 'Bilal "VIPER" Tariq',
    ign: 'VIPER_OP_PK',
    uid: '984120481',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 96400,
    matchesPlayed: 140,
    totalKills: 482,
    winRate: 31.0,
    badge: '🥉 MASTER WARRIOR'
  },
  {
    rank: 4,
    name: 'Usman "SNIPER" Riaz',
    ign: 'SNIPER_GOD_77',
    uid: '741928341',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 78500,
    matchesPlayed: 128,
    totalKills: 410,
    winRate: 28.5,
    badge: 'TOP 5 PRO'
  },
  {
    rank: 5,
    name: 'Zain "SKULL" Ahmed',
    ign: 'SKULL_REAPER',
    uid: '631982741',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 64200,
    matchesPlayed: 110,
    totalKills: 375,
    winRate: 26.2,
    badge: 'TOP 5 PRO'
  },
  {
    rank: 6,
    name: 'Arslan "GLITCH" Butt',
    ign: 'GLITCH_X_FF',
    uid: '381928471',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 52100,
    matchesPlayed: 95,
    totalKills: 310,
    winRate: 24.8,
    badge: 'GRANDMASTER'
  },
  {
    rank: 7,
    name: 'Danish "SLAYER" Malik',
    ign: 'SLAYER_BOY_PK',
    uid: '849182374',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    earningsPKR: 44000,
    matchesPlayed: 88,
    totalKills: 285,
    winRate: 22.5,
    badge: 'GRANDMASTER'
  }
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'promo-1',
    title: 'WELCOME 100% DEPOSIT BONUS',
    subtitle: 'Deposit PKR 500 or more via EasyPaisa / JazzCash & get double tournament credits instantly!',
    badge: '⚡ LIMITED TIME OFFER',
    ctaText: 'CLAIM BONUS NOW',
    ctaAction: 'deposit',
    gradient: 'from-purple-900/90 via-purple-950 to-slate-950',
    image: '/logo.svg'
  },
  {
    id: 'promo-2',
    title: 'WEEKLY SQUAD GRAND FINALE',
    subtitle: 'PKR 50,000 Guaranteed Prize Pool • Broadcast Live on YouTube with Shoutcasting',
    badge: '🏆 MAJOR TOURNAMENT',
    ctaText: 'REGISTER SQUAD',
    ctaAction: 'register',
    gradient: 'from-indigo-900/90 via-purple-950 to-slate-950',
    image: '/logo.svg'
  },
  {
    id: 'promo-3',
    title: 'JOIN PAKISTAN FREE FIRE COMMUNITY',
    subtitle: 'Get daily room passwords, instant support, and tournament announcements on WhatsApp & Discord!',
    badge: '📱 25,000+ GAMERS JOINED',
    ctaText: 'JOIN WHATSAPP GROUP',
    ctaAction: 'community',
    gradient: 'from-cyan-950/90 via-purple-950 to-slate-950',
    image: '/logo.svg'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How do I join a Free Fire tournament on Educated Gamer?',
    a: 'Simply browse the active tournaments grid, select your preferred match (Solo, Duo, or Squad), select an open slot, enter your Free Fire UID and In-Game Name, and click Join. Your slot will be locked instantly.'
  },
  {
    q: 'Where do I get the Custom Room ID and Password?',
    a: 'Room credentials (ID and Password) are published directly on your joined tournament card 15 minutes before the match start time. You will also receive an SMS and App Notification.'
  },
  {
    q: 'How are prize money and per-kill rewards disbursed in Pakistan?',
    a: 'All earnings are credited to your Educated Gamer Wallet in PKR immediately after match verification. You can withdraw directly to your EasyPaisa, JazzCash, or Pakistan Bank Account anytime.'
  },
  {
    q: 'Are emulators allowed in tournaments?',
    a: 'No! Unless explicitly marked as an "Emulator Friendly" special room, emulators are strictly banned to ensure fair mobile competitive play.'
  }
];
