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
  UploadCloud,
  Upload,
  Link as LinkIcon,
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
  const { currentUser, contactQueries, authLoading } = useAuth();
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
    if (authLoading) return;
    const hasAdminCookie = typeof document !== 'undefined' && document.cookie.includes('eg_admin=1');
    if (!hasAdminCookie && currentUser?.role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router, currentUser, authLoading]);

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
  const [tBooyah, setTBooyah] = useState(7000);
  // 1st to 6th Winner prizes
  const [tPrize1, setTPrize1] = useState(7000);
  const [tPrize2, setTPrize2] = useState(3500);
  const [tPrize3, setTPrize3] = useState(2000);
  const [tPrize4, setTPrize4] = useState(1000);
  const [tPrize5, setTPrize5] = useState(800);
  const [tPrize6, setTPrize6] = useState(700);

  const [tHasPerKill, setTHasPerKill] = useState(true);
  const [tPerKill, setTPerKill] = useState(50);
  const [tEntryFee, setTEntryFee] = useState(100);
  const [tSlots, setTSlots] = useState(48);
  const [tStartTime, setTStartTime] = useState('Saturday Night, 09:00 PM PKT');
  const [tMatchDate, setTMatchDate] = useState('Saturday Night');
  const [tMatchTime, setTMatchTime] = useState('09:00 PM PKT');
  const [tLiveUrl, setTLiveUrl] = useState('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
  const [tBullets, setTBullets] = useState(
    '• Official YouTube Live shoutcasting & spectator broadcast.\n• Mobile devices strictly verified (Zero emulators permitted).\n• Booyah & Kill rewards distributed instantly via JazzCash.'
  );
  const [tRules, setTRules] = useState(
    '📱 Mobile devices strictly required (Zero emulators / PC players permitted).\n🛡️ Anti-cheat and fair play strictly enforced. Teaming equals permanent ban.\n🆔 All players must enter custom room with registered Free Fire UIDs.\n⚡ Match results and frags recorded live by official tournament marshals.'
  );
  const [tBannerImage, setTBannerImage] = useState('');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [tCategory, setTCategory] = useState<'Clash Squad' | 'Battle Royale' | 'Esports'>('Clash Squad');
  const [tFormat, setTFormat] = useState<'1v1' | '2v2' | 'Solo' | 'Duo' | 'Squad'>('1v1');
  const [tMode, setTMode] = useState<'Headshot' | 'Classic' | 'Esports' | 'Survival'>('Headshot');
  const [tAllowedWeapons, setTAllowedWeapons] = useState('Desert Eagle, M1887');
  const [tDescription, setTDescription] = useState('');

  // Upload state
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [bannerUploadError, setBannerUploadError] = useState('');
  const [tournamentSaveError, setTournamentSaveError] = useState('');

  const autoDistributePrizes = (total: number) => {
    const isSmall = tSlots <= 4 || tFormat === '1v1' || tFormat === '2v2' || tCategory === 'Clash Squad';
    
    if (tFormat === '1v1' || tSlots === 2) {
      // 1v1: Winner takes all (or winner gets pool)
      setTBooyah(total);
      setTPrize1(total);
      setTPrize2(0);
      setTPrize3(0);
      setTPrize4(0);
      setTPrize5(0);
      setTPrize6(0);
      return;
    }

    if (tFormat === '2v2' || tSlots <= 4) {
      // 2v2 / 4 slots: 1st gets 70%, 2nd gets 30%
      const p1 = Math.round(total * 0.70);
      const p2 = total - p1;
      setTBooyah(p1);
      setTPrize1(p1);
      setTPrize2(p2);
      setTPrize3(0);
      setTPrize4(0);
      setTPrize5(0);
      setTPrize6(0);
      return;
    }

    // Larger Battle Royale tournaments (e.g. 48 slots)
    const p1 = Math.round(total * 0.45);
    const p2 = Math.round(total * 0.22);
    const p3 = Math.round(total * 0.13);
    const p4 = Math.round(total * 0.08);
    const p5 = Math.round(total * 0.06);
    const p6 = Math.max(0, total - (p1 + p2 + p3 + p4 + p5));
    setTBooyah(p1);
    setTPrize1(p1);
    setTPrize2(p2);
    setTPrize3(p3);
    setTPrize4(p4);
    setTPrize5(p5);
    setTPrize6(p6);
  };


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
    setWizardStep(1);
    setTTitle(''); setTGame('Free Fire MAX'); setTType('Squad'); setTMap('Bermuda');
    setTCategory('Clash Squad'); setTFormat('1v1'); setTMode('Headshot');
    setTAllowedWeapons('Desert Eagle, M1887'); setTDescription('');
    setTMapCode('');
    setTStatus('upcoming'); setTPrize(100); setTBooyah(90); setTHasPerKill(false);
    setTPrize1(90); setTPrize2(0); setTPrize3(0); setTPrize4(0); setTPrize5(0); setTPrize6(0);
    setTPerKill(0); setTEntryFee(50); setTSlots(2);

    setTStartTime('Saturday Night, 09:00 PM PKT');
    setTMatchDate('Saturday Night');
    setTMatchTime('09:00 PM PKT');
    setTLiveUrl('https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw');
    setTBannerImage('');
    setTBullets('• Official YouTube Live shoutcasting & spectator broadcast.\n• Mobile devices strictly verified (Zero emulators permitted).\n• Booyah & Kill rewards distributed instantly via JazzCash.');
    setTRules('📱 Mobile devices strictly required (Zero emulators / PC players permitted).\n🛡️ Anti-cheat and fair play strictly enforced. Teaming equals permanent ban.\n🆔 All players must enter custom room with registered Free Fire UIDs.\n⚡ Match results and frags recorded live by official tournament marshals.');
  };

  const openEditTourney = (t: Tournament) => {
    setEditingTourney(t);
    setWizardStep(1);
    setTTitle(t.title); setTGame(t.game); setTType(t.type); setTMap(t.map);
    setTCategory((t.category as any) || 'Clash Squad');
    setTFormat((t.format as any) || '1v1');
    setTMode((t.mode as any) || 'Headshot');
    setTAllowedWeapons(Array.isArray(t.allowedWeapons) ? t.allowedWeapons.join(', ') : (t.allowedWeapons || ''));
    setTDescription(t.description || '');
    setTMapCode(t.mapCode || '');
    setTStatus(t.status); setTPrize(t.prizePool); setTBooyah(t.booyahPrize);
    setTPrize1(t.prizes?.first || t.booyahPrize || 0);
    // Only populate 2nd-6th prize if there is a real stored value (not auto-calculated from pool)
    const isSmallTournament = t.totalSlots <= 4 || t.format === '1v1' || t.format === '2v2';
    setTPrize2(t.prizes?.second || 0);
    setTPrize3(isSmallTournament ? 0 : (t.prizes?.third || 0));
    setTPrize4(isSmallTournament ? 0 : (t.prizes?.fourth || 0));
    setTPrize5(isSmallTournament ? 0 : (t.prizes?.fifth || 0));
    setTPrize6(isSmallTournament ? 0 : (t.prizes?.sixth || 0));

    setTHasPerKill(t.hasPerKill); setTPerKill(t.perKill); setTEntryFee(t.entryFee);
    setTSlots(t.totalSlots);
    setTStartTime(t.startTime);
    setTMatchDate(t.matchDate || 'Saturday Night');
    setTMatchTime(t.matchTime || '09:00 PM PKT');
    // Use existing liveStreamUrl from DB, fall back to official channel only if completely absent
    setTLiveUrl(t.liveStreamUrl || 'https://www.youtube.com/@EducatedGamer3');
    setTBannerImage(t.bannerImage || '');
    // Bullet points: use existing or leave empty (not auto-filled with rules)
    setTBullets((t.bulletPoints && t.bulletPoints.length > 0) ? t.bulletPoints.join('\n') : '');
    // Rules: use existing rules from DB; don't overwrite with placeholder defaults
    const rulesText = Array.isArray(t.rules) ? t.rules.join('\n') : (t.rules || '');
    setTRules(rulesText || '📱 Mobile devices strictly required (Zero emulators / PC players permitted).\n🛡️ Anti-cheat and fair play strictly enforced. Teaming equals permanent ban.\n🆔 All players must enter custom room with registered Free Fire UIDs.\n⚡ Match results and frags recorded live by official tournament marshals.');
  };

  // Upload banner immediately to Cloudinary when file is selected — stores permanent URL, never base64
  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setBannerUploadError('Please select an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setBannerUploadError('Image must be under 5MB.');
      return;
    }

    setBannerUploadError('');
    setUploadingBanner(true);
    setTBannerImage(''); // Clear old image while uploading

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setBannerUploadError(result.error || 'Image upload failed. Please try again.');
        return;
      }

      // Store the permanent Cloudinary URL
      setTBannerImage(result.url);
    } catch {
      setBannerUploadError('Network error during upload. Please try again.');
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleSaveTournament = async () => {
    setTournamentSaveError('');
    const data = {
      title: tTitle,
      game: tGame,
      type: tType,
      category: tCategory,
      format: tFormat,
      mode: tMode,
      allowedWeapons: tAllowedWeapons ? tAllowedWeapons.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      description: tDescription || undefined,
      map: tMap,
      mapCode: tMap === 'Custom/Craftland' ? tMapCode : undefined,
      status: tStatus,
      prizePool: tPrize,
      booyahPrize: tPrize1 || tBooyah,
      hasPerKill: tHasPerKill,
      perKill: tPerKill,
      entryFee: tEntryFee,
      totalSlots: tSlots,
      startTime: `${tMatchDate}, ${tMatchTime}`,
      matchDate: tMatchDate,
      matchTime: tMatchTime,
      liveStreamUrl: tLiveUrl,
      // tBannerImage is now always a Cloudinary https:// URL or empty string — never base64
      bannerImage: tBannerImage || undefined,
      bulletPoints: tBullets.split('\n').map(s => s.trim()).filter(Boolean),
      prizes: {
        first: tPrize1,
        second: tPrize2,
        third: tPrize3,
        fourth: tPrize4,
        fifth: tPrize5,
        sixth: tPrize6,
        perKillBonus: tPerKill,
      },
      rules: tRules.split('\n').map(s => s.trim()).filter(Boolean),
      isFeatured: false,
    };

    if (editingTourney) {
      try {
        const result = await updateTournament(editingTourney.id, data);
        if (result.success) {
          setEditingTourney(null);
          resetTournamentForm();
        } else {
          setTournamentSaveError(result.error || 'Failed to update tournament. Please try again.');
        }
      } catch (err: any) {
        setTournamentSaveError(err?.message || 'Failed to save tournament. Please try again.');
      }
    } else {
      const result = await createTournament(data);
      if (result.success) {
        setShowCreateModal(false);
        resetTournamentForm();
      } else {
        setTournamentSaveError(result.error || 'Tournament creation failed. Check your inputs and try again.');
      }
    }
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

  // ── 6-Step Tournament Creation & Edit Wizard with Live Public Preview ──
  const renderTournamentForm = () => {
    const steps = [
      { id: 1, label: '1. Basics' },
      { id: 2, label: '2. Media' },
      { id: 3, label: '3. Schedule' },
      { id: 4, label: '4. Rewards' },
      { id: 5, label: '5. Rules' },
      { id: 6, label: '6. Review' },
    ];

    return (
      <div className="space-y-4">
        {/* Step Indicator Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-1.5 no-scrollbar border-b border-white/10">
          {steps.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setWizardStep(s.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                wizardStep === s.id
                  ? 'bg-crimson text-white shadow-[0_0_15px_rgba(255,0,60,0.4)]'
                  : wizardStep > s.id
                  ? 'bg-surface-300 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-200 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* STEP 1: BASICS */}
        {wizardStep === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <label className={labelClass}>Tournament Title *</label>
              <input
                className={inputClass}
                value={tTitle}
                onChange={e => setTTitle(e.target.value)}
                placeholder="e.g. CS 1V1 HEADSHOT or BR 48 ESPORTS"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Category</label>
                <select className={selectClass} value={tCategory} onChange={e => setTCategory(e.target.value as any)}>
                  <option>Clash Squad</option>
                  <option>Battle Royale</option>
                  <option>Esports</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Format</label>
                <select className={selectClass} value={tFormat} onChange={e => setTFormat(e.target.value as any)}>
                  <option>1v1</option>
                  <option>2v2</option>
                  <option>Solo</option>
                  <option>Duo</option>
                  <option>Squad</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Mode</label>
                <select className={selectClass} value={tMode} onChange={e => setTMode(e.target.value as any)}>
                  <option>Headshot</option>
                  <option>Classic</option>
                  <option>Esports</option>
                  <option>Survival</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Game</label>
                <select className={selectClass} value={tGame} onChange={e => setTGame(e.target.value as any)}>
                  <option>Free Fire MAX</option>
                  <option>Free Fire</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Map</label>
                <select className={selectClass} value={tMap} onChange={e => setTMap(e.target.value as any)}>
                  <option>Bermuda</option>
                  <option>Purgatory</option>
                  <option>Kalahari</option>
                  <option>Nexterra</option>
                  <option>Solara</option>
                  <option>Custom/Craftland</option>
                </select>
              </div>
            </div>

            {tMap === 'Custom/Craftland' && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <label className="block text-amber-300 text-xs font-bold mb-1">Craftland Map Code</label>
                <input className={inputClass} value={tMapCode} onChange={e => setTMapCode(e.target.value)} placeholder="e.g. #FREEFIRE98210-CRAFT" />
              </div>
            )}

            <div>
              <label className={labelClass}>Short Description</label>
              <input
                className={inputClass}
                value={tDescription}
                onChange={e => setTDescription(e.target.value)}
                placeholder="e.g. High-intensity 1v1 Clash Squad duel with Desert Eagle & M1887 only."
              />
            </div>
          </div>
        )}

        {/* STEP 2: MEDIA */}
        {wizardStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className={labelClass}>Tournament Banner Image</label>
              
              <div className="mt-2 space-y-3">
                {/* File Upload Dropzone */}
                <label className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl bg-surface-300/40 cursor-pointer transition-all text-center group ${uploadingBanner ? 'border-primary/60 animate-pulse' : 'border-white/20 hover:border-crimson'}`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerFileUpload}
                    disabled={uploadingBanner}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {uploadingBanner ? (
                    <>
                      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs font-black text-primary uppercase tracking-wider">Uploading to Cloudinary...</span>
                      <span className="text-[10px] text-white/50 mt-1">This takes just a moment</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-crimson mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        Upload Banner Image
                      </span>
                      <span className="text-[10px] text-white/50 mt-1">
                        PNG, JPG or WebP · Max 5MB · Saved permanently to Cloudinary
                      </span>
                    </>
                  )}
                </label>

                {/* Upload error */}
                {bannerUploadError && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/15 border border-red-500/40 rounded-xl">
                    <span className="text-xs font-bold text-red-400">⚠️ {bannerUploadError}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 my-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-bold text-white/40 uppercase">OR PASTE DIRECT URL</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    className={`${inputClass} pl-10`}
                    value={tBannerImage}
                    onChange={e => { setTBannerImage(e.target.value); setBannerUploadError(''); }}
                    placeholder="https://res.cloudinary.com/... or any image URL"
                  />
                </div>
              </div>
            </div>

            {/* Banner Live Preview */}
            {tBannerImage && !uploadingBanner ? (
              <div className="relative rounded-2xl overflow-hidden h-48 bg-black/40 border border-neon-gold/50 shadow-lg group flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tBannerImage}
                  alt="Banner preview"
                  className="max-w-full max-h-full object-contain"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-between p-3.5">
                  <span className="text-xs text-white font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{tBannerImage.startsWith('https://res.cloudinary.com') ? '✅ Saved to Cloudinary (permanent)' : 'Banner Preview'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => { setTBannerImage(''); setBannerUploadError(''); }}
                    className="px-2.5 py-1 bg-red-500/80 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Remove Banner
                  </button>
                </div>
              </div>
            ) : !uploadingBanner ? (
              <div className="rounded-2xl border border-dashed border-white/20 p-6 text-center bg-surface-200/40">
                <p className="text-xs text-white/50">No banner image attached yet. Upload one above for it to appear on tournament cards.</p>
              </div>
            ) : null}

            <div>
              <label className={labelClass}>YouTube Live URL / Stream Link</label>
              <input
                className={inputClass}
                value={tLiveUrl}
                onChange={e => setTLiveUrl(e.target.value)}
                placeholder="https://youtube.com/live/..."
              />
            </div>
          </div>
        )}



        {/* STEP 3: SCHEDULE */}
        {wizardStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className={labelClass}>Tournament Status</label>
              <select className={selectClass} value={tStatus} onChange={e => setTStatus(e.target.value as any)}>
                <option value="upcoming">Upcoming</option>
                <option value="live">🔴 Live Now</option>
                <option value="special">⚡ Major Special Event</option>
                <option value="completed">🏆 Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Match Day / Date</label>
                <input
                  className={inputClass}
                  value={tMatchDate}
                  onChange={e => { setTMatchDate(e.target.value); setTStartTime(`${e.target.value}, ${tMatchTime}`); }}
                  placeholder="e.g. Saturday Night or Today (Live)"
                />
              </div>
              <div>
                <label className={labelClass}>Match Time (PKT)</label>
                <input
                  className={inputClass}
                  value={tMatchTime}
                  onChange={e => { setTMatchTime(e.target.value); setTStartTime(`${tMatchDate}, ${e.target.value}`); }}
                  placeholder="e.g. 09:00 PM PKT"
                />
              </div>
            </div>

            <div className="p-3 bg-surface-300/40 rounded-xl border border-white/10 space-y-2">
              <span className="text-[10px] text-white/60 font-black uppercase tracking-wider block">
                🌙 Night Match Schedule Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Sat 8:00 PM', d: 'Saturday Night', t: '08:00 PM PKT' },
                  { label: 'Sat 9:30 PM', d: 'Saturday Night', t: '09:30 PM PKT' },
                  { label: 'Sat 11:00 PM', d: 'Saturday Night', t: '11:00 PM PKT' },
                  { label: 'Sun 8:00 PM', d: 'Sunday Night', t: '08:00 PM PKT' },
                  { label: 'Sun 9:30 PM', d: 'Sunday Night', t: '09:30 PM PKT' },
                  { label: 'Sun 11:00 PM', d: 'Sunday Night', t: '11:00 PM PKT' },
                ].map(p => (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => {
                      setTMatchDate(p.d);
                      setTMatchTime(p.t);
                      setTStartTime(`${p.d}, ${p.t}`);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ENTRY & REWARDS */}
        {wizardStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Entry Fee (PKR, 0=Free)</label>
                <input type="number" className={inputClass} value={tEntryFee} onChange={e => setTEntryFee(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Total Slots</label>
                <input type="number" className={inputClass} value={tSlots} onChange={e => setTSlots(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Per Kill Bonus (PKR)</label>
                <input type="number" className={inputClass} value={tPerKill} onChange={e => setTPerKill(Number(e.target.value))} />
              </div>
            </div>

            <div className="p-3.5 bg-surface-300/50 border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <label className="text-white font-bold text-xs">🏆 Prize Pool & Placement Distribution (1st – 6th)</label>
                  <p className="text-[11px] text-white/50">Overall pool distributed among top placements</p>
                </div>
                <button
                  type="button"
                  onClick={() => autoDistributePrizes(tPrize)}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-neon-gold/20 text-neon-gold border border-neon-gold/40 hover:bg-neon-gold/30 transition-colors"
                >
                  ⚡ Auto-Calculate Distribution
                </button>
              </div>

              <div>
                <label className={labelClass}>Overall Tournament Prize Pool (PKR)</label>
                <input
                  type="number"
                  className={inputClass + " font-bold text-neon-gold"}
                  value={tPrize}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setTPrize(val);
                  }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-surface-200 p-2.5 rounded-lg border border-neon-gold/40">
                  <label className="text-[11px] font-bold text-neon-gold block mb-1">🥇 1st Place (Booyah)</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={tPrize1}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setTPrize1(val);
                      setTBooyah(val);
                    }}
                  />
                </div>
                <div className="bg-surface-200 p-2.5 rounded-lg border border-white/10">
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">🥈 2nd Place</label>
                  <input type="number" className={inputClass} value={tPrize2} onChange={e => setTPrize2(Number(e.target.value))} />
                </div>
                <div className="bg-surface-200 p-2.5 rounded-lg border border-white/10">
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">🥉 3rd Place</label>
                  <input type="number" className={inputClass} value={tPrize3} onChange={e => setTPrize3(Number(e.target.value))} />
                </div>
                <div className="bg-surface-200 p-2.5 rounded-lg border border-white/10">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">4th Place</label>
                  <input type="number" className={inputClass} value={tPrize4} onChange={e => setTPrize4(Number(e.target.value))} />
                </div>
                <div className="bg-surface-200 p-2.5 rounded-lg border border-white/10">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">5th Place</label>
                  <input type="number" className={inputClass} value={tPrize5} onChange={e => setTPrize5(Number(e.target.value))} />
                </div>
                <div className="bg-surface-200 p-2.5 rounded-lg border border-white/10">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">6th Place</label>
                  <input type="number" className={inputClass} value={tPrize6} onChange={e => setTPrize6(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: RULES */}
        {wizardStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className={labelClass}>Allowed Weapons (comma-separated)</label>
              <input
                className={inputClass}
                value={tAllowedWeapons}
                onChange={e => setTAllowedWeapons(e.target.value)}
                placeholder="e.g. Desert Eagle, M1887"
              />
            </div>

            <div className="p-3.5 bg-surface-300/40 border border-primary/30 rounded-xl space-y-1.5">
              <label className="text-primary font-bold text-xs block">
                📋 Highlighted Tournament Rules (one rule per line)
              </label>
              <textarea
                className={inputClass + " resize-none h-24 font-sans leading-relaxed"}
                value={tRules}
                onChange={e => setTRules(e.target.value)}
                placeholder="Enter tournament rules..."
              />
            </div>

            <div>
              <label className={labelClass}>Match Highlights / Bullet Points (one per line)</label>
              <textarea
                className={inputClass + " resize-none h-20"}
                value={tBullets}
                onChange={e => setTBullets(e.target.value)}
                placeholder="• One bullet point per line"
              />
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & LIVE PREVIEW */}
        {wizardStep === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-neon-gold uppercase tracking-wider">
                🔴 LIVE TOURNAMENT CARD PREVIEW
              </span>
              <span className="text-[11px] text-white/50">As seen by public users</span>
            </div>

            {/* Public Card Mockup */}
            <div className="rounded-3xl border border-crimson/50 bg-[#080b16] overflow-hidden shadow-[0_0_30px_rgba(255,0,60,0.25)]">
              {tBannerImage && (
                <div className="relative w-full h-32 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tBannerImage} alt="Banner preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-lg bg-crimson/20 px-2 py-0.5 text-[10px] font-black uppercase text-crimson border border-crimson/40">
                      {tCategory} • {tFormat}
                    </span>
                    <span className="rounded-lg bg-surface-300 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {tMap}
                    </span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    tStatus === 'live' ? 'bg-crimson text-white animate-pulse' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {tStatus.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-black text-white uppercase font-display">{tTitle || 'UNTITLED TOURNAMENT'}</h3>

                {tAllowedWeapons && (
                  <p className="text-xs text-amber-400 font-medium">🔫 Weapons: {tAllowedWeapons}</p>
                )}

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-200/80 text-center border border-white/10">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-bold">Prize Pool</span>
                    <span className="text-sm font-black text-neon-gold">PKR {tPrize.toLocaleString()}</span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="text-[9px] text-slate-400 uppercase block font-bold">Per Kill</span>
                    <span className="text-sm font-black text-crimson">
                      {tHasPerKill && tPerKill > 0 ? `PKR ${tPerKill}` : 'Survival'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-bold">Entry</span>
                    <span className={`text-sm font-black ${tEntryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {tEntryFee === 0 ? 'FREE' : `PKR ${tEntryFee}`}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Schedule: {tMatchDate}, {tMatchTime}</span>
                  <span>Slots: 0 / {tSlots}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Bottom Navigation Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
            disabled={wizardStep === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-surface-200 border border-white/10 hover:text-white disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>

          <span className="text-xs font-bold text-white/50">
            Step {wizardStep} of 6
          </span>

          {wizardStep < 6 ? (
            <button
              type="button"
              onClick={() => setWizardStep(prev => Math.min(6, prev + 1))}
              className="px-5 py-2 rounded-xl text-xs font-black uppercase text-white bg-primary hover:bg-primary/80 transition-colors shadow-md"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveTournament}
              disabled={!tTitle || uploadingBanner}
              className="px-6 py-2 rounded-xl text-xs font-black uppercase text-white bg-crimson hover:bg-crimson/80 disabled:opacity-40 transition-colors shadow-[0_0_20px_rgba(255,0,60,0.5)]"
            >
              {uploadingBanner ? 'Uploading Image...' : editingTourney ? 'Save Changes' : 'Publish Tournament'}
            </button>
          )}
        </div>

        {/* Save error display */}
        {tournamentSaveError && (
          <div className="mx-5 mb-4 p-3 bg-red-500/15 border border-red-500/40 rounded-xl">
            <p className="text-xs font-bold text-red-400">⚠️ {tournamentSaveError}</p>
          </div>
        )}
      </div>
    );
  };



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
                <div key={t.id} className="bg-surface-200 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
                  {t.bannerImage && (
                    <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10 hidden sm:flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.bannerImage} alt={t.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
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
                        onClick={() => router.push(`/admin/tournaments/${t.id}`)}
                        className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      >
                        <Users className="h-3 w-3" /> Players
                      </button>
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
                  <div key={dep.id} className="bg-surface-200 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
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
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <p className="text-white font-bold text-sm truncate">{dep.user}</p>
                          <span className="text-[11px] font-mono text-neon-gold bg-neon-gold/10 px-2 py-0.5 rounded border border-neon-gold/20">
                            PKR {dep.amt.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2 p-2 rounded bg-black/20 border border-white/5">
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">User Phone</p>
                            <p className="text-xs font-mono text-white/80">{dep.phone || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-0.5">Sender Phone</p>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-mono text-white/80">{dep.accountNumber || 'N/A'}</p>
                              {dep.phone && dep.accountNumber && dep.phone === dep.accountNumber ? (
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-amber-400" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40 font-mono mt-1">
                          <span>UID: {dep.uid}</span>
                          <span>{dep.method}</span>
                          <span>Trx: {dep.trxId}</span>
                          <span>{dep.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => approveDeposit(dep.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve Deposit
                      </button>
                      <button
                        onClick={() => rejectDeposit(dep.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
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
        <Modal title="Create Tournament — 6-Step Wizard" onClose={() => setShowCreateModal(false)}>
          {renderTournamentForm()}
        </Modal>
      )}

      {/* ── EDIT TOURNAMENT MODAL ── */}
      {editingTourney && (
        <Modal title={`Edit: ${editingTourney.title.slice(0, 30)}...`} onClose={() => setEditingTourney(null)}>
          {renderTournamentForm()}
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
