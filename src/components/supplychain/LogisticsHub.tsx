import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LOGISTICS_FLEET } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const LogisticsHub: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(LOGISTICS_FLEET[0].id);
  const [booked, setBooked] = useState<boolean>(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Agri-Freight Matching
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Cold Chain & Regional Fleets
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Logistics & Freight Matching
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Match farm harvest batches with refrigerated and covered agricultural transport to reduce transit shrinkage.
          </p>
        </div>

        <DisclaimerBanner type="demo" />
      </div>

      {/* Smart Logistics Match Callout */}
      <div className="bg-[#eef8f2] border border-[#d8f3dc] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Truck className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Recommended Best Logistics Option
              </span>
              <Badge variant="green">96% Algorithm Match</Badge>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5">
              14-Tonne Refrigerated Reefer (Kisan Express)
            </h3>
            <p className="text-xs text-emerald-900/80 mt-1 max-w-xl">
              Optimized for 18.5 tonne tomato harvest. Reefer prevents pulp warming above 12°C over the 28 km transit to Dindori Hub.
            </p>
          </div>
        </div>

        <button
          onClick={handleBook}
          className="px-5 py-2.5 bg-[#1b4332] text-white text-xs font-bold rounded-xl hover:bg-[#143628] transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
        >
          {booked ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Dispatched (MH-15-EG-4921)!</span>
            </>
          ) : (
            <>
              <span>Book Priority Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Available Fleet Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900">
          Available Agricultural Freight Fleet Near You
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOGISTICS_FLEET.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className={`bg-white rounded-2xl border p-6 shadow-xs cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                selectedVehicle === vehicle.id
                  ? 'border-emerald-600 ring-2 ring-emerald-600/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={vehicle.temperatureControl ? 'blue' : 'neutral'}>
                    {vehicle.temperatureControl ? 'Cold Chain (Reefer)' : 'Covered Cargo'}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-800">
                    {vehicle.matchingScore}% Match
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900 leading-snug">
                  {vehicle.vehicleType}
                </h4>
                <div className="text-xs text-gray-500">
                  Operator: {vehicle.providerName}
                </div>

                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-gray-600 border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payload Capacity:</span>
                    <span className="font-bold text-gray-900">{vehicle.capacityTonnes} Tonnes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Freight Rate:</span>
                    <span className="font-bold text-[#1b4332]">₹{vehicle.ratePerKmInr} / km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Turnaround Time:</span>
                    <span className="font-bold text-gray-900">{vehicle.estimatedTransitTimeHours} Hours</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{vehicle.currentLocation}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">Rating: {vehicle.rating} / 5.0</span>
                <span className="font-bold text-emerald-800">Available: {vehicle.availableDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
