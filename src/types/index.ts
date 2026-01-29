export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  partner: {
    name: string;
    logo: string;
    website: string;
  };
  category: DealCategory;
  discount: string;
  originalPrice?: string;
  isLocked: boolean;
  eligibilityRules: string[];
  claimInstructions: string;
  expiresAt?: string;
  totalClaims: number;
  maxClaims?: number;
}

export type DealCategory = 
  | 'cloud' 
  | 'marketing' 
  | 'analytics' 
  | 'productivity' 
  | 'design' 
  | 'developer-tools'
  | 'communication'
  | 'finance';

export interface Claim {
  id: string;
  dealId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  claimedAt: string;
  approvedAt?: string;
}

export interface ClaimedDeal extends Claim {
  deal: Deal;
}

export type AccessLevel = 'all' | 'locked' | 'unlocked';

export interface DealsFilter {
  category: DealCategory | 'all';
  accessLevel: AccessLevel;
  search: string;
}
