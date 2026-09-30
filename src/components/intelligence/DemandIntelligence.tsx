import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
  BarChart3,
  Layers,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import { DEMAND_FORECAST_DATA, REGIONAL_DEMAND_HEATMAP } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const DemandIntelligence: React.FC = () => {
  const [forecastHorizon, setForecastHorizon] = useState<'30' | '60' | '90'>('90');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const crops = ['All', 'Tomato', 'Red Onion', 'Chilli', 'Potato', 'Sharbati Wheat'];
  const states = ['All', 'Maharashtra', 'Andhra Pradesh', 'Karnataka', 'Madhya Pradesh'];

  const filteredHeatmap = REGIONAL_DEMAND_HEATMAP.filter((item) => {
    if (selectedCrop !== 'All' && !item.crop.toLowerCase().includes(selectedCrop.toLowerCase())) return false;
    if (selectedState !== 'All' && item.state !== selectedState) return false;
    return true;
  });

  // Slice forecast data based on horizon
  const visibleForecast =
    forecastHorizon === '30'
      ? DEMAND_FORECAST_DATA.slice(0, 6)
      : forecastHorizon === '60'
      ? DEMAND_FORECAST_DATA.slice(0, 9)
      : DEMAND_FORECAST_DATA;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Predictive Market Analytics
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Forward Demand Curves
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Demand Intelligence & Forecasting
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Aggregated institutional purchase requests and forward predictive models for 30, 60, and 90-day cycles.
          </p>
        </div>

        <DisclaimerBanner
          type="prototype"
          message="Prototype forecast using demo data. Never claim market predictions are guaranteed."
        />
      </div>

      {/* AI Forecasting Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">
                Institutional Demand Trajectory (Tonnes)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Forward 90-Day Outlook
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Historical mandi arrivals vs buyer forward commitments and seasonal festival upticks
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setForecastHorizon('30')}
              className={`px-3 py-1 rounded-lg transition-all ${
                forecastHorizon === '30' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setForecastHorizon('60')}
              className={`px-3 py-1 rounded-lg transition-all ${
                forecastHorizon === '60' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              60 Days
            </button>
            <button
              onClick={() => setForecastHorizon('90')}
              className={`px-3 py-1 rounded-lg transition-all ${
                forecastHorizon === '90' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Recharts Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={visibleForecast} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)'
                }}
              />
              {/* Shaded Confidence Interval */}
              <Area
                type="monotone"
                dataKey="upperBound"
                stroke="none"
                fill="#d8f3dc"
                fillOpacity={0.4}
                name="Confidence Upper"
              />
              <Area
                type="monotone"
                dataKey="lowerBound"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
                name="Confidence Lower"
              />
              {/* Actual Past Demand */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#1b4332"
                strokeWidth={3}
                dot={{ r: 4, fill: '#1b4332' }}
                name="Actual Realized Demand"
              />
              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#2d6a4f"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#52b788' }}
                name="Projected Forward Demand"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#1b4332] rounded inline-block" />
              <span>Actual Observed (Tonnes)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#52b788] border-dashed border-t-2 border-[#52b788] inline-block" />
              <span>AI Forward Model (Tonnes)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[#d8f3dc] rounded inline-block" />
              <span>90% Confidence Interval</span>
            </span>
          </div>

          <span className="text-[11px] text-gray-400">
            Model Inputs: APMC Mandi arrivals + institutional purchase requests + agro-climatic calendars
          </span>
        </div>
      </div>

      {/* Regional Demand Heatmap & Supply Gaps */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Regional Demand Heatmap & Supply Gaps
            </h3>
            <p className="text-xs text-gray-500">
              Identifies acute supply deficits and surplus risks across major agricultural hubs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-gray-50"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Crops' : c}</option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs bg-gray-50"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#fbfbfa] text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4 font-bold">Region (State / District)</th>
                <th className="py-2.5 px-4 font-bold">Target Crop</th>
                <th className="py-2.5 px-4 font-bold text-right">Buyer Demand</th>
                <th className="py-2.5 px-4 font-bold text-right">Pledged Supply</th>
                <th className="py-2.5 px-4 font-bold text-right">Net Gap</th>
                <th className="py-2.5 px-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHeatmap.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {item.district}, {item.state}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {item.crop}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {item.demandTonnes.toLocaleString('en-IN')} T
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {item.supplyTonnes.toLocaleString('en-IN')} T
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    <span
                      className={
                        item.gapTonnes < 0 ? 'text-amber-700' : 'text-emerald-700'
                      }
                    >
                      {item.gapTonnes > 0 ? `+${item.gapTonnes}` : item.gapTonnes} T
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={
                        item.intensity === 'Critical Deficit'
                          ? 'red'
                          : item.intensity === 'High'
                          ? 'amber'
                          : 'green'
                      }
                    >
                      {item.intensity}
                    </Badge>
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
