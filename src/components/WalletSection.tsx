'use client';

import React, { useState } from 'react';
import { Wallet, PlusCircle, ArrowUpRight, ArrowDownLeft, ShieldCheck, UploadCloud, CheckCircle2, Copy, Check, Flame, Clock, Sparkles } from 'lucide-react';

interface WalletSectionProps {
  userBalance: number;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ userBalance }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [amount, setAmount] = useState<number>(100);
  const [trxId, setTrxId] = useState<string>('');
  const [copiedNum, setCopiedNum] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const accountNumber = '03319169584';
  const accountName = 'HUMAIRA AKHTAR';

  const handleCopy = (text: string, type: 'num' | 'name') => {
    navigator.clipboard.writeText(text);
    if (type === 'num') {
      setCopiedNum(true);
      setTimeout(() => setCopiedNum(false), 2000);
    } else {
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTrxId('');
    }, 4000);
  };

  return (
    <section id="wallet" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-neon-purple-light font-bold text-xs uppercase tracking-widest mb-1">
            <span className="h-2 w-2 rounded-full bg-neon-purple-light animate-ping" />
            <span>PAKISTAN ESCROW & PAYOUTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
            ADD COINS & WALLET
          </h2>
        </div>

        {/* Top Summary Balance Cards (Matching Screenshot) */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="rounded-2xl border border-purple-900/40 bg-surface-200/90 p-4 text-center backdrop-blur-md">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">DEPOSITED</span>
            <p className="text-2xl font-black text-white font-display">PKR {userBalance.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-neon-purple/40 bg-surface-200/90 p-4 text-center backdrop-blur-md">
            <span className="text-[10px] font-black uppercase text-neon-purple-light tracking-wider">WINNING</span>
            <p className="text-2xl font-black text-neon-gold font-display">PKR 850</p>
          </div>
        </div>
      </div>

      {/* Main Deposit Offer & Payment Container */}
      <div className="space-y-6">
        
        {/* Active Deposit Offer Banner Card (Matching Screenshot media_1789373862733.png) */}
        <div className="rounded-3xl border border-neon-purple/50 bg-gradient-to-r from-purple-950/80 via-surface-200 to-slate-950 p-5 sm:p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-neon-cyan tracking-wider flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-neon-gold" />
              <span>ACTIVE DEPOSIT OFFERS</span>
            </span>
            <span className="rounded-full bg-neon-green/20 px-3 py-1 text-xs font-black text-neon-green border border-neon-green/40">
              +10% EXTRA
            </span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-neon-gold to-amber-600 p-0.5 shadow-lg shrink-0">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-surface-100">
                  <Flame className="h-7 w-7 text-neon-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase font-display flex items-center space-x-2">
                  <span>DEPOSIT OFFER 🔥</span>
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  🎁 10% EXTRA Deposit Bonus LIVE — Minimum 100 Deposit
                </p>
                
                <div className="flex items-center space-x-3 mt-2">
                  <span className="rounded-md bg-surface-300 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    Min 💰 100
                  </span>
                  <span className="rounded-md bg-neon-fire/20 px-2 py-0.5 text-[10px] font-bold text-neon-fire border border-neon-fire/30 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>16d 9h left</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Payment Method Grid (Matching Screenshot) */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
            SELECT PAYMENT METHOD
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Easypaisa Option Card */}
            <button
              type="button"
              onClick={() => setPaymentMethod('easypaisa')}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                paymentMethod === 'easypaisa'
                  ? 'border-neon-purple-light bg-surface-200 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-2 ring-neon-purple-light/50'
                  : 'border-purple-900/40 bg-surface-100/60 hover:bg-surface-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white font-display">Easypaisa</h4>
                <span className="h-3 w-3 rounded-full bg-neon-green shadow-[0_0_8px_#00ff88]" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">{accountNumber}</p>
            </button>

            {/* JazzCash Option Card */}
            <button
              type="button"
              onClick={() => setPaymentMethod('jazzcash')}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                paymentMethod === 'jazzcash'
                  ? 'border-neon-purple-light bg-surface-200 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-2 ring-neon-purple-light/50'
                  : 'border-purple-900/40 bg-surface-100/60 hover:bg-surface-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white font-display">JazzCash</h4>
                <span className="h-3 w-3 rounded-full bg-neon-fire shadow-[0_0_8px_#ff0055]" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">{accountNumber}</p>
            </button>

          </div>
        </div>

        {/* Send Payment To Details Card (Matching Screenshot media_1789373862733.png) */}
        <div className="rounded-3xl border border-neon-purple/40 bg-surface-200/90 p-6 space-y-4">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
            SEND PAYMENT TO ({paymentMethod.toUpperCase()})
          </span>

          <div className="space-y-3">
            
            {/* Account Number Box with Copy */}
            <div className="flex items-center justify-between rounded-2xl border border-purple-900/40 bg-surface-100 p-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">ACCOUNT NUMBER</span>
                <p className="text-xl font-black text-white font-mono tracking-wider">{accountNumber}</p>
              </div>
              <button
                onClick={() => handleCopy(accountNumber, 'num')}
                className="flex items-center space-x-1.5 rounded-xl border border-purple-900/50 bg-surface-300 p-2.5 text-slate-300 hover:text-white hover:border-neon-cyan transition-colors"
                title="Copy Account Number"
              >
                {copiedNum ? <Check className="h-5 w-5 text-neon-green" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>

            {/* Account Name Box with Copy */}
            <div className="flex items-center justify-between rounded-2xl border border-purple-900/40 bg-surface-100 p-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">ACCOUNT NAME</span>
                <p className="text-lg font-black text-neon-cyan font-display tracking-wide">{accountName}</p>
              </div>
              <button
                onClick={() => handleCopy(accountName, 'name')}
                className="flex items-center space-x-1.5 rounded-xl border border-purple-900/50 bg-surface-300 p-2.5 text-slate-300 hover:text-white hover:border-neon-cyan transition-colors"
                title="Copy Account Name"
              >
                {copiedName ? <Check className="h-5 w-5 text-neon-green" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Deposit Submission Form */}
        <form onSubmit={handleDepositSubmit} className="space-y-5 rounded-3xl border border-purple-900/30 bg-surface-200/70 p-6">
          
          {/* Amount Box */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
              AMOUNT (PKR COINS)
            </label>
            <input
              type="number"
              min={50}
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Minimum deposit: 50"
              className="w-full rounded-xl border border-purple-900/40 bg-surface-100 px-4 py-3 text-base font-bold text-white focus:border-neon-purple focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">Minimum deposit: PKR 50</p>
          </div>

          {/* Screenshot Dropzone */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
              ATTACH PAYMENT SCREENSHOT
            </label>
            <div className="rounded-2xl border-2 border-dashed border-purple-900/50 bg-surface-100 p-6 text-center hover:border-neon-purple transition-colors cursor-pointer">
              <UploadCloud className="mx-auto h-8 w-8 text-neon-purple-light mb-2" />
              <p className="text-xs text-slate-300 font-semibold">
                Tap to upload receipt screenshot (Cloudinary ready)
              </p>
              <p className="text-[10px] text-slate-500 mt-1">PNG, JPG or WEBP up to 5MB</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-neon-purple-dark via-neon-purple to-neon-purple-light py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:scale-102 active:scale-95"
          >
            CONFIRM PAYMENT & SUBMIT RECEIPT
          </button>

        </form>

      </div>

    </section>
  );
};
