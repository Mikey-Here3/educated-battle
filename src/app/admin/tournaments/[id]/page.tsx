"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ArrowLeft, Users, Search, ShieldAlert, CheckCircle2, User, Phone, MapPin, Gamepad2, Shield, Calendar, Clock, DollarSign } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function TournamentPlayersPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser, authLoading } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    if (authLoading) return;
    const hasAdminCookie = typeof document !== "undefined" && document.cookie.includes("eg_admin=1");
    if (!hasAdminCookie && currentUser?.role !== "admin") {
      router.push("/login");
      return;
    }

    fetch(`/api/admin/tournament-players?tournamentId=${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setData(res);
        } else {
          setError(res.error || "Failed to load players");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [id, router, currentUser, authLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <ShieldAlert className="h-12 w-12 text-crimson mx-auto mb-4" />
          <p className="text-white text-lg font-bold">Loading Registered Players...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-surface-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="text-center">
            <h1 className="text-2xl font-black text-white mb-4">Error</h1>
            <p className="text-red-400 mb-6">{error}</p>
            <button onClick={() => router.push("/admin")} className="bg-surface-200 px-6 py-2 rounded-lg text-white border border-white/10 hover:bg-surface-300">Back to Admin</button>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  const { tournament, players } = data;

  const filteredPlayers = players.filter((p: any) => 
    p.ign.toLowerCase().includes(searchQ.toLowerCase()) || 
    p.uid.includes(searchQ) ||
    p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.phone.includes(searchQ)
  );

  return (
    <div className="min-h-screen bg-surface-100 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-24 pb-24">
        <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        ${/* Overview Header */}
        <div className="bg-surface-200 rounded-2xl border border-white/10 p-5 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/10 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/20 text-primary px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-primary/20">
                  {tournament.status}
                </span>
                <span className="bg-surface-300 text-slate-300 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-white/5">
                  {tournament.category} • {tournament.format}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-wide">
                {tournament.title}
              </h1>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-surface-100 px-4 py-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Entry Fee</p>
                <p className="text-lg font-black text-neon-gold font-mono">PKR {tournament.entryFee}</p>
              </div>
              <div className="bg-surface-100 px-4 py-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Registered</p>
                <p className="text-lg font-black text-white font-mono">{tournament.slotsFilled} <span className="text-slate-500">/ {tournament.totalSlots}</span></p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Mode</p>
                <p className="text-xs text-white font-bold">{tournament.mode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Prize Pool</p>
                <p className="text-xs text-white font-bold">PKR {tournament.prizePool}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-neon-gold" />
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Date</p>
                <p className="text-xs text-white font-bold">{tournament.matchDate || "TBA"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Time</p>
                <p className="text-xs text-white font-bold">{tournament.matchTime || "TBA"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Players List Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-xl font-black text-white flex items-center gap-2 font-display">
            <Users className="h-5 w-5 text-primary" />
            REGISTERED PLAYERS
          </h2>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              className="w-full bg-surface-200 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-crimson"
              placeholder="Search IGN, UID, Phone..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>

        {filteredPlayers.length === 0 ? (
          <div className="bg-surface-200 border border-white/10 rounded-xl p-10 text-center">
            <Shield className="h-12 w-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/40">No players found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredPlayers.map((player: any) => (
              <div key={player.slotId} className="bg-surface-200 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-primary/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-surface-300 rounded-lg border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">Slot</span>
                  <span className="text-lg font-black text-white leading-none">{player.slotNumber}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-black text-base truncate uppercase">{player.ign}</h3>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 whitespace-nowrap">
                      CONFIRMED
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <User className="h-3 w-3 text-slate-500" />
                      <span className="truncate">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Gamepad2 className="h-3 w-3 text-slate-500" />
                      <span className="font-mono text-[11px]">UID: {player.uid}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 col-span-2">
                      <Phone className="h-3 w-3 text-slate-500" />
                      <span className="font-mono text-[11px]">{player.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
