"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getProfile } from "@/lib/api";

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
      // Token absent or invalid
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // Backend request to clear httpOnly auth cookies
    try {
      await fetch("/api/v1/logout", { method: "POST", credentials: "include" });
    } catch {
      // Suppress network errors
    }
    setUser(null);
    window.location.href = "/";
  }, []);

  // Verify authentication context on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
