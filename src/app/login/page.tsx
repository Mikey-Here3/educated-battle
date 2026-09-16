'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft, 
  Shield, 
  User, 
  Phone, 
  Gamepad2, 
  CheckCircle2 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  // Sign Up fields
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [phone, setPhone] = useState('');
  const [ign, setIgn] = useState('');
  const [uid, setUid] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (res.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/matches');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signup({
      name,
      email: signupEmail,
      pass: signupPass,
      phone,
      ign,
      uid,
    });
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Account created successfully! Redirecting to arena...');
      setTimeout(() => {
        router.push('/matches');
      }, 1500);
    } else {
      setError(res.error || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-neon-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 my-auto">
        
        {/* Back navigation */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-primary" />
            Back to Arena
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-200 border border-white/10 text-xs font-bold text-slate-400">
            <Shield className="w-3.5 h-3.5 text-primary" /> Secure Console
          </span>
        </div>

        {/* Stable Non-Remounting Card Container (Fixes Mobile Virtual Keyboard Focus Drop) */}
        <div className="rounded-3xl border border-primary/30 bg-surface-100/98 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {/* Logo Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative h-12 sm:h-14 w-44 sm:w-48 mb-3">
              <Image src="/logo.svg" alt="Educated Gamer" fill priority className="object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-display">
              {tab === 'signin' ? 'Player & Admin Sign In' : 'Create Gamer Account'}
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              {tab === 'signin' 
                ? 'Sign in to access your coin wallet, join rooms & view match credentials.' 
                : 'Register with your verified Free Fire UID to compete for real PKR prizes.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-surface-200 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => { setTab('signin'); setError(''); }}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                tab === 'signin'
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setError(''); }}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                tab === 'signup'
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error / Success Notifications */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/50 bg-rose-500/10 p-3 mb-4 text-xs font-semibold text-rose-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-3 mb-4 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Sign In Form */}
          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. player@educatedgamer.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 rounded-xl bg-primary hover:bg-primary/90 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.4)] transition disabled:opacity-60"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Ali"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Free Fire UID & IGN Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neon-gold mb-1">
                    Free Fire Player UID *
                  </label>
                  <div className="relative">
                    <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neon-gold" />
                    <input
                      type="text"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      placeholder="e.g. 489201482"
                      required
                      className="w-full rounded-xl border border-neon-gold/40 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-neon-gold focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neon-gold mb-1">
                    Free Fire IGN / Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neon-gold" />
                    <input
                      type="text"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                      placeholder="e.g. PK_LEGEND_99"
                      required
                      className="w-full rounded-xl border border-neon-gold/40 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-neon-gold focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp / Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 03190799711"
                    required
                    autoComplete="tel"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition font-mono"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. player@gmail.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    placeholder="Create a secure password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 rounded-xl bg-primary hover:bg-primary/90 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.4)] transition disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Register & Join Arena'}
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-slate-400">
              Admin credentials directly grant management deck privileges upon login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
