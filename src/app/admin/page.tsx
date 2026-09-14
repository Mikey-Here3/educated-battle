'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { INITIAL_TOURNAMENTS, MOCK_LEADERBOARD, Tournament, PlayerRank } from '@/data/mockData';
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
  UserCheck
} from 'lucide-react';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'deposits' | 'leaderboard' | 'settings'>('tournaments');

  // Tournaments State
  const [tournamentsList, setTournamentsList] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRoomIdTourney, setEditingRoomIdTourney] = useState<Tournament | null>(null);

  // New Tournament Form State
  const [newTitle, setNewTitle] = useState('');
  const [newGame, setNewGame] = useState<'Free Fire' | 'Free Fire MAX'>('Free Fire MAX');
  const [newType, setNewType] = useState<'Solo' | 'Duo' | 'Squad' | 'Clash Squad'>('Squad');
  const [newMap, setNewMap] = useState<'Bermuda' | 'Purgatory' | 'Kalahari' | 'Nexterra'>('Bermuda');
  const [newPrize, setNewPrize] = useState(10000);
  const [newPerKill, setNewPerKill] = useState(50);
  const [newEntryFee, setNewEntryFee] = useState(100);
  const [newSlots, setNewSlots] = useState(48);
  const [newStartTime, setNewStartTime] = useState('Today, 9:00 PM PST');

  // Edit Room ID / Pass State
  const [editRoomId, setEditRoomId] = useState('');
  const [editRoomPass, setEditRoomPass] = useState('');

  // Pending Deposits State
  const [pendingDeposits, setPendingDeposits] = useState([
    { id: 'dep-1', user: 'PK_CYBORG_FF', uid: '489201482', method: 'EasyPaisa', amt: 500, trxId: '29481029481', date: '5 mins ago', proofUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
    { id: 'dep-2', user: 'PK_PHANTOM_99', uid: '129481902', method: 'JazzCash', amt: 1000, trxId: '98412048102', date: '12 mins ago', proofUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
  ]);

  // Social Settings State
  const [whatsappLink, setWhatsappLink] = useState('https://chat.whatsapp.com/EducatedGamerPK');
  const [discordLink, setDiscordLink] = useState('https://discord.gg/EducatedGamer');
  const [youtubeLink, setYoutubeLink] = useState('https://youtube.com/@EducatedGamerPK');
  const [supportPhone, setSupportPhone] = useState('+92 340 9842109');
  const [savedSettings, setSavedSettings] = useState(false);

  // Handle Create Tournament
  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Tournament = {
      id: `eg-ff-${Date.now().toString().slice(-4)}`,
      title: newTitle.toUpperCase() || 'NEW BATTLE ARENA MATCH',
      game: newGame,
      type: newType,
      map: newMap,
      status: 'upcoming',
      prizePool: Number(newPrize),
      perKill: Number(newPerKill),
      entryFee: Number(newEntryFee),
      slotsFilled: 0,
      totalSlots: Number(newSlots),
      startTime: newStartTime,
      isFeatured: false,
      prizes: {
        first: Math.round(newPrize * 0.5),
        second: Math.round(newPrize * 0.3),
        third: Math.round(newPrize * 0.2),
        perKillBonus: Number(newPerKill),
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

  // Handle Publish Room ID & Pass
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
          };
        }
        return t;
      })
    );
    setEditingRoomIdTourney(null);
  };

  // Handle Deposit Action
  const handleDepositAction = (id: string, action: 'approve' | 'reject') => {
    setPendingDeposits((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={1250} />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Admin Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-neon-gold/50 bg-gradient-to-r from-purple-950/90 via-surface-200 to-slate-950 p-6 sm:p-8 mb-8 shadow-[0_0_40px_rgba(255,215,0,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-crimson-dark via-crimson to-crimson-light px-5 py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] transition-all hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            <span>CREATE NEW TOURNAMENT</span>
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex overflow-x-auto pb-3 gap-2 mb-6 border-b border-purple-900/30">
          {[
            { id: 'tournaments', label: 'TOURNAMENTS MANAGER', icon: Gamepad2 },
            { id: 'deposits', label: 'DEPOSIT APPROVALS', icon: Wallet },
            { id: 'leaderboard', label: 'LEADERBOARD MANAGER', icon: Trophy },
            { id: 'settings', label: 'SITE SOCIALS & SETTINGS', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex shrink-0 items-center space-x-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-crimson/20 text-crimson-light border border-crimson/60 shadow-[0_0_20px_rgba(255,0,60,0.3)]'
                    : 'bg-surface-200/70 text-slate-400 border border-transparent hover:bg-surface-300 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-neon-gold' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Tournaments Manager Table & Controls */}
        {activeTab === 'tournaments' && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-purple-900/30 bg-surface-200/90 overflow-hidden backdrop-blur-md">
              <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
                <h3 className="font-extrabold text-white uppercase font-display text-base">ACTIVE TOURNAMENTS</h3>
                <span className="text-xs font-bold text-slate-400">Total: {tournamentsList.length} matches</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-surface-300/60 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    <tr>
                      <th className="py-3 px-4">TITLE</th>
                      <th className="py-3 px-4">MODE / MAP</th>
                      <th className="py-3 px-4 text-center">ENTRY / PRIZE</th>
                      <th className="py-3 px-4 text-center">SLOTS</th>
                      <th className="py-3 px-4 text-center">ROOM ID & PASS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/20">
                    {tournamentsList.map((t) => (
                      <tr key={t.id} className="hover:bg-surface-300/40">
                        <td className="py-3.5 px-4 font-bold text-white font-display">
                          {t.title}
                          <span className="block text-[10px] font-normal text-slate-400">{t.startTime}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="rounded bg-crimson/20 px-2 py-0.5 text-[10px] font-bold text-crimson-light mr-1">
                            {t.type}
                          </span>
                          <span className="text-slate-300 font-semibold">{t.map}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono">
                          <span className="block text-slate-300">Fee: {t.entryFee === 0 ? 'FREE' : `PKR ${t.entryFee}`}</span>
                          <span className="font-black text-neon-gold">Prize: PKR {t.prizePool}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-neon-cyan">
                          {t.slotsFilled} / {t.totalSlots}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono">
                          {t.roomId ? (
                            <span className="text-neon-green font-bold">ID: {t.roomId} | Pass: {t.roomPassword}</span>
                          ) : (
                            <span className="text-slate-500">Not Released</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setEditingRoomIdTourney(t);
                              setEditRoomId(t.roomId || '');
                              setEditRoomPass(t.roomPassword || '');
                            }}
                            className="rounded-lg bg-surface-300 px-3 py-1.5 text-[11px] font-bold text-neon-cyan border border-neon-cyan/30 hover:bg-surface-400"
                          >
                            <Key className="inline h-3.5 w-3.5 mr-1" />
                            PUBLISH PASS
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pending Deposit Approvals */}
        {activeTab === 'deposits' && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-white uppercase font-display">PENDING USER DEPOSITS</h3>

            {pendingDeposits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingDeposits.map((dep) => (
                  <div key={dep.id} className="rounded-2xl border border-purple-900/40 bg-surface-200 p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
                      <div>
                        <p className="font-bold text-white text-sm">{dep.user}</p>
                        <p className="text-[10px] text-slate-400 font-mono">UID: {dep.uid}</p>
                      </div>
                      <span className="rounded-lg bg-neon-gold/20 px-2.5 py-1 text-xs font-black text-neon-gold">
                        PKR {dep.amt}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-300">
                      <p>Payment Method: <strong className="text-white">{dep.method}</strong></p>
                      <p>Trx ID: <strong className="text-neon-cyan font-mono">{dep.trxId}</strong></p>
                      <p className="text-[10px] text-slate-400">Submitted: {dep.date}</p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => handleDepositAction(dep.id, 'approve')}
                        className="flex-1 flex items-center justify-center space-x-1 rounded-xl bg-neon-green/20 px-3 py-2 text-xs font-black text-neon-green border border-neon-green/40 hover:bg-neon-green/30"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>APPROVE & CREDIT</span>
                      </button>
                      <button
                        onClick={() => handleDepositAction(dep.id, 'reject')}
                        className="flex-1 flex items-center justify-center space-x-1 rounded-xl bg-crimson/20 px-3 py-2 text-xs font-black text-crimson-light border border-crimson/40 hover:bg-crimson/30"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>REJECT</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-purple-900/30 bg-surface-200 p-8 text-center text-slate-400 text-sm">
                No pending deposit requests to approve!
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Leaderboard Points Manager */}
        {activeTab === 'leaderboard' && (
          <div className="rounded-3xl border border-purple-900/30 bg-surface-200/90 p-6 space-y-4">
            <h3 className="text-xl font-extrabold text-white uppercase font-display">MANAGE PLAYER RANKS & POINTS</h3>
            <p className="text-xs text-slate-400">Directly update player earnings PKR, total kills, and win rates.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-surface-300/60 text-[10px] font-black uppercase text-slate-400">
                  <tr>
                    <th className="py-3 px-4">RANK</th>
                    <th className="py-3 px-4">PLAYER IGN</th>
                    <th className="py-3 px-4 text-center">KILLS</th>
                    <th className="py-3 px-4 text-right">TOTAL EARNINGS (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/20">
                  {MOCK_LEADERBOARD.map((player) => (
                    <tr key={player.rank} className="hover:bg-surface-300/40">
                      <td className="py-3 px-4 font-bold text-white">#{player.rank}</td>
                      <td className="py-3 px-4 font-bold text-white font-display">{player.ign}</td>
                      <td className="py-3 px-4 text-center font-bold text-crimson-light">{player.totalKills}</td>
                      <td className="py-3 px-4 text-right font-black text-neon-gold font-display">
                        PKR {player.earningsPKR.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Social Links & Settings */}
        {activeTab === 'settings' && (
          <div className="rounded-3xl border border-purple-900/30 bg-surface-200/90 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-extrabold text-white uppercase font-display">MANAGE SOCIAL & CONTACT LINKS</h3>

            {savedSettings && (
              <div className="flex items-center space-x-2 rounded-xl border border-neon-green/40 bg-neon-green/10 p-3 text-xs font-bold text-neon-green">
                <CheckCircle2 className="h-4 w-4" />
                <span>Social links updated successfully!</span>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); setSavedSettings(true); setTimeout(() => setSavedSettings(false), 3000); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">WhatsApp Group Link</label>
                <input type="text" value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className="w-full rounded-xl border border-purple-900/40 bg-surface-100 p-3 text-sm text-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Discord Server Link</label>
                <input type="text" value={discordLink} onChange={(e) => setDiscordLink(e.target.value)} className="w-full rounded-xl border border-purple-900/40 bg-surface-100 p-3 text-sm text-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">YouTube Channel URL</label>
                <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="w-full rounded-xl border border-purple-900/40 bg-surface-100 p-3 text-sm text-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Support Phone Helpline</label>
                <input type="text" value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} className="w-full rounded-xl border border-purple-900/40 bg-surface-100 p-3 text-sm text-white" />
              </div>

              <button type="submit" className="rounded-xl bg-crimson px-6 py-3 text-xs font-black uppercase text-white shadow-lg">
                SAVE SOCIAL SETTINGS
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Modal: Create Tournament */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-crimson bg-surface-100 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-white uppercase font-display">CREATE FREE FIRE TOURNAMENT</h3>

            <form onSubmit={handleCreateTournament} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Match Title *</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. PAKISTAN SQUAD MAJOR #105" className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Game Version</label>
                  <select value={newGame} onChange={(e) => setNewGame(e.target.value as any)} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white">
                    <option value="Free Fire MAX">Free Fire MAX</option>
                    <option value="Free Fire">Free Fire</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Match Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as any)} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white">
                    <option value="Squad">Squad</option>
                    <option value="Solo">Solo</option>
                    <option value="Duo">Duo</option>
                    <option value="Clash Squad">Clash Squad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Map</label>
                  <select value={newMap} onChange={(e) => setNewMap(e.target.value as any)} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white">
                    <option value="Bermuda">Bermuda</option>
                    <option value="Purgatory">Purgatory</option>
                    <option value="Kalahari">Kalahari</option>
                    <option value="Nexterra">Nexterra</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Total Slots</label>
                  <input type="number" value={newSlots} onChange={(e) => setNewSlots(Number(e.target.value))} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Entry Fee (PKR)</label>
                  <input type="number" value={newEntryFee} onChange={(e) => setNewEntryFee(Number(e.target.value))} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Prize Pool (PKR)</label>
                  <input type="number" value={newPrize} onChange={(e) => setNewPrize(Number(e.target.value))} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Per Kill (PKR)</label>
                  <input type="number" value={newPerKill} onChange={(e) => setNewPerKill(Number(e.target.value))} className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Start Date & Time</label>
                <input type="text" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} placeholder="e.g. Today, 9:00 PM PST" className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white" />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-xl bg-surface-300 px-4 py-2 text-slate-300">CANCEL</button>
                <button type="submit" className="rounded-xl bg-crimson px-5 py-2 text-white font-bold">PUBLISH MATCH</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Room ID & Password */}
      {editingRoomIdTourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-neon-cyan bg-surface-100 p-6 space-y-4">
            <h3 className="text-xl font-extrabold text-white uppercase font-display">PUBLISH ROOM ID & PASSWORD</h3>
            <p className="text-xs text-slate-300">{editingRoomIdTourney.title}</p>

            <form onSubmit={handleSaveRoomId} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Room ID *</label>
                <input type="text" required value={editRoomId} onChange={(e) => setEditRoomId(e.target.value)} placeholder="e.g. EG-984210" className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white font-mono" />
              </div>
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Room Password *</label>
                <input type="text" required value={editRoomPass} onChange={(e) => setEditRoomPass(e.target.value)} placeholder="e.g. 777" className="w-full rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-white font-mono" />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setEditingRoomIdTourney(null)} className="rounded-xl bg-surface-300 px-4 py-2 text-slate-300">CANCEL</button>
                <button type="submit" className="rounded-xl bg-neon-cyan px-5 py-2 text-slate-950 font-black">SAVE & RELEASE</button>
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
