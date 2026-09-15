'use client';

import React, { useState } from 'react';
import { EntranceLoader } from '@/components/EntranceLoader';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PromoCarousel } from '@/components/PromoCarousel';
import { TournamentGrid } from '@/components/TournamentGrid';
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

      {/* Navbar */}
      <Navbar />

      {/* Main Home Sections */}
      <main className="flex-grow">
        <Hero />

        <PromoCarousel
          onOpenWallet={() => {}}
          onJoinCommunity={() => {}}
          onExploreTournaments={() => {}}
        />

        <TournamentGrid
          tournaments={tournaments}
          onJoin={(t) => setActiveJoinTournament(t)}
          onViewRoomDetails={(t) => setActiveRoomDetailsTournament(t)}
          onViewDetails={(t) => setActiveDetailTournament(t)}
        />

        <Leaderboard />

        <RulesAndFAQ />

        <CommunityHub />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
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
