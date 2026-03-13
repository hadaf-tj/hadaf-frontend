'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getProfile } from '@/lib/api';

interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  institution_id?: number;
  is_approved?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  /** Call after login to refresh the user profile via httpOnly cookie */
  refreshUser: () => Promise<void>;
  /** Atomic logout: clear tokens + state + redirect */
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      // Cookie invalid/expired or not set
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // Clear httpOnly cookie via backend logout endpoint
    try {
      await fetch('/api/v1/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // Ignore network errors
    }
    setUser(null);
    window.location.href = '/';
  }, []);

  // Check auth on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
