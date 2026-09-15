'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Tournament, PlayerRank } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { useTournaments, DepositRequest } from '@/context/TournamentContext';
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
  ExternalLink,
  Edit,
  Trash2,
  Image as ImageIcon,
  ZoomIn,
  X,
  Save,
  ChevronDown,
  Award,
  DollarSign,
  Users,
} from 'lucide-react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
    <div
      className="relative bg-surface-200 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

export default function AdminPortalPage() {
  const router = useRouter();
  const { currentUser, contactQueries } = useAuth();
  const {
    tournaments,
    createTournament,
    updateTournament,
    deleteTournament,
    setTournamentWinner,
    deposits,
    withdrawals,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    leaderboard,
    updateLeaderboardPlayer,
    addLeaderboardPlayer,
  } = useTournaments();

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

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTourney, setEditingTourney] = useState<Tournament | null>(null);
  const [editingRoomIdTourney, setEditingRoomIdTourney] = useState<Tournament | null>(null);
  const [completingTourney, setCompletingTourney] = useState<Tournament | null>(null);
  const [inspectingReceipt, setInspectingReceipt] = useState<DepositRequest | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<PlayerRank | null>(null);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [deletingTourney, setDeletingTourney] = useState<Tournament | null>(null);
  const [searchQ, setSearchQ] = useState('');

  // Tournament form state
  const [tTitle, setTTitle] = useState('');
  const [tGame, setTGame] = useState<'Free Fire' | 'Free Fire MAX'>('Free Fire MAX');
  const [tType, setTType] = useState<'Solo' | 'Duo' | 'Squad' | 'Clash Squad'>('Squad');
  const [tMap, setTMap] = useState<'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra' | 'Solara' | 'Custom/Craftland'>('Bermuda');
  const [tMapCode, setTMapCode] = useState('');
  const [tStatus, setTStatus] = useState<'upcoming' | 'live' | 'completed' | 'special'>('upcoming');
  const [tPrize, setTPrize] = useState(15000);
  const [tBooyah, setTBooyah] = useState(8000);
  const [tHasPerKill, setTHasPerKill] = useState(true);
  const [tPerKill, setTPerKill] = useState(50);
  const [tEntryFee, setTEntryFee] = useState(100);
  const [tSlots, setTSlots] = useState(48);
  const [tStartTime, setTStartTime] = useState('Today, 9:00 PM PST');
  const [tLiveUrl, setTLiveUrl] = useState('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
  const [tBullets, setTBullets] = useState(
    '?? Official YouTube Live Broadcast\nMobile devices only (No Emulators)\nBooyah & Kill rewards paid via JazzCash'
  );

  // Room ID / Pass form
  const [editRoomId, setEditRoomId] = useState('');
  const [editRoomPass, setEditRoomPass] = useState('');
  const [editLiveUrl, setEditLiveUrl] = useState('');

  // Winner form
  const [winnerName, setWinnerName] = useState('');
  const [winnerIgn, setWinnerIgn] = useState('');
  const [winnerUid, setWinnerUid] = useState('');
  const [winnerKills, setWinnerKills] = useState(12);
  const [winnerPrize, setWinnerPrize] = useState(8000);

  // Leaderboard player form
  const [lpName, setLpName] = useState('');
  const [lpIgn, setLpIgn] = useState('');
  const [lpUid, setLpUid] = useState('');
  const [lpEarnings, setLpEarnings] = useState(50000);
  const [lpMatches, setLpMatches] = useState(25);
  const [lpKills, setLpKills] = useState(110);

  // Settings
  const [whatsappLink, setWhatsappLink] = useState('https://whatsapp.com/channel/0029VbD6gJE3WHTOMOkx252G');
  const [youtubeLink, setYoutubeLink] = useState('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
  const [jazzCashPhone, setJazzCashPhone] = useState('03190799711');
  const [jazzCashName, setJazzCashName] = useState('Ashan Akhtar');
  const [savedSettings, setSavedSettings] = useState(false);

  // helpers
  const resetTournamentForm = () => {
    setTTitle(''); setTGame('Free Fire MAX'); setTType('Squad'); setTMap('Bermuda');
    setTMapCode('');
    setTStatus('upcoming'); setTPrize(15000); setTBooyah(8000); setTHasPerKill(true);
    setTPerKill(50); setTEntryFee(100); setTSlots(48);
    setTStartTime('Today, 9:00 PM PST');
    setTLiveUrl('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
    setTBullets('?? Official YouTube Live Broadcast\nMobile devices only (No Emulators)\nBooyah & Kill rewards paid via JazzCash');
  };

  const openEditTourney = (t: Tournament) => {
    setEditingTourney(t);
    setTTitle(t.title); setTGame(t.game); setTType(t.type); setTMap(t.map);
    setTMapCode(t.mapCode || '');
    setTStatus(t.status); setTPrize(t.prizePool); setTBooyah(t.booyahPrize);
    setTHasPerKill(t.hasPerKill); setTPerKill(t.perKill); setTEntryFee(t.entryFee);
    setTSlots(t.totalSlots); setTStartTime(t.startTime);
    setTLiveUrl(t.liveStreamUrl || '');
    setTBullets((t.bulletPoints || []).join('\n'));
  };

  const handleSaveTournament = () => {
    const data = {
      title: tTitle,
      game: tGame,
      type: tType,
      map: tMap,
      mapCode: tMap === 'Custom/Craftland' ? tMapCode : undefined,
      status: tStatus,
      prizePool: tPrize,
      booyahPrize: tBooyah,
      hasPerKill: tHasPerKill,
      perKill: tPerKill,
      entryFee: tEntryFee,
      totalSlots: tSlots,
      startTime: tStartTime,
      liveStreamUrl: tLiveUrl,
      bulletPoints: tBullets.split('\n').map(s => s.trim()).filter(Boolean),
      prizes: { first: tBooyah, second: Math.round(tBooyah * 0.5), third: Math.round(tBooyah * 0.25), perKillBonus: tPerKill },
      rules: ['Mobile only. No emulators.', 'Registered Free Fire UIDs only.', 'Admin decisions are final.'],
      isFeatured: false,
    };
    if (editingTourney) {
      updateTournament(editingTourney.id, data);
      setEditingTourney(null);
    } else {
      createTournament(data);
      setShowCreateModal(false);
    }
    resetTournamentForm();
  };

  const handleSaveRoomId = () => {
    if (!editingRoomIdTourney) return;
    updateTournament(editingRoomIdTourney.id, {
      roomId: editRoomId,
      roomPassword: editRoomPass,
      liveStreamUrl: editLiveUrl || editingRoomIdTourney.liveStreamUrl,
      roomStatus: 'ready',
    });
    setEditingRoomIdTourney(null);
  };

  const handleSetWinner = () => {
    if (!completingTourney || !winnerName || !winnerUid) return;
    setTournamentWinner(completingTourney.id, {
      name: winnerName,
      ign: winnerIgn || winnerName,
      uid: winnerUid,
      kills: winnerKills,
      prizePKR: winnerPrize,
      rank: '1st Place Booyah',
    });
    setCompletingTourney(null);
    setWinnerName(''); setWinnerIgn(''); setWinnerUid(''); setWinnerKills(12); setWinnerPrize(8000);
  };

  const handleSavePlayer = () => {
    if (editingPlayer) {
      updateLeaderboardPlayer(editingPlayer.uid, {
        name: lpName, ign: lpIgn, uid: lpUid,
        earningsPKR: lpEarnings, matchesPlayed: lpMatches, totalKills: lpKills,
      });
      setEditingPlayer(null);
    } else {
      addLeaderboardPlayer({
        rank: 0, name: lpName, ign: lpIgn, uid: lpUid,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${lpIgn || lpName}`,
        earningsPKR: lpEarnings, matchesPlayed: lpMatches, totalKills: lpKills,
        winRate: 50, badge: 'DIAMOND',
      });
      setShowAddPlayerModal(false);
    }
    setLpName(''); setLpIgn(''); setLpUid(''); setLpEarnings(50000); setLpMatches(25); setLpKills(110);
  };

  const openEditPlayer = (p: PlayerRank) => {
    setEditingPlayer(p);
    setLpName(p.name); setLpIgn(p.ign); setLpUid(p.uid);
    setLpEarnings(p.earningsPKR); setLpMatches(p.matchesPlayed); setLpKills(p.totalKills);
  };

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('eg_settings', JSON.stringify({ whatsappLink, youtubeLink, jazzCashPhone, jazzCashName }));
    } catch {}
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  const filteredTourneys = tournaments.filter(t =>
    t.title.toLowerCase().includes(searchQ.toLowerCase())
  );

  const pendingDeposits = deposits.filter(d => d.status === 'pending');
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const pendingCount = pendingDeposits.length + pendingWithdrawals.length + contactQueries.filter(q => q.status === 'new').length;

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="h-12 w-12 text-crimson mx-auto mb-4 animate-pulse" />
          <p className="text-white text-lg">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-surface-200 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-crimson";
  const labelClass = "block text-white/60 text-xs mb-1";
  const selectClass = inputClass + " cursor-pointer";

  // ── Plain function (NOT a React component) to avoid remounting on every keystroke ──
  const renderTournamentForm = () => (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Tournament Title *</label>
        <input className={inputClass} value={tTitle} onChange={e => setTTitle(e.target.value)} placeholder="e.g. PAKISTAN CHAMPIONS CLASH #102" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Game</label>
          <select className={selectClass} value={tGame} onChange={e => setTGame(e.target.value as typeof tGame)}>
            <option>Free Fire MAX</option>
            <option>Free Fire</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select className={selectClass} value={tType} onChange={e => setTType(e.target.value as typeof tType)}>
            <option>Solo</option><option>Duo</option><option>Squad</option><option>Clash Squad</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Map</label>
          <select className={selectClass} value={tMap} onChange={e => setTMap(e.target.value as typeof tMap)}>
            <option>Bermuda</option>
            <option>Purgatory</option>
            <option>Kalahari</option>
            <option>Nexterra</option>
            <option>Solara</option>
            <option>Custom/Craftland</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={selectClass} value={tStatus} onChange={e => setTStatus(e.target.value as typeof tStatus)}>
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="special">Special</option>
          </select>
        </div>
      </div>
      {/* Custom/Craftland Map Code field */}
      {tMap === 'Custom/Craftland' && (
        <div>
          <label className={labelClass}>Craftland Map Code (players will see this)</label>
          <input className={inputClass} value={tMapCode} onChange={e => setTMapCode(e.target.value)} placeholder="e.g. CRAFT-ABC123" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Overall Prize Pool (PKR)</label>
          <input type="number" className={inputClass} value={tPrize} onChange={e => setTPrize(Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Booyah 1st Place (PKR)</label>
          <input type="number" className={inputClass} value={tBooyah} onChange={e => setTBooyah(Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Entry Fee (0=Free)</label>
          <input type="number" className={inputClass} value={tEntryFee} onChange={e => setTEntryFee(Number(e.target.value))} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Per Kill Bonus (PKR)</label>
          <input type="number" className={inputClass} value={tPerKill} onChange={e => setTPerKill(Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Has Per Kill?</label>
          <select className={selectClass} value={tHasPerKill ? 'yes' : 'no'} onChange={e => setTHasPerKill(e.target.value === 'yes')}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Total Slots</label>
          <input type="number" className={inputClass} value={tSlots} onChange={e => setTSlots(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Start Time</label>
        <input className={inputClass} value={tStartTime} onChange={e => setTStartTime(e.target.value)} placeholder="Today, 9:00 PM PST" />
      </div>
      <div>
        <label className={labelClass}>YouTube Live URL</label>
        <input className={inputClass} value={tLiveUrl} onChange={e => setTLiveUrl(e.target.value)} placeholder="https://youtube.com/..." />
      </div>
      <div>
        <label className={labelClass}>Bullet Points (one per line)</label>
        <textarea
          className={inputClass + " resize-none h-24"}
          value={tBullets}
          onChange={e => setTBullets(e.target.value)}
          placeholder="?? One bullet point per line"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-crimson/20 border border-crimson/40 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-crimson" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Admin Control Deck</h1>
              <p className="text-white/50 text-xs">Educated Gamer — Full Platform Control</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-surface-200 border border-white/10 text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Tournaments', value: tournaments.length, icon: Gamepad2, color: 'text-crimson' },
            { label: 'Pending Payments', value: pendingDeposits.length + pendingWithdrawals.length, icon: Wallet, color: 'text-yellow-400' },
            { label: 'New Queries', value: contactQueries.filter(q => q.status === 'new').length, icon: MessageSquareCode, color: 'text-blue-400' },
            { label: 'Leaderboard Players', value: leaderboard.length, icon: Trophy, color: 'text-neon-gold' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface-200 border border-white/10 rounded-xl p-4">
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className="text-white font-bold text-2xl">{stat.value}</p>
              <p className="text-white/50 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {([
            { key: 'tournaments', label: 'Tournaments', icon: Gamepad2 },
            { key: 'deposits', label: `Payments ${pendingDeposits.length + pendingWithdrawals.length > 0 ? `(${pendingDeposits.length + pendingWithdrawals.length})` : ''}`, icon: Wallet },
            { key: 'queries', label: `Queries ${contactQueries.filter(q => q.status === 'new').length > 0 ? `(${contactQueries.filter(q => q.status === 'new').length})` : ''}`, icon: MessageSquareCode },
            { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { key: 'settings', label: 'Settings', icon: Settings },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-crimson text-white'
                  : 'bg-surface-200 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─────────── TOURNAMENTS TAB ─────────── */}
        {activeTab === 'tournaments' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  className="w-full bg-surface-200 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-crimson"
                  placeholder="Search tournaments..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                />
              </div>
              <button
                onClick={() => { resetTournamentForm(); setShowCreateModal(true); }}
                className="flex items-center gap-2 bg-crimson hover:bg-crimson/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-3"
              >
                <PlusCircle className="h-4 w-4" />
                New Tournament
              </button>
            </div>

            <div className="space-y-3">
              {filteredTourneys.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  <Gamepad2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No tournaments yet. Create one above.</p>
                </div>
              )}
              {filteredTourneys.map(t => (
                <div key={t.id} className="bg-surface-200 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'live' ? 'bg-green-500/20 text-green-400 animate-pulse' :
                          t.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                          t.status === 'completed' ? 'bg-white/10 text-white/50' :
                          'bg-neon-gold/20 text-neon-gold'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-white/40">{t.type} · {t.map} · {t.game}</span>
                      </div>
                      <h3 className="text-white font-bold text-sm truncate">{t.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-white/50 flex-wrap">
                        <span>PKR {t.prizePool.toLocaleString()} pool</span>
                        <span>Entry: {t.entryFee === 0 ? 'FREE' : `PKR ${t.entryFee}`}</span>
                        <span>{t.slotsFilled}/{t.totalSlots} slots</span>
                        <span>{t.startTime}</span>
                        {t.roomId && <span className="text-yellow-400">Room: {t.roomId} / {t.roomPassword}</span>}
                      </div>
                      {t.winner && (
                        <div className="mt-1 text-xs text-neon-gold">
                          🏆 Winner: {t.winner.name} (UID: {t.winner.uid}) — {t.winner.kills} kills, PKR {t.winner.prizePKR.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => openEditTourney(t)}
                        className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setEditingRoomIdTourney(t);
                          setEditRoomId(t.roomId || '');
                          setEditRoomPass(t.roomPassword || '');
                          setEditLiveUrl(t.liveStreamUrl || '');
                        }}
                        className="flex items-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        <Key className="h-3 w-3" /> Room/Live
                      </button>
                      {t.status !== 'completed' && (
                        <button
                          onClick={() => {
                            setCompletingTourney(t);
                            setWinnerPrize(t.booyahPrize);
                          }}
                          className="flex items-center gap-1 bg-neon-gold/20 hover:bg-neon-gold/30 text-neon-gold px-3 py-1.5 rounded-lg text-xs transition-colors"
                        >
                          <Trophy className="h-3 w-3" /> Set Winner
                        </button>
                      )}
                      <button
                        onClick={() => setDeletingTourney(t)}
                        className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────── DEPOSITS / WITHDRAWALS TAB ─────────── */}
        {activeTab === 'deposits' && (
          <div className="space-y-6">
            {/* Deposits */}
            <div>
              <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-green-400" />
                Pending Deposits ({pendingDeposits.length})
              </h2>
              {pendingDeposits.length === 0 && (
                <div className="text-center py-8 text-white/30 bg-surface-200 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No pending deposits</p>
                </div>
              )}
              <div className="space-y-3">
                {pendingDeposits.map(dep => (
                  <div key={dep.id} className="bg-surface-200 border border-white/10 rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      {/* Receipt thumbnail */}
                      {dep.proofUrl ? (
                        <button
                          onClick={() => setInspectingReceipt(dep)}
                          className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-crimson transition-colors group"
                        >
                          <img src={dep.proofUrl} alt="Receipt" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <ZoomIn className="h-5 w-5 text-white" />
                          </div>
                        </button>
                      ) : (
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-surface-100 border border-white/10 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-white/20" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium text-sm">{dep.user}</p>
                          <span className="text-xs text-white/40">UID: {dep.uid}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/50 flex-wrap">
                          <span className="text-green-400 font-bold">PKR {dep.amt.toLocaleString()}</span>
                          <span>{dep.method}</span>
                          <span>Trx: {dep.trxId}</span>
                          <span>{dep.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveDeposit(dep.id)}
                          className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => rejectDeposit(dep.id)}
                          className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Withdrawals */}
            <div>
              <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                Pending Withdrawals ({pendingWithdrawals.length})
              </h2>
              {pendingWithdrawals.length === 0 && (
                <div className="text-center py-8 text-white/30 bg-surface-200 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No pending withdrawals</p>
                </div>
              )}
              <div className="space-y-3">
                {pendingWithdrawals.map(w => (
                  <div key={w.id} className="bg-surface-200 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <p className="text-white font-medium text-sm">{w.user}</p>
                        <div className="flex items-center gap-4 text-xs text-white/50 mt-1 flex-wrap">
                          <span className="text-yellow-400 font-bold">PKR {w.amt.toLocaleString()}</span>
                          <span>{w.method}</span>
                          <span>{w.accountNumber}</span>
                          <span>{w.accountTitle}</span>
                          <span>UID: {w.uid}</span>
                          <span>{w.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveWithdrawal(w.id)}
                          className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => rejectWithdrawal(w.id)}
                          className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────── QUERIES TAB ─────────── */}
        {activeTab === 'queries' && (
          <div>
            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <MessageSquareCode className="h-4 w-4 text-blue-400" />
              Contact Queries ({contactQueries.length})
            </h2>
            {contactQueries.length === 0 && (
              <div className="text-center py-12 text-white/30 bg-surface-200 rounded-xl border border-white/10">
                <MessageSquareCode className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No contact queries yet</p>
              </div>
            )}
            <div className="space-y-3">
              {contactQueries.map(q => (
                <div key={q.id} className="bg-surface-200 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${q.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/40'}`}>
                          {q.status === 'new' ? 'NEW' : 'RESOLVED'}
                        </span>
                        <span className="text-white font-medium text-sm">{q.name}</span>
                        <span className="text-white/40 text-xs">UID: {q.uid}</span>
                      </div>
                      <p className="text-crimson text-xs font-medium mb-1">{q.subject}</p>
                      <p className="text-white/70 text-sm">{q.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                        <span>{q.createdAt}</span>
                        {q.phone && (
                          <a
                            href={`https://wa.me/${q.phone.replace(/^0/, '92')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                          >
                            <Phone className="h-3 w-3" /> WhatsApp: {q.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────── LEADERBOARD TAB ─────────── */}
        {activeTab === 'leaderboard' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-neon-gold" />
                Leaderboard ({leaderboard.length} players)
              </h2>
              <button
                onClick={() => {
                  setEditingPlayer(null);
                  setLpName(''); setLpIgn(''); setLpUid(''); setLpEarnings(50000); setLpMatches(25); setLpKills(110);
                  setShowAddPlayerModal(true);
                }}
                className="flex items-center gap-2 bg-crimson hover:bg-crimson/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                Add Player
              </button>
            </div>
            {leaderboard.length === 0 && (
              <div className="text-center py-12 text-white/30 bg-surface-200 rounded-xl border border-white/10">
                <Trophy className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No players yet</p>
              </div>
            )}
            <div className="space-y-2">
              {leaderboard.map((p, idx) => (
                <div key={p.uid} className="bg-surface-200 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    idx === 0 ? 'bg-neon-gold text-black' :
                    idx === 1 ? 'bg-white/30 text-white' :
                    idx === 2 ? 'bg-amber-700/40 text-amber-400' :
                    'bg-surface-100 text-white/50'
                  }`}>{p.rank}</div>
                  <img src={p.avatar} alt={p.ign} className="w-10 h-10 rounded-full bg-surface-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{p.name}</p>
                    <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
                      <span className="text-crimson">{p.ign}</span>
                      <span>UID: {p.uid}</span>
                      <span className="text-green-400 font-medium">PKR {p.earningsPKR.toLocaleString()}</span>
                      <span>{p.matchesPlayed} matches</span>
                      <span>{p.totalKills} kills</span>
                    </div>
                  </div>
                  <span className="text-xs bg-crimson/20 text-crimson px-2 py-0.5 rounded-full hidden sm:block">{p.badge}</span>
                  <button
                    onClick={() => openEditPlayer(p)}
                    className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg text-xs transition-colors flex-shrink-0"
                  >
                    <Edit className="h-3 w-3" /> Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────── SETTINGS TAB ─────────── */}
        {activeTab === 'settings' && (
          <div className="max-w-lg space-y-5">
            <div className="bg-surface-200 border border-white/10 rounded-xl p-5 space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-green-400" />
                JazzCash Settings
              </h3>
              <div>
                <label className={labelClass}>JazzCash Number</label>
                <input className={inputClass} value={jazzCashPhone} onChange={e => setJazzCashPhone(e.target.value)} placeholder="03XXXXXXXXX" />
              </div>
              <div>
                <label className={labelClass}>Account Name</label>
                <input className={inputClass} value={jazzCashName} onChange={e => setJazzCashName(e.target.value)} placeholder="Account holder name" />
              </div>
            </div>
            <div className="bg-surface-200 border border-white/10 rounded-xl p-5 space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-blue-400" />
                Social Links
              </h3>
              <div>
                <label className={labelClass}>WhatsApp Channel</label>
                <input className={inputClass} value={whatsappLink} onChange={e => setWhatsappLink(e.target.value)} placeholder="https://whatsapp.com/channel/..." />
              </div>
              <div>
                <label className={labelClass}>YouTube Channel</label>
                <input className={inputClass} value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)} placeholder="https://youtube.com/channel/..." />
              </div>
            </div>
            <div className="bg-surface-200 border border-white/10 rounded-xl p-5 space-y-3">
              <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-crimson" />
                Admin Credentials
              </h3>
              <div className="text-xs text-white/50 space-y-1">
                <p>Email: <span className="text-white font-mono">admin@educatedgamer.com</span></p>
                <p>Password: <span className="text-white font-mono">Password123!</span></p>
              </div>
              <p className="text-yellow-400/70 text-xs">⚠ Credentials are hardcoded. Contact developer to change.</p>
            </div>
            <button
              onClick={handleSaveSettings}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors ${
                savedSettings ? 'bg-green-500 text-white' : 'bg-crimson hover:bg-crimson/80 text-white'
              }`}
            >
              {savedSettings ? <><Check className="h-4 w-4" /> Settings Saved!</> : <><Save className="h-4 w-4" /> Save Settings</>}
            </button>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />

      {/* ── CREATE TOURNAMENT MODAL ── */}
      {showCreateModal && (
        <Modal title="Create New Tournament" onClose={() => setShowCreateModal(false)}>
          {renderTournamentForm()}
          <button
            onClick={handleSaveTournament}
            disabled={!tTitle}
            className="mt-4 w-full bg-crimson hover:bg-crimson/80 disabled:opacity-40 text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            Create Tournament
          </button>
        </Modal>
      )}

      {/* ── EDIT TOURNAMENT MODAL ── */}
      {editingTourney && (
        <Modal title={`Edit: ${editingTourney.title.slice(0, 30)}...`} onClose={() => setEditingTourney(null)}>
          {renderTournamentForm()}
          <button
            onClick={handleSaveTournament}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* ── SET ROOM ID MODAL ── */}
      {editingRoomIdTourney && (
        <Modal title="Set Room ID & Live Details" onClose={() => setEditingRoomIdTourney(null)}>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Room ID</label>
              <input className={inputClass} value={editRoomId} onChange={e => setEditRoomId(e.target.value)} placeholder="e.g. EG-984210" />
            </div>
            <div>
              <label className={labelClass}>Room Password</label>
              <input className={inputClass} value={editRoomPass} onChange={e => setEditRoomPass(e.target.value)} placeholder="e.g. 777" />
            </div>
            <div>
              <label className={labelClass}>YouTube Live URL (optional)</label>
              <input className={inputClass} value={editLiveUrl} onChange={e => setEditLiveUrl(e.target.value)} placeholder="https://youtube.com/live/..." />
            </div>
            <button
              onClick={handleSaveRoomId}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              <Key className="h-4 w-4 inline mr-2" />
              Publish Room Credentials
            </button>
          </div>
        </Modal>
      )}

      {/* ── SET WINNER MODAL ── */}
      {completingTourney && (
        <Modal title={`Set Winner: ${completingTourney.title.slice(0, 25)}...`} onClose={() => setCompletingTourney(null)}>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Winner Name / IGN *</label>
              <input className={inputClass} value={winnerName} onChange={e => setWinnerName(e.target.value)} placeholder="e.g. PK_CYBORG_FF" />
            </div>
            <div>
              <label className={labelClass}>In-Game Name (IGN)</label>
              <input className={inputClass} value={winnerIgn} onChange={e => setWinnerIgn(e.target.value)} placeholder="e.g. CYBORG_ESPORTS" />
            </div>
            <div>
              <label className={labelClass}>Free Fire UID *</label>
              <input className={inputClass} value={winnerUid} onChange={e => setWinnerUid(e.target.value)} placeholder="e.g. 489201482" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Total Kills</label>
                <input type="number" className={inputClass} value={winnerKills} onChange={e => setWinnerKills(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Prize (PKR)</label>
                <input type="number" className={inputClass} value={winnerPrize} onChange={e => setWinnerPrize(Number(e.target.value))} />
              </div>
            </div>
            <button
              onClick={handleSetWinner}
              disabled={!winnerName || !winnerUid}
              className="w-full bg-neon-gold hover:bg-neon-gold/80 disabled:opacity-40 text-black font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              <Trophy className="h-4 w-4 inline mr-2" />
              Confirm Winner & Update Leaderboard
            </button>
          </div>
        </Modal>
      )}

      {/* ── LEADERBOARD PLAYER MODAL ── */}
      {(editingPlayer || showAddPlayerModal) && (
        <Modal
          title={editingPlayer ? `Edit: ${editingPlayer.ign}` : 'Add Leaderboard Player'}
          onClose={() => { setEditingPlayer(null); setShowAddPlayerModal(false); }}
        >
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Full Name</label>
              <input className={inputClass} value={lpName} onChange={e => setLpName(e.target.value)} placeholder="e.g. Hamza Khan" />
            </div>
            <div>
              <label className={labelClass}>In-Game Name (IGN)</label>
              <input className={inputClass} value={lpIgn} onChange={e => setLpIgn(e.target.value)} placeholder="e.g. PK_CYBORG_FF" />
            </div>
            <div>
              <label className={labelClass}>Free Fire UID</label>
              <input className={inputClass} value={lpUid} onChange={e => setLpUid(e.target.value)} placeholder="e.g. 489201482" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Earnings (PKR)</label>
                <input type="number" className={inputClass} value={lpEarnings} onChange={e => setLpEarnings(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Matches</label>
                <input type="number" className={inputClass} value={lpMatches} onChange={e => setLpMatches(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Total Kills</label>
                <input type="number" className={inputClass} value={lpKills} onChange={e => setLpKills(Number(e.target.value))} />
              </div>
            </div>
            <button
              onClick={handleSavePlayer}
              className="w-full bg-crimson hover:bg-crimson/80 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              <Save className="h-4 w-4 inline mr-2" />
              {editingPlayer ? 'Save Changes' : 'Add to Leaderboard'}
            </button>
          </div>
        </Modal>
      )}

      {/* ── RECEIPT FULL-SIZE MODAL ── */}
      {inspectingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setInspectingReceipt(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setInspectingReceipt(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="bg-surface-200 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-3 border-b border-white/10">
                <p className="text-white text-sm font-medium">{inspectingReceipt.user}</p>
                <p className="text-white/40 text-xs">PKR {inspectingReceipt.amt} · {inspectingReceipt.method} · Trx: {inspectingReceipt.trxId}</p>
              </div>
              <img
                src={inspectingReceipt.proofUrl}
                alt="Deposit Receipt"
                className="w-full object-contain max-h-[70vh]"
              />
              <div className="p-3 flex gap-2">
                <button
                  onClick={() => { approveDeposit(inspectingReceipt.id); setInspectingReceipt(null); }}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => { rejectDeposit(inspectingReceipt.id); setInspectingReceipt(null); }}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE TOURNAMENT CONFIRMATION MODAL ── */}
      {deletingTourney && (
        <Modal title="Delete Tournament" onClose={() => setDeletingTourney(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30">
              <Trash2 className="h-6 w-6 text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Permanently delete this tournament?</p>
                <p className="text-xs text-red-300/80">This tournament will be removed immediately from matches.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-100 border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Tournament to Delete</span>
              <p className="text-sm font-black text-white">{deletingTourney.title}</p>
              <div className="flex items-center gap-3 text-xs text-white/40 pt-1">
                <span>{deletingTourney.game}</span>
                <span>•</span>
                <span>{deletingTourney.type}</span>
                <span>•</span>
                <span>{deletingTourney.map}</span>
                <span>•</span>
                <span className="text-neon-gold font-bold">PKR {deletingTourney.prizePool.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingTourney(null)}
                className="flex-1 bg-surface-100 hover:bg-surface-300 border border-white/10 text-white/80 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTournament(deletingTourney.id);
                  setDeletingTourney(null);
                }}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                <Trash2 className="h-4 w-4" />
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
