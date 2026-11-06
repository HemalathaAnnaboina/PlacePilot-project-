import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse, Role, User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  isStudent: boolean;
  isTpo: boolean;
  isRecruiter: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('placepilot_token');
      const storedUser = localStorage.getItem('placepilot_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to restore auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (authData: AuthResponse) => {
    const userObj: User = {
      id: authData.id,
      email: authData.email,
      fullName: authData.fullName,
      role: authData.role,
      studentProfileId: authData.studentProfileId,
      recruiterProfileId: authData.recruiterProfileId,
      companyId: authData.companyId,
      companyName: authData.companyName,
    };
    setUser(userObj);
    setToken(authData.token);
    localStorage.setItem('placepilot_token', authData.token);
    localStorage.setItem('placepilot_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('placepilot_token');
    localStorage.removeItem('placepilot_user');
    window.location.href = '/login';
  };

  const isStudent = user?.role === 'STUDENT';
  const isTpo = user?.role === 'TPO';
  const isRecruiter = user?.role === 'RECRUITER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        isStudent,
        isTpo,
        isRecruiter,
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

