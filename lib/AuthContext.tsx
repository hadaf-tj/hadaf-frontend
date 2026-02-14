'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getProfile } from '@/lib/api';

interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  institution_id?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  /** Call after login saves tokens to localStorage */
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
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      // Token invalid/expired — clear
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    // Redirect to home
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
