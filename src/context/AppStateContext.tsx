import React, { createContext, useContext, useState } from 'react';
import {
  BuyerDemand,
  ActiveCropPlan,
  NotificationItem,
  FPOAggregationBatch
} from '../types';
import {
  BUYER_DEMANDS,
  ACTIVE_CROP_PLANS,
  INITIAL_NOTIFICATIONS,
  FPO_AGGREGATION_DEMO
} from '../data/mockData';

export type AppViewTab =
  | 'landing'
  | 'login'
  | 'signup'
  | 'farmer-onboarding'
  | 'farmer-dashboard'
  | 'crop-planner'
  | 'demand-intelligence'
  | 'buyer-marketplace'
  | 'buyer-dashboard'
  | 'fpo-hub'
  | 'quality-intelligence'
  | 'harvest-forecast'
  | 'logistics-hub'
  | 'storage-network'
  | 'price-intelligence'
  | 'regenerative'
  | 'traceability'
  | 'income-simulator'
  | 'admin-dashboard'
  | 'map-view';

interface AppStateContextType {
  currentTab: AppViewTab;
  setCurrentTab: (tab: AppViewTab) => void;
  demands: BuyerDemand[];
  addDemand: (newDemand: Omit<BuyerDemand, 'id' | 'createdAt'>) => void;
  cropPlans: ActiveCropPlan[];
  addCropPlan: (plan: Omit<ActiveCropPlan, 'id'>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  demoCurrentStep: number;
  setDemoCurrentStep: (step: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  fpoBatch: FPOAggregationBatch;
  updateFpoBatchProgress: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<AppViewTab>('landing');
  const [demands, setDemands] = useState<BuyerDemand[]>(BUYER_DEMANDS);
  const [cropPlans, setCropPlans] = useState<ActiveCropPlan[]>(ACTIVE_CROP_PLANS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [demoCurrentStep, setDemoCurrentStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [fpoBatch, setFpoBatch] = useState<FPOAggregationBatch>(FPO_AGGREGATION_DEMO);

  const addDemand = (newDemandData: Omit<BuyerDemand, 'id' | 'createdAt'>) => {
    const newDemand: BuyerDemand = {
      ...newDemandData,
      id: `DEM-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setDemands((prev) => [newDemand, ...prev]);

    // Add alert
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Buyer Demand Published',
      message: `${newDemand.buyerName} posted requirement for ${newDemand.quantityTonnes} tonnes of ${newDemand.crop}.`,
      timestamp: 'Just now',
      read: false,
      category: 'demand'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addCropPlan = (planData: Omit<ActiveCropPlan, 'id'>) => {
    const newPlan: ActiveCropPlan = {
      ...planData,
      id: `PLAN-00${cropPlans.length + 1}`
    };
    setCropPlans((prev) => [newPlan, ...prev]);

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Crop Production Plan Activated',
      message: `Committed ${newPlan.areaAcres} acres for ${newPlan.crop}. Synced with buyer demand.`,
      timestamp: 'Just now',
      read: false,
      category: 'harvest'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const updateFpoBatchProgress = () => {
    setFpoBatch((prev) => ({
      ...prev,
      status: prev.status === 'Forming' ? 'Target Reached' : 'Quality Verified'
    }));
  };

  return (
    <AppStateContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        demands,
        addDemand,
        cropPlans,
        addCropPlan,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        demoModalOpen,
        setDemoModalOpen,
        demoCurrentStep,
        setDemoCurrentStep,
        searchQuery,
        setSearchQuery,
        isAssistantOpen,
        setIsAssistantOpen,
        fpoBatch,
        updateFpoBatchProgress
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
