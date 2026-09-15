'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.role === 'admin') {
        router.push('/admin');
        router.refresh();
      } else if (res.ok) {
        router.push('/profile');
      } else {
        setError(data.error || 'Invalid credentials. Please check and try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-neon-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-crimson" />
            Back to Arena
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-200 border border-white/10 text-xs font-bold text-slate-400">
            <Shield className="w-3.5 h-3.5 text-crimson" /> Secure Portal
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-crimson/30 bg-surface-100/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative h-14 w-48 mb-4">
              <Image src="/logo.svg" alt="Educated Gamer" fill priority className="object-contain" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider font-display">
              Player & Admin Sign In
            </h1>
            <p className="text-slate-400 text-xs mt-1.5">
              Sign in with your verified credentials to enter the console.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Account Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@educatedgamer.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Password / Passkey
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-surface-200/80 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson transition"
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

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-xl border border-crimson/50 bg-crimson/10 px-4 py-3 text-xs font-semibold text-crimson"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_35px_rgba(255,0,60,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              Admin credentials directly grant management deck privileges.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
