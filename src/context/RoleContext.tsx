import React, { createContext, useContext, useState } from 'react';
import { UserRole, UserProfile } from '../types';

interface RoleContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
}

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'FARM-IND-001',
    name: 'Ramesh Patel',
    role: 'farmer',
    location: 'Pimpalgaon Baswant',
    district: 'Nashik',
    state: 'Maharashtra',
    phone: '+91 98220 41209',
    organization: 'Sahyadri Agri Farmers Cooperative'
  },
  buyer: {
    id: 'BUYER-001',
    name: 'Sahyadri Foods Processing Pvt Ltd',
    role: 'buyer',
    location: 'Dindori Processing Hub',
    district: 'Nashik',
    state: 'Maharashtra',
    organization: 'Sahyadri Foods Procurement Division'
  },
  fpo: {
    id: 'FPO-001',
    name: 'Sahyadri Agri Farmers Cooperative',
    role: 'fpo',
    location: 'Central APMC Complex, Pimpalgaon',
    district: 'Nashik',
    state: 'Maharashtra',
    organization: 'Registered Cooperative (420 Smallholder Members)'
  },
  admin: {
    id: 'ADMIN-001',
    name: 'Agricultural Intelligence & Supply Authority',
    role: 'admin',
    location: 'State Agritech Monitoring Cell',
    district: 'Mumbai / Nashik',
    state: 'Maharashtra',
    organization: 'Regional Supply Oversight Division'
  }
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('farmer');

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
  };

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentUser: DEMO_PROFILES[activeRole],
        switchRole
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
