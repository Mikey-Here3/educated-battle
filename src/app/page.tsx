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

import { INITIAL_TOURNAMENTS, Tournament } from '@/data/mockData';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userBalance, setUserBalance] = useState<number>(1250);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);

  // Modals state
  const [activeJoinTournament, setActiveJoinTournament] = useState<Tournament | null>(null);
  const [activeRoomDetailsTournament, setActiveRoomDetailsTournament] = useState<Tournament | null>(null);
  const [activeDetailTournament, setActiveDetailTournament] = useState<Tournament | null>(null);

  const handleConfirmJoin = (tournamentId: string, slotNumber: number, ign: string, uid: string) => {
    setTournaments((prev) =>
      prev.map((t) => {
        if (t.id === tournamentId) {
          const newFee = t.entryFee;
          if (newFee > 0) {
            setUserBalance((b) => Math.max(0, b - newFee));
          }
          return {
            ...t,
            slotsFilled: Math.min(t.totalSlots, t.slotsFilled + 1),
          };
        }
        return t;
      })
    );
    setActiveJoinTournament(null);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      
      {/* Splash Entrance Loader */}
      <EntranceLoader onComplete={() => setLoading(false)} />

      {/* Navbar */}
      <Navbar userBalance={userBalance} />

      {/* Main Home Sections */}
      <main className="flex-grow">
        <Hero />

        <PromoCarousel
          onOpenWallet={() => {}}
          onJoinCommunity={() => {}}
          onExploreTournaments={() => {}}
        />

        <TournamentGrid
          tournaments={tournaments.slice(0, 3)} // Quick Top 3 Overview
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
        userBalance={userBalance}
        onClose={() => setActiveJoinTournament(null)}
        onConfirmJoin={handleConfirmJoin}
      />

      <RoomDetailsModal
        tournament={activeRoomDetailsTournament}
        onClose={() => setActiveRoomDetailsTournament(null)}
      />

      <TournamentDetailModal
        tournament={activeDetailTournament}
        onClose={() => setActiveDetailTournament(null)}
        onJoin={(t) => setActiveJoinTournament(t)}
      />

    </div>
  );
}
