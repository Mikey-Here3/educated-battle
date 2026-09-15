'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTournaments } from '@/context/TournamentContext';
import { 
  Wallet, 
  ArrowUpRight, 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  Flame, 
  Clock, 
  Sparkles, 
  Lock, 
  AlertTriangle,
  LogIn,
  UserCheck,
  Image as ImageIcon,
  ArrowDownLeft,
  X
} from 'lucide-react';

interface WalletSectionProps {
  userBalance?: number;
}

export const WalletSection: React.FC<WalletSectionProps> = () => {
  const { currentUser } = useAuth();
  const { submitDeposit, submitWithdrawal } = useTournaments();
  
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa'>('jazzcash');
  
  // Deposit form state
  const [amount, setAmount] = useState<number>(100);
  const [trxId, setTrxId] = useState<string>('');
  const [proofImage, setProofImage] = useState<string>('');
  const [imagePreviewName, setImagePreviewName] = useState<string>('');
  const [copiedNum, setCopiedNum] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Withdraw form state
  const [withdrawAmt, setWithdrawAmt] = useState<number>(500);
  const [withdrawPhone, setWithdrawPhone] = useState<string>(currentUser?.phone || '');
  const [withdrawTitle, setWithdrawTitle] = useState<string>(currentUser?.name || '');
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);

  // JazzCash details
  const jazzCashNumber = '03190799711';
  const jazzCashName = 'Ashan Akhtar';

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreviewName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    submitDeposit({
      userId: currentUser.id,
      user: `${currentUser.name} (${currentUser.ign})`,
      uid: currentUser.uid,
      method: 'JazzCash',
      amt: Number(amount),
      trxId: trxId || 'JAZZ-TRX-PENDING',
      proofUrl: proofImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    });

    setSubmitted(true);
    setProofImage('');
    setImagePreviewName('');
    setTrxId('');
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    submitWithdrawal({
      userId: currentUser.id,
      user: `${currentUser.name} (${currentUser.ign})`,
      uid: currentUser.uid,
      method: 'JazzCash',
      accountNumber: withdrawPhone,
      accountTitle: withdrawTitle,
      amt: Number(withdrawAmt),
    });

    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
    }, 5000);
  };

  return (
    <section id="wallet" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-crimson font-bold text-xs uppercase tracking-widest mb-1">
            <span className="h-2 w-2 rounded-full bg-crimson animate-ping" />
            <span>PAKISTAN ESCROW &amp; PAYOUTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
            COIN WALLET &amp; WITHDRAWALS
          </h2>
        </div>

        {/* Top Balance Summary Cards */}
        {currentUser ? (
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-4 text-center backdrop-blur-md">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">DEPOSITED</span>
              <p className="text-2xl font-black text-white font-display">PKR {currentUser.balancePKR.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-neon-gold/40 bg-surface-200/90 p-4 text-center backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.15)]">
              <span className="text-[10px] font-black uppercase text-neon-gold tracking-wider">WINNINGS</span>
              <p className="text-2xl font-black text-neon-gold font-display">PKR {currentUser.winningPKR.toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-4 text-center backdrop-blur-md flex-grow">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">GUEST MODE</span>
              <p className="text-sm font-black text-slate-300">Sign in to view real balance</p>
            </div>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark px-5 py-4 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:shadow-[0_0_30px_rgba(255,0,60,0.6)] transition shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>

      {/* Tab Switcher: Deposit Coins vs Withdraw Winnings */}
      <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-surface-200 border border-white/10 max-w-md mb-6">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            activeTab === 'deposit'
              ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Add Coins (Deposit)</span>
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            activeTab === 'withdraw'
              ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Cash Out (Withdraw)</span>
        </button>
      </div>

      {activeTab === 'deposit' ? (
        /* ================= DEPOSIT TAB ================= */
        <div className="space-y-6">
          
          {/* Active Deposit Offer Banner */}
          <div className="rounded-3xl border border-crimson/50 bg-gradient-to-r from-crimson/15 via-surface-200 to-black p-5 sm:p-6 shadow-[0_0_30px_rgba(255,0,60,0.2)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-neon-gold tracking-wider flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-neon-gold" />
                <span>ACTIVE DEPOSIT OFFERS</span>
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/40">
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
                    <span>DEPOSIT OFFER ??</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    ?? 10% EXTRA Deposit Bonus LIVE ? Minimum 100 Deposit
                  </p>
                  
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="rounded-md bg-surface-300 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      Min ?? 100
                    </span>
                    <span className="rounded-md bg-crimson/20 px-2 py-0.5 text-[10px] font-bold text-crimson border border-crimson/30 flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Active Offer</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Select Payment Method Grid */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              SELECT PAYMENT METHOD
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* JazzCash Option Card (ACTIVE) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                  paymentMethod === 'jazzcash'
                    ? 'border-crimson bg-surface-200 shadow-[0_0_25px_rgba(255,0,60,0.35)] ring-2 ring-crimson/50'
                    : 'border-white/10 bg-surface-100/60 hover:bg-surface-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white font-display">JazzCash</h4>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono mt-1">{jazzCashNumber} ? {jazzCashName}</p>
              </button>

              {/* Easypaisa Option Card (DISABLED) */}
              <div
                className="rounded-2xl border border-white/5 bg-surface-100/40 p-5 text-left opacity-60 cursor-not-allowed relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-slate-400 font-display">EasyPaisa</h4>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/40">
                    <AlertTriangle className="h-3 w-3" />
                    <span>IN PROCESS</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">Temporarily Under Maintenance ? Use JazzCash</p>
              </div>

            </div>
          </div>

          {/* Send Payment To Details Card (JazzCash) */}
          <div className="rounded-3xl border border-crimson/40 bg-surface-200/90 p-6 space-y-4">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
              SEND PAYMENT TO (JAZZCASH)
            </span>

            <div className="space-y-3">
              
              {/* Account Number Box with Copy */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-100 p-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">JAZZCASH ACCOUNT NUMBER</span>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-wider">{jazzCashNumber}</p>
                </div>
                <button
                  onClick={() => handleCopy(jazzCashNumber, 'num')}
                  className="flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-surface-300 px-3 py-2.5 text-slate-200 hover:text-white hover:bg-crimson transition-colors"
                >
                  {copiedNum ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                  <span className="text-xs font-bold">{copiedNum ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* Account Name Box with Copy */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-100 p-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">ACCOUNT TITLE / NAME</span>
                  <p className="text-lg sm:text-xl font-black text-neon-gold font-display tracking-wide uppercase">{jazzCashName}</p>
                </div>
                <button
                  onClick={() => handleCopy(jazzCashName, 'name')}
                  className="flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-surface-300 px-3 py-2.5 text-slate-200 hover:text-white hover:bg-crimson transition-colors"
                >
                  {copiedName ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                  <span className="text-xs font-bold">{copiedName ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Deposit Submission Form */}
          {currentUser ? (
            <form onSubmit={handleDepositSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-surface-200/70 p-6">
              
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
                  className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-base font-bold text-white focus:border-crimson focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Minimum deposit: PKR 50</p>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                  JAZZCASH TRANSACTION ID (TID / REF) *
                </label>
                <input
                  type="text"
                  required
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="e.g. 98412048102"
                  className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-sm font-bold text-white focus:border-crimson focus:outline-none"
                />
              </div>

              {/* Screenshot Dropzone with REAL file reader */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-1.5">
                  ATTACH PAYMENT SCREENSHOT RECEIPT *
                </label>
                <label className="relative block rounded-2xl border-2 border-dashed border-white/15 bg-surface-100 p-6 text-center hover:border-crimson transition-colors cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  
                  {proofImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative h-28 w-44 rounded-xl overflow-hidden border border-crimson/50 shadow-md">
                        <img src={proofImage} alt="Receipt preview" className="h-full w-full object-cover" />
                      </div>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Screenshot Attached ({imagePreviewName})</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Click to change file</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto h-8 w-8 text-crimson mb-2" />
                      <p className="text-xs text-slate-300 font-semibold">
                        Tap to upload JazzCash transaction screenshot
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">PNG, JPG or WEBP (Directly visible to Admin)</p>
                    </>
                  )}
                </label>
              </div>

              {submitted && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>Deposit submitted! Admin will verify your screenshot and credit your coins in 5-10 minutes.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,0,60,0.4)] transition-all hover:shadow-[0_0_40px_rgba(255,0,60,0.6)]"
              >
                CONFIRM PAYMENT &amp; TRANSMIT RECEIPT
              </button>

            </form>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-8 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/30 mx-auto">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-white font-display uppercase">Sign In to Add Coins &amp; Join Tournaments</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You must be signed in with your verified Free Fire UID to submit deposit receipts and receive instant coin balances.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="rounded-xl bg-crimson px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:bg-crimson-dark transition"
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* ================= WITHDRAWAL TAB ================= */
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-emerald-500/30 bg-surface-100 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-black text-white uppercase font-display">Withdraw Tournament Winnings</h3>
              <p className="text-xs text-slate-400 mt-1">Cash out your verified prize winnings directly to your JazzCash mobile account.</p>
            </div>

            {currentUser ? (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-surface-200 p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Available Winnings:</span>
                  <span className="text-xl font-black text-neon-gold font-mono">PKR {currentUser.winningPKR.toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Withdrawal Amount (PKR) *
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={currentUser.winningPKR || 100000}
                    required
                    value={withdrawAmt}
                    onChange={(e) => setWithdrawAmt(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Minimum payout: PKR 100</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    JazzCash Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={withdrawPhone}
                    onChange={(e) => setWithdrawPhone(e.target.value)}
                    placeholder="e.g. 03190799711"
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-sm font-mono text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    JazzCash Account Title / Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={withdrawTitle}
                    onChange={(e) => setWithdrawTitle(e.target.value)}
                    placeholder="e.g. Asad Ali"
                    className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {withdrawSuccess && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Withdrawal request submitted! Admin will transfer funds to your JazzCash account within 1-2 hours.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-102 transition"
                >
                  REQUEST JAZZCASH WITHDRAWAL
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-slate-400 mb-4">Please sign in to request prize cashouts.</p>
                <Link
                  href="/login"
                  className="rounded-xl bg-crimson px-6 py-2.5 text-xs font-bold text-white uppercase"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
