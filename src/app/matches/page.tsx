'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { TournamentGrid } from '@/components/TournamentGrid';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { JoinTournamentModal } from '@/components/modals/JoinTournamentModal';
import { RoomDetailsModal } from '@/components/modals/RoomDetailsModal';
import { TournamentDetailModal } from '@/components/modals/TournamentDetailModal';
import { useTournaments } from '@/context/TournamentContext';
import { Tournament } from '@/data/mockData';

export default function MatchesPage() {
  const { tournaments } = useTournaments();

  const [activeJoinTournament, setActiveJoinTournament] = useState<Tournament | null>(null);
  const [activeRoomDetailsTournament, setActiveRoomDetailsTournament] = useState<Tournament | null>(null);
  const [activeDetailTournament, setActiveDetailTournament] = useState<Tournament | null>(null);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-grow pt-6">
        <TournamentGrid
          tournaments={tournaments}
          onJoin={(t) => setActiveJoinTournament(t)}
          onViewRoomDetails={(t) => setActiveRoomDetailsTournament(t)}
          onViewDetails={(t) => setActiveDetailTournament(t)}
        />
      </main>

      <Footer />
      <MobileBottomNav />

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
