import React from 'react';
import { Sprout, ShieldCheck, Database, Layers, ArrowUpRight } from 'lucide-react';
import { useAppState, AppViewTab } from '../../context/AppStateContext';

export const Footer: React.FC = () => {
  const { setCurrentTab } = useAppState();

  const handleNav = (tab: AppViewTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#11241b] text-gray-300 border-t border-emerald-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">FarmSale</span>
            </div>
            <p className="text-xs font-semibold text-emerald-400">
              Grow with demand. Sell with confidence.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              AI-powered demand-driven agriculture and regenerative supply chain intelligence. Built for Track 4: AgriN & Regenerative Agricultural Intelligence.
            </p>
            <div className="p-3 bg-emerald-950/60 border border-emerald-900 rounded-lg text-xs text-emerald-200/90 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-emerald-300">
                <Database className="w-3.5 h-3.5" />
                Live Agricultural Database Connected
              </div>
              <p className="text-[11px] text-gray-400">
                Powered by regional agro-climatic intelligence, active buyer forward demands, and soil health monitoring.
              </p>
            </div>
          </div>

          {/* Farmer & Production */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              Farmer Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('farmer-dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Farmer Operations Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('crop-planner')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  AI Crop Planning Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('income-simulator')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Net Income Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quality-intelligence')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Optical Quality Inspection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('harvest-forecast')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Harvest Prediction Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Aggregation & Supply Chain */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              Supply Chain & Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('buyer-marketplace')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Buyer Demand Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fpo-hub')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  FPO Aggregation Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('logistics-hub')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Logistics & Fleet Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('storage-network')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Cold Storage Network
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('traceability')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Field-to-Fork Traceability
                </button>
              </li>
            </ul>
          </div>

          {/* Regenerative & Governance */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              Intelligence & Soil
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('regenerative')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Regenerative Farm Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('demand-intelligence')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Demand Forecasting (90 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('price-intelligence')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Price Transparency Formula
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('map-view')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Regional Agricultural Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin-dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  State Supply Oversight
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            FarmSale Agricultural Intelligence Platform. Track 4: AgriN & Regenerative Agricultural Intelligence.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Explainable AI Engine</span>
            <span>•</span>
            <span>Multi-Stakeholder Architecture</span>
            <span>•</span>
            <span>Zero Speculative Guesswork</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
