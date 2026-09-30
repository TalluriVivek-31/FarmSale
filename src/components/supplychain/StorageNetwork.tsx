import React, { useState } from 'react';
import {
  Warehouse,
  Thermometer,
  MapPin,
  Calendar,
  CheckCircle2,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';
import { STORAGE_FACILITIES } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const StorageNetwork: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>(STORAGE_FACILITIES[0].id);
  const [bookedSpace, setBookedSpace] = useState<boolean>(false);

  const handleBook = () => {
    setBookedSpace(true);
    setTimeout(() => setBookedSpace(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8b5e3c] bg-[#f5ebe0] px-2.5 py-0.5 rounded-full border border-[#d5bdaf]">
              Post-Harvest Infrastructure
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Cold Chain & Warehouse Grid
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Storage & Cold Chain Network
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Locate nearby temperature-controlled staging and dry warehouses to preserve produce freshness and avoid distress sales.
          </p>
        </div>

        <DisclaimerBanner type="demo" />
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORAGE_FACILITIES.map((facility) => {
          const occupancyPercent = Math.round(
            ((facility.totalCapacityTonnes - facility.availableCapacityTonnes) /
              facility.totalCapacityTonnes) *
              100
          );
          const isSelected = selectedFacility === facility.id;

          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility.id)}
              className={`bg-white rounded-2xl border p-6 shadow-xs cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-600/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={facility.humidityControlled ? 'green' : 'neutral'}>
                    {facility.facilityType}
                  </Badge>
                  <span className="text-xs font-semibold text-gray-500">
                    {facility.distanceKm} km away
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900 leading-snug">
                  {facility.name}
                </h4>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{facility.location}</span>
                </div>

                {/* Capacity Bar */}
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available Space:</span>
                    <span className="font-extrabold text-[#1b4332]">
                      {facility.availableCapacityTonnes} / {facility.totalCapacityTonnes} Tonnes
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">
                    {occupancyPercent}% Occupancy
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-500">Temperature:</span>
                    <span className="font-semibold text-gray-900">{facility.temperatureRange}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-500">Rate:</span>
                    <span className="font-bold text-[#1b4332]">
                      ₹{facility.monthlyRatePerQuintalInr} / qtl / month
                    </span>
                  </div>
                </div>

                {/* Suitable crops */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500 block mb-1">
                    Suitable For:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {facility.cropSuitability.map((crop, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBook();
                }}
                className="w-full py-2 bg-[#1b4332] text-white text-xs font-bold rounded-lg hover:bg-[#143628] transition-colors shadow-xs"
              >
                {bookedSpace && isSelected ? 'Space Reserved (Bay 4)!' : 'Reserve Storage Space'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
