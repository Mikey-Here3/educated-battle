'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tournament } from '../../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { X, Trophy, Swords, ShieldCheck, CheckCircle2, AlertCircle, LogIn, Gamepad2, User } from 'lucide-react';

interface JoinTournamentModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const JoinTournamentModal: React.FC<JoinTournamentModalProps> = ({
  tournament,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { currentUser, joinTournament } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !tournament) return null;

  const handleConfirmJoin = () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');

    const res = joinTournament(tournament.id);
    setLoading(false);
    if (res.success) {
      onSuccess();
      onClose();
    } else {
      setError(res.error || 'Failed to join match');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-crimson/40 bg-surface-100 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,60,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-surface-200 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40">
            <Swords className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-neon-gold tracking-widest">
              CONFIRM REGISTRATION
            </span>
            <h3 className="text-xl font-extrabold text-white uppercase font-display line-clamp-1">
              {tournament.title}
            </h3>
          </div>
        </div>

        {/* Authenticated Flow */}
        {currentUser ? (
          <div className="space-y-4">
            
            {/* Player UID & IGN Verification Box */}
            <div className="rounded-2xl border border-white/10 bg-surface-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">Registered Free Fire IGN:</span>
                <span className="text-white font-black">{currentUser.ign}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                <span className="text-slate-400 font-bold uppercase">Player Free Fire UID:</span>
                <span className="text-neon-gold font-mono font-bold">{currentUser.uid}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                <span className="text-slate-400 font-bold uppercase">Entry Fee:</span>
                <span className="text-emerald-400 font-black">
                  {tournament.entryFee === 0 ? 'FREE ENTRY' : `PKR ${tournament.entryFee}`}
                </span>
              </div>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Your Desired Slot / Position
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-surface-200 px-4 py-3 text-sm font-bold text-white focus:border-crimson focus:outline-none"
              >
                {Array.from({ length: Math.min(tournament.totalSlots, 48) }, (_, i) => i + 1).map((slot) => (
                  <option key={slot} value={slot} className="bg-surface-100">
                    Slot #{slot} ? Open for Registration
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-crimson/50 bg-crimson/10 p-3 text-xs font-semibold text-crimson">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleConfirmJoin}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_35px_rgba(255,0,60,0.6)] disabled:opacity-60"
            >
              {loading ? 'Confirming Slot...' : `Confirm & Join Match (Slot #${selectedSlot})`}
            </button>

          </div>
        ) : (
          /* Must Sign In First */
          <div className="rounded-2xl border border-crimson/40 bg-surface-200 p-6 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40 mx-auto">
              <User className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-black text-white font-display uppercase">Sign In to Join Tournament</h4>
            <p className="text-xs text-slate-300">
              You must be registered with your verified Free Fire UID to occupy a slot in custom matches.
            </p>
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-crimson py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:bg-crimson-dark transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
