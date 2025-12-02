"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, DEMO_CREDENTIALS } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: "customer" | "provider") => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers: Record<string, User> = {
  "demo.customer@fqwhipz.com": {
    id: "user-1",
    email: "demo.customer@fqwhipz.com",
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    type: "customer",
    verified: true,
    phone: "(312) 555-0123",
    joinedDate: "2024-06-15",
  },
  "demo.provider@fqwhipz.com": {
    id: "host-1",
    email: "demo.provider@fqwhipz.com",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    type: "provider",
    verified: true,
    phone: "(414) 555-0456",
    joinedDate: "2022-03-10",
  },
};

// Helper to get initial user from localStorage (runs only on client)
function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem("fqwhipz_user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("fqwhipz_user");
    }
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getInitialUser());
  // Since we initialize user synchronously from localStorage, no loading state needed
  const isLoading = false;

  const login = async (email: string, password: string, userType: "customer" | "provider"): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const expectedCreds = userType === "customer" ? DEMO_CREDENTIALS.customer : DEMO_CREDENTIALS.provider;

    if (email === expectedCreds.email && password === expectedCreds.password) {
      const loggedInUser = demoUsers[email];
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("fqwhipz_user", JSON.stringify(loggedInUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fqwhipz_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
