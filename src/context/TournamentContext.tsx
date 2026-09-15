'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_TOURNAMENTS, 
  MOCK_LEADERBOARD, 
  Tournament, 
  PlayerRank, 
  TournamentWinner 
} from '@/data/mockData';

export interface DepositRequest {
  id: string;
  userId?: string;
  user: string;
  uid: string;
  method: 'JazzCash' | 'EasyPaisa';
  amt: number;
  trxId: string;
  proofUrl: string; // Base64 or image URL
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface WithdrawalRequest {
  id: string;
  userId?: string;
  user: string;
  uid: string;
  method: 'JazzCash' | 'EasyPaisa';
  accountNumber: string;
  accountTitle: string;
  amt: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface TournamentContextType {
  tournaments: Tournament[];
  deposits: DepositRequest[];
  withdrawals: WithdrawalRequest[];
  leaderboard: PlayerRank[];
  createTournament: (tournament: Omit<Tournament, 'id' | 'slotsFilled'>) => void;
  updateTournament: (id: string, updatedFields: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  setTournamentWinner: (id: string, winner: TournamentWinner) => void;
  submitDeposit: (deposit: Omit<DepositRequest, 'id' | 'date' | 'status'>) => void;
  approveDeposit: (id: string) => void;
  rejectDeposit: (id: string) => void;
  submitWithdrawal: (withdrawal: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>) => void;
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string) => void;
  updateLeaderboardPlayer: (uid: string, updatedFields: Partial<PlayerRank>) => void;
  addLeaderboardPlayer: (player: PlayerRank) => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

const INITIAL_DEPOSITS: DepositRequest[] = [];

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [deposits, setDeposits] = useState<DepositRequest[]>(INITIAL_DEPOSITS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerRank[]>(MOCK_LEADERBOARD);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedTournaments = localStorage.getItem('eg_tournaments_list');
      if (savedTournaments) {
        setTournaments(JSON.parse(savedTournaments));
      }
      const savedDeposits = localStorage.getItem('eg_deposits_list');
      if (savedDeposits) {
        setDeposits(JSON.parse(savedDeposits));
      }
      const savedWithdrawals = localStorage.getItem('eg_withdrawals_list');
      if (savedWithdrawals) {
        setWithdrawals(JSON.parse(savedWithdrawals));
      }
      const savedLeaderboard = localStorage.getItem('eg_leaderboard_list');
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard));
      }
    } catch {}
  }, []);

  const createTournament = (data: Omit<Tournament, 'id' | 'slotsFilled'>) => {
    const newTournament: Tournament = {
      ...data,
      id: `eg-ff-${Date.now().toString().slice(-4)}`,
      slotsFilled: 0,
    };
    const updated = [newTournament, ...tournaments];
    setTournaments(updated);
    localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
  };

  const updateTournament = (id: string, updatedFields: Partial<Tournament>) => {
    const updated = tournaments.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    setTournaments(updated);
    localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
  };

  const deleteTournament = (id: string) => {
    const updated = tournaments.filter((t) => t.id !== id);
    setTournaments(updated);
    localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
  };

  const setTournamentWinner = (id: string, winner: TournamentWinner) => {
    const updated = tournaments.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status: 'completed' as const,
          winner,
        };
      }
      return t;
    });
    setTournaments(updated);
    localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));

    // Automatically update or add player to Leaderboard
    setLeaderboard((prev) => {
      const existing = prev.find((p) => p.uid === winner.uid);
      let newBoard: PlayerRank[];
      if (existing) {
        newBoard = prev.map((p) =>
          p.uid === winner.uid
            ? {
                ...p,
                earningsPKR: p.earningsPKR + winner.prizePKR,
                totalKills: p.totalKills + winner.kills,
                matchesPlayed: p.matchesPlayed + 1,
              }
            : p
        );
      } else {
        const newPlayer: PlayerRank = {
          rank: prev.length + 1,
          name: winner.name,
          ign: winner.ign,
          uid: winner.uid,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${winner.ign}`,
          earningsPKR: winner.prizePKR,
          matchesPlayed: 1,
          totalKills: winner.kills,
          winRate: 100,
          badge: 'CHAMPION',
        };
        newBoard = [...prev, newPlayer];
      }
      // Re-sort by earnings descending
      newBoard.sort((a, b) => b.earningsPKR - a.earningsPKR);
      newBoard = newBoard.map((p, idx) => ({ ...p, rank: idx + 1 }));
      localStorage.setItem('eg_leaderboard_list', JSON.stringify(newBoard));
      return newBoard;
    });
  };

  const submitDeposit = (data: Omit<DepositRequest, 'id' | 'date' | 'status'>) => {
    const newDep: DepositRequest = {
      ...data,
      id: `dep-${Date.now()}`,
      date: 'Just now',
      status: 'pending',
    };
    const updated = [newDep, ...deposits];
    setDeposits(updated);
    localStorage.setItem('eg_deposits_list', JSON.stringify(updated));
  };

  const approveDeposit = (id: string) => {
    const dep = deposits.find((d) => d.id === id);
    if (!dep) return;

    const updated = deposits.filter((d) => d.id !== id);
    setDeposits(updated);
    localStorage.setItem('eg_deposits_list', JSON.stringify(updated));

    // Credit coins to user if session matches
    try {
      const currentSessionStr = localStorage.getItem('eg_user_session');
      if (currentSessionStr) {
        const user = JSON.parse(currentSessionStr);
        if (user.uid === dep.uid || user.name === dep.user) {
          user.balancePKR = (user.balancePKR || 0) + dep.amt;
          localStorage.setItem('eg_user_session', JSON.stringify(user));
        }
      }
      // Also update stored accounts list
      const storedUsersStr = localStorage.getItem('eg_registered_accounts');
      if (storedUsersStr) {
        const users = JSON.parse(storedUsersStr);
        const u = users.find((x: any) => x.uid === dep.uid);
        if (u) {
          u.balancePKR = (u.balancePKR || 0) + dep.amt;
          localStorage.setItem('eg_registered_accounts', JSON.stringify(users));
        }
      }
    } catch {}
  };

  const rejectDeposit = (id: string) => {
    const updated = deposits.filter((d) => d.id !== id);
    setDeposits(updated);
    localStorage.setItem('eg_deposits_list', JSON.stringify(updated));
  };

  const submitWithdrawal = (data: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>) => {
    const newW: WithdrawalRequest = {
      ...data,
      id: `wth-${Date.now()}`,
      date: 'Just now',
      status: 'pending',
    };
    const updated = [newW, ...withdrawals];
    setWithdrawals(updated);
    localStorage.setItem('eg_withdrawals_list', JSON.stringify(updated));
  };

  const approveWithdrawal = (id: string) => {
    const updated = withdrawals.filter((w) => w.id !== id);
    setWithdrawals(updated);
    localStorage.setItem('eg_withdrawals_list', JSON.stringify(updated));
  };

  const rejectWithdrawal = (id: string) => {
    const updated = withdrawals.filter((w) => w.id !== id);
    setWithdrawals(updated);
    localStorage.setItem('eg_withdrawals_list', JSON.stringify(updated));
  };

  const updateLeaderboardPlayer = (uid: string, updatedFields: Partial<PlayerRank>) => {
    const updated = leaderboard.map((p) => (p.uid === uid ? { ...p, ...updatedFields } : p));
    updated.sort((a, b) => b.earningsPKR - a.earningsPKR);
    const reRanked = updated.map((p, idx) => ({ ...p, rank: idx + 1 }));
    setLeaderboard(reRanked);
    localStorage.setItem('eg_leaderboard_list', JSON.stringify(reRanked));
  };

  const addLeaderboardPlayer = (player: PlayerRank) => {
    const updated = [...leaderboard, player];
    updated.sort((a, b) => b.earningsPKR - a.earningsPKR);
    const reRanked = updated.map((p, idx) => ({ ...p, rank: idx + 1 }));
    setLeaderboard(reRanked);
    localStorage.setItem('eg_leaderboard_list', JSON.stringify(reRanked));
  };

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        deposits,
        withdrawals,
        leaderboard,
        createTournament,
        updateTournament,
        deleteTournament,
        setTournamentWinner,
        submitDeposit,
        approveDeposit,
        rejectDeposit,
        submitWithdrawal,
        approveWithdrawal,
        rejectWithdrawal,
        updateLeaderboardPlayer,
        addLeaderboardPlayer,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournaments = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournaments must be used within a TournamentProvider');
  }
  return context;
};
