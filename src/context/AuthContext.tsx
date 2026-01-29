import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Claim, ClaimedDeal } from '@/types';
import { mockDeals } from '@/data/deals';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  claimedDeals: ClaimedDeal[];
  claimDeal: (dealId: string) => Promise<boolean>;
  hasClaimed: (dealId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulate JWT token storage
const TOKEN_KEY = 'startup_benefits_token';
const USER_KEY = 'startup_benefits_user';
const CLAIMS_KEY = 'startup_benefits_claims';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState<Claim[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);
    const savedClaims = localStorage.getItem(CLAIMS_KEY);
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedClaims) {
      setClaims(JSON.parse(savedClaims));
    }
    setIsLoading(false);
  }, []);

  // Save claims to localStorage when they change
  useEffect(() => {
    if (claims.length > 0) {
      localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));
    }
  }, [claims]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password.length < 6) {
      return false;
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      name: email.split('@')[0],
      isVerified: email.includes('verified') || Math.random() > 0.5, // Random verification for demo
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'jwt_' + btoa(JSON.stringify({ userId: mockUser.id, exp: Date.now() + 86400000 }));
    
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 6) {
      return false;
    }

    const mockUser: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      isVerified: false, // New users start unverified
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'jwt_' + btoa(JSON.stringify({ userId: mockUser.id, exp: Date.now() + 86400000 }));
    
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const claimDeal = async (dealId: string): Promise<boolean> => {
    if (!user) return false;

    const deal = mockDeals.find(d => d.id === dealId);
    if (!deal) return false;

    // Check if locked deal and user not verified
    if (deal.isLocked && !user.isVerified) {
      return false;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));

    const newClaim: Claim = {
      id: 'claim_' + Date.now(),
      dealId,
      userId: user.id,
      status: 'pending',
      claimedAt: new Date().toISOString(),
    };

    setClaims(prev => [...prev, newClaim]);
    
    // Simulate approval after 2 seconds (for demo)
    setTimeout(() => {
      setClaims(prev => prev.map(c => 
        c.id === newClaim.id 
          ? { ...c, status: 'approved', approvedAt: new Date().toISOString() }
          : c
      ));
    }, 2000);

    return true;
  };

  const hasClaimed = (dealId: string): boolean => {
    return claims.some(c => c.dealId === dealId);
  };

  const claimedDeals: ClaimedDeal[] = claims.map(claim => ({
    ...claim,
    deal: mockDeals.find(d => d.id === claim.dealId)!,
  })).filter(cd => cd.deal);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      claimedDeals,
      claimDeal,
      hasClaimed,
    }}>
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
