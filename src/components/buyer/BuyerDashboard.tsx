import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { CropGrade } from '../../types';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useAppState();

  const [demands, setDemands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [crop, setCrop] = useState('Tomato');
  const [variety, setVariety] = useState('Processing Hybrid');
  const [quantity, setQuantity] = useState('500');
  const [grade, setGrade] = useState<CropGrade>('Grade A');
  const [minPrice, setMinPrice] = useState('2800');
  const [maxPrice, setMaxPrice] = useState('3200');
  const [deliveryDate, setDeliveryDate] = useState('2026-11-20');
  const [location, setLocation] = useState('Dindori Processing Hub, Nashik');
  const [district, setDistrict] = useState('Nashik');
  const [state, setState] = useState('Maharashtra');
  const [certifications, setCertifications] = useState('Residue-free test certificate, FPO Traceability tag');

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
      console.error('Failed to load buyer demands', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/buyer/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerId: user?.id || 'user-buyer-001',
          buyerName: user?.profile?.organizationName || user?.name || 'Sahyadri Foods Processing Pvt Ltd',
          buyerType: user?.profile?.businessType || 'Food Processor',
          crop,
          variety,
          quantityTonnes: parseFloat(quantity) || 100,
          grade,
          qualityRequirements: ['Firmness > 3.5 kg/cm2', 'Uniform coloration', 'Residue-free certified'],
          minPricePerQuintal: parseFloat(minPrice) || 2500,
          maxPricePerQuintal: parseFloat(maxPrice) || 3000,
          targetDeliveryDate: deliveryDate,
          deliveryLocation: location,
          district: district,
          state: state,
          requiredCertifications: certifications.split(',').map((s) => s.trim())
        })
      });

      if (res.ok) {
        setPostModalOpen(false);
        fetchDemands();
      }
    } catch (err) {
      console.error('Error posting demand', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Buyer Procurement Terminal
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {user?.profile?.organizationName || user?.name || 'Commercial Procurement Division'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Buyer Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Publish forward demand contracts, track aggregated FPO supply pipelines, and inspect batch arrivals.
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-xs flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Forward Demand</span>
        </button>
      </div>

      <DisclaimerBanner type="demo" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Active Contracts</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">
            {demands.length} Orders
          </div>
          <div className="text-[11px] text-gray-500">
            {demands.reduce((sum, d) => sum + (d.quantityTonnes || 0), 0)} Tonnes forward volume
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Matched Supply</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1b4332]">
            500 Tonnes
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            Sahyadri FPO (5 smallholders)
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>En-Route Inflow</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-800">
            18.5 Tonnes
          </div>
          <div className="text-[11px] text-gray-500">
            Reefer MH-15-EG-4921
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Quality Compliance</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-900">
            94% Grade A
          </div>
          <div className="text-[11px] text-gray-500">
            Digital field scan verified
          </div>
        </div>
      </div>

      {/* Main Section: Active Requirements & Fulfillment */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Active Procurement Requirements
            </h3>
            <p className="text-xs text-gray-500">
              Live institutional contracts with associated FPO aggregation fulfillment
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('fpo-hub')}
            className="text-xs font-bold text-blue-800 hover:text-blue-950"
          >
            Inspect Aggregation Hub &rarr;
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {demands.length === 0 && !loading ? (
            <div className="p-8 text-center text-xs text-gray-500">
              No active procurement contracts posted yet. Click "Post Forward Demand" above to publish your first requirement.
            </div>
          ) : (
            demands.map((item) => (
              <div key={item.id} className="p-6 hover:bg-[#fbfbfa] transition-colors space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-gray-900">
                        {item.quantityTonnes} Tonnes {item.crop}
                      </h4>
                      <Badge variant="blue">{item.grade}</Badge>
                      <Badge variant={item.contractStatus === 'Open' ? 'green' : 'amber'}>
                        {item.contractStatus}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Target Delivery: {item.targetDeliveryDate} • Delivery Hub: {item.deliveryLocation}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-gray-500">Price Band</span>
                    <div className="font-extrabold text-[#1b4332] text-base">
                      ₹{item.minPricePerQuintal} to ₹{item.maxPricePerQuintal}/qtl
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      FPO Aggregated Fulfillment:
                    </span>
                    <span className="font-bold text-emerald-800">
                      {item.quantityTonnes} / {item.quantityTonnes} Tonnes (100% Locked)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full w-full" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post New Demand Modal */}
      <Modal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        title="Post Forward Agricultural Demand"
        subtitle="Specify crop specs, quantity, and price floor to solicit FPO production plans"
      >
        <form onSubmit={handlePostDemand} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              >
                <option>Tomato</option>
                <option>Red Onion</option>
                <option>Guntur Sannam Chilli</option>
                <option>Potato</option>
                <option>Sharbati Wheat</option>
                <option>Soybean</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Variety / Specs</label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Quantity (Tonnes)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Quality Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as CropGrade)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              >
                <option>Grade A</option>
                <option>Export Quality</option>
                <option>Processing Grade</option>
                <option>Grade B</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Min Floor Price (₹/qtl)</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Max Ceiling Price (₹/qtl)</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Target Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Intake Hub Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Required Certifications</label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              placeholder="e.g. Residue-free, Spices Board Seal"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-xs"
            >
              Publish Forward Contract to FPO Network
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
