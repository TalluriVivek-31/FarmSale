import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'farmer' | 'buyer' | 'fpo' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  profile?: any;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (profileData: any) => void;
  loginAsTestUser: (role: UserRole) => Promise<void>;
  resetDataToFresh: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('farmsale_user');
    const savedToken = localStorage.getItem('farmsale_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        localStorage.removeItem('farmsale_user');
        localStorage.removeItem('farmsale_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('farmsale_user', JSON.stringify(data.user));
      localStorage.setItem('farmsale_token', data.token);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Could not connect to authentication server.' };
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('farmsale_user', JSON.stringify(data.user));
      localStorage.setItem('farmsale_token', data.token);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Could not connect to server during registration.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('farmsale_user');
    localStorage.removeItem('farmsale_token');
  };

  const updateUserProfile = (profileData: any) => {
    if (user) {
      const updated = {
        ...user,
        profile: { ...user.profile, ...profileData }
      };
      setUser(updated);
      localStorage.setItem('farmsale_user', JSON.stringify(updated));
    }
  };

  // Quick helper for test accounts in evaluation environment
  const loginAsTestUser = async (role: UserRole) => {
    const roleEmails: Record<UserRole, string> = {
      farmer: 'farmer.ramesh@farmsale.in',
      buyer: 'buyer.procurement@sahyadrifoods.com',
      fpo: 'contact@sahyadrifpo.org',
      admin: 'admin.cell@farmsale.gov.in'
    };
    await login(roleEmails[role], 'FarmSale@2026');
  };

  const resetDataToFresh = async () => {
    try {
      await fetch('/api/auth/reset-data', { method: 'POST' });
    } catch (e) {
      console.error('Failed to reset backend data', e);
    }
    localStorage.removeItem('farmsale_user');
    localStorage.removeItem('farmsale_token');
    setUser(null);
    setToken(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserProfile,
        loginAsTestUser,
        resetDataToFresh,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
