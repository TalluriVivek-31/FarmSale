import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Bell,
  Bot,
  Play,
  User,
  Building2,
  Warehouse,
  Shield,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LogIn,
  UserPlus,
  RotateCcw
} from 'lucide-react';
import { useAppState, AppViewTab } from '../../context/AppStateContext';
import { useRole } from '../../context/RoleContext';
import { useAuth, UserRole } from '../../context/AuthContext';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const {
    currentTab,
    setCurrentTab,
    unreadNotificationsCount,
    setDemoModalOpen,
    setIsAssistantOpen,
    searchQuery,
    setSearchQuery
  } = useAppState();

  const { activeRole, switchRole } = useRole();
  const { user, isAuthenticated, logout, loginAsTestUser, resetDataToFresh } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleOptions: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      role: 'farmer',
      label: 'Farmer',
      icon: <Sprout className="w-4 h-4 text-emerald-700" />,
      desc: 'Ramesh Patel (Nashik, 4.5 acres)'
    },
    {
      role: 'buyer',
      label: 'Institutional Buyer',
      icon: <Building2 className="w-4 h-4 text-blue-700" />,
      desc: 'Sahyadri Foods (Procurement Hub)'
    },
    {
      role: 'fpo',
      label: 'FPO / Cooperative',
      icon: <Warehouse className="w-4 h-4 text-[#8b5e3c]" />,
      desc: 'Sahyadri Farmers Co-op (420 members)'
    },
    {
      role: 'admin',
      label: 'Agricultural Authority',
      icon: <Shield className="w-4 h-4 text-purple-700" />,
      desc: 'State Agritech Monitoring Cell'
    }
  ];

  const handleRoleSelect = async (role: UserRole) => {
    switchRole(role as any);
    await loginAsTestUser(role);
    setRoleDropdownOpen(false);

    // Switch to respective dashboard automatically
    if (role === 'farmer') setCurrentTab('farmer-dashboard');
    else if (role === 'buyer') setCurrentTab('buyer-dashboard');
    else if (role === 'fpo') setCurrentTab('fpo-hub');
    else if (role === 'admin') setCurrentTab('admin-dashboard');
  };

  const handleLogout = () => {
    logout();
    setRoleDropdownOpen(false);
    setCurrentTab('landing');
  };

  const navItems: { tab: AppViewTab; label: string; badge?: string }[] = [
    { tab: 'landing', label: 'Overview' },
    { tab: 'farmer-dashboard', label: 'Farmer Hub' },
    { tab: 'crop-planner', label: 'AI Crop Planner', badge: 'Core' },
    { tab: 'demand-intelligence', label: 'Demand Intelligence' },
    { tab: 'buyer-marketplace', label: 'Buyer Marketplace' },
    { tab: 'fpo-hub', label: 'FPO Hub' },
    { tab: 'regenerative', label: 'Regenerative Score', badge: 'Track 4' },
    { tab: 'income-simulator', label: 'Income Planner' },
    { tab: 'map-view', label: 'Agri Map' }
  ];

  const effectiveRole = user?.role || activeRole;
  const displayName = user?.name ? user.name.split(' ')[0] : (effectiveRole === 'farmer' ? 'Ramesh' : effectiveRole);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top micro-bar for quick demo context and judge runner */}
      <div className="bg-[#1b4332] text-emerald-50 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            FarmSale: Demand-Driven Regenerative Agriculture
          </span>
          <span className="hidden md:inline text-emerald-400/50">|</span>
          <span className="hidden md:inline text-emerald-100/70">
            Grow with demand. Sell with confidence.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (window.confirm('Reset all entered data and restore the platform to a completely fresh state?')) {
                await resetDataToFresh();
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold border border-white/20 text-[11px] transition-colors"
            title="Wipe entered test data and restore fresh baseline"
          >
            <RotateCcw className="w-3 h-3 text-emerald-300" />
            <span>Reset to Fresh</span>
          </button>

          <button
            onClick={() => setDemoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold border border-emerald-400/40 text-[11px] transition-colors shadow-xs"
          >
            <Play className="w-3 h-3 fill-emerald-300 text-emerald-300" />
            <span>Run 12-Step Demo Scenario</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] flex items-center justify-center text-white shadow-sm group-hover:bg-[#143628] transition-colors">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-gray-950 tracking-tight">
                  FarmSale
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-gray-500 hidden sm:block font-medium">
                Grow with demand. Sell with confidence.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, buyers, FPOs, storage..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setCurrentTab(item.tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-emerald-300 text-emerald-950'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* FarmSale AI Assistant Trigger */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-[#eef8f2] text-[#1b4332] hover:bg-[#d8f3dc] text-xs font-bold transition-all shadow-xs"
            >
              <Bot className="w-4 h-4 text-[#1b4332]" />
              <span className="hidden sm:inline">FarmSale AI</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Role & Auth Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors shadow-xs"
              >
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">
                  {effectiveRole === 'farmer' && 'F'}
                  {effectiveRole === 'buyer' && 'B'}
                  {effectiveRole === 'fpo' && 'C'}
                  {effectiveRole === 'admin' && 'A'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-bold text-gray-900 capitalize">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    {effectiveRole}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {isAuthenticated ? `Signed in as ${user?.name}` : 'Demo Quick Login'}
                    </span>
                    <p className="text-[11px] text-gray-500">
                      Switch roles instantly to inspect the platform from each stakeholder lens
                    </p>
                  </div>

                  <div className="space-y-1">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.role}
                        onClick={() => handleRoleSelect(opt.role)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                          effectiveRole === opt.role
                            ? 'bg-[#eef8f2] text-[#1b4332] font-bold'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="p-1 rounded-md bg-white border border-gray-200 shadow-xs mt-0.5">
                          {opt.icon}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            <span>{opt.label}</span>
                            {effectiveRole === opt.role && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-500 font-normal">
                            {opt.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Auth Actions */}
                  <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                          onClick={() => {
                            setRoleDropdownOpen(false);
                            setCurrentTab('login');
                          }}
                          className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold"
                        >
                          <LogIn className="w-3 h-3" />
                          <span>Login</span>
                        </button>
                        <button
                          onClick={() => {
                            setRoleDropdownOpen(false);
                            setCurrentTab('signup');
                          }}
                          className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs bg-[#1b4332] hover:bg-[#143628] text-white rounded-lg font-semibold"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>Sign Up</span>
                        </button>
                      </div>
                    )}

                    <div className="pt-1.5 border-t border-gray-100">
                      <button
                        onClick={async () => {
                          setRoleDropdownOpen(false);
                          if (window.confirm('Reset all entered data and restore the platform to a completely fresh state?')) {
                            await resetDataToFresh();
                          }
                        }}
                        className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] text-gray-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-medium transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Data to Fresh State</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          <div className="mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, buyers, storage..."
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setCurrentTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                  currentTab === item.tab
                    ? 'bg-[#1b4332] text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentTab('login');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 text-xs bg-gray-100 text-gray-800 rounded-lg font-semibold"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setCurrentTab('signup');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 text-xs bg-[#1b4332] text-white rounded-lg font-semibold"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
