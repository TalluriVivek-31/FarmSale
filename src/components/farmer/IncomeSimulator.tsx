import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ArrowRight,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const IncomeSimulator: React.FC = () => {
  const [acres, setAcres] = useState<number>(2.5);
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Onion' | 'Chilli'>('Tomato');

  // Parameters based on crop
  const cropEconomics = {
    Tomato: {
      yieldPerAcre: 7.0, // tonnes/acre
      tradPricePerQtl: 1900,
      agxPricePerQtl: 3100,
      tradLogisticsPerQtl: 110,
      agxLogisticsPerQtl: 48,
      tradStorageLossPercent: 18,
      agxStorageCostPerQtl: 42,
      inputCostPerAcre: 68000
    },
    Onion: {
      yieldPerAcre: 6.5,
      tradPricePerQtl: 1650,
      agxPricePerQtl: 2650,
      tradLogisticsPerQtl: 95,
      agxLogisticsPerQtl: 38,
      tradStorageLossPercent: 15,
      agxStorageCostPerQtl: 35,
      inputCostPerAcre: 48000
    },
    Chilli: {
      yieldPerAcre: 1.8,
      tradPricePerQtl: 14200,
      agxPricePerQtl: 19500,
      tradLogisticsPerQtl: 180,
      agxLogisticsPerQtl: 85,
      tradStorageLossPercent: 10,
      agxStorageCostPerQtl: 70,
      inputCostPerAcre: 52000
    }
  };

  const econ = cropEconomics[selectedCrop];
  const totalYieldTonnes = acres * econ.yieldPerAcre;
  const totalQuintals = totalYieldTonnes * 10;
  const totalInputCost = acres * econ.inputCostPerAcre;

  // Scenario A: Traditional
  const tradEffectiveQuintals = totalQuintals * (1 - econ.tradStorageLossPercent / 100);
  const tradGrossRevenue = tradEffectiveQuintals * econ.tradPricePerQtl;
  const tradLogisticsTotal = tradEffectiveQuintals * econ.tradLogisticsPerQtl;
  const tradNetIncome = tradGrossRevenue - tradLogisticsTotal - totalInputCost;

  // Scenario B: FarmSale Demand-Driven
  const agxEffectiveQuintals = totalQuintals * 0.98; // only 2% grading tolerance
  const agxGrossRevenue = agxEffectiveQuintals * econ.agxPricePerQtl;
  const agxLogisticsTotal = agxEffectiveQuintals * econ.agxLogisticsPerQtl;
  const agxStorageTotal = agxEffectiveQuintals * econ.agxStorageCostPerQtl;
  const agxNetIncome = agxGrossRevenue - agxLogisticsTotal - agxStorageTotal - totalInputCost;

  const netIncomeDifference = agxNetIncome - tradNetIncome;
  const percentageGain = Math.round((netIncomeDifference / Math.max(tradNetIncome, 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Farmer Economics & Decision Engine
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Simulation Sandbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Farmer Income Simulator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Compare expected real-world earnings: Traditional speculative planting vs. FarmSale demand-driven contracts.
          </p>
        </div>

        <DisclaimerBanner
          type="demo"
          message="Illustrative calculations based on simulated reference models."
        />
      </div>

      {/* Control Panel (Acres & Crop Selector) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Select Crop
            </label>
            <div className="flex items-center gap-1.5">
              {(['Tomato', 'Onion', 'Chilli'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCrop === crop
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden sm:block" />

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Cultivated Land: <span className="text-emerald-800">{acres} Acres</span>
            </label>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-44 accent-[#1b4332]"
            />
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-500 font-medium">Estimated Production</span>
          <div className="text-base font-extrabold text-gray-900">
            {totalYieldTonnes.toFixed(1)} Tonnes ({totalQuintals.toFixed(0)} Quintals)
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scenario A: Traditional */}
        <div className="bg-white rounded-2xl border border-rose-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-rose-50/70 px-6 py-4 border-b border-rose-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  Scenario A
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 mt-0.5">
                  Traditional Speculative Decision
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-100 text-rose-800">
                High Distress Risk
              </span>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-gray-600">
                <div className="font-semibold text-gray-800">Behavior Pattern:</div>
                <p>
                  Farmer grows based on past habit. Unaware of market supply gluts. Produce taken to local APMC mandi without pre-fixed price.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Mandi Spot Price:</span>
                  <span className="font-bold text-gray-900">₹{econ.tradPricePerQtl} / quintal</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Post-Harvest Spoilage / Distress Loss:</span>
                  <span className="font-bold text-rose-600">-{econ.tradStorageLossPercent}% of crop</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Uncoordinated Freight Cost:</span>
                  <span className="font-bold text-gray-900">-₹{econ.tradLogisticsPerQtl} / quintal</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Direct Farm Input Costs:</span>
                  <span className="font-bold text-gray-900">-₹{totalInputCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Gross Sale Realization:</span>
                  <span className="font-bold text-gray-900">₹{Math.round(tradGrossRevenue).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-rose-50/40 border-t border-rose-100">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Estimated Net Farmer Income
            </span>
            <div className="text-3xl font-extrabold text-rose-950 mt-1">
              ₹{Math.round(tradNetIncome).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Vulnerable to mandi price crashes and uncompensated distress wastage.
            </p>
          </div>
        </div>

        {/* Scenario B: FarmSale Demand-Driven */}
        <div className="bg-white rounded-2xl border border-emerald-300 shadow-md overflow-hidden flex flex-col justify-between ring-2 ring-emerald-600/10">
          <div>
            <div className="bg-[#eef8f2] px-6 py-4 border-b border-[#d8f3dc] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Scenario B
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 mt-0.5">
                  FarmSale Demand-Driven Plan
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-xs">
                Guaranteed Contract
              </span>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1 text-emerald-950 border border-emerald-100">
                <div className="font-semibold text-emerald-900">Demand-First Orchestration:</div>
                <p>
                  Planted against verified buyer procurement order. FPO aggregated for bulk rate. Staged in cold chain with matched freight.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Locked Contract Price:</span>
                  <span className="font-bold text-[#1b4332]">₹{econ.agxPricePerQtl} / quintal</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Preserved Crop Volume (Cold Chain):</span>
                  <span className="font-bold text-emerald-700">98% Prime Quality Sold</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Aggregated Logistics Fee:</span>
                  <span className="font-bold text-gray-900">-₹{econ.agxLogisticsPerQtl} / quintal</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Pre-Cooling & Cold Storage:</span>
                  <span className="font-bold text-gray-900">-₹{econ.agxStorageCostPerQtl} / quintal</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Direct Farm Input Costs:</span>
                  <span className="font-bold text-gray-900">-₹{totalInputCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#eef8f2] border-t border-[#d8f3dc]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                  Estimated Net Farmer Income
                </span>
                <div className="text-3xl font-extrabold text-[#1b4332] mt-1">
                  ₹{Math.round(agxNetIncome).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-full border border-emerald-400">
                  +{percentageGain}% Higher Net
                </span>
                <div className="text-xs font-bold text-emerald-900 mt-1">
                  +₹{Math.round(netIncomeDifference).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-2">
              Demand certainty, reduced distress spoilage, and aggregated freight unlock significant net value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
