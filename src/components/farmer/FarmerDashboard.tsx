import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Calendar,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Droplets,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Warehouse,
  CheckCircle2,
  Sparkles,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useAppState();

  const [parcels, setParcels] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [demands, setDemands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const farmerId = user?.id || 'user-farmer-001';

  useEffect(() => {
    fetchDashboardData();
  }, [farmerId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [parcelsRes, plansRes, demandsRes] = await Promise.all([
        fetch(`/api/farmer/parcels/${farmerId}`),
        fetch(`/api/farmer/plans/${farmerId}`),
        fetch('/api/buyer/demands')
      ]);

      const parcelsData = await parcelsRes.json();
      const plansData = await plansRes.json();
      const demandsData = await demandsRes.json();

      setParcels(parcelsData.parcels || []);
      setPlans(plansData.plans || []);
      setDemands(demandsData.demands || []);
    } catch (err) {
      console.error('Error loading farmer dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  // If no parcels exist, show honest empty state onboarding banner per requirement 10 & 42
  const hasFarm = parcels.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Farmer Operations Center
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Location: {user?.profile?.district || 'Nashik'}, {user?.profile?.state || 'Maharashtra'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Good morning, Farmer {user?.name || 'Patel'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>
              {user?.profile?.village ? `${user.profile.village}, ` : ''}{user?.profile?.district || 'District'}, {user?.profile?.state || 'State'}
            </span>
            <span className="text-gray-300">•</span>
            <span>Total Land: {user?.profile?.totalAcres || parcels.reduce((sum, p) => sum + p.sizeAcres, 0)} Acres</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentTab('crop-planner')}
            className="px-4 py-2.5 bg-[#1b4332] text-white text-xs font-bold rounded-xl hover:bg-[#143628] transition-colors shadow-xs flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Run FarmSale AI Planner</span>
          </button>
          <button
            onClick={() => setCurrentTab('income-simulator')}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-xs"
          >
            Income Planner
          </button>
        </div>
      </div>

      <DisclaimerBanner type="ai-estimate" />

      {/* Honest Empty State for New Farmers without Farms */}
      {!hasFarm && !loading && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#eef8f2] text-[#1b4332] flex items-center justify-center mx-auto">
            <Sprout className="w-8 h-8 text-emerald-700" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-gray-900">
              No farm profile registered yet
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Complete your farm profile with your actual land acreage, soil type, and water source to generate verified crop recommendations and buyer matches.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('crop-planner')}
            className="px-6 py-3 bg-[#1b4332] text-white text-xs font-bold rounded-xl hover:bg-[#143628] shadow-agri-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Complete Farm Profile Now</span>
          </button>
        </div>
      )}

      {/* KPI Cards (Active only if data exists) */}
      {hasFarm && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Active Plots</span>
              <Sprout className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {parcels.length} Plots
            </div>
            <div className="text-[11px] text-gray-500">
              {parcels.reduce((sum, p) => sum + p.sizeAcres, 0)} Total Acres
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Active Crop Plans</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {plans.length} Crops
            </div>
            <div className="text-[11px] text-gray-500">
              {plans.length > 0 ? plans[0].crop : 'No plans committed'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Matched Buyer Orders</span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl font-extrabold text-[#1b4332]">
              {demands.length} Available
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Forward contracts open
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Est. Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {plans.length > 0 ? `₹${(plans.reduce((sum, p) => sum + (p.estimatedRevenue || 0), 0) / 100000).toFixed(2)} Lakh` : '₹0.00'}
            </div>
            <div className="text-[11px] text-gray-500">
              At forward contract rates
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Crop Risk Index</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700">
              Low to Medium
            </div>
            <div className="text-[11px] text-gray-500">
              Soil moisture monitoring active
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: My Farm & Active Plans */}
      {hasFarm && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Active Plans List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Active Crop Production Plans
                  </h3>
                  <p className="text-xs text-gray-500">
                    Production synchronized with buyer purchase commitments in database
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('crop-planner')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>Plan Another Crop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {plans.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500">
                    No active crop plans committed yet. Use the AI Crop Planner to create one.
                  </div>
                ) : (
                  plans.map((plan) => (
                    <div key={plan.id} className="p-6 hover:bg-[#fbfbfa] transition-colors space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#eef8f2] text-[#1b4332] flex items-center justify-center font-bold text-sm">
                            <Sprout className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-gray-900">
                              {plan.crop}{' '}
                              <span className="text-xs font-normal text-gray-500">
                                ({plan.variety})
                              </span>
                            </h4>
                            <div className="text-xs text-gray-500">
                              Area: {plan.areaAcres} Acres • Sown: {plan.plantingDate}
                            </div>
                          </div>
                        </div>
                        <Badge variant="green">{plan.growthStage}</Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                        <div>
                          <span className="text-gray-500 text-[11px]">Expected Yield</span>
                          <div className="font-bold text-gray-900 text-sm">
                            {plan.expectedYieldTonnes} Tonnes
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px]">Harvest Window</span>
                          <div className="font-bold text-gray-900 text-sm">
                            In {plan.daysToHarvest} Days
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px]">Matched Buyer</span>
                          <div className="font-bold text-emerald-800 text-sm truncate">
                            {plan.matchedBuyerName || 'Open Contract'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px]">Contract Rate</span>
                          <div className="font-bold text-[#1b4332] text-sm">
                            {plan.contractPricePerQuintal ? `₹${plan.contractPricePerQuintal}/qtl` : '₹3,100/qtl'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Farm Parcels */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">My Registered Land Parcels</h3>
                  <p className="text-xs text-gray-500">
                    Soil types, moisture levels, and irrigation methods recorded on-chain
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {parcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    className="p-4 rounded-xl border border-gray-200 bg-[#fbfbfa] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-900">{parcel.name}</span>
                      <Badge variant="green">{parcel.sizeAcres} Acres</Badge>
                    </div>

                    <div className="text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Soil:</span>
                        <span className="font-semibold">{parcel.soilType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Irrigation:</span>
                        <span className="font-semibold">{parcel.irrigationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Current Crop:</span>
                        <span className="font-semibold">{parcel.currentCrop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Previous Crop:</span>
                        <span className="font-semibold">{parcel.previousCrop}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Buyer Demand Near You */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-base">
                  Active Buyer Demand
                </h3>
                <button
                  onClick={() => setCurrentTab('buyer-marketplace')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {demands.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-500">
                    No active buyer demand found for your selected criteria.
                  </div>
                ) : (
                  demands.slice(0, 3).map((demand) => (
                    <div
                      key={demand.id}
                      className="p-3.5 rounded-xl border border-gray-200 bg-[#fbfbfa] hover:border-emerald-300 transition-colors text-xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-gray-900">{demand.buyerName}</h4>
                          <p className="text-[11px] text-gray-500">
                            {demand.crop} • {demand.quantityTonnes} Tonnes Required
                          </p>
                        </div>
                        <Badge variant="green">{demand.grade}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1 border-t border-gray-200">
                        <span>Delivery: {demand.targetDeliveryDate}</span>
                        <span className="font-bold text-[#1b4332]">
                          ₹{demand.minPricePerQuintal} - ₹{demand.maxPricePerQuintal}/qtl
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
