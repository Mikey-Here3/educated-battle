'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { INITIAL_TOURNAMENTS, MOCK_LEADERBOARD, Tournament, PlayerRank } from '@/data/mockData';
import { useAuth, ContactQuery } from '@/context/AuthContext';
import { 
  ShieldAlert, 
  PlusCircle, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Wallet, 
  Settings, 
  Gamepad2, 
  Search,
  MessageSquareCode,
  Youtube,
  Phone,
  Clock,
  MapPin,
  Flame,
  UserCheck,
  LogOut,
  User,
  Check,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminPortalPage() {
  const router = useRouter();
  const { currentUser, contactQueries } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const hasAdminCookie = typeof document !== 'undefined' && document.cookie.includes('eg_admin=1');
    if (!hasAdminCookie && currentUser?.role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router, currentUser]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/login', { method: 'DELETE' });
    } catch {}
    router.push('/login');
    router.refresh();
  };

  const [activeTab, setActiveTab] = useState<'tournaments' | 'deposits' | 'queries' | 'leaderboard' | 'settings'>('tournaments');

  const [tournamentsList, setTournamentsList] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRoomIdTourney, setEditingRoomIdTourney] = useState<Tournament | null>(null);
  const [completingTourney, setCompletingTourney] = useState<Tournament | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newGame, setNewGame] = useState<'Free Fire' | 'Free Fire MAX'>('Free Fire MAX');
  const [newType, setNewType] = useState<'Solo' | 'Duo' | 'Squad' | 'Clash Squad'>('Squad');
  const [newMap, setNewMap] = useState<'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra'>('Bermuda');
  const [newPrize, setNewPrize] = useState(15000);
  const [newBooyah, setNewBooyah] = useState(8000);
  const [hasPerKill, setHasPerKill] = useState(true);
  const [newPerKill, setNewPerKill] = useState(50);
  const [newEntryFee, setNewEntryFee] = useState(100);
  const [newSlots, setNewSlots] = useState(48);
  const [newStartTime, setNewStartTime] = useState('Today, 9:00 PM PST');
  const [newLiveStreamUrl, setNewLiveStreamUrl] = useState('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
  const [newBulletPoints, setNewBulletPoints] = useState(
    '?? Official YouTube Live Broadcast\nMobile devices only (No Emulators)\nBooyah & Kill rewards paid via JazzCash'
  );

  const [editRoomId, setEditRoomId] = useState('');
  const [editRoomPass, setEditRoomPass] = useState('');
  const [editLiveUrl, setEditLiveUrl] = useState('');

  const [winnerName, setWinnerName] = useState('');
  const [winnerUid, setWinnerUid] = useState('');
  const [winnerKills, setWinnerKills] = useState(12);
  const [winnerPrize, setWinnerPrize] = useState(8000);

  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'dep-1', user: 'PK_CYBORG_FF', uid: '489201482', method: 'JazzCash', amt: 500, trxId: '29481029481', date: '5 mins ago' },
    { id: 'dep-2', user: 'PK_PHANTOM_99', uid: '129481902', method: 'JazzCash', amt: 1000, trxId: '98412048102', date: '12 mins ago' },
  ]);

  const [whatsappLink, setWhatsappLink] = useState('https://whatsapp.com/channel/0029VbD6gJE3WHTOMOkx252G');
  const [youtubeLink, setYoutubeLink] = useState('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
  const [jazzCashPhone, setJazzCashPhone] = useState('03190799711');
  const [jazzCashName, setJazzCashName] = useState('Ashan Akhtar');
  const [savedSettings, setSavedSettings] = useState(false);

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    const bullets = newBulletPoints.split('\n').map(s => s.trim()).filter(Boolean);

    const created: Tournament = {
      id: `eg-ff-${Date.now().toString().slice(-4)}`,
      title: newTitle.toUpperCase() || 'NEW BATTLE ARENA TOURNAMENT',
      game: newGame,
      type: newType,
      map: newMap,
      status: 'upcoming',
      prizePool: Number(newPrize),
      hasPerKill: hasPerKill,
      perKill: hasPerKill ? Number(newPerKill) : 0,
      booyahPrize: Number(newBooyah),
      entryFee: Number(newEntryFee),
      slotsFilled: 0,
      totalSlots: Number(newSlots),
      startTime: newStartTime,
      isFeatured: false,
      liveStreamUrl: newLiveStreamUrl,
      bulletPoints: bullets.length > 0 ? bullets : [
        'Verified Mobile tournament.',
        'Room ID released 15 mins prior to start.',
        'Instant payout on Booyah confirmation.'
      ],
      prizes: {
        first: Number(newBooyah),
        second: Math.round(Number(newPrize) * 0.25),
        third: Math.round(Number(newPrize) * 0.15),
        perKillBonus: hasPerKill ? Number(newPerKill) : 0,
      },
      rules: [
        'Mobile devices only (Emulators banned).',
        'Join assigned slot strictly matching registered Free Fire UID.',
        'Room ID & Password released 15 mins before match start.',
      ]
    };

    setTournamentsList([created, ...tournamentsList]);
    setShowCreateModal(false);
    setNewTitle('');
  };

  const handleSaveRoomId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoomIdTourney) return;

    setTournamentsList((prev) =>
      prev.map((t) => {
        if (t.id === editingRoomIdTourney.id) {
          return {
            ...t,
            roomId: editRoomId || 'EG-998822',
            roomPassword: editRoomPass || '777',
            roomStatus: 'ready',
            liveStreamUrl: editLiveUrl || t.liveStreamUrl,
          };
        }
        return t;
      })
    );
    setEditingRoomIdTourney(null);
  };

  const handleCompleteTournamentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingTourney) return;

    setTournamentsList((prev) =>
      prev.map((t) => {
        if (t.id === completingTourney.id) {
          return {
            ...t,
            status: 'completed',
            winner: {
              name: winnerName || 'PK_CHAMPION_FF',
              ign: winnerName || 'PK_CHAMPION_FF',
              uid: winnerUid || '489201948',
              kills: Number(winnerKills),
              prizePKR: Number(winnerPrize),
              rank: '1st Place Booyah',
            }
          };
        }
        return t;
      })
    );
    setCompletingTourney(null);
    setWinnerName('');
    setWinnerUid('');
  };

  const handleDepositAction = (id: string, action: 'approve' | 'reject') => {
    setPendingDeposits((prev) => prev.filter((d) => d.id !== id));
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-crimson border-t-transparent animate-spin" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Admin Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-neon-gold/50 bg-gradient-to-r from-crimson/20 via-surface-200 to-black p-6 sm:p-8 mb-8 shadow-[0_0_40px_rgba(255,215,0,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40 shrink-0">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-neon-gold tracking-widest">ADMINISTRATOR CONTROL PORTAL</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
                EDUCATED GAMER MANAGER
              </h1>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 rounded-xl border border-crimson/50 bg-crimson/20 hover:bg-crimson px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition shadow-[0_0_15px_rgba(255,0,60,0.3)] shrink-0 self-start md:self-auto"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`flex items-center space-x-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
              activeTab === 'tournaments'
                ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
                : 'bg-surface-200 text-slate-300 hover:text-white'
            }`}
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Tournaments ({tournamentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('deposits')}
            className={`flex items-center space-x-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-wider transition relative ${
              activeTab === 'deposits'
                ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
                : 'bg-surface-200 text-slate-300 hover:text-white'
            }`}
          >
            <Wallet className="h-4 w-4" />
            <span>Deposit Approvals</span>
            {pendingDeposits.length > 0 && (
              <span className="ml-1.5 h-5 w-5 rounded-full bg-neon-gold text-black text-[10px] font-black flex items-center justify-center">
                {pendingDeposits.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('queries')}
            className={`flex items-center space-x-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-wider transition relative ${
              activeTab === 'queries'
                ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
                : 'bg-surface-200 text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquareCode className="h-4 w-4" />
            <span>Contact Queries ({contactQueries.length})</span>
            {contactQueries.length > 0 && (
              <span className="ml-1.5 h-5 w-5 rounded-full bg-crimson text-white text-[10px] font-black flex items-center justify-center">
                {contactQueries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
              activeTab === 'leaderboard'
                ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
                : 'bg-surface-200 text-slate-300 hover:text-white'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>Leaderboard & Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-wider transition ${
              activeTab === 'settings'
                ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
                : 'bg-surface-200 text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Social & Site Settings</span>
          </button>
        </div>

        {/* TAB 1: TOURNAMENTS MANAGER */}
        {activeTab === 'tournaments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase font-display">Manage Tournaments & Matches</h2>
                <p className="text-xs text-slate-400">Create new tournaments, update YouTube live stream, publish Room ID/Pass, and set winners.</p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] hover:shadow-[0_0_35px_rgba(255,0,60,0.6)] transition"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Tournament</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-surface-200/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <th className="p-4">Match Title & Game</th>
                      <th className="p-4">Type / Map</th>
                      <th className="p-4">Prize / Booyah</th>
                      <th className="p-4">Slots</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Room & Stream</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-bold text-slate-300">
                    {tournamentsList.map((t) => (
                      <tr key={t.id} className="hover:bg-surface-200/50 transition">
                        <td className="p-4">
                          <p className="font-black text-white">{t.title}</p>
                          <span className="text-[10px] text-slate-400 font-normal">{t.game} ? {t.startTime}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-crimson/20 text-crimson text-[10px] mr-1">{t.type}</span>
                          <span className="text-slate-400">{t.map}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-neon-gold font-black">PKR {t.prizePool.toLocaleString()}</p>
                          <span className="text-[10px] text-slate-400">Booyah: PKR {t.booyahPrize || t.prizes.first}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-mono">{t.slotsFilled} / {t.totalSlots}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            t.status === 'live'
                              ? 'bg-crimson/20 text-crimson border border-crimson'
                              : t.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-surface-300 text-slate-300'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {t.roomId ? (
                            <span className="font-mono text-neon-gold">{t.roomId} (P: {t.roomPassword})</span>
                          ) : (
                            <span className="text-slate-500 italic">Not Published</span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingRoomIdTourney(t);
                              setEditRoomId(t.roomId || '');
                              setEditRoomPass(t.roomPassword || '');
                              setEditLiveUrl(t.liveStreamUrl || '');
                            }}
                            className="rounded-xl border border-neon-gold/40 bg-neon-gold/10 px-3 py-1.5 text-[10px] font-black uppercase text-neon-gold hover:bg-neon-gold hover:text-black transition"
                          >
                            Room / Live
                          </button>

                          {t.status !== 'completed' && (
                            <button
                              onClick={() => {
                                setCompletingTourney(t);
                                setWinnerPrize(t.booyahPrize || t.prizes.first);
                              }}
                              className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
                            >
                              Set Winner
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEPOSIT APPROVALS */}
        {activeTab === 'deposits' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase font-display">Pending JazzCash Deposits</h2>
              <p className="text-xs text-slate-400">Verify user transactions with JazzCash statement and credit their coin wallet.</p>
            </div>

            {pendingDeposits.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-surface-100 p-8 text-center text-slate-400">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-2" />
                <p className="text-sm font-bold">All pending deposits have been processed!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingDeposits.map((dep) => (
                  <div key={dep.id} className="rounded-3xl border border-white/10 bg-surface-100 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-neon-gold/20 text-neon-gold text-[10px] font-black uppercase border border-neon-gold/40">
                        {dep.method} (PKR {dep.amt})
                      </span>
                      <span className="text-xs text-slate-400">{dep.date}</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-black text-white">{dep.user}</p>
                      <p className="text-xs text-slate-400 font-mono">Player UID: {dep.uid}</p>
                      <p className="text-xs text-neon-gold font-mono font-bold">Trx ID: {dep.trxId}</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => handleDepositAction(dep.id, 'approve')}
                        className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 py-2.5 text-xs font-black uppercase text-black transition"
                      >
                        Approve & Credit Coins
                      </button>
                      <button
                        onClick={() => handleDepositAction(dep.id, 'reject')}
                        className="rounded-xl border border-crimson/50 bg-crimson/10 hover:bg-crimson px-4 py-2.5 text-xs font-bold text-crimson hover:text-white transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT QUERIES / SUPPORT TICKETS */}
        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase font-display">Player Inquiries & Support Tickets</h2>
              <p className="text-xs text-slate-400">Support tickets submitted from the /contact page with user name, phone number, and Free Fire UID.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactQueries.map((q) => (
                <div key={q.id} className="rounded-3xl border border-white/10 bg-surface-100 p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-crimson/20 text-crimson text-[10px] font-black uppercase border border-crimson/40">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-400">{q.createdAt}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-white">{q.name}</p>
                      <a
                        href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{q.phone}</span>
                      </a>
                    </div>
                    <p className="text-xs font-mono text-neon-gold">Free Fire UID: {q.uid}</p>
                    <div className="rounded-xl bg-surface-200/80 p-3 text-xs text-slate-300 mt-2">
                      {q.message}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex gap-2">
                    <a
                      href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(q.name)},%20regarding%20your%20Educated%20Gamer%20inquiry:`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2 text-xs font-black uppercase text-white transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LEADERBOARD & PAYOUTS */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase font-display">Hall of Fame & Winner Payouts</h2>
              <p className="text-xs text-slate-400">Manage player rankings and verified earnings.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-200/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Player & IGN</th>
                    <th className="p-4">Free Fire UID</th>
                    <th className="p-4">Total Earnings</th>
                    <th className="p-4">Matches</th>
                    <th className="p-4">Kills</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-bold text-slate-300">
                  {MOCK_LEADERBOARD.map((player) => (
                    <tr key={player.rank} className="hover:bg-surface-200/50">
                      <td className="p-4 font-black text-neon-gold">#{player.rank}</td>
                      <td className="p-4">
                        <p className="text-white font-black">{player.name}</p>
                        <span className="text-[10px] text-slate-400">{player.ign}</span>
                      </td>
                      <td className="p-4 font-mono">{player.uid}</td>
                      <td className="p-4 text-emerald-400 font-black">PKR {player.earningsPKR.toLocaleString()}</td>
                      <td className="p-4 font-mono">{player.matchesPlayed}</td>
                      <td className="p-4 font-mono">{player.totalKills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SOCIAL & SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-surface-100 p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-black text-white uppercase font-display">Platform & Social Settings</h2>
              <p className="text-xs text-slate-400">Manage social channel links and official receiving wallet accounts.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official WhatsApp Channel Link
                </label>
                <input
                  type="text"
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-xs font-mono text-white focus:border-crimson focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official YouTube Broadcast Link
                </label>
                <input
                  type="text"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-xs font-mono text-white focus:border-crimson focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    JazzCash Account Number
                  </label>
                  <input
                    type="text"
                    value={jazzCashPhone}
                    onChange={(e) => setJazzCashPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-xs font-mono text-white focus:border-crimson focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    JazzCash Account Title
                  </label>
                  <input
                    type="text"
                    value={jazzCashName}
                    onChange={(e) => setJazzCashName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-xs text-white focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>

              {savedSettings && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <button
                onClick={() => {
                  setSavedSettings(true);
                  setTimeout(() => setSavedSettings(false), 3000);
                }}
                className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg"
              >
                Save Platform Settings
              </button>
            </div>
          </div>
        )}

      </main>

      {/* CREATE TOURNAMENT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-crimson/40 bg-surface-100 p-6 sm:p-8 shadow-2xl my-8">
            <h3 className="text-xl font-black text-white uppercase font-display mb-4">Organize & Schedule New Tournament</h3>
            
            <form onSubmit={handleCreateTournament} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Match Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. PAKISTAN CHAMPIONS CLASH #105"
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Game</label>
                  <select
                    value={newGame}
                    onChange={(e) => setNewGame(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  >
                    <option value="Free Fire MAX">Free Fire MAX</option>
                    <option value="Free Fire">Free Fire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  >
                    <option value="Squad">Squad</option>
                    <option value="Solo">Solo</option>
                    <option value="Duo">Duo</option>
                    <option value="Clash Squad">Clash Squad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Map</label>
                  <select
                    value={newMap}
                    onChange={(e) => setNewMap(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  >
                    <option value="Bermuda">Bermuda</option>
                    <option value="Purgatory">Purgatory</option>
                    <option value="Kalahari">Kalahari</option>
                    <option value="Nexterra">Nexterra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Total Seats</label>
                  <input
                    type="number"
                    value={newSlots}
                    onChange={(e) => setNewSlots(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neon-gold mb-1">Prize Pool (PKR)</label>
                  <input
                    type="number"
                    value={newPrize}
                    onChange={(e) => setNewPrize(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neon-gold mb-1">Booyah 1st Prize</label>
                  <input
                    type="number"
                    value={newBooyah}
                    onChange={(e) => setNewBooyah(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-crimson mb-1">Per Kill (PKR)</label>
                  <input
                    type="number"
                    value={newPerKill}
                    onChange={(e) => setNewPerKill(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Entry Fee (0=Free)</label>
                  <input
                    type="number"
                    value={newEntryFee}
                    onChange={(e) => setNewEntryFee(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Schedule Timing</label>
                <input
                  type="text"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  placeholder="e.g. Tonight, 9:30 PM PST"
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">YouTube Live Stream URL</label>
                <input
                  type="text"
                  value={newLiveStreamUrl}
                  onChange={(e) => setNewLiveStreamUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Match Bullet Points / Instructions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newBulletPoints}
                  onChange={(e) => setNewBulletPoints(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-xs text-white resize-none font-sans"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl bg-surface-200 py-3 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-crimson py-3 text-xs font-black uppercase text-white shadow-lg"
                >
                  Publish Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ROOM / LIVE MODAL */}
      {editingRoomIdTourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-neon-gold/40 bg-surface-100 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase font-display mb-1">Publish Room ID & Live Stream</h3>
            <p className="text-xs text-slate-400 mb-4">{editingRoomIdTourney.title}</p>
            
            <form onSubmit={handleSaveRoomId} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Room ID</label>
                <input
                  type="text"
                  required
                  value={editRoomId}
                  onChange={(e) => setEditRoomId(e.target.value)}
                  placeholder="e.g. 9842109"
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-sm font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Room Password</label>
                <input
                  type="text"
                  required
                  value={editRoomPass}
                  onChange={(e) => setEditRoomPass(e.target.value)}
                  placeholder="e.g. 777"
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-sm font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">YouTube Live Broadcast URL</label>
                <input
                  type="text"
                  value={editLiveUrl}
                  onChange={(e) => setEditLiveUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-xs font-mono text-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRoomIdTourney(null)}
                  className="flex-1 rounded-xl bg-surface-200 py-3 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-neon-gold py-3 text-xs font-black uppercase text-black shadow-lg"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMPLETE MATCH & WINNER MODAL */}
      {completingTourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/40 bg-surface-100 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase font-display mb-1">Record Match Winner & Payout</h3>
            <p className="text-xs text-slate-400 mb-4">{completingTourney.title}</p>
            
            <form onSubmit={handleCompleteTournamentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Winner Player Name / IGN *</label>
                <input
                  type="text"
                  required
                  value={winnerName}
                  onChange={(e) => setWinnerName(e.target.value)}
                  placeholder="e.g. PK_CYBORG_FF"
                  className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-4 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neon-gold mb-1">Winner Free Fire UID *</label>
                <input
                  type="text"
                  required
                  value={winnerUid}
                  onChange={(e) => setWinnerUid(e.target.value)}
                  placeholder="e.g. 489201482"
                  className="w-full rounded-xl border border-neon-gold/40 bg-surface-200 py-2.5 px-4 text-sm font-mono text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Kills</label>
                  <input
                    type="number"
                    value={winnerKills}
                    onChange={(e) => setWinnerKills(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1">Paid Cash (PKR)</label>
                  <input
                    type="number"
                    value={winnerPrize}
                    onChange={(e) => setWinnerPrize(Number(e.target.value))}
                    className="w-full rounded-xl border border-emerald-500/40 bg-surface-200 py-2.5 px-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCompletingTourney(null)}
                  className="flex-1 rounded-xl bg-surface-200 py-3 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 py-3 text-xs font-black uppercase text-black shadow-lg"
                >
                  Confirm Winner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
