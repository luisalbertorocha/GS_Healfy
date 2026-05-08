import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { clearSession, loadSession, saveSession } from '../services/storageService';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession()
      .then((savedUser) => {
        if (savedUser) setUser(savedUser);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (email !== 'teste@teste.com' || password !== '123') {
      throw new Error('Email ou senha inválidos!');
    }
    const newUser: User = { email };
    await saveSession(newUser);
    setUser(newUser);
  }, []);

  const signOut = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
