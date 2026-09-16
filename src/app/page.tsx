'use client';

import React, { useState } from 'react';
import { EntranceLoader } from '@/components/EntranceLoader';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedTournaments } from '@/components/FeaturedTournaments';
import { PromoCarousel } from '@/components/PromoCarousel';
import { TournamentGrid } from '@/components/TournamentGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyEducatedGamer } from '@/components/WhyEducatedGamer';
import { Leaderboard } from '@/components/Leaderboard';
import { RulesAndFAQ } from '@/components/RulesAndFAQ';
import { CommunityHub } from '@/components/CommunityHub';
import { Footer } from '@/components/Footer';

import { JoinTournamentModal } from '@/components/modals/JoinTournamentModal';
import { RoomDetailsModal } from '@/components/modals/RoomDetailsModal';
import { TournamentDetailModal } from '@/components/modals/TournamentDetailModal';

import { useTournaments } from '@/context/TournamentContext';
import { Tournament } from '@/data/mockData';

export default function Home() {
  const { tournaments } = useTournaments();

  // Modals state
  const [activeJoinTournament, setActiveJoinTournament] = useState<Tournament | null>(null);
  const [activeRoomDetailsTournament, setActiveRoomDetailsTournament] = useState<Tournament | null>(null);
  const [activeDetailTournament, setActiveDetailTournament] = useState<Tournament | null>(null);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      
      {/* Splash Entrance Loader */}
      <EntranceLoader onComplete={() => {}} />

      {/* Responsive Header */}
      <Navbar />

      {/* Main Home Sections */}
      <main className="flex-grow">
        {/* Cinematic Esports Hero */}
        <Hero />

        {/* 🏆 Featured Tournaments Showcase (Live & Starting Soon) */}
        <FeaturedTournaments
          tournaments={tournaments}
          onJoin={(t) => setActiveJoinTournament(t)}
          onViewDetails={(t) => setActiveDetailTournament(t)}
        />

        {/* Action Promotions Banner */}
        <PromoCarousel
          onOpenWallet={() => {}}
          onJoinCommunity={() => {}}
          onExploreTournaments={() => {}}
        />

        {/* Complete Tournament Arena Grid with Real Filters */}
        <TournamentGrid
          tournaments={tournaments}
          onJoin={(t) => setActiveJoinTournament(t)}
          onViewRoomDetails={(t) => setActiveRoomDetailsTournament(t)}
          onViewDetails={(t) => setActiveDetailTournament(t)}
        />

        {/* How It Works: 5 Simple Steps */}
        <HowItWorks />

        {/* Why Educated Gamer: Verified Esports Platform */}
        <WhyEducatedGamer />

        {/* Hall of Fame Leaderboard */}
        <Leaderboard />

        {/* Rules & Frequently Asked Questions */}
        <RulesAndFAQ />

        {/* Community, YouTube & WhatsApp Hub */}
        <CommunityHub />
      </main>

      {/* Premium Esports Footer */}
      <Footer />

      {/* Docked Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Modals */}
      <JoinTournamentModal
        tournament={activeJoinTournament}
        isOpen={Boolean(activeJoinTournament)}
        onClose={() => setActiveJoinTournament(null)}
        onSuccess={() => setActiveJoinTournament(null)}
      />

      <RoomDetailsModal
        tournament={activeRoomDetailsTournament}
        isOpen={Boolean(activeRoomDetailsTournament)}
        onClose={() => setActiveRoomDetailsTournament(null)}
      />

      <TournamentDetailModal
        tournament={activeDetailTournament}
        isOpen={Boolean(activeDetailTournament)}
        onClose={() => setActiveDetailTournament(null)}
        onJoin={(t) => {
          setActiveDetailTournament(null);
          setActiveJoinTournament(t);
        }}
      />

    </div>
  );
}
