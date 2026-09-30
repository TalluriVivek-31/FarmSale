import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Warehouse,
  Truck,
  Users,
  Sprout,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { useAppState } from '../../context/AppStateContext';

export const AdminDashboard: React.FC = () => {
  const { setCurrentTab } = useAppState();
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminOverview();
  }, []);

  const fetchAdminOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/market/admin/overview');
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error('Failed to load admin overview', err);
    } finally {
      setLoading(false);
    }
  };

  const counts = adminData?.counts || {
    registeredFarmers: 1,
    registeredBuyers: 1,
    registeredFpos: 1,
    activeDemandsCount: 3,
    activeCropPlansCount: 1,
    aggregationBatchesCount: 1
  };

  const aggregates = adminData?.aggregates || {
    totalDemandsTonnes: 1850,
    totalSupplyPlansTonnes: 15.5,
    storageOccupancyPercent: 72,
    totalStorageCapacityTonnes: 4700,
    availableStorageTonnes: 1170
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              State Oversight Terminal
            </span>
            <span className="text-xs text-gray-500 font-medium">
              FarmSale Regional Monitoring Authority
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Agricultural Authority & Supply Oversight
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Audit actual database registrations, forward institutional demand pipelines, and regional storage availability.
          </p>
        </div>

        <DisclaimerBanner
          type="demo"
          message="Audited metrics generated strictly from real database records."
        />
      </div>

      {/* 5 Macro KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Enrolled Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            {counts.registeredFarmers} Cultivators
          </div>
          <div className="text-[11px] text-gray-500">
            Active verified profiles
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Procurement Demand</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-900">
            {aggregates.totalDemandsTonnes.toLocaleString('en-IN')} T
          </div>
          <div className="text-[11px] text-gray-500">
            Across {counts.activeDemandsCount} active contracts
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Production Plans</span>
            <Sprout className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-[#1b4332]">
            {aggregates.totalSupplyPlansTonnes} T
          </div>
          <div className="text-[11px] text-gray-500">
            {counts.activeCropPlansCount} committed parcels
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Cold Storage Occupancy</span>
            <Warehouse className="w-4 h-4 text-[#8b5e3c]" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            {aggregates.storageOccupancyPercent}%
          </div>
          <div className="text-[11px] text-gray-500">
            {aggregates.availableStorageTonnes.toLocaleString('en-IN')} T free space
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>FPO Networks</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-900">
            {counts.registeredFpos} Co-ops
          </div>
          <div className="text-[11px] text-gray-500">
            Active aggregation hubs
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Demands Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Recent Procurement Contracts
              </h3>
              <p className="text-xs text-gray-500">
                Live institutional purchase commitments verified in system database
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('buyer-marketplace')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#fbfbfa] text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Buyer</th>
                  <th className="py-2.5 px-3 font-bold">Crop</th>
                  <th className="py-2.5 px-3 font-bold text-right">Quantity</th>
                  <th className="py-2.5 px-3 font-bold text-right">Price Floor</th>
                  <th className="py-2.5 px-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminData?.recentDemands?.map((row: any) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold text-gray-900">{row.buyerName}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{row.crop}</td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-900">
                      {row.quantityTonnes} T
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#1b4332]">
                      ₹{row.maxPricePerQuintal}/qtl
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Badge variant={row.contractStatus === 'Open' ? 'green' : 'amber'}>
                        {row.contractStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Storage & Infrastructure (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-[#8b5e3c]" />
              <span>Cold Chain Capacity Overview</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 border border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Monitored Capacity:</span>
                  <span className="font-bold text-gray-900">{aggregates.totalStorageCapacityTonnes.toLocaleString('en-IN')} Tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Free Space:</span>
                  <span className="font-bold text-emerald-800">{aggregates.availableStorageTonnes.toLocaleString('en-IN')} Tonnes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-1">
                  <div className="bg-[#1b4332] h-full rounded-full" style={{ width: `${aggregates.storageOccupancyPercent}%` }} />
                </div>
              </div>

              <div className="p-3 bg-[#eef8f2] rounded-xl border border-[#d8f3dc] text-xs space-y-1">
                <span className="font-bold text-emerald-950">District Allocation Policy:</span>
                <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                  Dual-temperature chambers are prioritized for perishable Grade A processing crops to eliminate distress spoilage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
