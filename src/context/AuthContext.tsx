'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  ign: string; // Free Fire In-Game Name
  uid: string; // Free Fire Player UID
  balancePKR: number;
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
  registeredTournaments: string[]; // IDs of matches the user joined
  bookedSlots: Record<string, BookedSlotDetail>; // tournamentId -> slot details
  contactQueries: ContactQuery[];
  login: (email: string, pass: string) => Promise<{ success: boolean; role?: 'player' | 'admin'; error?: string }>;
  signup: (userData: { name: string; email: string; pass: string; phone: string; ign: string; uid: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  joinTournament: (tournamentId: string, entryFee: number, slotNumber: number) => { success: boolean; error?: string; remainingBalance?: number };
  submitContactQuery: (query: Omit<ContactQuery, 'id' | 'createdAt' | 'status'>) => void;
  updateUserBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_QUERIES: ContactQuery[] = [
  {
    id: 'query-1',
    name: 'Hamza Khan',
    phone: '03129841029',
    uid: '489201948',
    subject: 'Deposit Confirmation Delay',
    message: 'I sent PKR 500 via JazzCash Trx ID 984120948. Please approve my coins for tonight squad match.',
    createdAt: '10 mins ago',
    status: 'new'
  },
  {
    id: 'query-2',
    name: 'Usman Tariq',
    phone: '03459182301',
    uid: '129481902',
    subject: 'Slot 14 Free Fire Verification',
    message: 'Registered in Night Warriors Solo tournament. Need to confirm my UID 129481902.',
    createdAt: '25 mins ago',
    status: 'new'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [registeredTournaments, setRegisteredTournaments] = useState<string[]>([]); // Starts EMPTY for fresh users
  const [bookedSlots, setBookedSlots] = useState<Record<string, BookedSlotDetail>>({});
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>(INITIAL_QUERIES);

  // Load from localStorage on mount
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
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; role?: 'player' | 'admin'; error?: string }> => {
    // Admin login
    if (email === 'admin@educatedgamer.com' && pass === 'Password123!') {
      const adminUser: UserAccount = {
        id: 'admin-1',
        name: 'Educated Gamer Admin',
        email: 'admin@educatedgamer.com',
        phone: '03190799711',
        ign: 'EG_ADMIN_PK',
        uid: '100000001',
        balancePKR: 99999,
        winningPKR: 50000,
        role: 'admin',
      };
      setCurrentUser(adminUser);
      localStorage.setItem('eg_user_session', JSON.stringify(adminUser));
      document.cookie = 'eg_admin=1; path=/; max-age=86400; SameSite=Lax';
      return { success: true, role: 'admin' };
    }

    // Registered player lookup
    const storedUsersStr = localStorage.getItem('eg_registered_accounts');
    const storedUsers: (UserAccount & { pass: string })[] = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    const matched = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass);

    if (matched) {
      const playerUser: UserAccount = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        phone: matched.phone,
        ign: matched.ign,
        uid: matched.uid,
        balancePKR: matched.balancePKR,
        winningPKR: matched.winningPKR,
        role: 'player',
      };
      setCurrentUser(playerUser);
      localStorage.setItem('eg_user_session', JSON.stringify(playerUser));
      return { success: true, role: 'player' };
    }

    // Demo test player
    if (email.toLowerCase() === 'player@educatedgamer.com' && pass === 'Player123!') {
      const demoPlayer: UserAccount = {
        id: 'usr-demo-1',
        name: 'Asad Ali',
        email: 'player@educatedgamer.com',
        phone: '03190799711',
        ign: 'PK_LEGEND_FF',
        uid: '592810482',
        balancePKR: 500, // PKR 500 balance for demo registration testing
        winningPKR: 850,
        role: 'player',
      };
      setCurrentUser(demoPlayer);
      localStorage.setItem('eg_user_session', JSON.stringify(demoPlayer));
      return { success: true, role: 'player' };
    }

    return { success: false, error: 'Invalid email or password. Please create an account if you are new.' };
  };

  const signup = async (data: { name: string; email: string; pass: string; phone: string; ign: string; uid: string }) => {
    if (!data.name || !data.email || !data.pass || !data.phone || !data.ign || !data.uid) {
      return { success: false, error: 'All fields including Free Fire UID and IGN are mandatory.' };
    }

    const newUser: UserAccount & { pass: string } = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      ign: data.ign,
      uid: data.uid,
      balancePKR: 0, // Starts at 0 PKR (Needs JazzCash deposit)
      winningPKR: 0,
      role: 'player',
      pass: data.pass,
    };

    const storedUsersStr = localStorage.getItem('eg_registered_accounts');
    const storedUsers: (UserAccount & { pass: string })[] = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    
    if (storedUsers.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    if (storedUsers.some(u => u.uid === data.uid)) {
      return { success: false, error: 'This Free Fire UID is already registered.' };
    }

    storedUsers.push(newUser);
    localStorage.setItem('eg_registered_accounts', JSON.stringify(storedUsers));

    const sessionUser: UserAccount = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      ign: newUser.ign,
      uid: newUser.uid,
      balancePKR: 0,
      winningPKR: 0,
      role: 'player',
    };
    setCurrentUser(sessionUser);
    localStorage.setItem('eg_user_session', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eg_user_session');
    document.cookie = 'eg_admin=; path=/; max-age=0; SameSite=Lax';
    fetch('/api/auth/login', { method: 'DELETE' }).catch(() => {});
  };

  const updateUserBalance = (newBalance: number) => {
    if (!currentUser) return;
    const updated = { ...currentUser, balancePKR: newBalance };
    setCurrentUser(updated);
    localStorage.setItem('eg_user_session', JSON.stringify(updated));
  };

  const joinTournament = (tournamentId: string, entryFee: number, slotNumber: number) => {
    if (!currentUser) {
      return { success: false, error: 'Please sign in or create an account to join this match.' };
    }

    // Check if already registered
    if (registeredTournaments.includes(tournamentId)) {
      return { success: false, error: 'You are already registered in this tournament!' };
    }

    // Check balance if paid entry
    if (entryFee > 0 && currentUser.balancePKR < entryFee) {
      return { 
        success: false, 
        error: `Insufficient balance! Your coin balance is PKR ${currentUser.balancePKR}, but this tournament entry fee is PKR ${entryFee}. Please add coins via JazzCash to join.` 
      };
    }

    // Deduct entry fee
    const newBalance = Math.max(0, currentUser.balancePKR - entryFee);
    const updatedUser: UserAccount = {
      ...currentUser,
      balancePKR: newBalance,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('eg_user_session', JSON.stringify(updatedUser));

    // Update registered tournaments
    const updatedMatches = [...registeredTournaments, tournamentId];
    setRegisteredTournaments(updatedMatches);
    localStorage.setItem('eg_joined_matches', JSON.stringify(updatedMatches));

    // Update booked slots
    const updatedSlots = {
      ...bookedSlots,
      [tournamentId]: {
        slotNumber,
        uid: currentUser.uid,
        ign: currentUser.ign,
        bookedAt: new Date().toLocaleTimeString(),
      }
    };
    setBookedSlots(updatedSlots);
    localStorage.setItem('eg_booked_slots', JSON.stringify(updatedSlots));

    return { success: true, remainingBalance: newBalance };
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
        registeredTournaments,
        bookedSlots,
        contactQueries,
        login,
        signup,
        logout,
        joinTournament,
        submitContactQuery,
        updateUserBalance,
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
