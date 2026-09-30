import React, { useState } from 'react';
import { AuthProvider, useAuth, UserRole } from './context/AuthContext';
import { RoleProvider, useRole } from './context/RoleContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationCenter } from './components/common/NotificationCenter';
import { DemoScenarioRunner } from './components/demo/DemoScenarioRunner';
import { FarmSaleAssistant } from './components/assistant/FarmSaleAssistant';

// Auth & Onboarding Views
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { FarmerOnboarding } from './components/farmer/FarmerOnboarding';

// Main Views
import { LandingPage } from './components/landing/LandingPage';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { AICropPlanner } from './components/farmer/AICropPlanner';
import { IncomeSimulator } from './components/farmer/IncomeSimulator';
import { QualityIntelligence } from './components/farmer/QualityIntelligence';
import { HarvestForecast } from './components/farmer/HarvestForecast';

import { BuyerMarketplace } from './components/buyer/BuyerMarketplace';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';

import { FPOHub } from './components/fpo/FPOHub';

import { LogisticsHub } from './components/supplychain/LogisticsHub';
import { StorageNetwork } from './components/supplychain/StorageNetwork';
import { PriceIntelligence } from './components/supplychain/PriceIntelligence';
import { TraceabilityView } from './components/supplychain/TraceabilityView';

import { DemandIntelligence } from './components/intelligence/DemandIntelligence';
import { RegenerativeScore } from './components/regenerative/RegenerativeScore';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { RegionalMap } from './components/admin/RegionalMap';

const MainViewRouter: React.FC = () => {
  const { currentTab, setCurrentTab } = useAppState();
  const { switchRole } = useRole();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleAuthRoleSuccess = (role: UserRole) => {
    switchRole(role as any);
    if (role === 'farmer') {
      const u = JSON.parse(localStorage.getItem('farmsale_user') || '{}');
      if (u.profile && !u.profile.hasCompletedOnboarding) {
        setCurrentTab('farmer-onboarding');
      } else {
        setCurrentTab('farmer-dashboard');
      }
    } else if (role === 'buyer') {
      setCurrentTab('buyer-dashboard');
    } else if (role === 'fpo') {
      setCurrentTab('fpo-hub');
    } else if (role === 'admin') {
      setCurrentTab('admin-dashboard');
    } else {
      setCurrentTab('farmer-dashboard');
    }
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'login':
        return (
          <LoginPage
            onSuccess={handleAuthRoleSuccess}
            onNavigateSignup={() => setCurrentTab('signup')}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onSuccess={handleAuthRoleSuccess}
            onNavigateLogin={() => setCurrentTab('login')}
          />
        );
      case 'farmer-onboarding':
        return (
          <FarmerOnboarding
            onCompleted={() => setCurrentTab('farmer-dashboard')}
          />
        );
      case 'landing':
        return <LandingPage />;
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'crop-planner':
        return <AICropPlanner />;
      case 'income-simulator':
        return <IncomeSimulator />;
      case 'quality-intelligence':
        return <QualityIntelligence />;
      case 'harvest-forecast':
        return <HarvestForecast />;
      case 'buyer-marketplace':
        return <BuyerMarketplace />;
      case 'buyer-dashboard':
        return <BuyerDashboard />;
      case 'fpo-hub':
        return <FPOHub />;
      case 'logistics-hub':
        return <LogisticsHub />;
      case 'storage-network':
        return <StorageNetwork />;
      case 'price-intelligence':
        return <PriceIntelligence />;
      case 'traceability':
        return <TraceabilityView />;
      case 'demand-intelligence':
        return <DemandIntelligence />;
      case 'regenerative':
        return <RegenerativeScore />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'map-view':
        return <RegionalMap />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa]">
      <Navbar onOpenNotifications={() => setNotificationsOpen(true)} />
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <DemoScenarioRunner />
      <FarmSaleAssistant />

      <main className="flex-1">
        {renderActiveTab()}
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <AppStateProvider>
          <MainViewRouter />
        </AppStateProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
