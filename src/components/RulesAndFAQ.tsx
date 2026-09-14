'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ShieldCheck, ChevronDown, HelpCircle, AlertTriangle } from 'lucide-react';

export const RulesAndFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="rules" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Fair Play & Tournament Rules Card */}
        <div className="rounded-3xl border border-purple-900/40 bg-surface-200/90 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-purple/20 text-neon-purple-light border border-neon-purple/40">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">FAIR PLAY CODE</span>
              <h2 className="text-2xl font-black text-white uppercase font-display">TOURNAMENT RULES</h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start space-x-3 rounded-2xl border border-neon-fire/30 bg-neon-fire/10 p-4">
              <AlertTriangle className="h-5 w-5 text-neon-fire shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-neon-fire uppercase font-display">EMULATOR & HACK BAN</h4>
                <p className="mt-1 text-slate-300 text-xs leading-relaxed">
                  PC emulators, auto-aim scripts, or modified APKs are strictly banned. Offenders face permanent account suspension and balance forfeiture.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-900/30 bg-surface-100 p-4 space-y-2">
              <h4 className="font-bold text-white uppercase font-display text-xs">1. ROOM CREDENTIAL SHARING</h4>
              <p className="text-xs text-slate-400">
                Custom Room ID and Password are sent 15 minutes prior to match launch. Never leak credentials to non-registered players.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/30 bg-surface-100 p-4 space-y-2">
              <h4 className="font-bold text-white uppercase font-display text-xs">2. IN-GAME NAME (IGN) MATCHING</h4>
              <p className="text-xs text-slate-400">
                Your Free Fire IGN must match your registered profile exactly. Mismatched players will be kicked from the room without refund.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/30 bg-surface-100 p-4 space-y-2">
              <h4 className="font-bold text-white uppercase font-display text-xs">3. WINNING DISBURSEMENT</h4>
              <p className="text-xs text-slate-400">
                Rewards and per-kill cash bonuses are calculated and credited automatically to your PKR wallet within 30 minutes of match conclusion.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="rounded-3xl border border-purple-900/40 bg-surface-200/90 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">GOT QUESTIONS?</span>
              <h2 className="text-2xl font-black text-white uppercase font-display">FREQUENTLY ASKED QUESTIONS</h2>
            </div>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="rounded-2xl border border-purple-900/30 bg-surface-100 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-white hover:text-neon-purple-light transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-neon-purple-light' : 'text-slate-400'}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 border-t border-purple-900/20 pt-3 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
