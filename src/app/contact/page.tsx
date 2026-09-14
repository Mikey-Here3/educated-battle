'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Headphones, MessageSquareCode, Mail, Phone, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [subject, setSubject] = useState('Deposit Query');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMsg('');
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={1250} />
      
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-crimson/40 bg-surface-200 px-4 py-1.5 text-xs font-black uppercase text-crimson-light mb-3 shadow-[0_0_20px_rgba(255,0,60,0.2)]">
            <Headphones className="h-4 w-4" />
            <span>24/7 PAKISTAN LIVE SUPPORT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight">
            CONTACT & HELP CENTER
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Have questions about custom room credentials, EasyPaisa/JazzCash deposits, or prize payouts? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Direct Support Channels */}
          <div className="space-y-4">
            
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-green-500/40 bg-surface-200/90 p-6 hover:border-green-400 transition-all shadow-[0_0_25px_rgba(34,197,94,0.15)]"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-green-400 border border-green-500/40">
                  <MessageSquareCode className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-display uppercase">WHATSAPP SUPPORT</h3>
                  <p className="text-xs text-green-400 font-bold">Instant 24/7 Chat</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Tap to open WhatsApp chat directly with an Educated Gamer Pakistan admin.
              </p>
            </a>

            <div className="rounded-3xl border border-crimson/30 bg-surface-200/90 p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/20 text-crimson-light border border-crimson/40">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">HELPLINE NUMBER</h4>
                  <p className="text-xs text-neon-cyan font-mono font-bold">+92 340 9842109</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-purple-900/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">EMAIL SUPPORT</h4>
                  <p className="text-xs text-slate-300 font-mono">support@educatedgamer.pk</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 rounded-3xl border border-crimson/40 bg-surface-200/90 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-extrabold text-white font-display uppercase mb-4">
              SUBMIT SUPPORT TICKET
            </h3>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-14 w-14 text-neon-green animate-bounce" />
                <h4 className="text-xl font-black text-white uppercase font-display">SUPPORT TICKET SUBMITTED!</h4>
                <p className="text-sm text-slate-300">
                  An admin will review your query and contact you on WhatsApp or Email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Query Category
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-crimson/30 bg-surface-100 p-3 text-sm text-white focus:border-crimson focus:outline-none"
                  >
                    <option value="Deposit Query">Deposit / EasyPaisa / JazzCash Query</option>
                    <option value="Withdrawal Issue">Cash Withdrawal Request</option>
                    <option value="Match Room Credentials">Custom Room ID / Pass Problem</option>
                    <option value="Fair Play Report">Report Cheater / Emulator User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Your Query Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Describe your issue or include Trx ID / Tournament Match title..."
                    className="w-full rounded-xl border border-crimson/30 bg-surface-100 p-3 text-sm text-white focus:border-crimson focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-crimson-dark via-crimson to-crimson-light py-3.5 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] transition-all hover:scale-102"
                >
                  <Send className="h-4 w-4" />
                  <span>SUBMIT TICKET NOW</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
