'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useAuth } from '@/context/AuthContext';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Gamepad2, 
  User, 
  Sparkles,
  Youtube,
  ShieldCheck,
  Clock,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const { currentUser, submitContactQuery } = useAuth();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [uid, setUid] = useState(currentUser?.uid || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !uid || !message) return;

    submitContactQuery({
      name,
      phone,
      uid,
      subject: subject || 'General Tournament Inquiry',
      message,
    });

    setSubmitted(true);
    setMessage('');
    setSubject('');
  };

  const whatsappChannel = 'https://whatsapp.com/channel/0029VbD6gJE3WHTOMOkx252G';
  const youtubeChannel = 'https://www.youtube.com/channel/UCNCXkynVdk3Xt2MHjMwHXaw';

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-crimson font-bold text-xs uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>24/7 PLAYER SUPPORT & COMMUNITY HELP</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
            CONTACT ADMIN & SUPPORT
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Have a question about room slots, deposit confirmation, or tournament prizes? Submit a ticket or join our official WhatsApp channel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Direct Support Channels */}
          <div className="space-y-4">
            
            {/* WhatsApp Channel Card */}
            <a
              href={whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-emerald-500/40 bg-surface-100 p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">OFFICIAL WHATSAPP CHANNEL</span>
                  <h3 className="text-lg font-black text-white font-display">Join WhatsApp Channel</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Live match alerts & Room ID updates</p>
                </div>
              </div>
            </a>

            {/* YouTube Broadcast Card */}
            <a
              href={youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-red-500/40 bg-surface-100 p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-400 transition group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 shrink-0 group-hover:scale-105 transition-transform">
                  <Youtube className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-red-400 tracking-wider">OFFICIAL YOUTUBE</span>
                  <h3 className="text-lg font-black text-white font-display">EDUCATED GAMER</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Watch live tournament shoutcasting</p>
                </div>
              </div>
            </a>

            {/* Support Timings Box */}
            <div className="rounded-3xl border border-white/10 bg-surface-200/60 p-6 space-y-3">
              <div className="flex items-center space-x-2 text-neon-gold text-xs font-black uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>SUPPORT RESPONSE TIME</span>
              </div>
              <p className="text-xs text-slate-300">
                Deposit verifications and tournament tickets submitted here appear directly inside the Admin Control Portal. Average response: <strong>5 - 15 minutes</strong>.
              </p>
            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-crimson/30 bg-surface-100/90 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              
              <h3 className="text-xl font-black text-white uppercase font-display mb-1">
                Submit Support Query / Ticket
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All submitted queries are logged directly into the Administrator Deck.
              </p>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-6 text-center space-y-3">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h4 className="text-lg font-black text-white font-display uppercase">Query Logged in Admin Panel!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your inquiry with Free Fire UID <strong>{uid}</strong> has been transmitted to the Administrator Portal. Our moderator will review it shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 rounded-xl bg-surface-200 px-5 py-2 text-xs font-bold text-white hover:bg-surface-300 transition"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Asad Ali"
                          className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 03190799711"
                          className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Free Fire UID & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neon-gold mb-1.5">
                        Free Fire Player UID *
                      </label>
                      <div className="relative">
                        <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neon-gold" />
                        <input
                          type="text"
                          required
                          value={uid}
                          onChange={(e) => setUid(e.target.value)}
                          placeholder="e.g. 489201482"
                          className="w-full rounded-xl border border-neon-gold/40 bg-surface-200 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-neon-gold focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Inquiry Subject / Topic
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Deposit Trx ID, Slot Issue, Prize"
                        className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Detailed Message / Query *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your question or issue clearly..."
                      className="w-full rounded-xl border border-white/10 bg-surface-200 py-3 px-4 text-sm text-white placeholder-slate-500 focus:border-crimson focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_35px_rgba(255,0,60,0.6)] flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Query to Admin Desk</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
