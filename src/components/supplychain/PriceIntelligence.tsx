import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Minus,
  Equal,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const PriceIntelligence: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Onion' | 'Chilli'>('Tomato');

  const priceModels = {
    Tomato: {
      crop: 'Hybrid Processing Tomato (Grade A)',
      buyerGrossPrice: 3200,
      logisticsCost: 120,
      storageCost: 70,
      netFarmerRevenue: 3010,
      localMandiSpot: 2200,
      premiumOverMandi: 810,
      trend: '+12% in 14 days',
      trendPositive: true,
      priceHistory: [
        { day: 'Sep 10', buyerContract: 2850, mandiSpot: 1950 },
        { day: 'Sep 15', buyerContract: 2950, mandiSpot: 2050 },
        { day: 'Sep 20', buyerContract: 3100, mandiSpot: 2150 },
        { day: 'Sep 25', buyerContract: 3200, mandiSpot: 2200 },
        { day: 'Sep 30', buyerContract: 3200, mandiSpot: 2250 },
      ]
    },
    Onion: {
      crop: 'Nashik Garwa Red Onion (Medium 45-55mm)',
      buyerGrossPrice: 2750,
      logisticsCost: 95,
      storageCost: 45,
      netFarmerRevenue: 2610,
      localMandiSpot: 1850,
      premiumOverMandi: 760,
      trend: '+8% in 14 days',
      trendPositive: true,
      priceHistory: [
        { day: 'Sep 10', buyerContract: 2500, mandiSpot: 1700 },
        { day: 'Sep 15', buyerContract: 2600, mandiSpot: 1750 },
        { day: 'Sep 20', buyerContract: 2700, mandiSpot: 1800 },
        { day: 'Sep 25', buyerContract: 2750, mandiSpot: 1850 },
        { day: 'Sep 30', buyerContract: 2750, mandiSpot: 1850 },
      ]
    },
    Chilli: {
      crop: 'Guntur Sannam S17 Red Chilli',
      buyerGrossPrice: 20500,
      logisticsCost: 350,
      storageCost: 180,
      netFarmerRevenue: 19970,
      localMandiSpot: 15400,
      premiumOverMandi: 4570,
      trend: '+15% in 14 days',
      trendPositive: true,
      priceHistory: [
        { day: 'Sep 10', buyerContract: 18500, mandiSpot: 14200 },
        { day: 'Sep 15', buyerContract: 19200, mandiSpot: 14600 },
        { day: 'Sep 20', buyerContract: 19800, mandiSpot: 15000 },
        { day: 'Sep 25', buyerContract: 20500, mandiSpot: 15400 },
        { day: 'Sep 30', buyerContract: 20500, mandiSpot: 15400 },
      ]
    }
  };

  const current = priceModels[selectedCrop];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Transparent Price Decomposition
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Net Farmer Realization
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Price Intelligence & Net Formula
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Complete transparency into gross buyer offers, freight deductions, and storage tariffs.
          </p>
        </div>

        <DisclaimerBanner
          type="demo"
          message="Simulated price calculations for prototype demonstration."
        />
      </div>

      {/* Crop Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        {(['Tomato', 'Onion', 'Chilli'] as const).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCrop === crop
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* The Transparent Formula Banner (From Prompt Requirement 21) */}
      <div className="bg-white rounded-2xl border border-emerald-300 shadow-agri-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          Net Farmer Revenue Formula Decomposition
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-[#fbfbfa] p-5 rounded-xl border border-gray-200 text-center">
          {/* Gross Buyer Price */}
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-medium">Gross Buyer Contract</span>
            <div className="text-2xl font-extrabold text-blue-900">
              ₹{current.buyerGrossPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-gray-400">per quintal</span>
          </div>

          {/* Minus Transport */}
          <div className="space-y-1 sm:border-l border-gray-200 sm:pl-4">
            <span className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1">
              <Minus className="w-3.5 h-3.5" /> Transport & Reefer
            </span>
            <div className="text-2xl font-extrabold text-rose-700">
              -₹{current.logisticsCost}
            </div>
            <span className="text-[11px] text-gray-400">per quintal</span>
          </div>

          {/* Minus Storage */}
          <div className="space-y-1 sm:border-l border-gray-200 sm:pl-4">
            <span className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1">
              <Minus className="w-3.5 h-3.5" /> Cold Pre-Cooling
            </span>
            <div className="text-2xl font-extrabold text-rose-700">
              -₹{current.storageCost}
            </div>
            <span className="text-[11px] text-gray-400">per quintal</span>
          </div>

          {/* Equals Net Return */}
          <div className="space-y-1 sm:border-l border-gray-200 sm:pl-4 bg-[#eef8f2] p-3 rounded-lg border border-[#d8f3dc]">
            <span className="text-xs text-emerald-800 font-bold flex items-center justify-center gap-1">
              <Equal className="w-3.5 h-3.5" /> Estimated Net Return
            </span>
            <div className="text-3xl font-extrabold text-[#1b4332]">
              ₹{current.netFarmerRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              +₹{current.premiumOverMandi} vs APMC Spot
            </span>
          </div>
        </div>
      </div>

      {/* Historical Movement Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Recent Price Movement (14-Day Trajectory)
            </h3>
            <p className="text-xs text-gray-500">
              FarmSale contract floor price stability vs volatile APMC open auction bids
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-1 rounded-md border border-[#d8f3dc]">
            {current.trend}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#fbfbfa] text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Timeline</th>
                <th className="py-2.5 px-4 font-bold text-right">FarmSale Contract (₹/qtl)</th>
                <th className="py-2.5 px-4 font-bold text-right">APMC Mandi Auction (₹/qtl)</th>
                <th className="py-2.5 px-4 font-bold text-right">Farmer Premium (₹/qtl)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.priceHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900">{row.day}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#1b4332]">
                    ₹{row.buyerContract.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₹{row.mandiSpot.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">
                    +₹{(row.buyerContract - row.mandiSpot).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
