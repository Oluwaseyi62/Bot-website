import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get admin password from environment variable or use default for development
const ADMIN_PASSWORD_KEY = 'ADMIN_PASSWORD';
let currentPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string) => {
    if (password === currentPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword === currentPassword) {
      // Store new password in localStorage for persistence
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      currentPassword = newPassword;
      return true;
    }
    return false;
  };

  // Load password from localStorage if exists
  React.useEffect(() => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (storedPassword) {
      currentPassword = storedPassword;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};