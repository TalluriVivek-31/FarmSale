import React from 'react';
import {
  Calendar,
  Sprout,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { ACTIVE_CROP_PLANS } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const HarvestForecast: React.FC = () => {
  const tomatoPlan = ACTIVE_CROP_PLANS[0]; // Tomato
  const onionPlan = ACTIVE_CROP_PLANS[1]; // Onion

  const growthStages = [
    { title: 'Planting & Nursery', date: 'Aug 25', status: 'Completed', detail: 'Raised bed transplanting with drip emitters' },
    { title: 'Vegetative Growth', date: 'Sep 15', status: 'Completed', detail: 'Canopy spread 45cm, branching established' },
    { title: 'Flowering & Fruit Set', date: 'Oct 05', status: 'Current', detail: '85% flower clusters setting firm fruit' },
    { title: 'Pre-Harvest Maturity', date: 'Oct 28', status: 'Upcoming', detail: 'Color turning stage, Brix accumulation' },
    { title: 'Peak Harvest Window', date: 'Nov 12 - 20', status: 'Upcoming', detail: 'Firm red picking synced with Sahyadri contract' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Phenological Tracking
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Harvest Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Harvest Forecast & Yield Predictor
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Predictive harvest timeline driven by growing degree-days, soil moisture, and buyer intake dates.
          </p>
        </div>

        <DisclaimerBanner type="ai-estimate" />
      </div>

      {/* Featured Crop: North Plot Tomato */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {tomatoPlan.crop} ({tomatoPlan.variety})
              </h2>
              <Badge variant="green">Current: {tomatoPlan.growthStage}</Badge>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              North Plot • 2.5 Acres • Matched with Sahyadri Foods Processing
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500">Days to Harvest</span>
            <div className="text-2xl font-extrabold text-[#1b4332]">
              {tomatoPlan.daysToHarvest} Days
            </div>
          </div>
        </div>

        {/* Growth Stage Progression Stepper */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Phenological Progression Timeline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {growthStages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                  stage.status === 'Current'
                    ? 'bg-[#eef8f2] border-emerald-400 ring-2 ring-emerald-600/20'
                    : stage.status === 'Completed'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white border-dashed border-gray-300 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Stage {idx + 1}
                  </span>
                  {stage.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : stage.status === 'Current' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>

                <div className="font-bold text-gray-900 text-sm">
                  {stage.title}
                </div>
                <div className="text-[11px] font-semibold text-emerald-800">
                  {stage.date}
                </div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Yield & Confidence Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
            <span className="text-gray-500 text-[11px]">Expected Yield Output</span>
            <div className="text-xl font-extrabold text-gray-900 mt-0.5">
              {tomatoPlan.expectedYieldTonnes} Tonnes
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              ±1.2T confidence interval based on canopy density
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
            <span className="text-gray-500 text-[11px]">Confidence Level</span>
            <div className="text-xl font-extrabold text-emerald-800 mt-0.5">
              {tomatoPlan.confidencePercent}%
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Derived from thermal unit accumulation & soil sensor telemetry
            </p>
          </div>

          <div className="p-4 bg-[#eef8f2] rounded-xl border border-[#d8f3dc] text-xs">
            <span className="text-emerald-800 text-[11px] font-semibold">Recommended Agronomic Action</span>
            <div className="font-bold text-gray-900 mt-1">
              Potash fertigation boost
            </div>
            <p className="text-[11px] text-emerald-900/90 mt-0.5">
              Apply 0:0:50 via drip to maximize fruit firmness for Grade A criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Crop: South Plot Onion */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {onionPlan.crop} ({onionPlan.variety})
            </h3>
            <p className="text-xs text-gray-500">
              South Plot • 2.0 Acres • Matched with KisanSetu Wholesale
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Days to Harvest</span>
            <div className="text-xl font-extrabold text-gray-900">
              {onionPlan.daysToHarvest} Days
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-500 text-[11px]">Growth Stage</span>
            <div className="font-bold text-gray-900 mt-0.5">{onionPlan.growthStage}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-500 text-[11px]">Expected Yield</span>
            <div className="font-bold text-gray-900 mt-0.5">{onionPlan.expectedYieldTonnes} Tonnes</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-500 text-[11px]">Expected Harvest Date</span>
            <div className="font-bold text-gray-900 mt-0.5">{onionPlan.expectedHarvestDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
