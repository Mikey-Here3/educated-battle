'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTournaments } from '@/context/TournamentContext';
import { PLATFORM_CONFIG } from '@/data/config';

import { 
  Wallet, 
  ArrowUpRight, 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Lock, 
  AlertCircle,
  LogIn, 
  ArrowDownLeft,
  Receipt,
  FileText,
  Smartphone,
  Info
} from 'lucide-react';

interface WalletSectionProps {
  userBalance?: number;
}

export const WalletSection: React.FC<WalletSectionProps> = () => {
  const { currentUser, refreshUser } = useAuth();
  const { submitDeposit, submitWithdrawal, deposits, withdrawals, refreshTransactions } = useTournaments();
  
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'EasyPaisa'>('JazzCash');
  const [withdrawMethod, setWithdrawMethod] = useState<'JazzCash' | 'EasyPaisa'>('JazzCash');
  
  // Deposit form state
  const [amount, setAmount] = useState<number>(100);
  const [trxId, setTrxId] = useState<string>('');
  const [proofImage, setProofImage] = useState<string>('');
  const [imagePreviewName, setImagePreviewName] = useState<string>('');
  const [copiedNum, setCopiedNum] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<boolean>(false);
  const [submittingDeposit, setSubmittingDeposit] = useState<boolean>(false);
  const [depositMsg, setDepositMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Withdraw form state
  const [withdrawAmt, setWithdrawAmt] = useState<number>(200);
  const [withdrawPhone, setWithdrawPhone] = useState<string>(currentUser?.phone || '');
  const [withdrawTitle, setWithdrawTitle] = useState<string>(currentUser?.name || '');
  const [submittingWithdraw, setSubmittingWithdraw] = useState<boolean>(false);
  const [withdrawMsg, setWithdrawMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Official Receiver Account Details (from PLATFORM_CONFIG)
  const officialNumber = paymentMethod === 'EasyPaisa' 
    ? PLATFORM_CONFIG.easyPaisa.accountNumber 
    : PLATFORM_CONFIG.jazzCash.accountNumber;
  const officialName = paymentMethod === 'EasyPaisa' 
    ? PLATFORM_CONFIG.easyPaisa.accountTitle 
    : PLATFORM_CONFIG.jazzCash.accountTitle;


  useEffect(() => {
    if (currentUser) {
      if (!withdrawPhone && currentUser.phone) setWithdrawPhone(currentUser.phone);
      if (!withdrawTitle && currentUser.name) setWithdrawTitle(currentUser.name);
    }
  }, [currentUser]);

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
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB.');
        return;
      }
      setImagePreviewName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (amount < 50) {
      setDepositMsg({ text: 'Minimum deposit is PKR 50.', error: true });
      return;
    }

    if (!trxId.trim()) {
      setDepositMsg({ text: 'Please enter the Transaction ID (TID) from your SMS receipt.', error: true });
      return;
    }

    setSubmittingDeposit(true);
    setDepositMsg(null);

    const res = await submitDeposit({
      userId: currentUser.id,
      user: `${currentUser.name} (${currentUser.ign})`,
      uid: currentUser.uid,
      method: paymentMethod,
      amt: Number(amount),
      trxId: trxId.trim(),
      proofUrl: proofImage || '',
    });

    setSubmittingDeposit(false);

    if (res.success) {
      setDepositMsg({ text: 'Deposit receipt submitted successfully! Admin will verify and credit your coins within 5-10 minutes.' });
      setProofImage('');
      setImagePreviewName('');
      setTrxId('');
      refreshTransactions();
    } else {
      setDepositMsg({ text: res.error || 'Failed to submit deposit. Please check details.', error: true });
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const winnings = currentUser.winningPKR || 0;
    if (withdrawAmt < 200) {
      setWithdrawMsg({ text: 'Minimum withdrawal amount is PKR 200.', error: true });
      return;
    }

    if (withdrawAmt > winnings) {
      setWithdrawMsg({ text: `Requested PKR ${withdrawAmt.toLocaleString()} exceeds your withdrawable winnings of PKR ${winnings.toLocaleString()}.`, error: true });
      return;
    }

    const phoneRegex = /^03\d{9}$/;
    const cleanPhone = withdrawPhone.trim().replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setWithdrawMsg({ text: 'Please enter a valid 11-digit Pakistani mobile number starting with 03 (e.g. 03190799711).', error: true });
      return;
    }

    if (withdrawTitle.trim().length < 3) {
      setWithdrawMsg({ text: 'Please enter full Account Title as registered on your mobile account.', error: true });
      return;
    }

    setSubmittingWithdraw(true);
    setWithdrawMsg(null);

    const res = await submitWithdrawal({
      userId: currentUser.id,
      user: `${currentUser.name} (${currentUser.ign})`,
      uid: currentUser.uid,
      method: withdrawMethod,
      accountNumber: cleanPhone,
      accountTitle: withdrawTitle.trim(),
      amt: Number(withdrawAmt),
    });

    setSubmittingWithdraw(false);

    if (res.success) {
      setWithdrawMsg({ text: `Cash out request of PKR ${withdrawAmt.toLocaleString()} submitted via ${withdrawMethod}. Transferred to ${cleanPhone} within 1-2 hours.` });
      await refreshUser();
      refreshTransactions();
    } else {
      setWithdrawMsg({ text: res.error || 'Withdrawal failed. Please check your winnings balance.', error: true });
    }
  };

  // Combine user transactions
  const userTransactions = [
    ...deposits.map(d => ({ ...d, type: 'DEPOSIT' })),
    ...withdrawals.map(w => ({ ...w, type: 'WITHDRAWAL' }))
  ].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <section id="wallet" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>FINANCIAL VAULT &amp; ESCROW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
            COIN WALLET &amp; PAYOUTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
            Real balance management. Add coins via JazzCash / EasyPaisa to enter matches, and withdraw prize winnings directly to your account.
          </p>
        </div>

        {/* Real Balance Cards */}
        {currentUser ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full md:w-auto">
            <div className="rounded-2xl border border-white/10 bg-surface-200/95 p-3.5 sm:p-4 text-center backdrop-blur-md">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">AVAILABLE BALANCE</span>
              <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                PKR {currentUser.balancePKR.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-neon-gold/50 bg-surface-200/95 p-3.5 sm:p-4 text-center backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.15)]">
              <span className="text-[10px] font-black uppercase text-neon-gold tracking-wider">WINNINGS (CASHOUT)</span>
              <p className="text-xl sm:text-2xl font-black text-neon-gold font-display mt-0.5">
                PKR {(currentUser.winningPKR || 0).toLocaleString()}
              </p>
            </div>
            <div className="hidden sm:block rounded-2xl border border-white/10 bg-surface-200/95 p-3.5 sm:p-4 text-center backdrop-blur-md">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">RESERVED IN MATCHES</span>
              <p className="text-xl sm:text-2xl font-black text-slate-300 font-display mt-0.5">
                PKR {(currentUser.reservedPKR || 0).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="rounded-2xl border border-white/10 bg-surface-200/90 p-3.5 sm:p-4 text-center backdrop-blur-md flex-grow">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">GUEST MODE</span>
              <p className="text-xs sm:text-sm font-black text-slate-300">Sign in to manage real coins</p>
            </div>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-5 py-4 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] transition shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>

      {/* Modern Tab Switcher: Deposit / Withdraw / History */}
      <div className="flex items-center p-1 rounded-2xl bg-surface-200 border border-white/10 max-w-lg mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition whitespace-nowrap flex-1 ${
            activeTab === 'deposit'
              ? 'bg-primary text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Add Coins (Deposit)</span>
        </button>

        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition whitespace-nowrap flex-1 ${
            activeTab === 'withdraw'
              ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Cash Out (Withdraw)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition whitespace-nowrap flex-1 ${
            activeTab === 'history'
              ? 'bg-surface-300 text-white border border-white/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>History</span>
        </button>
      </div>

      {activeTab === 'deposit' && (
        /* ================= DEPOSIT TAB ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Instructions & Account Details */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-3xl border border-white/10 bg-surface-200/90 p-6 space-y-4">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>SELECT PAYMENT CHANNEL</span>
              </span>

              {/* Method Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('JazzCash')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    paymentMethod === 'JazzCash'
                      ? 'border-primary bg-surface-100 ring-2 ring-primary/40 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                      : 'border-white/10 bg-surface-200 hover:bg-surface-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-base text-white">JazzCash</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Instant mobile wallet transfer</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('EasyPaisa')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    paymentMethod === 'EasyPaisa'
                      ? 'border-emerald-500 bg-surface-100 ring-2 ring-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'border-white/10 bg-surface-200 hover:bg-surface-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-base text-white">EasyPaisa</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Instant mobile wallet transfer</p>
                </button>
              </div>

              {/* Account Details Box */}
              <div className="rounded-2xl border border-primary/30 bg-surface-100 p-5 space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    TRANSFER TO ({paymentMethod.toUpperCase()})
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-2xl font-black text-white font-mono tracking-wide">{officialNumber}</p>
                    <button
                      onClick={() => handleCopy(officialNumber, 'num')}
                      className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-surface-200 px-3 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-primary transition"
                    >
                      {copiedNum ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedNum ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">ACCOUNT TITLE</span>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-black text-neon-gold font-display uppercase">{officialName}</p>
                    <button
                      onClick={() => handleCopy(officialName, 'name')}
                      className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-surface-200 px-3 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-primary transition"
                    >
                      {copiedName ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedName ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick instructions */}
              <div className="rounded-2xl bg-surface-100/60 p-4 text-xs text-slate-300 space-y-2 border border-white/5">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Deposit Instructions:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                  <li>Open your JazzCash or EasyPaisa app on your mobile phone.</li>
                  <li>Send desired amount to <strong className="text-white">{officialNumber}</strong> ({officialName}).</li>
                  <li>Copy the <strong>Transaction ID (TID)</strong> from the confirmation SMS/App.</li>
                  <li>Enter the TID and upload the screenshot below for instant verification.</li>
                </ol>
              </div>

            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-6">
            {currentUser ? (
              <form onSubmit={handleDepositSubmit} className="rounded-3xl border border-white/10 bg-surface-200/90 p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-black text-white font-display uppercase">Transmit Deposit Proof</h3>
                  <span className="text-xs font-bold text-slate-400">Min PKR 50</span>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                    Amount Sent (PKR Coins) *
                  </label>
                  <input
                    type="number"
                    min={50}
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-base font-bold text-white focus:border-primary focus:outline-none"
                    placeholder="e.g. 100"
                  />
                </div>

                {/* Transaction ID */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                    {paymentMethod} Transaction ID (TID / Ref #) *
                  </label>
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 98412048102"
                    className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-sm font-mono text-white focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                    Payment Screenshot Receipt (Optional but Speeds Up Approval)
                  </label>
                  <label className="relative block rounded-2xl border-2 border-dashed border-white/15 bg-surface-100 p-5 text-center hover:border-primary transition-colors cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {proofImage ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="relative h-24 w-36 rounded-xl overflow-hidden border border-primary/50">
                          <img src={proofImage} alt="Receipt preview" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{imagePreviewName || 'Receipt Attached'}</span>
                        </span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="mx-auto h-7 w-7 text-primary mb-1.5" />
                        <p className="text-xs text-slate-300 font-semibold">Tap to upload transaction screenshot</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">PNG, JPG or WEBP up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Feedback Message */}
                {depositMsg && (
                  <div className={`flex items-center gap-2 rounded-xl p-4 text-xs font-bold ${
                    depositMsg.error 
                      ? 'border border-rose-500/50 bg-rose-500/10 text-rose-400' 
                      : 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {depositMsg.error ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
                    <span>{depositMsg.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingDeposit}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark py-4 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(14,165,233,0.4)] transition hover:shadow-[0_0_35px_rgba(14,165,233,0.6)] disabled:opacity-50"
                >
                  {submittingDeposit ? 'Submitting Receipt...' : 'SUBMIT DEPOSIT RECEIPT'}
                </button>
              </form>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-8 text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 mx-auto">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-white font-display uppercase">Sign In to Add Coins</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Create or sign in with your verified Free Fire UID to submit deposit receipts and receive instant coin balances.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:bg-primary-dark transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === 'withdraw' && (
        /* ================= WITHDRAWAL TAB (REDESIGNED) ================= */
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-emerald-500/30 bg-surface-200/90 p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-black text-white uppercase font-display">Cash Out Tournament Winnings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Direct payout to your Pakistani mobile wallet within 1-2 hours.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-center">
                <span className="text-[10px] font-black uppercase text-emerald-400 block">WITHDRAWABLE</span>
                <span className="text-base font-black text-white font-mono">
                  PKR {(currentUser?.winningPKR || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {currentUser ? (
              <form onSubmit={handleWithdrawSubmit} className="space-y-5">
                
                {/* Method Selector */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-2">
                    SELECT CASHOUT METHOD *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWithdrawMethod('JazzCash')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        withdrawMethod === 'JazzCash'
                          ? 'border-emerald-500 bg-surface-100 ring-2 ring-emerald-500/30 font-bold text-white'
                          : 'border-white/10 bg-surface-200 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-display font-black block">JazzCash</span>
                      <span className="text-[10px] text-slate-400">Mobile Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWithdrawMethod('EasyPaisa')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        withdrawMethod === 'EasyPaisa'
                          ? 'border-emerald-500 bg-surface-100 ring-2 ring-emerald-500/30 font-bold text-white'
                          : 'border-white/10 bg-surface-200 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-display font-black block">EasyPaisa</span>
                      <span className="text-[10px] text-slate-400">Mobile Account</span>
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black uppercase text-slate-300">
                      Withdrawal Amount (PKR) *
                    </label>
                    <span className="text-[11px] text-slate-400">Minimum: PKR 200</span>
                  </div>
                  <input
                    type="number"
                    min={200}
                    max={currentUser.winningPKR || 200}
                    required
                    value={withdrawAmt}
                    onChange={(e) => setWithdrawAmt(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-base font-bold text-white focus:border-emerald-500 focus:outline-none font-mono"
                    placeholder="Min 200"
                  />
                  <div className="flex gap-2 mt-2">
                    {[200, 500, 1000, 2500].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWithdrawAmt(preset)}
                        className="px-2.5 py-1 rounded-lg bg-surface-100 border border-white/10 text-[10px] font-bold text-slate-300 hover:text-white hover:border-emerald-500 transition"
                      >
                        PKR {preset}
                      </button>
                    ))}
                    {currentUser.winningPKR > 0 && (
                      <button
                        type="button"
                        onClick={() => setWithdrawAmt(currentUser.winningPKR)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/30 transition"
                      >
                        All (PKR {currentUser.winningPKR})
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                    {withdrawMethod} Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={withdrawPhone}
                    onChange={(e) => setWithdrawPhone(e.target.value)}
                    placeholder="03XXXXXXXXX (11 digits)"
                    className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-sm font-mono text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Must be an active {withdrawMethod} account registered in Pakistan.</p>
                </div>

                {/* Account Title */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 mb-1.5">
                    Account Title / Full Name on Account *
                  </label>
                  <input
                    type="text"
                    required
                    value={withdrawTitle}
                    onChange={(e) => setWithdrawTitle(e.target.value)}
                    placeholder="e.g. Muhammad Asad"
                    className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Feedback */}
                {withdrawMsg && (
                  <div className={`flex items-center gap-2 rounded-xl p-4 text-xs font-bold ${
                    withdrawMsg.error
                      ? 'border border-rose-500/50 bg-rose-500/10 text-rose-400'
                      : 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {withdrawMsg.error ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
                    <span>{withdrawMsg.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingWithdraw || (currentUser.winningPKR || 0) < 200}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-4 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingWithdraw ? 'Processing Request...' : `CASH OUT PKR ${withdrawAmt.toLocaleString()} VIA ${withdrawMethod.toUpperCase()}`}
                </button>

                {(currentUser.winningPKR || 0) < 200 && (
                  <p className="text-center text-[11px] text-slate-500">
                    You need at least PKR 200 in tournament winnings to request cashouts. Play tournaments to win real cash prizes.
                  </p>
                )}

              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-slate-400">Please sign in to view and cash out your winnings.</p>
                <Link
                  href="/login"
                  className="inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-black uppercase text-black"
                >
                  Sign In
                </Link>
              </div>
            )}

          </div>
        </div>
      )}

      {activeTab === 'history' && (
        /* ================= REAL TRANSACTION HISTORY ================= */
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-surface-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white uppercase font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Verified Transaction Ledger</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {userTransactions.length} Total Records
              </span>
            </div>

            {userTransactions.length > 0 ? (
              <div className="divide-y divide-white/5 overflow-hidden">
                {userTransactions.map((tx) => {
                  const isDeposit = tx.type === 'DEPOSIT';
                  const isPending = tx.status === 'pending';
                  const isApproved = tx.status === 'approved';

                  return (
                    <div key={tx.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isDeposit ? 'bg-primary/20 text-primary' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {isDeposit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white">{isDeposit ? 'Deposit' : 'Cash Out'}</span>
                            <span className="font-mono text-[10px] text-slate-400">({tx.method})</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {tx.date} • {isDeposit ? `TID: ${(tx as any).trxId || 'N/A'}` : `To: ${(tx as any).accountNumber}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                        <span className={`font-mono font-black text-sm ${isDeposit ? 'text-white' : 'text-emerald-400'}`}>
                          {isDeposit ? `+ PKR ${tx.amt.toLocaleString()}` : `- PKR ${tx.amt.toLocaleString()}`}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                          isPending 
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : isApproved
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <Receipt className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-bold text-slate-400">No transactions recorded yet.</p>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                  Submit a deposit receipt above to add coins, or play tournaments to earn withdrawable cash prizes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
