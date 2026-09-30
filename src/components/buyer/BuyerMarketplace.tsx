import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { BuyerDemand } from '../../types';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const BuyerMarketplace: React.FC = () => {
  const [demands, setDemands] = useState<BuyerDemand[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [selectedDemand, setSelectedDemand] = useState<BuyerDemand | null>(null);
  const [matchingModalOpen, setMatchingModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    fetchDemands();
  }, []);

  const fetchDemands = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/buyer/demands');
      const data = await res.json();
      setDemands(data.demands || []);
    } catch (err) {
      console.error('Failed to load demands', err);
    } finally {
      setLoading(false);
    }
  };

  const crops = ['All', 'Tomato', 'Guntur Sannam Chilli', 'Sharbati Wheat', 'Red Onion', 'Potato'];
  const states = ['All', 'Maharashtra', 'Andhra Pradesh', 'Madhya Pradesh', 'Karnataka'];

  const filteredDemands = demands.filter((d) => {
    if (filterCrop !== 'All' && !d.crop.toLowerCase().includes(filterCrop.toLowerCase())) return false;
    const demandState = d.state || d.destinationState;
    if (filterState !== 'All' && demandState !== filterState) return false;
    return true;
  });

  const handleOpenMatch = (demand: BuyerDemand) => {
    setSelectedDemand(demand);
    setMatchingModalOpen(true);
    setRequestSent(false);
  };

  const handleSendSupplyRequest = () => {
    setRequestSent(true);
    setTimeout(() => {
      setMatchingModalOpen(false);
      setRequestSent(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Procurement Exchange
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Verified Institutional Contracts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Buyer Demand Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Explore verified procurement requirements posted by food processors, exporters, and wholesale chains.
          </p>
        </div>

        <DisclaimerBanner
          type="demo"
          message="Live database demand listings. Empty state shown when no contracts match."
        />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-gray-700">
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Filter By:</span>
          </div>

          <div>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-gray-50 text-gray-700 focus:outline-none"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Crops' : c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-gray-50 text-gray-700 focus:outline-none"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900">{filteredDemands.length}</span> active contracts
        </div>
      </div>

      {/* Demand Listings Cards */}
      {filteredDemands.length === 0 && !loading ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-xs text-gray-500 shadow-xs space-y-1">
          <div className="font-bold text-gray-800 text-sm">No active buyer demand found for your selected criteria.</div>
          <p>Try resetting filters or post a demand using the Buyer dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemands.map((demand) => (
            <div
              key={demand.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-agri-md hover:border-emerald-300 transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {demand.buyerType}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                      {demand.buyerName}
                    </h3>
                  </div>
                  <Badge variant={demand.contractStatus === 'Open' ? 'green' : 'amber'}>
                    {demand.contractStatus}
                  </Badge>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
                  <div className="text-xs text-gray-500">Requirement:</div>
                  <div className="text-base font-extrabold text-[#1b4332]">
                    {demand.quantityTonnes} Tonnes {demand.crop}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {demand.variety || 'Standard Commercial Variety'} • {demand.grade}
                  </div>
                </div>

                {/* Quality Specs List */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-700 text-[11px] uppercase tracking-wider">
                    Quality Requirements:
                  </span>
                  <ul className="text-gray-600 space-y-1">
                    {demand.qualityRequirements?.map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location & Delivery Date */}
                <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      Delivery Window:
                    </span>
                    <span className="font-semibold text-gray-900">{demand.targetDeliveryDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      Location:
                    </span>
                    <span className="font-semibold text-gray-900 truncate max-w-[180px]">
                      {demand.district || demand.destinationDistrict || 'Nashik'}, {demand.state || demand.destinationState || 'Maharashtra'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-gray-500 block">Indicative Price</span>
                  <span className="text-sm font-extrabold text-[#1b4332]">
                    ₹{demand.minPricePerQuintal} to ₹{demand.maxPricePerQuintal}/qtl
                  </span>
                </div>

                <button
                  onClick={() => handleOpenMatch(demand)}
                  className="px-3.5 py-2 bg-[#1b4332] text-white text-xs font-bold rounded-lg hover:bg-[#143628] transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>Match My Farm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Matching Engine Modal */}
      {selectedDemand && (
        <Modal
          isOpen={matchingModalOpen}
          onClose={() => setMatchingModalOpen(false)}
          title={`Farmer-Buyer Match: ${selectedDemand.crop}`}
          subtitle={`Evaluating alignment with your farm profile`}
        >
          <div className="space-y-5 text-xs">
            <div className="bg-[#eef8f2] border border-[#d8f3dc] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Calculated Platform Matching Score
                </span>
                <div className="text-3xl font-extrabold text-[#1b4332] mt-0.5">
                  94% Match
                </div>
                <p className="text-[11px] text-emerald-900/80 mt-1">
                  High agro-climatic alignment and logistics feasibility
                </p>
              </div>
              <Badge variant="green" size="md">
                Verified Fit
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                Matching Rationale & Verification Factors
              </h4>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Crop & Variety Compatibility:</span>
                    <p className="text-gray-600 mt-0.5">
                      Your land parcel characteristics align with {selectedDemand.crop} agronomic specifications.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Harvest Window Alignment:</span>
                    <p className="text-gray-600 mt-0.5">
                      Target harvest window falls inside buyer intake schedule ({selectedDemand.targetDeliveryDate}).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Logistics Radius Feasible:</span>
                    <p className="text-gray-600 mt-0.5">
                      Delivery hub in {selectedDemand.district || selectedDemand.destinationDistrict || 'Nashik'} is within viable transport range.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSendSupplyRequest}
                disabled={requestSent}
                className="w-full py-3 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] disabled:bg-emerald-800 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                {requestSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Supply Request Dispatched to Buyer!</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Request to Supply via FPO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
