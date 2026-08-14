import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  openUserAuth: (mode?: 'login' | 'signup') => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('par_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const login = (newToken: string, newUser: User) => {
    setAuthToken(newToken);
    localStorage.setItem('par_user', JSON.stringify(newUser));
    setTokenState(newToken);
    setUser(newUser);
  };

  const logout = () => {
    removeAuthToken();
    localStorage.removeItem('par_user');
    setTokenState(null);
    setUser(null);
  };

  const openUserAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openUserAuth,
        isAdminModalOpen,
        setIsAdminModalOpen,
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

