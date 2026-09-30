import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Warehouse,
  Sprout,
  Truck,
  TrendingUp,
  Layers,
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

interface MapHub {
  id: string;
  name: string;
  district: string;
  state: string;
  coords: { x: number; y: number }; // SVG percentage coordinates
  primaryCrops: string[];
  activeDemandTonnes: number;
  openColdStorageTonnes: number;
  fpoCount: number;
  featuredBuyer: string;
  intensity: 'Critical' | 'High' | 'Balanced';
}

const HUBS: MapHub[] = [
  {
    id: 'hub-nashik',
    name: 'Nashik Horticulture Hub',
    district: 'Nashik',
    state: 'Maharashtra',
    coords: { x: 38, y: 56 },
    primaryCrops: ['Tomato', 'Red Onion', 'Grapes'],
    activeDemandTonnes: 1450,
    openColdStorageTonnes: 320,
    fpoCount: 6,
    featuredBuyer: 'Sahyadri Foods (500T Order)',
    intensity: 'High'
  },
  {
    id: 'hub-guntur',
    name: 'Guntur Spice & Commercial Terminal',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    coords: { x: 54, y: 68 },
    primaryCrops: ['Guntur Sannam Chilli', 'Cotton'],
    activeDemandTonnes: 2400,
    openColdStorageTonnes: 540,
    fpoCount: 4,
    featuredBuyer: 'AgroFresh Organics (150T Export)',
    intensity: 'Critical'
  },
  {
    id: 'hub-hassan',
    name: 'Hassan Plantation & Tuber Hub',
    district: 'Hassan',
    state: 'Karnataka',
    coords: { x: 42, y: 78 },
    primaryCrops: ['Processing Potato', 'Ginger', 'Coffee'],
    activeDemandTonnes: 1800,
    openColdStorageTonnes: 410,
    fpoCount: 3,
    featuredBuyer: 'Mother Dairy Fresh (600T Potato)',
    intensity: 'High'
  },
  {
    id: 'hub-sehore',
    name: 'Malwa Grain & Pulse Silos',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    coords: { x: 48, y: 46 },
    primaryCrops: ['Sharbati Wheat', 'Soybean', 'Gram'],
    activeDemandTonnes: 4500,
    openColdStorageTonnes: 850,
    fpoCount: 5,
    featuredBuyer: 'ITC Agri Business (1,200T Wheat)',
    intensity: 'High'
  },
  {
    id: 'hub-ludhiana',
    name: 'Punjab Agritech & Seed Basin',
    district: 'Ludhiana',
    state: 'Punjab',
    coords: { x: 37, y: 22 },
    primaryCrops: ['Mustard', 'Wheat', 'Basmati Rice'],
    activeDemandTonnes: 900,
    openColdStorageTonnes: 620,
    fpoCount: 4,
    featuredBuyer: 'KisanSetu Grain Grid (800T)',
    intensity: 'Balanced'
  }
];

export const RegionalMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<MapHub>(HUBS[0]);
  const [filterLayer, setFilterLayer] = useState<'all' | 'demand' | 'storage' | 'fpo'>('all');
  const [filterCrop, setFilterCrop] = useState<string>('All');

  const filteredHubs = HUBS.filter((hub) => {
    if (filterCrop !== 'All' && !hub.primaryCrops.some((c) => c.toLowerCase().includes(filterCrop.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Geospatial Operations Map
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Regional Agricultural Clusters
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Regional Demand & Cold Chain Map
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Interactive visualization of regional demand hotspots, available cold chains, and FPO aggregation clusters.
          </p>
        </div>

        <DisclaimerBanner type="demo" />
      </div>

      {/* Map Control Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-gray-700">
            <Layers className="w-4 h-4 text-gray-400" />
            <span>Map Layer:</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {(['all', 'demand', 'storage', 'fpo'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setFilterLayer(layer)}
                className={`px-3 py-1 rounded-md font-semibold capitalize transition-all ${
                  filterLayer === layer ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {layer === 'all' ? 'All Infrastructure' : layer}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">Crop Filter:</span>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-xs bg-gray-50 text-gray-700"
          >
            <option value="All">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Chilli">Chilli</option>
            <option value="Onion">Onion</option>
            <option value="Wheat">Wheat</option>
            <option value="Potato">Potato</option>
          </select>
        </div>
      </div>

      {/* Main Map + Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive SVG Map (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              India Agritech Geographic Clusters
            </span>
            <span className="text-xs text-gray-400">
              Click any cluster pin to inspect
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#f4f7f4] via-[#fbfbfa] to-[#eef8f2] rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center p-4">
            {/* Subtle stylized vector outline of India subcontinent */}
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full text-emerald-900/10 fill-current opacity-40 select-none pointer-events-none"
            >
              <path d="M 35 10 L 42 12 L 48 20 L 52 28 L 62 30 L 68 36 L 75 38 L 78 45 L 82 50 L 75 56 L 68 58 L 62 65 L 56 75 L 50 88 L 46 100 L 44 110 L 40 105 L 36 90 L 32 78 L 28 65 L 25 52 L 22 40 L 26 28 L 32 15 Z" />
            </svg>

            {/* Clickable Agricultural Hub Pins */}
            {filteredHubs.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  style={{
                    left: `${hub.coords.x}%`,
                    top: `${hub.coords.y}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  aria-label={hub.name}
                >
                  <div
                    className={`p-2 rounded-full shadow-md flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#1b4332] text-white ring-4 ring-emerald-300'
                        : hub.intensity === 'Critical'
                        ? 'bg-rose-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Pin Floating Tag */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none">
                    {hub.district}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hub Inspector Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
                Cluster Telemetry
              </span>
              <Badge variant={selectedHub.intensity === 'Critical' ? 'red' : 'green'}>
                {selectedHub.intensity} Demand Index
              </Badge>
            </div>
            <h3 className="text-xl font-extrabold text-gray-950 mt-1.5">
              {selectedHub.name}
            </h3>
            <p className="text-xs text-gray-500">
              {selectedHub.district} District, {selectedHub.state}
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 text-[11px] block">Active Demand</span>
              <div className="text-lg font-extrabold text-[#1b4332] mt-0.5">
                {selectedHub.activeDemandTonnes.toLocaleString('en-IN')} T
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 text-[11px] block">Cold Storage Free</span>
              <div className="text-lg font-extrabold text-blue-900 mt-0.5">
                {selectedHub.openColdStorageTonnes} T
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 text-[11px] block">Active FPOs</span>
              <div className="text-lg font-extrabold text-[#8b5e3c] mt-0.5">
                {selectedHub.fpoCount} Cooperatives
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-500 text-[11px] block">Primary Crops</span>
              <div className="font-bold text-gray-800 mt-0.5 truncate">
                {selectedHub.primaryCrops[0]}
              </div>
            </div>
          </div>

          {/* Primary Crops Badges */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-gray-700 text-[11px] uppercase tracking-wider block">
              Predominant Regional Crops:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedHub.primaryCrops.map((crop, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#eef8f2] text-[#1b4332] font-semibold border border-[#d8f3dc]"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Buyer Contract */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
            <span className="font-bold text-blue-950 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-800" />
              Major Anchor Buyer Contract:
            </span>
            <p className="text-blue-900 font-medium">
              {selectedHub.featuredBuyer}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-start gap-2 border border-gray-200">
            <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <span>
              Agricultural administrators can utilize regional cluster data to dispatch mobile pre-cooling vans to deficit nodes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
