'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { TournamentGrid } from '@/components/TournamentGrid';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { JoinTournamentModal } from '@/components/modals/JoinTournamentModal';
import { RoomDetailsModal } from '@/components/modals/RoomDetailsModal';
import { TournamentDetailModal } from '@/components/modals/TournamentDetailModal';
import { INITIAL_TOURNAMENTS, Tournament } from '@/data/mockData';

export default function MatchesPage() {
  const [userBalance, setUserBalance] = useState<number>(1250);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);

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
      <Navbar userBalance={userBalance} />
      
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
