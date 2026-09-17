'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tournament } from '../../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { X, Key, Lock, Copy, Check, ShieldCheck, AlertCircle, LogIn, Youtube, Clock, Gamepad2 } from 'lucide-react';

interface RoomDetailsModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  tournament,
  isOpen,
  onClose,
}) => {
  const { currentUser, registeredTournaments, bookedSlots } = useAuth();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!isOpen || !tournament) return null;

  const isUserRegistered = registeredTournaments.includes(tournament.id) || currentUser?.role === 'admin';
  const myBooking = bookedSlots[tournament.id];

  const handleCopy = (text: string, type: 'id' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl border border-crimson/40 bg-surface-100 shadow-[0_0_50px_rgba(255,0,60,0.3)] overflow-hidden">

        {/* ALWAYS-VISIBLE Close Bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-surface-200 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-crimson/20 text-crimson border border-crimson/40 shrink-0">
              <Key className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase text-neon-gold tracking-widest leading-none">ROOM CREDENTIALS</p>
              <p className="text-xs font-extrabold text-white uppercase truncate">{tournament.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 flex items-center gap-1.5 rounded-xl bg-crimson/20 hover:bg-crimson border border-crimson/40 hover:border-crimson px-3 py-2 text-crimson hover:text-white transition-all text-xs font-black uppercase tracking-wider ml-2"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">

        {/* Check if user is registered in this tournament */}
        {isUserRegistered ? (
          <div className="space-y-4">
            
            {/* Player's Confirmed Slot Badge */}
            {myBooking && (
              <div className="rounded-2xl border border-neon-gold/40 bg-neon-gold/10 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40 shrink-0 font-black">
                    #{myBooking.slotNumber}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-neon-gold">YOUR ASSIGNED ROOM SLOT</span>
                    <p className="text-xs font-mono font-bold text-white">Free Fire UID: {myBooking.uid}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/40">
                  Confirmed
                </span>
              </div>
            )}

            {tournament.roomId ? (
              <>
                {/* Room ID Box */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-200 p-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">FREE FIRE ROOM ID</span>
                    <p className="text-2xl font-black text-white font-mono tracking-wider">{tournament.roomId}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(tournament.roomId || '', 'id')}
                    className="flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-surface-300 px-3 py-2 text-slate-200 hover:text-white hover:bg-crimson transition-colors"
                  >
                    {copiedId ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span className="text-xs font-bold">{copiedId ? 'COPIED' : 'COPY ID'}</span>
                  </button>
                </div>

                {/* Room Password Box */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-200 p-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">ROOM PASSWORD</span>
                    <p className="text-2xl font-black text-neon-gold font-mono tracking-wider">{tournament.roomPassword || '777'}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(tournament.roomPassword || '777', 'pass')}
                    className="flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-surface-300 px-3 py-2 text-slate-200 hover:text-white hover:bg-crimson transition-colors"
                  >
                    {copiedPass ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span className="text-xs font-bold">{copiedPass ? 'COPIED' : 'COPY PASS'}</span>
                  </button>
                </div>

                {/* Instructions */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 space-y-1">
                  <p className="font-bold">? Room Joining Protocol:</p>
                  <p className="text-slate-300">
                    Open Free Fire &gt; Custom Room &gt; Search ID <strong>{tournament.roomId}</strong> &gt; Enter Password &gt; Sit in <strong>Slot #{myBooking?.slotNumber || 'Assigned'}</strong> matching your UID <strong>{currentUser?.uid}</strong>.
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center space-y-2">
                <Clock className="mx-auto h-8 w-8 text-amber-400" />
                <h4 className="text-base font-bold text-white uppercase">Room Credentials Releasing 15 Mins Before Start</h4>
                <p className="text-xs text-slate-300">
                  Your slot #{myBooking?.slotNumber || '1'} is secured with Free Fire UID {currentUser?.uid}. Room ID &amp; Password will automatically appear here 15 minutes before match start.
                </p>
              </div>
            )}

            {/* Live stream button */}
            {tournament.liveStreamUrl && (
              <a
                href={tournament.liveStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full rounded-xl bg-red-600 hover:bg-red-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition"
              >
                <Youtube className="h-4 w-4" />
                <span>Watch Official YouTube Live Broadcast</span>
              </a>
            )}

          </div>
        ) : (
          /* Privacy Locked State for Unregistered / Guest Users */
          <div className="rounded-2xl border border-crimson/40 bg-surface-200/80 p-6 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40 mx-auto">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white font-display uppercase">Room Credentials Locked ??</h4>
              <p className="text-xs text-slate-300 mt-1">
                Room ID and Password are encrypted and revealed exclusively after your slot is confirmed and verified with your Free Fire UID.
              </p>
            </div>

            {!currentUser ? (
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-crimson py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:bg-crimson-dark transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Access Room</span>
              </Link>
            ) : (
              <p className="text-xs font-bold text-amber-400">
                You have not registered for this tournament yet. Please click &quot;Join Match&quot; on the tournament card to lock your slot.
              </p>
            )}
          </div>
        )}
        </div>{/* end scrollable content */}

      </div>
    </div>
  );
};
