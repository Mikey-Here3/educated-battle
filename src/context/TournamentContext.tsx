'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
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
  proofUrl: string;
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
  loadingTournaments: boolean;
  createTournament: (tournament: Omit<Tournament, 'id' | 'slotsFilled'>) => Promise<{ success: boolean; error?: string }>;
  updateTournament: (id: string, updatedFields: Partial<Tournament>) => Promise<{ success: boolean; error?: string }>;

  deleteTournament: (id: string) => void;
  setTournamentWinner: (id: string, winner: TournamentWinner) => void;
  submitDeposit: (data: Omit<DepositRequest, 'id' | 'date' | 'status'>) => Promise<{ success: boolean; error?: string }>;
  approveDeposit: (id: string) => Promise<void>;
  rejectDeposit: (id: string) => Promise<void>;
  submitWithdrawal: (data: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>) => Promise<{ success: boolean; error?: string }>;
  approveWithdrawal: (id: string) => Promise<void>;
  rejectWithdrawal: (id: string) => Promise<void>;
  updateLeaderboardPlayer: (uid: string, updatedFields: Partial<PlayerRank>) => void;
  addLeaderboardPlayer: (player: PlayerRank) => void;
  refreshTournaments: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [leaderboard, setLeaderboard] = useState<PlayerRank[]>([]);
  const [loadingTournaments, setLoadingTournaments] = useState<boolean>(true);

  // 1. Fetch Tournaments from Database
  const refreshTournaments = useCallback(async () => {
    try {
      const res = await fetch('/api/tournaments', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setTournaments(data.data);
          localStorage.setItem('eg_tournaments_list', JSON.stringify(data.data));
        }
      }
    } catch (err) {
      console.error('Failed to load tournaments from DB:', err);
    } finally {
      setLoadingTournaments(false);
    }
  }, []);

  // 2. Fetch Leaderboard from Database
  const refreshLeaderboard = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setLeaderboard(data.data);
          localStorage.setItem('eg_leaderboard_list', JSON.stringify(data.data));
        }
      }
    } catch (err) {
      console.error('Failed to load leaderboard from DB:', err);
    }
  }, []);

  // 3. Fetch Transactions from Database
  const refreshTransactions = useCallback(async () => {
    try {
      const res = await fetch('/api/transactions');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.transactions)) {
          const deps: DepositRequest[] = [];
          const withs: WithdrawalRequest[] = [];

          data.transactions.forEach((tx: any) => {
            if (tx.type === 'DEPOSIT') {
              deps.push({
                id: tx.id,
                userId: tx.userId,
                user: `${tx.userName || 'Player'} (${tx.ign || 'FF'})`,
                uid: tx.uid || '',
                method: (tx.method as any) || 'JazzCash',
                amt: tx.amountPKR,
                trxId: tx.trxId || '',
                proofUrl: tx.proofUrl || '',
                date: new Date(tx.createdAt).toLocaleDateString() + ' ' + new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: tx.status.toLowerCase() as any,
              });
            } else if (tx.type === 'WITHDRAWAL') {
              withs.push({
                id: tx.id,
                userId: tx.userId,
                user: `${tx.userName || 'Player'} (${tx.ign || 'FF'})`,
                uid: tx.uid || '',
                method: (tx.method as any) || 'JazzCash',
                accountNumber: tx.accountNumber || '',
                accountTitle: tx.accountTitle || '',
                amt: tx.amountPKR,
                date: new Date(tx.createdAt).toLocaleDateString() + ' ' + new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: tx.status.toLowerCase() as any,
              });
            }
          });

          setDeposits(deps);
          setWithdrawals(withs);
          localStorage.setItem('eg_deposits_list', JSON.stringify(deps));
          localStorage.setItem('eg_withdrawals_list', JSON.stringify(withs));
        }
      }
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  }, []);

  // Mount effect
  useEffect(() => {
    // Initial quick hydrate from localStorage if available
    try {
      const savedTournaments = localStorage.getItem('eg_tournaments_list');
      if (savedTournaments) setTournaments(JSON.parse(savedTournaments));
      const savedLeaderboard = localStorage.getItem('eg_leaderboard_list');
      if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));
      const savedDeposits = localStorage.getItem('eg_deposits_list');
      if (savedDeposits) setDeposits(JSON.parse(savedDeposits));
      const savedWithdrawals = localStorage.getItem('eg_withdrawals_list');
      if (savedWithdrawals) setWithdrawals(JSON.parse(savedWithdrawals));
    } catch {}

    // Fetch live truth from database
    refreshTournaments();
    refreshLeaderboard();
    refreshTransactions();
  }, [refreshTournaments, refreshLeaderboard, refreshTransactions]);

  const createTournament = async (data: Omit<Tournament, 'id' | 'slotsFilled'>): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          category: data.category,
          type: data.type,
          format: data.format,
          mode: data.mode,
          map: data.map,
          allowedWeapons: data.allowedWeapons,
          rules: Array.isArray(data.rules) ? data.rules.join('\n') : data.rules,
          entryFee: data.entryFee,
          prizePool: data.prizePool,
          winnerPrize: data.booyahPrize || data.prizePool,
          perKill: data.perKill,
          totalSlots: data.totalSlots,
          matchDate: data.matchDate,
          matchTime: data.matchTime,
          startTime: data.startTime,
          bannerUrl: data.bannerImage,
          prizesJson: data.prizes,
          isFeatured: data.isFeatured,
          roomId: data.roomId,
          roomPassword: data.roomPassword,
        }),
      });

      const resData = await res.json().catch(() => ({}));
      if (res.ok && resData.success) {
        await refreshTournaments();
        return { success: true };
      }
      return { success: false, error: resData.error || 'Failed to create tournament in database.' };
    } catch (error: any) {
      console.error('Create tournament error:', error);
      return { success: false, error: error?.message || 'Network error creating tournament.' };
    }
  };


  const updateTournament = async (id: string, updatedFields: Partial<Tournament>): Promise<{ success: boolean; error?: string }> => {
    // Optimistic local update for instant UI feedback
    const previousState = [...tournaments];
    setTournaments((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
      localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
      return updated;
    });

    // Persist to database via API
    try {
      // Map front-end Tournament fields to database column names
      const apiPayload: Record<string, any> = { id };
      if (updatedFields.title !== undefined) apiPayload.title = updatedFields.title;
      if (updatedFields.category !== undefined) apiPayload.category = updatedFields.category;
      if (updatedFields.type !== undefined) apiPayload.type = updatedFields.type;
      if (updatedFields.format !== undefined) apiPayload.format = updatedFields.format;
      if (updatedFields.mode !== undefined) apiPayload.mode = updatedFields.mode;
      if (updatedFields.map !== undefined) apiPayload.map = updatedFields.map;
      if (updatedFields.allowedWeapons !== undefined) apiPayload.allowedWeapons = updatedFields.allowedWeapons;
      if (updatedFields.rules !== undefined) apiPayload.rules = updatedFields.rules;
      if (updatedFields.status !== undefined) apiPayload.status = updatedFields.status;
      if (updatedFields.prizePool !== undefined) apiPayload.prizePool = updatedFields.prizePool;
      if (updatedFields.booyahPrize !== undefined) apiPayload.winnerPrize = updatedFields.booyahPrize;
      if (updatedFields.perKill !== undefined) apiPayload.perKill = updatedFields.perKill;
      if (updatedFields.entryFee !== undefined) apiPayload.entryFee = updatedFields.entryFee;
      if (updatedFields.totalSlots !== undefined) apiPayload.totalSlots = updatedFields.totalSlots;
      if (updatedFields.matchDate !== undefined) apiPayload.matchDate = updatedFields.matchDate;
      if (updatedFields.matchTime !== undefined) apiPayload.matchTime = updatedFields.matchTime;
      if (updatedFields.startTime !== undefined) apiPayload.startTime = updatedFields.startTime;
      // bannerImage on the front-end maps to bannerUrl in the database
      if (updatedFields.bannerImage !== undefined) apiPayload.bannerUrl = updatedFields.bannerImage;
      if (updatedFields.roomId !== undefined) apiPayload.roomId = updatedFields.roomId;
      if (updatedFields.roomPassword !== undefined) apiPayload.roomPassword = updatedFields.roomPassword;
      if (updatedFields.liveStreamUrl !== undefined) apiPayload.liveStreamUrl = updatedFields.liveStreamUrl;
      if (updatedFields.prizes !== undefined) apiPayload.prizesJson = updatedFields.prizes;
      if (updatedFields.isFeatured !== undefined) apiPayload.isFeatured = updatedFields.isFeatured;

      const res = await fetch('/api/admin/tournaments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      const resData = await res.json().catch(() => ({}));
      
      if (!res.ok || !resData.success) {
        // Revert optimistic update
        setTournaments(previousState);
        localStorage.setItem('eg_tournaments_list', JSON.stringify(previousState));
        return { success: false, error: resData.error || 'Failed to update tournament.' };
      }

      // Refresh from DB to confirm persisted state
      await refreshTournaments();
      return { success: true };
    } catch (error: any) {
      console.error('Tournament update network error:', error);
      setTournaments(previousState);
      localStorage.setItem('eg_tournaments_list', JSON.stringify(previousState));
      return { success: false, error: error?.message || 'Network error updating tournament.' };
    }
  };

  const deleteTournament = (id: string) => {
    setTournaments((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
      return updated;
    });
  };

  const setTournamentWinner = (id: string, winner: TournamentWinner) => {
    setTournaments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: 'completed' as const,
            winner,
          };
        }
        return t;
      });
      localStorage.setItem('eg_tournaments_list', JSON.stringify(updated));
      return updated;
    });
  };

  const submitDeposit = async (data: Omit<DepositRequest, 'id' | 'date' | 'status'>) => {
    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.amt,
          method: data.method,
          trxId: data.trxId,
          screenshotUrl: data.proofUrl,
          userId: data.userId,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, error: resData.error || 'Failed to submit deposit.' };
      }

      await refreshTransactions();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error submitting deposit' };
    }
  };

  const approveDeposit = async (id: string) => {
    try {
      await fetch('/api/admin/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id, action: 'APPROVE' }),
      });
      await refreshTransactions();
    } catch (e) {
      console.error('Approve deposit error:', e);
    }
  };

  const rejectDeposit = async (id: string) => {
    try {
      await fetch('/api/admin/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id, action: 'REJECT' }),
      });
      await refreshTransactions();
    } catch (e) {
      console.error('Reject deposit error:', e);
    }
  };

  const submitWithdrawal = async (data: Omit<WithdrawalRequest, 'id' | 'date' | 'status'>) => {
    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.amt,
          method: data.method,
          accountTitle: data.accountTitle,
          accountNumber: data.accountNumber,
          userId: data.userId,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, error: resData.error || 'Withdrawal request failed.' };
      }

      await refreshTransactions();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error submitting withdrawal' };
    }
  };

  const approveWithdrawal = async (id: string) => {
    try {
      await fetch('/api/admin/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id, action: 'APPROVE' }),
      });
      await refreshTransactions();
    } catch (e) {
      console.error('Approve withdrawal error:', e);
    }
  };

  const rejectWithdrawal = async (id: string) => {
    try {
      await fetch('/api/admin/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id, action: 'REJECT' }),
      });
      await refreshTransactions();
    } catch (e) {
      console.error('Reject withdrawal error:', e);
    }
  };

  const updateLeaderboardPlayer = (uid: string, updatedFields: Partial<PlayerRank>) => {
    setLeaderboard((prev) => {
      const updated = prev.map((p) => (p.uid === uid ? { ...p, ...updatedFields } : p));
      updated.sort((a, b) => b.earningsPKR - a.earningsPKR);
      const reRanked = updated.map((p, idx) => ({ ...p, rank: idx + 1 }));
      localStorage.setItem('eg_leaderboard_list', JSON.stringify(reRanked));
      return reRanked;
    });
  };

  const addLeaderboardPlayer = (player: PlayerRank) => {
    setLeaderboard((prev) => {
      const updated = [...prev, player];
      updated.sort((a, b) => b.earningsPKR - a.earningsPKR);
      const reRanked = updated.map((p, idx) => ({ ...p, rank: idx + 1 }));
      localStorage.setItem('eg_leaderboard_list', JSON.stringify(reRanked));
      return reRanked;
    });
  };

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        deposits,
        withdrawals,
        leaderboard,
        loadingTournaments,
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
        refreshTournaments,
        refreshLeaderboard,
        refreshTransactions,
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
