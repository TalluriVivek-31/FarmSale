import React, { useState } from 'react';
import {
  Leaf,
  Droplets,
  Sprout,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Thermometer,
  Compass
} from 'lucide-react';
import { REGENERATIVE_RECORD, CURRENT_FARMER, RISK_ALERTS } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const RegenerativeScore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'soil' | 'risks'>('pillars');
  const record = REGENERATIVE_RECORD;
  const farmer = CURRENT_FARMER;
  const soil = farmer.parcels[0].soil;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Track 4: Regenerative Agricultural Intelligence
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Agro-Ecological Benchmark
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Regenerative Farm Score & Soil Health
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Transparent multi-parameter evaluation of soil vitality, water stewardship, biodiversity, and carbon conservation.
          </p>
        </div>

        <DisclaimerBanner
          type="prototype"
          message="Prototype sustainability metric. Not an official government certification."
        />
      </div>

      {/* Hero Score Showcase Card */}
      <div className="bg-white rounded-2xl border border-emerald-300 shadow-agri-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Big Score Dial Box (4 Cols) */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-6">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Composite Farm Health Score
            </span>
            <div className="flex items-baseline justify-center lg:justify-start gap-2">
              <span className="text-6xl font-extrabold text-[#1b4332] tracking-tight">
                {record.overallScore}
              </span>
              <span className="text-2xl font-bold text-gray-400">/ 100</span>
            </div>
            <div className="text-xs text-emerald-800 font-bold bg-[#eef8f2] px-3 py-1 rounded-lg inline-block border border-[#d8f3dc]">
              +16 Points Above Maharashtra State Benchmark ({record.benchmarkStateAverage}/100)
            </div>
            <p className="text-xs text-gray-500 leading-relaxed pt-1">
              Demonstrates strong crop diversification, precision drip adoption, and zero crop residue burning on North Plot.
            </p>
          </div>

          {/* Ecological Impacts Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Leaf className="w-4 h-4" />
                <span>Carbon Conservation</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">
                {record.carbonEstimatedOffsetKgPerAcre} kg
              </div>
              <span className="text-[11px] text-gray-500 block">
                Estimated CO2 sequestered per acre/year
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                <Droplets className="w-4 h-4" />
                <span>Water Conserved</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">
                {record.waterSavedMetersCubedPerYear} m³
              </div>
              <span className="text-[11px] text-gray-500 block">
                Annual savings vs flood irrigation
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#8b5e3c] font-semibold">
                <Sprout className="w-4 h-4" />
                <span>Crop Diversity Index</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">
                3 Cycles
              </div>
              <span className="text-[11px] text-gray-500 block">
                Legume rotation breaks disease cycles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: 8 Pillars | Soil Telemetry | Risk Center */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('pillars')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pillars'
              ? 'bg-[#1b4332] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          8 Regenerative Pillars
        </button>
        <button
          onClick={() => setActiveTab('soil')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'soil'
              ? 'bg-[#1b4332] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Soil Intelligence (N-P-K & Carbon)
        </button>
        <button
          onClick={() => setActiveTab('risks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'risks'
              ? 'bg-[#1b4332] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Farm Risk Engine
        </button>
      </div>

      {/* TAB 1: 8 PILLARS */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">{pillar.pillar}</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#1b4332] text-sm">
                      {pillar.score} / 100
                    </span>
                    <Badge
                      variant={
                        pillar.status === 'Strong'
                          ? 'green'
                          : pillar.status === 'Good'
                          ? 'blue'
                          : 'amber'
                      }
                    >
                      {pillar.status}
                    </Badge>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#1b4332] h-full rounded-full"
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <div className="text-xs text-gray-600 space-y-1 pt-1">
                  <div>
                    <span className="font-semibold text-gray-700">Observed Practice: </span>
                    {pillar.currentPractice}
                  </div>
                  <div className="text-emerald-900 font-medium">
                    <span className="font-semibold text-emerald-950">Suggested Upgrade (+{pillar.potentialScoreGain} pts): </span>
                    {pillar.suggestedPractice}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actionable Improvement Roadmap */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Recommended Next Steps to Reach 85+ Score</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {record.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#fbfbfa] border border-gray-200 text-xs text-gray-700 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOIL INTELLIGENCE */}
      {activeTab === 'soil' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                North Plot Soil Chemistry Telemetry
              </h3>
              <p className="text-xs text-gray-500">
                Tested Profile: Medium Deep Black Clay Loam • Plot Area: 2.5 Acres
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Soil pH</span>
                <div className="text-2xl font-extrabold text-[#1b4332]">{soil.ph}</div>
                <span className="text-[10px] text-emerald-700 font-semibold">Near Neutral (Optimal)</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Soil Moisture</span>
                <div className="text-2xl font-extrabold text-blue-900">{soil.moisturePercent}%</div>
                <span className="text-[10px] text-gray-500">Target range: 45 - 60%</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Organic Carbon</span>
                <div className="text-2xl font-extrabold text-[#8b5e3c]">{soil.organicMatterPercent}%</div>
                <span className="text-[10px] text-gray-500">Medium level</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Available Nitrogen (N)</span>
                <div className="text-2xl font-extrabold text-gray-900">{soil.nitrogenKgPerHa}</div>
                <span className="text-[10px] text-gray-500">kg/hectare</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Available Phosphorus (P2O5)</span>
                <div className="text-xl font-extrabold text-gray-900">{soil.phosphorusKgPerHa} kg/ha</div>
                <p className="text-[11px] text-gray-500 mt-1">Adequate for tomato fruiting phase.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[11px]">Available Potassium (K2O)</span>
                <div className="text-xl font-extrabold text-gray-900">{soil.potassiumKgPerHa} kg/ha</div>
                <p className="text-[11px] text-gray-500 mt-1">High reserves support strong fruit cell walls.</p>
              </div>
            </div>

            {/* Corrective Agronomic Plan */}
            <div className="p-4 rounded-xl bg-[#eef8f2] border border-[#d8f3dc] text-xs space-y-2">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Soil Vitality Corrective Directives
              </span>
              <ul className="space-y-1 text-emerald-900 text-[11px]">
                {soil.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FARM RISK ENGINE */}
      {activeTab === 'risks' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                Comprehensive Agricultural Risk Center
              </h3>
              <p className="text-xs text-gray-500">
                Proactive surveillance across weather hazards, biological pest pressure, and price swings
              </p>
            </div>

            <div className="space-y-3">
              {RISK_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl border border-gray-200 bg-[#fbfbfa] space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{alert.title}</span>
                      <Badge variant={alert.severity === 'High' ? 'red' : 'amber'}>
                        {alert.severity} Risk
                      </Badge>
                    </div>
                    <span className="text-[11px] text-gray-400">Reported: {alert.reportedDate}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{alert.explanation}</p>

                  <div className="pt-2 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-emerald-900 font-semibold text-[11px]">
                      Required Mitigation: {alert.actionRequired}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      Affected Crops: {alert.affectedCrops.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
