'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { me } from '@/lib/auth';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  username: string;
  roles: string[];
  is_admin: boolean;

  profile?: {
    avatar?: string | null;
  };
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const data = await me();
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser().finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: fetchUser, // 👈 المهم
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
