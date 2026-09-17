"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import {
  ArrowLeft, Users, Search, ShieldAlert, CheckCircle2,
  User, Phone, Gamepad2, Calendar, Clock, DollarSign,
  Trophy, Shield, Swords, Plus, Eye, EyeOff, RefreshCw,
  ChevronDown, ChevronRight, X, Check, AlertCircle, Users2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Tab = "overview" | "players" | "teams" | "matches";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  READY: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  LIVE: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  COMPLETED: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  CANCELLED: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function TournamentAdminPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser, authLoading } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [showRoomCreds, setShowRoomCreds] = useState<Record<string, boolean>>({});
  const [createMatchLoading, setCreateMatchLoading] = useState(false);
  const [matchMsg, setMatchMsg] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const fetchData = useCallback(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/tournament-players?tournamentId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res);
        else setError(res.error || "Failed to load tournament");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (authLoading) return;
    const hasAdminCookie =
      typeof document !== "undefined" && document.cookie.includes("eg_admin=1");
    if (!hasAdminCookie && currentUser?.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchData();
  }, [id, router, currentUser, authLoading, fetchData]);

  const handleCreateMatch = async () => {
    if (selectedPlayers.length < 2) {
      setMatchMsg("Select at least 2 players to create a match.");
      return;
    }
    setCreateMatchLoading(true);
    setMatchMsg("");
    try {
      const res = await fetch("/api/admin/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tournamentId: id,
          participants: selectedPlayers.map((uid) => ({ userId: uid })),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setMatchMsg(`Match #${json.matchNumber} created successfully!`);
        setSelectedPlayers([]);
        fetchData();
      } else {
        setMatchMsg(json.error || "Failed to create match.");
      }
    } catch {
      setMatchMsg("Network error creating match.");
    } finally {
      setCreateMatchLoading(false);
    }
  };

  const handleUpdateMatchStatus = async (matchId: string, status: string) => {
    await fetch("/api/admin/matches", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, status }),
    });
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <ShieldAlert className="h-12 w-12 text-crimson mx-auto mb-4" />
          <p className="text-white text-lg font-bold">Loading Tournament Data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-surface-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-28 pb-20">
          <div className="text-center">
            <h1 className="text-2xl font-black text-white mb-4">Error</h1>
            <p className="text-red-400 mb-6">{error}</p>
            <button
              onClick={() => router.push("/admin")}
              className="bg-surface-200 px-6 py-2 rounded-lg text-white border border-white/10"
            >
              Back to Admin
            </button>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  const { tournament, players, teams, matches } = data;
  const isTeamEntry = tournament.entryFeeModel === "TEAM_ENTRY";
  const isMultiMatch = tournament.matchType === "MULTI_MATCH";

  const filteredPlayers = (players || []).filter(
    (p: any) =>
      !searchQ ||
      p.ign?.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.uid?.includes(searchQ) ||
      p.name?.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.phone?.includes(searchQ)
  );

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "players", label: "Players", count: players?.length },
    ...(isTeamEntry ? [{ id: "teams" as Tab, label: "Teams", count: teams?.length }] : []),
    { id: "matches", label: "Matches", count: matches?.length },
  ];

  return (
    <div className="min-h-screen bg-surface-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-24 pb-28">
        {/* Back button + refresh */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {/* Tournament Header Card */}
        <div className="bg-surface-200 rounded-2xl border border-white/10 p-5 mb-5 shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${STATUS_COLORS[tournament.status?.toUpperCase()] || "bg-surface-300 text-slate-300 border-white/5"}`}>
                  {tournament.status}
                </span>
                <span className="bg-surface-300 text-slate-300 px-2.5 py-0.5 rounded text-[10px] font-black uppercase border border-white/5">
                  {tournament.entryFeeModel || "PLAYER_ENTRY"}
                </span>
                <span className="bg-surface-300 text-slate-300 px-2.5 py-0.5 rounded text-[10px] font-black uppercase border border-white/5">
                  {tournament.matchType || "SINGLE_MATCH"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-tight">
                {tournament.title}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {tournament.category} • {tournament.format} • {tournament.mode}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Entry Fee</p>
              <p className="text-lg font-black text-neon-gold">PKR {tournament.entryFee}</p>
              <p className="text-[10px] text-slate-500">{isTeamEntry ? "per team" : "per player"}</p>
            </div>
            <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Players</p>
              <p className="text-lg font-black text-white">{tournament.slotsFilled}<span className="text-slate-500 font-normal">/{tournament.totalSlots}</span></p>
              <p className="text-[10px] text-slate-500">{tournament.totalSlots - tournament.slotsFilled} remaining</p>
            </div>
            {isTeamEntry && (
              <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Teams</p>
                <p className="text-lg font-black text-white">{teams?.length || 0}<span className="text-slate-500 font-normal">/{tournament.maxTeams || "∞"}</span></p>
                <p className="text-[10px] text-slate-500">Team size: {tournament.teamSize}</p>
              </div>
            )}
            <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Matches</p>
              <p className="text-lg font-black text-white">{matches?.length || 0}</p>
              <p className="text-[10px] text-slate-500">{isMultiMatch ? "multi-match" : "single"}</p>
            </div>
            <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Prize Pool</p>
              <p className="text-lg font-black text-emerald-400">PKR {tournament.prizePool?.toLocaleString()}</p>
              {tournament.perKill > 0 && <p className="text-[10px] text-slate-500">+PKR {tournament.perKill}/kill</p>}
            </div>
            <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Collected</p>
              <p className="text-lg font-black text-white">
                PKR {((isTeamEntry ? (teams?.length || 0) : (players?.length || 0)) * (tournament.entryFee || 0)).toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500">entry fees</p>
            </div>
            {tournament.matchDate && (
              <div className="bg-surface-300/60 rounded-xl p-3 text-center border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Date</p>
                <p className="text-sm font-bold text-white">{tournament.matchDate}</p>
                <p className="text-[10px] text-slate-500">{tournament.matchTime}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-200 rounded-xl p-1 border border-white/10 mb-5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-crimson text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-surface-300/50"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? "bg-white/20" : "bg-surface-300"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-surface-200 rounded-2xl border border-white/10 p-5">
              <h2 className="text-sm font-black uppercase text-slate-300 mb-4">Tournament Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ["Format", tournament.format],
                  ["Category", tournament.category],
                  ["Mode", tournament.mode],
                  ["Entry Model", tournament.entryFeeModel],
                  ["Match Type", tournament.matchType],
                  ["Total Capacity", `${tournament.totalSlots} players`],
                  ["Registered", `${tournament.slotsFilled} / ${tournament.totalSlots}`],
                  ["Teams Registered", isTeamEntry ? `${teams?.length || 0}` : "N/A (Player Entry)"],
                  ["Matches Created", `${matches?.length || 0}`],
                  ["Prize Pool", `PKR ${tournament.prizePool?.toLocaleString()}`],
                  ["Per Kill Reward", tournament.perKill > 0 ? `PKR ${tournament.perKill}` : "None"],
                  ["Entry Fee", `PKR ${tournament.entryFee} ${isTeamEntry ? "/ team" : "/ player"}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-bold">{label}</span>
                    <span className="text-xs text-white font-black">{value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PLAYERS TAB ===== */}
        {activeTab === "players" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by IGN, UID, Name or Phone..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full bg-surface-200 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-crimson/50 focus:ring-1 focus:ring-crimson/30 transition-all"
              />
            </div>

            <p className="text-xs text-slate-500 font-bold">
              {filteredPlayers.length} of {players?.length || 0} players shown
            </p>

            {filteredPlayers.length === 0 ? (
              <div className="bg-surface-200 rounded-2xl border border-white/10 p-10 text-center">
                <Users className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-bold">No players registered yet</p>
                <p className="text-slate-500 text-xs mt-1">Players will appear here once they join the tournament</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPlayers.map((p: any) => (
                  <div key={p.slotId} className="bg-surface-200 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-crimson/20 flex items-center justify-center shrink-0">
                          <span className="text-crimson font-black text-sm">#{p.slotNumber}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-white text-sm truncate">{p.ign}</p>
                          <p className="font-mono text-neon-gold text-xs">{p.uid}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-slate-400 font-bold">Reg #{p.registrationNumber}</p>
                        <p className="text-[10px] text-slate-500">{new Date(p.registeredAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Name</p>
                        <p className="text-xs text-white font-bold truncate">{p.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Phone</p>
                        <p className="text-xs text-white font-mono">{p.phone || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Entry Paid</p>
                        <p className="text-xs text-emerald-400 font-black">PKR {p.entryFee}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== TEAMS TAB ===== */}
        {activeTab === "teams" && (
          <div className="space-y-4">
            {!isTeamEntry ? (
              <div className="bg-surface-200 rounded-2xl border border-white/10 p-8 text-center">
                <Users2 className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-bold">This tournament uses Player Entry</p>
                <p className="text-slate-500 text-xs mt-1">Team management is only available for TEAM_ENTRY tournaments</p>
              </div>
            ) : teams?.length === 0 ? (
              <div className="bg-surface-200 rounded-2xl border border-white/10 p-8 text-center">
                <Users2 className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-bold">No teams registered yet</p>
                <p className="text-slate-500 text-xs mt-1">Teams will appear here once team leaders join</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(teams || []).map((team: any, i: number) => (
                  <div key={team.id} className="bg-surface-200 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-neon-gold/20 flex items-center justify-center shrink-0">
                          <span className="text-neon-gold font-black text-sm">T{i + 1}</span>
                        </div>
                        <div>
                          <p className="font-black text-white text-base">{team.teamName}</p>
                          <p className="text-[10px] text-slate-400">Led by: {team.leaderIGN} | {team.leaderPhone || "No phone"}</p>
                        </div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        {team.status}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Members ({team.memberCount})</p>
                      {(team.members || []).map((m: any) => (
                        <div key={m.userId} className="flex items-center justify-between bg-surface-300/50 rounded-lg px-3 py-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-neon-gold font-bold border border-neon-gold/30 rounded px-1">{m.role}</span>
                            <span className="text-sm text-white font-bold">{m.ign}</span>
                            <span className="text-xs text-slate-400 font-mono">{m.uid}</span>
                          </div>
                          <span className="text-xs text-slate-500">{m.phone || "—"}</span>
                        </div>
                      ))}
                    </div>
                    {team.memberCount < (tournament.teamSize || 2) && (
                      <p className="text-[10px] text-amber-400 mt-2">
                        ⚠ Team incomplete — {(tournament.teamSize || 2) - team.memberCount} slot(s) unfilled
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== MATCHES TAB ===== */}
        {activeTab === "matches" && (
          <div className="space-y-4">
            {/* Create Match Panel */}
            <div className="bg-surface-200 rounded-2xl border border-white/10 p-4">
              <h2 className="text-sm font-black uppercase text-slate-300 mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-crimson" /> Create New Match
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                Select players below from the registered list, then click Create Match.
              </p>
              {/* Player selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 max-h-40 overflow-y-auto pr-1">
                {(players || []).map((p: any) => {
                  const sel = selectedPlayers.includes(p.userId);
                  return (
                    <button
                      key={p.userId}
                      type="button"
                      onClick={() =>
                        setSelectedPlayers((prev) =>
                          sel ? prev.filter((x) => x !== p.userId) : [...prev, p.userId]
                        )
                      }
                      className={`px-2 py-1.5 rounded-xl text-xs font-bold text-left border transition ${
                        sel
                          ? "bg-crimson/20 border-crimson/50 text-white"
                          : "bg-surface-300/50 border-white/5 text-slate-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span className="block font-black text-sm">{p.ign}</span>
                      <span className="text-[10px] font-mono opacity-70">{p.uid}</span>
                    </button>
                  );
                })}
              </div>
              {selectedPlayers.length > 0 && (
                <p className="text-xs text-neon-gold font-bold mb-3">{selectedPlayers.length} players selected</p>
              )}
              {matchMsg && (
                <p className={`text-xs font-bold mb-3 ${matchMsg.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
                  {matchMsg}
                </p>
              )}
              <button
                onClick={handleCreateMatch}
                disabled={createMatchLoading || selectedPlayers.length < 2}
                className="w-full bg-crimson hover:bg-crimson-light disabled:opacity-50 text-white rounded-xl py-2 text-xs font-black uppercase tracking-wider transition"
              >
                {createMatchLoading ? "Creating..." : `Create Match with ${selectedPlayers.length} Players`}
              </button>
            </div>

            {/* Matches List */}
            {matches?.length === 0 ? (
              <div className="bg-surface-200 rounded-2xl border border-white/10 p-8 text-center">
                <Swords className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-bold">No matches created yet</p>
                <p className="text-slate-500 text-xs mt-1">Use the panel above to create Match #1</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(matches || []).map((match: any) => (
                  <div key={match.id} className="bg-surface-200 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-neon-gold font-black text-lg">Match #{match.matchNumber}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${STATUS_COLORS[match.status] || "bg-surface-300 text-slate-300 border-white/5"}`}>
                          {match.status}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {["PENDING", "LIVE", "COMPLETED"].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleUpdateMatchStatus(match.id, s)}
                            disabled={match.status === s}
                            className={`px-2 py-1 rounded text-[10px] font-black uppercase border transition ${
                              match.status === s
                                ? "bg-crimson text-white border-crimson"
                                : "bg-surface-300 text-slate-400 border-white/5 hover:text-white"
                            }`}
                          >
                            {s === "PENDING" ? "Pending" : s === "LIVE" ? "Go Live" : "Complete"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Room Creds */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-surface-300/50 rounded-lg p-2">
                        <p className="text-[10px] text-slate-400 font-bold mb-0.5">Room ID</p>
                        <p className="text-sm font-mono text-white">{match.roomId || <span className="text-slate-600 italic text-xs">Not set</span>}</p>
                      </div>
                      <div className="bg-surface-300/50 rounded-lg p-2">
                        <p className="text-[10px] text-slate-400 font-bold mb-0.5">Password</p>
                        <p className="text-sm font-mono text-white">{match.roomPassword || <span className="text-slate-600 italic text-xs">Not set</span>}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500">
                      {match.participantCount} participants • Created {new Date(match.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}