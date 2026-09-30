import React from 'react';
import {
  TrendingUp,
  Sprout,
  ArrowRight,
  ShieldCheck,
  Warehouse,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Leaf,
  BarChart3,
  Calendar,
  Building2,
  Cpu,
  UserCheck
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useRole } from '../../context/RoleContext';
import { useAuth } from '../../context/AuthContext';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const LandingPage: React.FC = () => {
  const { setCurrentTab, setDemoModalOpen } = useAppState();
  const { switchRole } = useRole();
  const { loginAsTestUser } = useAuth();

  const handleRoleLaunch = async (role: 'farmer' | 'buyer' | 'fpo' | 'admin', tab: any) => {
    switchRole(role);
    await loginAsTestUser(role);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const workflowSteps = [
    { num: '01', title: 'Buyer Demand', desc: 'Verified institutional purchase requirements & grade criteria', icon: <TrendingUp className="w-5 h-5 text-emerald-700" /> },
    { num: '02', title: 'Crop Planning', desc: 'AI recommends optimal crops based on demand and soil health', icon: <Sprout className="w-5 h-5 text-emerald-700" /> },
    { num: '03', title: 'Monitored Growth', desc: 'Phenological stages tracked with predictive harvest timelines', icon: <Calendar className="w-5 h-5 text-emerald-700" /> },
    { num: '04', title: 'Quality Verification', desc: 'Optical defect detection and objective harvest grading', icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" /> },
    { num: '05', title: 'FPO Aggregation', desc: 'Combining smallholder volumes to fulfill bulk purchase contracts', icon: <Warehouse className="w-5 h-5 text-emerald-700" /> },
    { num: '06', title: 'Storage & Logistics', desc: 'Nearby cold storage and pre-matched freight routes', icon: <Truck className="w-5 h-5 text-emerald-700" /> },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#f4f7f4] via-[#fbfbfa] to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef8f2] border border-[#d8f3dc] text-xs font-semibold text-[#1b4332]">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Track 4: AgriN & Regenerative Agricultural Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Grow with demand.{' '}
              <span className="text-[#1b4332] block sm:inline">
                Sell with confidence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              FarmSale connects crop planning, market demand, farmer matching, logistics, storage, and regenerative farming in one agricultural intelligence platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setCurrentTab('farmer-dashboard')}
                className="px-6 py-3 rounded-xl bg-[#1b4332] text-white font-bold text-sm hover:bg-[#143628] shadow-agri-md transition-all flex items-center gap-2"
              >
                <span>Explore the platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('crop-planner')}
                className="px-5 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>View farmer workflow</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm hover:bg-emerald-100 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                <span>Run Demo Scenario</span>
              </button>
            </div>

            <div className="pt-2">
              <DisclaimerBanner
                type="demo"
                className="inline-flex mx-auto"
              />
            </div>
          </div>

          {/* Operational Platform Preview Card (Replaces generic stock photo) */}
          <div className="mt-12 rounded-2xl border border-gray-300 bg-white shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Window titlebar */}
            <div className="bg-[#f0f2f0] px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-gray-700 font-semibold">
                  farmsale.live/operations-hub
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                Live Demonstration Environment
              </div>
            </div>

            {/* Dashboard Content Mockup Grid */}
            <div className="p-4 sm:p-6 bg-[#fbfbfa] grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Box 1: Demand Match */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Buyer Requirement
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    94% Match
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  500 Tonnes Tomato
                </div>
                <div className="text-xs text-gray-600">
                  Sahyadri Foods (Dindori Hub, 28 km)
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Contract Rate:</span>
                  <span className="font-bold text-[#1b4332]">₹2,800 - ₹3,200/qtl</span>
                </div>
              </div>

              {/* Box 2: Farmer Aggregation */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    FPO Aggregation
                  </span>
                  <span className="text-xs font-bold text-[#8b5e3c] bg-[#f5ebe0] px-2 py-0.5 rounded">
                    5 Farmers Pooled
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  500 / 500 Tonnes
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#1b4332] h-full rounded-full w-full" />
                </div>
                <div className="pt-1 text-[11px] text-gray-500">
                  100% Demand fulfilled through FPO aggregation
                </div>
              </div>

              {/* Box 3: Soil & Regenerative */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Regenerative Health
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    74 / 100
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  Optimal Soil Balance
                </div>
                <div className="text-xs text-gray-600">
                  Drip fertigation + zero stubble burning
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Water Efficiency:</span>
                  <span className="font-bold text-emerald-700">+38% Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DEMAND-FIRST WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            The Demand-First Agricultural Loop
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Reversing the traditional speculative supply chain into a coordinated, market-driven process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-extrabold text-gray-400">
                    {step.num}
                  </span>
                  <div className="p-1.5 rounded-lg bg-[#eef8f2] border border-[#d8f3dc]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE 4 CRITICAL PROBLEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fcf8f6] border border-amber-200/80 rounded-2xl p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              The Agricultural Mismatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
              Why Traditional Crop Planning Fails
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every season, millions of Indian smallholders face severe revenue losses caused by four fundamental structural gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-gray-900">Uncertain demand</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Farmers plant without forward visibility into what industrial processors, exporters, or retail chains actually require.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-gray-900">Production mismatch</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Localized crop gluts trigger sharp price collapses at harvest, forcing farmers into distress selling below production cost.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-gray-900">Price uncertainty</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Opaque mandi bidding and middleman spreads prevent smallholders from realizing fair market value for graded produce.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-gray-900">Post-harvest loss</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Lack of timely cold storage and temperature-controlled logistics causes perishable crops to deteriorate rapidly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE KEY DIFFERENTIATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1b4332] text-white rounded-2xl p-6 sm:p-10 shadow-agri-lg">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Core Architectural Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Not Just Direct Selling: Full Demand-First Orchestration
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              FarmSale does not merely act as an open bulletin board. It works backward from verifiable institutional demand to prescribe acreages, organize collective FPO supply, and protect regenerative soil assets.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-emerald-800/80">
            <div className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-700/50 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-200">
                1. Demand Intelligence
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Forward 30, 60, and 90-day demand curves aggregated across processors, exporters, and wholesale buyers.
              </p>
            </div>

            <div className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-700/50 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-200">
                2. Explainable Matching
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Transparent matching scores based on harvest dates, logistics radius, quality specs, and quantity fit.
              </p>
            </div>

            <div className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-700/50 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-200">
                3. Regenerative Tracking
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                8-pillar soil and sustainability index ensuring long-term land productivity and water conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MULTI-STAKEHOLDER ROLE LAUNCHPAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Role-Based Experiences for Every Agricultural Stakeholder
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Switch between simulated profiles to evaluate the platform from each distinct operational viewpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Farmer Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-agri-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Farmer Portal</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Receive demand-driven crop plans, verify expected harvest yields, inspect crop quality, and compare net income.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 pt-1">
                <li>• Soil health & moisture tracking</li>
                <li>• Pre-matched buyer orders</li>
                <li>• Cold storage booking</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleLaunch('farmer', 'farmer-dashboard')}
              className="mt-6 w-full py-2.5 px-4 bg-[#1b4332] text-white rounded-xl text-xs font-bold hover:bg-[#143628] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue as Farmer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Buyer Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-agri-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-blue-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Buyer Portal</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Post forward procurement contracts, specify quality tolerances, discover matching FPO clusters, and monitor fulfillment.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 pt-1">
                <li>• Post forward requirements</li>
                <li>• Automated supplier matching</li>
                <li>• Live batch transit tracking</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleLaunch('buyer', 'buyer-dashboard')}
              className="mt-6 w-full py-2.5 px-4 bg-blue-800 text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue as Buyer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* FPO Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-agri-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#f5ebe0] text-[#8b5e3c] flex items-center justify-center font-bold">
                <Warehouse className="w-5 h-5 text-[#8b5e3c]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">FPO Hub</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Aggregate smallholder member harvests to fulfill large industrial orders, coordinate collection centers, and lock bulk rates.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 pt-1">
                <li>• Smallholder supply pooling</li>
                <li>• Collection center intake</li>
                <li>• Transparent member payouts</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleLaunch('fpo', 'fpo-hub')}
              className="mt-6 w-full py-2.5 px-4 bg-[#8b5e3c] text-white rounded-xl text-xs font-bold hover:bg-[#6f4e37] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue as FPO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Admin Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-agri-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-purple-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Authority Oversight</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Monitor district-level supply gaps, storage utilization, crop monoculture risks, and regional sustainability progress.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 pt-1">
                <li>• State & district analytics</li>
                <li>• Monoculture risk radar</li>
                <li>• Cold chain bottleneck logs</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleLaunch('admin', 'admin-dashboard')}
              className="mt-6 w-full py-2.5 px-4 bg-purple-800 text-white rounded-xl text-xs font-bold hover:bg-purple-900 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue as Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
