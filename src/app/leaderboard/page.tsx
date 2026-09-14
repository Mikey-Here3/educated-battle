'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Leaderboard } from '@/components/Leaderboard';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={1250} />
      
      <main className="flex-grow pt-4">
        <Leaderboard />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
