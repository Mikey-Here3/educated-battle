'use client';

import React, { useState } from 'react';
import { Tournament } from '../../data/mockData';
import { X, Swords, User, ShieldCheck, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JoinTournamentModalProps {
  tournament: Tournament | null;
  userBalance: number;
  onClose: () => void;
  onConfirmJoin: (tournamentId: string, slotNumber: number, ign: string, uid: string) => void;
}

export const JoinTournamentModal: React.FC<JoinTournamentModalProps> = ({
  tournament,
  userBalance,
  onClose,
  onConfirmJoin,
}) => {
  if (!tournament) return null;

  const [selectedSlot, setSelectedSlot] = useState<number | null>(1);
  const [ign, setIgn] = useState<string>('PK_CYBORG');
  const [uid, setUid] = useState<string>('489201482');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isFree = tournament.entryFee === 0;
  const canAfford = isFree || userBalance >= tournament.entryFee;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedSlot) {
      setErrorMsg('Please select an open slot from the grid below.');
      return;
    }
    if (!ign.trim()) {
      setErrorMsg('Please enter your Free Fire In-Game Name (IGN).');
      return;
    }
    if (!uid.trim() || uid.length < 6) {
      setErrorMsg('Please enter a valid Free Fire UID (minimum 6 digits).');
      return;
    }
    if (!canAfford) {
      setErrorMsg(`Insufficient balance. Entry fee is PKR ${tournament.entryFee}, your balance is PKR ${userBalance}. Please deposit first.`);
      return;
    }

    // Trigger Confetti Celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmJoin(tournament.id, selectedSlot, ign, uid);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neon-purple/50 bg-surface-100 p-6 shadow-[0_0_50px_rgba(168,85,247,0.35)] sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-purple-900/40 bg-surface-200 p-2 text-slate-400 hover:text-white hover:border-neon-purple"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-16 w-16 text-neon-green animate-bounce" />
            <h3 className="text-2xl font-black text-white uppercase font-display">SLOT RESERVED SUCCESSFULLY!</h3>
            <p className="text-sm text-slate-300">
              You are registered in slot <strong className="text-neon-cyan">#{selectedSlot}</strong> for {tournament.title}.
            </p>
            <p className="text-xs text-neon-purple-light">
              Room credentials will unlock on your tournament card 15 mins before launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="space-y-5">
            
            {/* Header Title */}
            <div>
              <span className="text-xs font-bold uppercase text-neon-cyan tracking-wider">REGISTRATION</span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-display leading-snug">
                JOIN {tournament.title}
              </h2>
            </div>

            {/* Entry & Balance Summary Banner */}
            <div className="flex items-center justify-between rounded-2xl border border-neon-purple/30 bg-surface-200/90 p-4">
              <div>
                <span className="text-xs font-medium text-slate-400">Entry Fee:</span>
                <p className="text-lg font-black text-white font-display">
                  {isFree ? <span className="text-neon-green">FREE ENTRY</span> : `PKR ${tournament.entryFee}`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-slate-400">Your PKR Balance:</span>
                <p className={`text-lg font-black font-display ${canAfford ? 'text-neon-purple-light' : 'text-neon-fire'}`}>
                  PKR {userBalance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="flex items-center space-x-2 rounded-xl border border-neon-fire/40 bg-neon-fire/10 p-3 text-xs font-bold text-neon-fire">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Free Fire Profile Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Free Fire In-Game Name (IGN) *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={ign}
                    onChange={(e) => setIgn(e.target.value)}
                    placeholder="Exact IGN in game (e.g. EG_CYBORG_FF)"
                    className="w-full rounded-xl border border-purple-900/40 bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Free Fire UID (Numeric Player ID) *
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="e.g. 489201482"
                    className="w-full rounded-xl border border-purple-900/40 bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Select Slot Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Your Room Slot (1 - {tournament.totalSlots})
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {Array.from({ length: tournament.totalSlots }, (_, i) => i + 1).map((slotNum) => {
                  const isTaken = slotNum <= 5; // Mock taken slots
                  const isSelected = selectedSlot === slotNum;
                  return (
                    <button
                      key={slotNum}
                      type="button"
                      disabled={isTaken}
                      onClick={() => setSelectedSlot(slotNum)}
                      className={`rounded-lg py-1.5 text-xs font-black transition-all ${
                        isTaken
                          ? 'bg-surface-300 text-slate-600 cursor-not-allowed border border-slate-800'
                          : isSelected
                          ? 'bg-neon-purple text-white shadow-[0_0_10px_#a855f7] border border-neon-purple-light'
                          : 'bg-surface-200 text-slate-300 hover:bg-surface-300 hover:text-white border border-purple-900/30'
                      }`}
                    >
                      #{slotNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Join Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-neon-purple-dark via-neon-purple to-neon-purple-light py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:scale-102 active:scale-95"
            >
              <Swords className="h-5 w-5 text-neon-cyan" />
              <span>CONFIRM MATCH REGISTRATION</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
