'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  ign: string; // Free Fire In-Game Name
  uid: string; // Free Fire Player UID
  balancePKR: number;
  reservedPKR?: number;
  winningPKR: number;
  role: 'player' | 'admin';
}

export interface BookedSlotDetail {
  slotNumber: number;
  uid: string;
  ign: string;
  bookedAt: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  phone: string;
  uid: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'resolved';
}

interface AuthContextType {
  currentUser: UserAccount | null;
  authLoading: boolean;
  registeredTournaments: string[]; // IDs of matches the user joined
  bookedSlots: Record<string, BookedSlotDetail>; // tournamentId -> slot details
  contactQueries: ContactQuery[];
  login: (email: string, pass: string) => Promise<{ success: boolean; role?: 'player' | 'admin'; error?: string }>;
  signup: (userData: { name: string; email: string; pass: string; phone: string; ign: string; uid: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  joinTournament: (tournamentId: string, entryFee: number, slotNumber: number, teamName?: string) => Promise<{ success: boolean; error?: string; remainingBalance?: number }>;
  submitContactQuery: (query: Omit<ContactQuery, 'id' | 'createdAt' | 'status'>) => void;
  updateUserBalance: (newBalance: number) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [registeredTournaments, setRegisteredTournaments] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, BookedSlotDetail>>({});
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);

  // Refresh user data directly from database
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const userAccount: UserAccount = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || '',
            ign: data.user.ign,
            uid: data.user.uid,
            balancePKR: data.user.balancePKR || 0,
            reservedPKR: data.user.reservedPKR || 0,
            winningPKR: data.user.winningsPKR || 0,
            role: (data.user.role as 'player' | 'admin') || 'player',
          };
          setCurrentUser(userAccount);
          localStorage.setItem('eg_user_session', JSON.stringify(userAccount));

          // Sync registered tournaments and booked slots from real database slots
          if (Array.isArray(data.user.slots)) {
            const matchIds = data.user.slots.map((s: any) => s.tournamentId);
            setRegisteredTournaments(matchIds);
            localStorage.setItem('eg_joined_matches', JSON.stringify(matchIds));

            const slotMap: Record<string, BookedSlotDetail> = {};
            data.user.slots.forEach((s: any) => {
              slotMap[s.tournamentId] = {
                slotNumber: s.slotNumber,
                uid: s.uid,
                ign: s.ign,
                bookedAt: s.createdAt ? new Date(s.createdAt).toLocaleTimeString() : 'Verified',
              };
            });
            setBookedSlots(slotMap);
            localStorage.setItem('eg_booked_slots', JSON.stringify(slotMap));
          }
        }
      }
    } catch (err) {
      console.error('Failed to sync user from database:', err);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // On mount: read cached state, then immediately verify with real database
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('eg_user_session');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      const savedMatches = localStorage.getItem('eg_joined_matches');
      if (savedMatches) {
        setRegisteredTournaments(JSON.parse(savedMatches));
      }
      const savedSlots = localStorage.getItem('eg_booked_slots');
      if (savedSlots) {
        setBookedSlots(JSON.parse(savedSlots));
      }
      const savedQueries = localStorage.getItem('eg_contact_queries');
      if (savedQueries) {
        setContactQueries(JSON.parse(savedQueries));
      }
    } catch {}

    // Verify against DB
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; role?: 'player' | 'admin'; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Authentication failed.' };
      }

      const userAccount: UserAccount = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        ign: data.user.ign,
        uid: data.user.uid,
        balancePKR: data.user.balancePKR,
        reservedPKR: data.user.reservedPKR,
        winningPKR: data.user.winningsPKR,
        role: data.role as 'player' | 'admin',
      };

      setCurrentUser(userAccount);
      localStorage.setItem('eg_user_session', JSON.stringify(userAccount));
      
      // Refresh DB data to fetch existing slots
      await refreshUser();

      return { success: true, role: userAccount.role };
    } catch (error: any) {
      return { success: false, error: error?.message || 'Network error during login' };
    }
  };

  const signup = async (data: { name: string; email: string; pass: string; phone: string; ign: string; uid: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        return { success: false, error: resData.error || 'Registration failed.' };
      }

      const sessionUser: UserAccount = {
        id: resData.user.id,
        name: resData.user.name,
        email: resData.user.email,
        phone: resData.user.phone,
        ign: resData.user.ign,
        uid: resData.user.uid,
        balancePKR: resData.user.balancePKR,
        reservedPKR: resData.user.reservedPKR,
        winningPKR: resData.user.winningsPKR,
        role: 'player',
      };

      setCurrentUser(sessionUser);
      localStorage.setItem('eg_user_session', JSON.stringify(sessionUser));
      setRegisteredTournaments([]);
      setBookedSlots({});

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setRegisteredTournaments([]);
    setBookedSlots({});
    localStorage.removeItem('eg_user_session');
    localStorage.removeItem('eg_joined_matches');
    localStorage.removeItem('eg_booked_slots');
    fetch('/api/auth/login', { method: 'DELETE' }).catch(() => {});
  };

  const updateUserBalance = (newBalance: number) => {
    if (!currentUser) return;
    const updated = { ...currentUser, balancePKR: newBalance };
    setCurrentUser(updated);
    localStorage.setItem('eg_user_session', JSON.stringify(updated));
  };

  const joinTournament = async (
    tournamentId: string,
    entryFee: number,
    slotNumber: number,
    teamName?: string
  ): Promise<{ success: boolean; error?: string; remainingBalance?: number }> => {
    if (!currentUser) {
      return { success: false, error: 'Please sign in or create an account to join this match.' };
    }

    if (registeredTournaments.includes(tournamentId)) {
      return { success: false, error: 'You are already registered in this tournament!' };
    }

    try {
      const res = await fetch('/api/slots/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournamentId,
          slotNumber,
          userId: currentUser.id,
          teamName,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Slot reservation failed.' };
      }

      // Update local state with real DB results
      const newBal = data.data?.remainingBalance !== undefined ? data.data.remainingBalance : currentUser.balancePKR - entryFee;
      const updatedUser: UserAccount = {
        ...currentUser,
        balancePKR: newBal,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('eg_user_session', JSON.stringify(updatedUser));

      const updatedMatches = [...registeredTournaments, tournamentId];
      setRegisteredTournaments(updatedMatches);
      localStorage.setItem('eg_joined_matches', JSON.stringify(updatedMatches));

      const updatedSlots = {
        ...bookedSlots,
        [tournamentId]: {
          slotNumber,
          uid: currentUser.uid,
          ign: currentUser.ign,
          bookedAt: new Date().toLocaleTimeString(),
        },
      };
      setBookedSlots(updatedSlots);
      localStorage.setItem('eg_booked_slots', JSON.stringify(updatedSlots));

      return { success: true, remainingBalance: newBal };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error during slot reservation.' };
    }
  };

  const submitContactQuery = (query: Omit<ContactQuery, 'id' | 'createdAt' | 'status'>) => {
    const newQuery: ContactQuery = {
      ...query,
      id: `query-${Date.now()}`,
      createdAt: 'Just now',
      status: 'new',
    };
    const updated = [newQuery, ...contactQueries];
    setContactQueries(updated);
    localStorage.setItem('eg_contact_queries', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        registeredTournaments,
        bookedSlots,
        contactQueries,
        login,
        signup,
        logout,
        joinTournament,
        submitContactQuery,
        updateUserBalance,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
