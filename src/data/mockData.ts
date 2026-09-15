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
  map: 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra';
  status: 'live' | 'upcoming' | 'completed' | 'special';
  prizePool: number; // PKR
  perKill: number; // PKR
  hasPerKill: boolean;
  booyahPrize: number;
  entryFee: number; // PKR (0 = Free)
  slotsFilled: number;
  totalSlots: number;
  startTime: string;
  isFeatured?: boolean;
  roomId?: string;
  roomPassword?: string;
  roomStatus?: 'waiting' | 'ready' | 'started';
  liveStreamUrl?: string;
  bannerImage?: string;
  description?: string;
  bulletPoints?: string[];
  winner?: TournamentWinner;
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
    booyahPrize: 8000,
    entryFee: 100,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'LIVE STREAMING NOW',
    isFeatured: true,
    roomId: 'EG-984210',
    roomPassword: '777',
    roomStatus: 'started',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Premier 48-slot championship match featuring top squads across Pakistan.',
    bulletPoints: [
      '?? Live official YouTube shoutcasting & spectator broadcast.',
      'Mobile devices strictly verified (Zero emulators permitted).',
      'Booyah payout: PKR 8,000 + PKR 50 per kill distributed instantly.',
      'Room ID & Password available only to verified registered squads.'
    ],
    prizes: {
      first: 8000,
      second: 4000,
      third: 2000,
      perKillBonus: 50,
    },
    rules: [
      'Emulators strictly prohibited (Mobile devices only).',
      'Teammates must join using registered Free Fire UIDs.',
      'No teaming or cheating. Violators face permanent ban and forfeiture.',
      'Match results and kills recorded live by admin spectators.',
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
    booyahPrize: 2500,
    entryFee: 0, // FREE ENTRY
    slotsFilled: 48, // FULL Promotional
    totalSlots: 48,
    startTime: 'Today, 8:00 PM PST',
    isFeatured: true,
    roomId: 'EG-SOLO-304',
    roomPassword: '555',
    roomStatus: 'waiting',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'High-speed Free Fire Solo battleground with zero entry fee and cash prizes.',
    bulletPoints: [
      '?? FREE ENTRY tournament ? 48/48 Slots Full (Promotional Match).',
      'PKR 2,500 Booyah cash prize + PKR 30 per verified kill.',
      'Room credentials unlock 15 minutes before 8:00 PM PST.',
      'Join with your registered Free Fire in-game UID.'
    ],
    prizes: {
      first: 2500,
      second: 1500,
      third: 500,
      perKillBonus: 30,
    },
    rules: [
      'Free Fire mobile only.',
      'Do not share Room ID or Password with outsiders.',
      'Top 3 survivors + top fraggers receive instant JazzCash payout.',
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
    booyahPrize: 4500,
    entryFee: 50,
    slotsFilled: 22,
    totalSlots: 24,
    startTime: 'Tonight, 10:30 PM PST',
    isFeatured: false,
    roomId: 'EG-DUO-882',
    roomPassword: '999',
    roomStatus: 'waiting',
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Intense 2v2 tactical battle across Kalahari with high per-kill multipliers.',
    bulletPoints: [
      '?? Fast filling match: 22/24 Duos confirmed.',
      'PKR 4,500 1st place prize + PKR 40 bounty per kill.',
      'Custom room ID & Pass given strictly to joined players.',
      'Screenshot winning leaderboard & submit via contact support if needed.'
    ],
    prizes: {
      first: 4500,
      second: 2000,
      third: 1000,
      perKillBonus: 40,
    },
    rules: [
      'Duo partners must both be registered on Educated Gamer.',
      'Gun attributes default / competitive settings.',
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
    booyahPrize: 14000,
    entryFee: 150,
    slotsFilled: 48,
    totalSlots: 48,
    startTime: 'Yesterday, 9:00 PM PST',
    isFeatured: false,
    liveStreamUrl: 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw',
    description: 'Mega Squad Championship successfully concluded with verified JazzCash payouts.',
    bulletPoints: [
      '?? WINNER: Team CYBORG ? UID: 489201482 (PK_CYBORG_FF)',
      'Total Kills: 17 Squad Kills | Booyah Prize: PKR 14,000',
      'All payments confirmed & distributed via JazzCash by Admin.',
      'Full match replay available on EDUCATED GAMER YouTube channel.'
    ],
    winner: {
      name: 'PK_CYBORG_FF',
      ign: 'CYBORG_ESPORTS',
      uid: '489201482',
      kills: 17,
      prizePKR: 15275,
      rank: '1st Place Booyah',
    },
    prizes: {
      first: 14000,
      second: 7000,
      third: 3000,
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
      '?? WINNER: EG_SHADOW_99 (UID: 773918204)',
      'Final Score: 7 - 4 | Prize Paid: PKR 7,000',
      'Verified payout via JazzCash (Trx ID: 98412048102).'
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
    name: 'Ashan Akhtar (Admin)',
    ign: 'EG_COMMANDER_PK',
    uid: '100000001',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=EG_COMMANDER',
    earningsPKR: 125400,
    matchesPlayed: 88,
    totalKills: 412,
    winRate: 68.5,
    badge: 'GRANDMASTER'
  },
  {
    rank: 2,
    name: 'Hamza Khan',
    ign: 'PK_CYBORG_FF',
    uid: '489201482',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CYBORG',
    earningsPKR: 84200,
    matchesPlayed: 64,
    totalKills: 320,
    winRate: 59.2,
    badge: 'HEROIC ELITE'
  },
  {
    rank: 3,
    name: 'Ali Raza',
    ign: 'EG_SHADOW_99',
    uid: '773918204',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SHADOW',
    earningsPKR: 62500,
    matchesPlayed: 51,
    totalKills: 245,
    winRate: 54.0,
    badge: 'MASTER III'
  },
  {
    rank: 4,
    name: 'Zain Malik',
    ign: 'PK_DEADSHOT',
    uid: '984120931',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DEADSHOT',
    earningsPKR: 43100,
    matchesPlayed: 42,
    totalKills: 198,
    winRate: 48.7,
    badge: 'DIAMOND IV'
  },
  {
    rank: 5,
    name: 'Daniyal Ahmed',
    ign: 'NO_MERCY_PK',
    uid: '334918203',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NOMERCY',
    earningsPKR: 31800,
    matchesPlayed: 35,
    totalKills: 142,
    winRate: 44.1,
    badge: 'DIAMOND II'
  }
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'banner-1',
    title: 'WEEKLY MEGA SQUAD CUP ??',
    subtitle: 'PKR 25,000 PRIZE POOL ? LIVE BROADCAST ON YOUTUBE',
    badge: 'OFFICIAL TOURNAMENT',
    ctaText: 'JOIN SQUAD NOW',
    ctaAction: '/matches',
    gradient: 'from-crimson via-surface-200 to-black',
    image: '/hero-ff.webp'
  },
  {
    id: 'banner-2',
    title: 'FREE ENTRY FRIDAY BATTLE ??',
    subtitle: '0 ENTRY FEE ? REAL PKR CASH REWARDS TO JAZZCASH',
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
