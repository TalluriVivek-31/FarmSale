import React, { useState } from 'react';
import {
  Warehouse,
  Users,
  Sprout,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Calendar,
  Building2,
  Truck,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const FPOHub: React.FC = () => {
  const { fpoBatch, updateFpoBatchProgress, setCurrentTab } = useAppState();

  const [activeTab, setActiveTab] = useState<'aggregation' | 'members' | 'collection'>('aggregation');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8b5e3c] bg-[#f5ebe0] px-2.5 py-0.5 rounded-full border border-[#d5bdaf]">
              Cooperative Aggregation Terminal
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Sahyadri Agri Farmers Cooperative (Reg. NSK-44)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            FPO Aggregation Hub
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Empower smallholders by pooling individual farm volumes to fulfill institutional buyer contracts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('traceability')}
            className="px-4 py-2.5 bg-[#8b5e3c] text-white text-xs font-bold rounded-xl hover:bg-[#6f4e37] transition-colors shadow-xs flex items-center gap-2"
          >
            <span>Trace Master Batch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <DisclaimerBanner
        type="demo"
        message="FPO smallholder aggregation simulator. Demonstrates collective supply pooling."
      />

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Member Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            420 Members
          </div>
          <div className="text-[11px] text-gray-500">
            Across 14 village clusters
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Combined Acreage</span>
            <Sprout className="w-4 h-4 text-[#8b5e3c]" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            1,850 Acres
          </div>
          <div className="text-[11px] text-gray-500">
            78% under micro-irrigation
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Pooled Volume</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-900">
            {fpoBatch.collectedTonnes} Tonnes
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            100% Demand Fulfilled
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Collection Hubs</span>
            <Warehouse className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-900">
            3 Centers
          </div>
          <div className="text-[11px] text-gray-500">
            Pimpalgaon, Niphad, Dindori
          </div>
        </div>
      </div>

      {/* Featured Aggregation Demonstration Case */}
      <div className="bg-white rounded-2xl border border-emerald-300 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
                Active Master Contract
              </span>
              <Badge variant="green">{fpoBatch.status}</Badge>
            </div>
            <h2 className="text-xl font-extrabold text-gray-950 mt-1">
              {fpoBatch.crop}: Master Aggregation Pool
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
              <span>Buyer: {fpoBatch.buyerName}</span>
              <span>•</span>
              <span>Intake Point: {fpoBatch.collectionCenter}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500 block">Total Contract Target</span>
            <div className="text-2xl font-extrabold text-[#1b4332]">
              {fpoBatch.collectedTonnes} / {fpoBatch.targetTonnes} Tonnes
            </div>
          </div>
        </div>

        {/* Aggregation Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-800">
              Demand fulfilled through FPO aggregation:
            </span>
            <span className="font-extrabold text-emerald-800">
              100% Volume Locked (500 Tonnes)
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-[#1b4332] h-full rounded-full w-full" />
          </div>
          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-0.5">
            <span>Aggregated across 5 distinct smallholders</span>
            <span className="font-medium text-emerald-700">All member volumes verified</span>
          </div>
        </div>

        {/* The 5 Individual Farmer Quotas Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center justify-between">
            <span>Individual Smallholder Member Contributions</span>
            <span className="text-[11px] text-gray-500 font-normal">
              No single farmer could supply 500T independently
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {fpoBatch.memberContributions.map((member, idx) => (
              <div
                key={member.farmerId}
                className="p-4 rounded-xl border border-gray-200 bg-[#fbfbfa] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase">
                    Farmer 0{idx + 1}
                  </span>
                  <Badge variant="green">{member.qualityEstimated}</Badge>
                </div>

                <div className="font-bold text-gray-900 text-sm leading-tight">
                  {member.farmerName}
                </div>

                <div className="text-xs text-gray-500">
                  Village: {member.village}
                </div>

                <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between">
                  <span className="text-gray-500">Supply:</span>
                  <span className="font-extrabold text-[#1b4332] text-sm">
                    {member.pledgedTonnes} Tonnes
                  </span>
                </div>

                <div className="text-[10px] text-gray-400">
                  Harvest: {member.harvestWindow}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collective Bargaining Advantage Callout */}
        <div className="bg-[#eef8f2] border border-[#d8f3dc] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Collective Bargaining & Guaranteed Off-Take</span>
            </div>
            <p className="text-emerald-900/80 text-[11px]">
              By aggregating 500 tonnes, the FPO secured a fixed price of ₹3,100/quintal directly with Sahyadri Foods, eliminating local middleman deductions of 25-30%.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('logistics-hub')}
            className="px-4 py-2 bg-[#1b4332] text-white font-bold rounded-lg hover:bg-[#143628] transition-colors shrink-0 shadow-xs"
          >
            Dispatch Fleet &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
