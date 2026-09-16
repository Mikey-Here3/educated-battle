'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tournament } from '../../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  Trophy, 
  Swords, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  Gamepad2, 
  User, 
  Wallet, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';

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
  const [selectedSlot, setSelectedSlot] = useState<number>(tournament?.slotsFilled ? tournament.slotsFilled + 1 : 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Set first open slot when modal opens
  React.useEffect(() => {
    if (tournament) {
      const booked = new Set((tournament as any).bookedSlots || []);
      const total = tournament.totalSlots || 48;
      for (let i = 1; i <= total; i++) {
        if (!booked.has(i)) {
          setSelectedSlot(i);
          break;
        }
      }
    }
  }, [tournament]);

  if (!isOpen || !tournament) return null;

  const totalSlotsCount = tournament.totalSlots || 48;
  const occupiedCount = tournament.slotsFilled || 0;
  const bookedSet = new Set<number>((tournament as any).bookedSlots || []);
  const isInsufficientBalance = currentUser ? (tournament.entryFee > 0 && currentUser.balancePKR < tournament.entryFee) : false;

  const handleConfirmJoin = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');

    const res = await joinTournament(tournament.id, tournament.entryFee, selectedSlot);
    setLoading(false);

    if (res.success) {
      setConfirmed(true);
      onSuccess();
    } else {
      setError(res.error || 'Failed to join match');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-crimson/40 bg-surface-100 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,60,0.3)] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-surface-200 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40 shrink-0">
            <Swords className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-neon-gold tracking-widest">
              SLOT RESERVATION &amp; ENTRY CONFIRMATION
            </span>
            <h3 className="text-xl font-extrabold text-white uppercase font-display line-clamp-1">
              {tournament.title}
            </h3>
          </div>
        </div>

        {confirmed ? (
          /* Confirmation Success Screen */
          <div className="text-center space-y-4 py-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white font-display uppercase">Slot #{selectedSlot} Confirmed!</h4>
              <p className="text-xs text-emerald-400 font-bold mt-1">
                Locked &amp; Verified with Free Fire UID: {currentUser?.uid} ({currentUser?.ign})
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200 p-4 text-xs text-slate-300 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Match Entry Fee Paid:</span>
                <span className="font-black text-white">{tournament.entryFee === 0 ? 'FREE' : `PKR ${tournament.entryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Remaining Coin Balance:</span>
                <span className="font-black text-neon-gold">PKR {currentUser?.balancePKR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-1.5">
                <span className="text-slate-400">Your Assigned Room Slot:</span>
                <span className="font-black text-emerald-400">Slot #{selectedSlot}</span>
              </div>
            </div>

            <div className="rounded-xl bg-crimson/10 border border-crimson/30 p-3 text-left text-xs text-slate-300">
              <p className="font-bold text-crimson mb-0.5">⚠️ Match Room Rule:</p>
              <p>When you join the Free Fire Custom Room, occupy <strong>Slot #{selectedSlot}</strong> strictly. Any player sitting in the wrong slot will be kicked before match start.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg"
            >
              Done — View Match Console
            </button>
          </div>
        ) : currentUser ? (
          <div className="space-y-5">
            
            {/* Player Details Bar */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-surface-200/80 p-3.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Player IGN</span>
                <p className="font-black text-white truncate">{currentUser.ign}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Free Fire UID</span>
                <p className="font-mono font-bold text-neon-gold">{currentUser.uid}</p>
              </div>
            </div>

            {/* Interactive Slot Selector Grid (48 Slots) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Select Your Room Slot (1 to {totalSlotsCount})
                </label>
                <span className="text-[10px] text-slate-400">
                  Selected: <strong className="text-neon-gold">Slot #{selectedSlot}</strong>
                </span>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-2xl border border-white/10 bg-surface-200/50">
                {Array.from({ length: totalSlotsCount }, (_, i) => i + 1).map((slotNum) => {
                  const isOccupied = (bookedSet.size > 0 ? bookedSet.has(slotNum) : slotNum <= occupiedCount) && slotNum !== selectedSlot;
                  const isSelected = slotNum === selectedSlot;

                  return (
                    <button
                      key={slotNum}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => setSelectedSlot(slotNum)}
                      className={`h-9 rounded-xl text-xs font-black flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-crimson text-white ring-2 ring-crimson-light shadow-[0_0_15px_rgba(255,0,60,0.6)] scale-105'
                          : isOccupied
                          ? 'bg-surface-300/40 text-slate-600 cursor-not-allowed border border-white/5'
                          : 'bg-surface-200 text-slate-300 hover:bg-surface-300 hover:text-white border border-white/5'
                      }`}
                      title={isOccupied ? `Slot #${slotNum} Occupied` : `Select Slot #${slotNum}`}
                    >
                      {slotNum}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Slots in red/highlighted are available. Dark gray slots are confirmed by other players.
              </p>
            </div>

            {/* Price Breakdown & Balance Check */}
            <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Your Available Coin Balance:</span>
                <span className="font-black text-white font-mono">PKR {currentUser.balancePKR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2">
                <span className="text-slate-400 font-bold">Match Entry Fee:</span>
                <span className="font-black text-emerald-400 font-mono">
                  {tournament.entryFee === 0 ? 'FREE ENTRY (PKR 0)' : `- PKR ${tournament.entryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2 font-bold">
                <span className="text-slate-300">Balance After Join:</span>
                <span className={`font-mono font-black ${
                  isInsufficientBalance ? 'text-crimson' : 'text-neon-gold'
                }`}>
                  PKR {Math.max(0, currentUser.balancePKR - tournament.entryFee).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Insufficient Balance Alert */}
            {isInsufficientBalance && (
              <div className="rounded-2xl border border-crimson/50 bg-crimson/10 p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-crimson font-bold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Insufficient Balance to Join</span>
                </div>
                <p className="text-slate-300">
                  You need <strong>PKR {tournament.entryFee}</strong> coins, but your balance is <strong>PKR {currentUser.balancePKR}</strong>. Please add coins via JazzCash to confirm your slot.
                </p>
                <Link
                  href="/wallet"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon-gold to-amber-600 px-4 py-2 text-xs font-black uppercase text-black shadow-md hover:scale-102 transition"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Deposit via JazzCash Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-crimson/50 bg-crimson/10 p-3 text-xs font-semibold text-crimson">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Confirm Registration Button */}
            <button
              onClick={handleConfirmJoin}
              disabled={loading || isInsufficientBalance}
              className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-4 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_35px_rgba(255,0,60,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? 'Processing Slot Lock...' 
                : tournament.entryFee === 0 
                ? `Confirm Free Slot #${selectedSlot} with UID ${currentUser.uid}` 
                : `Pay PKR ${tournament.entryFee} & Lock Slot #${selectedSlot}`}
            </button>

          </div>
        ) : (
          /* Guest Sign In Prompt */
          <div className="rounded-2xl border border-crimson/40 bg-surface-200 p-6 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40 mx-auto">
              <User className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-black text-white font-display uppercase">Sign In to Reserve Slot</h4>
            <p className="text-xs text-slate-300">
              You must be registered with your verified Free Fire UID to book a custom room slot and receive real cash prizes.
            </p>
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-crimson py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:bg-crimson-dark transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Player Account</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
