import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sprout,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  DollarSign,
  TrendingUp,
  Building2,
  ArrowRight,
  Info,
  Clock,
  Droplets
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const AICropPlanner: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useAppState();

  // Form State initialized with user profile or sensible defaults
  const [state, setState] = useState(user?.profile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(user?.profile?.district || 'Nashik');
  const [landArea, setLandArea] = useState(user?.profile?.totalAcres ? String(user.profile.totalAcres) : '2.5');
  const [soilType, setSoilType] = useState('Medium Deep Black Clay Loam');
  const [irrigationType, setIrrigationType] = useState('Drip');
  const [waterAvailability, setWaterAvailability] = useState<'High' | 'Moderate' | 'Low'>('Moderate');
  const [previousCrop, setPreviousCrop] = useState('Soybean');
  const [budget, setBudget] = useState('100000');

  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState<any>(null);
  const [selectedRank, setSelectedRank] = useState<number>(0); // 0 = Primary, 1 = Alt 1, 2 = Alt 2
  const [committed, setCommitted] = useState(false);

  // Automatically fetch recommendation on initial mount
  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setCommitted(false);
    setSelectedRank(0);

    try {
      const res = await fetch('/api/ai/crop-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state,
          district,
          landArea: Number(landArea) || 2.5,
          soilType,
          irrigationType,
          waterAvailability,
          previousCrop,
          budget: Number(budget) || 100000
        })
      });

      const data = await res.json();
      if (res.ok) {
        setPlanResult(data);
      }
    } catch (err) {
      console.error('Failed to fetch AI crop plan', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommitPlan = async () => {
    if (!planResult) return;
    const currentOption = selectedRank === 0 ? planResult.primary_recommendation : planResult.alternatives[selectedRank - 1];

    try {
      const res = await fetch('/api/farmer/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerId: user?.id || 'user-farmer-001',
          parcelId: 'parcel-primary',
          crop: currentOption.crop,
          variety: currentOption.variety,
          areaAcres: currentOption.recommendedAreaAcres,
          expectedYieldTonnes: currentOption.expectedYieldTonnes,
          plantingDate: new Date().toISOString().split('T')[0],
          expectedHarvestDate: '2026-11-25',
          daysToHarvest: currentOption.cropDurationDays,
          growthStage: 'Germination',
          confidencePercent: 91,
          estimatedRevenue: currentOption.economics.grossRevenueInr,
          estimatedNetReturn: currentOption.economics.estimatedNetReturnInr,
          matchedDemandId: currentOption.matchingBuyers?.[0]?.buyerId,
          matchedBuyerName: currentOption.matchingBuyers?.[0]?.buyerName,
          contractPricePerQuintal: currentOption.economics.indicativePricePerQuintal,
          status: 'Active'
        })
      });

      if (res.ok) {
        setCommitted(true);
        setTimeout(() => {
          setCurrentTab('farmer-dashboard');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to commit plan', err);
    }
  };

  const activeOption = planResult
    ? selectedRank === 0
      ? (planResult.primary_recommendation || planResult.primaryRecommendation)
      : (planResult.alternatives?.[selectedRank - 1])
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
                FarmSale AI Planner
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Regional Agronomic & Market Optimization
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
              AI Crop Planner
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Personalized crop recommendations derived from real land constraints, regional climate, and active buyer demand.
            </p>
          </div>

          <DisclaimerBanner type="ai-estimate" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Real User Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">
              Farm & Land Parameters
            </h2>
            <p className="text-xs text-gray-500">
              Change inputs to evaluate different regional agronomic recommendations
            </p>
          </div>

          <form onSubmit={fetchPlan} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                >
                  <option>Maharashtra</option>
                  <option>Telangana</option>
                  <option>Punjab</option>
                  <option>Karnataka</option>
                  <option>Andhra Pradesh</option>
                  <option>Madhya Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">District</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Land Area (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Working Budget (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Dominant Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              >
                <option>Medium Deep Black Clay Loam</option>
                <option>Red Sandy Loam</option>
                <option>Alluvial Deep Silt Loam</option>
                <option>Laterite Gravelly Soil</option>
                <option>Desert Sandy Soil</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Irrigation System</label>
                <select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                >
                  <option>Drip</option>
                  <option>Borewell</option>
                  <option>Canal</option>
                  <option>Rainfed</option>
                  <option>Sprinkler</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Water Supply</label>
                <select
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                >
                  <option>High</option>
                  <option>Moderate</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Previous Season Crop</label>
              <select
                value={previousCrop}
                onChange={(e) => setPreviousCrop(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              >
                <option>Soybean</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Chickpea / Pulses</option>
                <option>Paddy / Rice</option>
                <option>Fallow (Resting Soil)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] disabled:opacity-50 transition-colors shadow-xs flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{loading ? 'Evaluating Regional Agronomy...' : 'Run FarmSale AI Planner'}</span>
            </button>
          </form>
        </div>

        {/* Right Output: Dynamic Multi-Recommendation (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="font-bold text-gray-900 text-sm">Evaluating regional soil conditions and active demand...</div>
              <p className="text-xs text-gray-500">Querying agro-climatic database and matching buyer procurement orders.</p>
            </div>
          ) : activeOption ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
              {/* Option Selector Tabs: Primary + 2 Alternatives */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <button
                  type="button"
                  onClick={() => setSelectedRank(0)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedRank === 0
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Primary: {planResult.primary_recommendation.crop}
                </button>
                {planResult.alternatives?.map((alt: any, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedRank(idx + 1)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedRank === idx + 1
                        ? 'bg-[#1b4332] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Alt {idx + 1}: {alt.crop}
                  </button>
                ))}
              </div>

              {/* Title & Core Metrics */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
                    {activeOption.rank}
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-950 mt-1">
                    {activeOption.crop}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Variety: {activeOption.variety} • Duration: {activeOption.cropDurationDays} Days • Harvest: {activeOption.harvestWindow}
                  </p>
                </div>

                <Badge variant={activeOption.waterRequirement === 'Low' ? 'green' : 'blue'}>
                  Water: {activeOption.waterRequirement}
                </Badge>
              </div>

              {/* Dynamic Economic Calculation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                  <span className="text-gray-500 text-[11px]">Recommended Area</span>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5">
                    {activeOption.recommendedAreaAcres} Acres
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                  <span className="text-gray-500 text-[11px]">Expected Yield</span>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5">
                    {activeOption.expectedYieldTonnes} Tonnes
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                  <span className="text-gray-500 text-[11px]">Gross Revenue</span>
                  <div className="font-extrabold text-emerald-800 text-base mt-0.5">
                    ₹{(activeOption.economics.grossRevenueInr / 100000).toFixed(2)} Lakh
                  </div>
                </div>

                <div className="p-3 bg-[#eef8f2] rounded-xl border border-[#d8f3dc] text-xs">
                  <span className="text-emerald-800 text-[11px] font-semibold">Estimated Net Profit</span>
                  <div className="font-extrabold text-[#1b4332] text-base mt-0.5">
                    ₹{(activeOption.economics.estimatedNetReturnInr / 100000).toFixed(2)} Lakh
                  </div>
                </div>
              </div>

              {/* Economic Assumptions Callout */}
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 border border-gray-200">
                <span className="font-semibold text-gray-700">Economic Formula: </span>
                <span>
                  Gross Revenue = {activeOption.recommendedAreaAcres} ac x {activeOption.expectedYieldTonnes} T x ₹{activeOption.economics.indicativePricePerQuintal}/qtl.
                  Net Profit subtracts estimated production input cost of ₹{activeOption.economics.estimatedCostInr.toLocaleString('en-IN')}.
                </span>
              </div>

              {/* Why this crop? */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Why this crop fits your farm:</span>
                </h4>
                <div className="space-y-1.5">
                  {activeOption.reasons.map((r: string, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#fbfbfa] border border-gray-200 text-xs text-gray-700">
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* Why it may not fit */}
              {activeOption.limitations?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Factors to consider before planting:</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeOption.limitations.map((lim: string, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200 text-xs text-amber-900">
                        {lim}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Buyers in Database */}
              {activeOption.matchingBuyers?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>Matching Buyer Procurement Orders in Database:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeOption.matchingBuyers.map((b: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-blue-100 bg-blue-50/30 text-xs space-y-1">
                        <div className="font-bold text-gray-900">{b.buyerName}</div>
                        <div className="text-[11px] text-gray-600 flex justify-between">
                          <span>Contract Target: {b.requiredTonnes} T</span>
                          <span className="font-bold text-blue-900">₹{b.priceOfferedPerQuintal}/qtl</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sustainability Notes */}
              <div className="p-4 rounded-xl bg-[#eef8f2] border border-[#d8f3dc] text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>Regenerative Soil Assessment</span>
                </div>
                <p className="text-emerald-900 text-[11px]">
                  {activeOption.sustainability?.soilImpact}. Water efficiency: {activeOption.sustainability?.waterEfficiency}.
                  {activeOption.sustainability?.nitrogenFixing ? ' High biological nitrogen fixation benefits subsequent crop cycles.' : ''}
                </p>
              </div>

              {/* Commit Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCommitPlan}
                  disabled={committed}
                  className="w-full py-3.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] disabled:bg-emerald-800 transition-colors shadow-agri-sm flex items-center justify-center gap-2 text-sm"
                >
                  {committed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Production Plan Committed to Farm Database!</span>
                    </>
                  ) : (
                    <>
                      <span>Commit to this Production Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-xs text-gray-500 shadow-xs">
              Enter your farm parameters on the left and run the planner to generate dynamic recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
