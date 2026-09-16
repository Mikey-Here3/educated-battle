export interface TournamentWinner {
  name: string;
  ign: string;
  uid: string;
  kills: number;
  prizePKR: number;
  rank: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: 'Free Fire' | 'Free Fire MAX';
  type: 'Solo' | 'Duo' | 'Squad' | 'Clash Squad';
  map: 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra' | 'Solara' | 'Custom/Craftland';
  status: 'live' | 'upcoming' | 'completed' | 'special';
  prizePool: number; // PKR — Overall prize pool
  perKill: number; // PKR — Per kill bonus amount
  hasPerKill: boolean;
  booyahPrize: number; // PKR — 1st place Booyah prize
  entryFee: number; // PKR (0 = Free)
  slotsFilled: number;
  totalSlots: number;
  startTime: string;
  matchDate?: string; // e.g. "Saturday (Weekend Night)"
  matchTime?: string; // e.g. "09:00 PM PKT"
  isFeatured?: boolean;
  roomId?: string;
  roomPassword?: string;
  roomStatus?: 'waiting' | 'ready' | 'started';
  liveStreamUrl?: string;
  bannerImage?: string;
  description?: string;
  bulletPoints?: string[];
  winner?: TournamentWinner;
  mapCode?: string; // For Custom/Craftland maps
  prizes: {
    first: number;
    second: number;
    third: number;
    fourth?: number;
    fifth?: number;
    sixth?: number;
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
  isBot?: boolean; // marks demo/promotional entries
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

export const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029VbD6gJE3WHTOMOkx252G',
  youtube: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
  phone: '03190799711',
  accountName: 'Ashan Akhtar',
};

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'eg-ff-101',
    title: 'PAKISTAN CHAMPIONS CLASH #101',
    game: 'Free Fire MAX',
    type: 'Squad',
    map: 'Bermuda',
    status: 'live',
    prizePool: 15000,
    hasPerKill: true,
    perKill: 50,
    booyahPrize: 7000,
    entryFee: 100,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'Saturday Night, 09:00 PM PKT',
    matchDate: 'Saturday Night',
    matchTime: '09:00 PM PKT',
    isFeatured: true,
    roomId: 'EG-984210',
    roomPassword: '777',
    roomStatus: 'started',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Premier 48-slot championship match featuring top squads across Pakistan.',
    bulletPoints: [
      '• Official YouTube Live shoutcasting & spectator broadcast.',
      '• Mobile devices strictly verified (Zero emulators permitted).',
      '• Booyah payout: PKR 7,000 + PKR 50 per kill distributed instantly.',
      '• Room ID & Password available only to verified registered squads.'
    ],
    prizes: {
      first: 7000,
      second: 3500,
      third: 2000,
      fourth: 1000,
      fifth: 800,
      sixth: 700,
      perKillBonus: 50,
    },
    rules: [
      '📱 Mobile devices only (Zero emulators / PC players permitted).',
      '🛡️ Anti-cheat and fair play strictly enforced. Teaming equals permanent ban.',
      '🆔 All players must enter custom room with registered Free Fire UIDs.',
      '⚡ Match results and frags recorded live by official tournament marshals.',
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
    hasPerKill: true,
    perKill: 30,
    booyahPrize: 2200,
    entryFee: 0, // FREE ENTRY
    slotsFilled: 48, // FULL Promotional
    totalSlots: 48,
    startTime: 'Saturday Night, 10:30 PM PKT',
    matchDate: 'Saturday Night',
    matchTime: '10:30 PM PKT',
    isFeatured: true,
    roomId: 'EG-SOLO-304',
    roomPassword: '555',
    roomStatus: 'waiting',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'High-speed Free Fire Solo battleground with zero entry fee and cash prizes.',
    bulletPoints: [
      '• 100% FREE ENTRY tournament — 48/48 Slots Full (Promotional Match).',
      '• PKR 2,200 Booyah cash prize + PKR 30 per verified kill.',
      '• Room credentials unlock 15 minutes before match start.',
      '• Join with your registered Free Fire in-game UID.'
    ],
    prizes: {
      first: 2200,
      second: 1200,
      third: 700,
      fourth: 400,
      fifth: 300,
      sixth: 200,
      perKillBonus: 30,
    },
    rules: [
      '📱 Free Fire mobile only.',
      '🔒 Do not share Room ID or Password with non-registered players.',
      '💵 Top 6 survivors + fraggers receive instant JazzCash payment confirmation.',
    ]
  },
  {
    id: 'eg-ff-103',
    title: 'EDUCATED ARENA GRAND DUO CUP',
    game: 'Free Fire MAX',
    type: 'Duo',
    map: 'Kalahari',
    status: 'upcoming',
    prizePool: 8000,
    hasPerKill: true,
    perKill: 40,
    booyahPrize: 3800,
    entryFee: 50,
    slotsFilled: 22,
    totalSlots: 24,
    startTime: 'Sunday Night, 08:30 PM PKT',
    matchDate: 'Sunday Night',
    matchTime: '08:30 PM PKT',
    isFeatured: false,
    roomId: 'EG-DUO-882',
    roomPassword: '999',
    roomStatus: 'waiting',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Intense 2v2 tactical battle across Kalahari with high per-kill multipliers.',
    bulletPoints: [
      '• Fast filling match: 22/24 Duos confirmed.',
      '• PKR 3,800 1st place prize + PKR 40 bounty per kill.',
      '• Custom room ID & Pass given strictly to joined players.',
      '• Screenshot winning leaderboard & submit via contact support if needed.'
    ],
    prizes: {
      first: 3800,
      second: 1800,
      third: 1000,
      fourth: 600,
      fifth: 450,
      sixth: 350,
      perKillBonus: 40,
    },
    rules: [
      '📱 Duo partners must both be registered on Educated Gamer.',
      '⚡ Gun attributes default / competitive esports settings.',
    ]
  },
  {
    id: 'eg-ff-104',
    title: 'WEEKLY MEGA SQUAD SHOWDOWN #99',
    game: 'Free Fire MAX',
    type: 'Squad',
    map: 'Bermuda',
    status: 'completed',
    prizePool: 25000,
    hasPerKill: true,
    perKill: 75,
    booyahPrize: 12000,
    entryFee: 150,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'Sunday Night, 09:45 PM PKT',
    matchDate: 'Sunday Night',
    matchTime: '09:45 PM PKT',
    isFeatured: false,
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Mega Squad Championship successfully concluded with verified JazzCash payouts.',
    bulletPoints: [
      '• WINNER: Team CYBORG — UID: 489201482 (PK_CYBORG_FF)',
      '• Total Kills: 17 Squad Kills | Booyah Prize: PKR 12,000',
      '• All payments confirmed & distributed via JazzCash by Admin.',
      '• Full match replay available on EDUCATED GAMER YouTube channel.'
    ],
    winner: {
      name: 'PK_CYBORG_FF',
      ign: 'CYBORG_ESPORTS',
      uid: '489201482',
      kills: 17,
      prizePKR: 13275,
      rank: '1st Place Booyah',
    },
    prizes: {
      first: 12000,
      second: 5500,
      third: 3000,
      fourth: 2000,
      fifth: 1500,
      sixth: 1000,
      perKillBonus: 75,
    },
    rules: [
      'Tournament completed and prize money dispatched.',
    ]
  },
  {
    id: 'eg-ff-105',
    title: 'PRO CLASH SQUAD ULTIMATE 4v4',
    game: 'Free Fire',
    type: 'Clash Squad',
    map: 'Nexterra',
    status: 'completed',
    prizePool: 10000,
    hasPerKill: false,
    perKill: 0,
    booyahPrize: 7000,
    entryFee: 100,
    slotsFilled: 16,
    totalSlots: 16,
    startTime: '2 Days Ago',
    isFeatured: false,
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'High adrenaline 4v4 Clash Squad series.',
    bulletPoints: [
      '• WINNER: EG_SHADOW_99 (UID: 773918204)',
      '• Final Score: 7 - 4 | Prize Paid: PKR 7,000',
      '• Verified payout via JazzCash (Trx ID: 98412048102).'
    ],
    winner: {
      name: 'EG_SHADOW_99',
      ign: 'SHADOW_VIP',
      uid: '773918204',
      kills: 14,
      prizePKR: 7000,
      rank: '1st Place Booyah',
    },
    prizes: {
      first: 7000,
      second: 3000,
      third: 0,
      perKillBonus: 0,
    },
    rules: [
      'Official verified match completed.',
    ]
  }
];

