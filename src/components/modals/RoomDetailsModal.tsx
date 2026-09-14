'use client';

import React, { useState } from 'react';
import { Tournament } from '../../data/mockData';
import { X, Copy, Check, Key, ShieldCheck, Gamepad2, Info } from 'lucide-react';

interface RoomDetailsModalProps {
  tournament: Tournament | null;
  onClose: () => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  tournament,
  onClose,
}) => {
  if (!tournament) return null;

  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const roomId = tournament.roomId || 'EG-984210';
  const roomPassword = tournament.roomPassword || '777';

  const copyToClipboard = (text: string, type: 'id' | 'pass') => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neon-cyan/50 bg-surface-100 p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-purple-900/40 bg-surface-200 p-2 text-slate-400 hover:text-white hover:border-neon-cyan"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40">
            <Key className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold uppercase text-neon-cyan tracking-widest">SECURED ACCESS</span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
            CUSTOM ROOM CREDENTIALS
          </h2>
          <p className="text-xs text-slate-300">
            {tournament.title} • Map: {tournament.map}
          </p>
        </div>

        {/* Credentials Cards */}
        <div className="space-y-4">
          
          {/* Room ID Box */}
          <div className="rounded-2xl border border-neon-purple/40 bg-surface-200 p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">ROOM ID</span>
              <p className="text-xl font-black text-white font-mono tracking-widest">{roomId}</p>
            </div>
            <button
              onClick={() => copyToClipboard(roomId, 'id')}
              className="flex items-center space-x-1.5 rounded-xl bg-neon-purple/20 px-3.5 py-2 text-xs font-black uppercase text-neon-purple-light border border-neon-purple/40 hover:bg-neon-purple/40 transition-colors"
            >
              {copiedId ? (
                <>
                  <Check className="h-4 w-4 text-neon-green" />
                  <span className="text-neon-green">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY ID</span>
                </>
              )}
            </button>
          </div>

          {/* Room Password Box */}
          <div className="rounded-2xl border border-neon-cyan/40 bg-surface-200 p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">ROOM PASSWORD</span>
              <p className="text-xl font-black text-neon-cyan font-mono tracking-widest">{roomPassword}</p>
            </div>
            <button
              onClick={() => copyToClipboard(roomPassword, 'pass')}
              className="flex items-center space-x-1.5 rounded-xl bg-neon-cyan/20 px-3.5 py-2 text-xs font-black uppercase text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/40 transition-colors"
            >
              {copiedPass ? (
                <>
                  <Check className="h-4 w-4 text-neon-green" />
                  <span className="text-neon-green">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY PASS</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Warning / Instructions */}
        <div className="mt-6 flex items-start space-x-2.5 rounded-2xl border border-purple-900/40 bg-surface-200/60 p-3.5 text-left text-xs text-slate-300">
          <Info className="h-5 w-5 shrink-0 text-neon-gold" />
          <p className="leading-relaxed">
            Please launch Free Fire MAX, navigate to Custom Room, search for Room ID above, and enter your assigned slot. Do not leak credentials to un-registered players.
          </p>
        </div>

      </div>
    </div>
  );
};