export const MOCK_LEADERBOARD: PlayerRank[] = [
  {
    rank: 1,
    name: 'Bilal Rehman',
    ign: 'PK_BLAZE_99',
    uid: '549182073',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PKBLAZE99',
    earningsPKR: 1850,
    matchesPlayed: 14,
    totalKills: 62,
    winRate: 57.1,
    badge: 'HEROIC',
    isBot: true,
  },
  {
    rank: 2,
    name: 'Saad Farooq',
    ign: 'REAPER_ESPORTS',
    uid: '773018492',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=REAPERFF',
    earningsPKR: 1420,
    matchesPlayed: 11,
    totalKills: 48,
    winRate: 45.5,
    badge: 'DIAMOND I',
    isBot: true,
  },
  {
    rank: 3,
    name: 'Noman Arshad',
    ign: 'PHANTOM_VIP_PK',
    uid: '334019283',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PHANTOMVIP',
    earningsPKR: 980,
    matchesPlayed: 9,
    totalKills: 37,
    winRate: 44.4,
    badge: 'DIAMOND II',
    isBot: true,
  },
  {
    rank: 4,
    name: 'Arslan Khan',
    ign: 'GHOSTKILL_PK',
    uid: '918203748',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=GHOSTKILL',
    earningsPKR: 650,
    matchesPlayed: 7,
    totalKills: 28,
    winRate: 42.9,
    badge: 'PLATINUM IV',
    isBot: true,
  },
  {
    rank: 5,
    name: 'Umer Javed',
    ign: 'SHADOW_SNIPER_FF',
    uid: '201938475',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SHADOWSNIPER',
    earningsPKR: 280,
    matchesPlayed: 5,
    totalKills: 19,
    winRate: 40.0,
    badge: 'GOLD I',
    isBot: true,
  },
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'banner-1',
    title: 'WEEKLY MEGA SQUAD CUP',
    subtitle: 'PKR 25,000 PRIZE POOL • LIVE BROADCAST ON YOUTUBE',
    badge: 'OFFICIAL TOURNAMENT',
    ctaText: 'JOIN SQUAD NOW',
    ctaAction: '/matches',
    gradient: 'from-crimson via-surface-200 to-black',
    image: '/hero-ff.webp'
  },
  {
    id: 'banner-2',
    title: 'FREE ENTRY FRIDAY BATTLE',
    subtitle: '0 ENTRY FEE • REAL PKR CASH REWARDS TO JAZZCASH',
    badge: '100% FREE',
    ctaText: 'RESERVE FREE SLOT',
    ctaAction: '/matches',
    gradient: 'from-neon-gold/30 via-surface-200 to-black',
    image: '/hero-ff.webp'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How do I receive Room ID & Password?',
    a: 'Room ID and Password are published on the website 15 minutes before match start time. Only logged in players who joined the match can see the credentials.'
  },
  {
    q: 'What are the JazzCash payment details?',
    a: 'Send deposits to JazzCash: 03190799711 (Account Name: Ashan Akhtar). EasyPaisa is currently in maintenance. Upload your transaction screenshot on the wallet page.'
  },
  {
    q: 'Can emulator or PC players join?',
    a: 'No. Educated Gamer is strictly 100% mobile-only Free Fire & Free Fire MAX. Any emulator player is automatically detected, kicked, and banned.'
  },
  {
    q: 'How are prizes and per-kill bonuses paid?',
    a: 'Prizes are confirmed by the admin immediately after match conclusion and transferred directly to your winning wallet or JazzCash account.'
  }
];
