import React, { useState } from 'react';
import { Sprout, MapPin, Layers, Droplets, Calendar, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FarmerOnboardingProps {
  onCompleted: () => void;
}

export const FarmerOnboarding: React.FC<FarmerOnboardingProps> = ({ onCompleted }) => {
  const { user, updateUserProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form values
  const [state, setState] = useState(user?.profile?.state || 'Maharashtra');
  const [district, setDistrict] = useState(user?.profile?.district || 'Nashik');
  const [village, setVillage] = useState(user?.profile?.village || '');

  const [totalAcres, setTotalAcres] = useState('2.5');
  const [irrigatedAcres, setIrrigatedAcres] = useState('2.0');

  const [soilType, setSoilType] = useState('Medium Deep Black Clay Loam');
  const [soilPh, setSoilPh] = useState('6.8');
  const [nitrogenKg, setNitrogenKg] = useState('210');
  const [phosphorusKg, setPhosphorusKg] = useState('22');
  const [potassiumKg, setPotassiumKg] = useState('290');

  const [irrigationType, setIrrigationType] = useState('Drip');
  const [waterAvailability, setWaterAvailability] = useState<'High' | 'Moderate' | 'Low'>('Moderate');

  const [currentCrop, setCurrentCrop] = useState('Fallow / Preparing Land');
  const [previousCrop, setPreviousCrop] = useState('Soybean');

  const [budget, setBudget] = useState('100000');
  const [targetHarvestPeriod, setTargetHarvestPeriod] = useState('Nov to Dec (Early Rabi)');
  const [riskTolerance, setRiskTolerance] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const handleFinish = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/farmer/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          state,
          district,
          village,
          totalAcres,
          irrigatedAcres,
          soilType,
          irrigationType,
          currentCrop,
          previousCrop,
          ph: soilPh,
          nitrogenKg,
          phosphorusKg,
          potassiumKg,
          waterAvailability,
          budget,
          targetHarvestPeriod,
          riskTolerance
        })
      });

      if (res.ok) {
        updateUserProfile({ onboardingCompleted: true, state, district, village, totalAcres });
        onCompleted();
      }
    } catch (err) {
      console.error('Failed to complete onboarding', err);
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    'Location',
    'Land Size',
    'Soil Details',
    'Water Source',
    'Current Crop',
    'Previous Crop',
    'Preferences'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Wizard Header */}
        <div className="bg-[#1b4332] text-white p-6 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
            <Sprout className="w-3.5 h-3.5" />
            <span>Farm Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Complete your farm profile
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Tell us about your actual land and resources to generate verified, demand-driven crop recommendations.
          </p>

          {/* Stepper Dots */}
          <div className="pt-4 flex items-center justify-between gap-1 overflow-x-auto">
            {stepsList.map((label, idx) => {
              const num = idx + 1;
              const isCurrent = step === num;
              const isDone = step > num;
              return (
                <div key={num} className="flex flex-col items-center flex-1 text-center min-w-[50px]">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      isCurrent
                        ? 'bg-white text-[#1b4332] ring-2 ring-emerald-300 scale-105'
                        : isDone
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-950/60 text-emerald-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : num}
                  </div>
                  <span className={`text-[9px] mt-1 font-medium truncate ${isCurrent ? 'text-white font-bold' : 'text-emerald-200/60'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          {/* STEP 1: Location */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 1: Farm Location</h3>
                <p className="text-gray-500">Where is your primary agricultural land situated?</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option>Maharashtra</option>
                    <option>Telangana</option>
                    <option>Andhra Pradesh</option>
                    <option>Punjab</option>
                    <option>Karnataka</option>
                    <option>Madhya Pradesh</option>
                    <option>Uttar Pradesh</option>
                    <option>Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Nashik"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Village / Tehsil (Optional)</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Pimpalgaon Baswant"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Land size */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 2: Land Acreage</h3>
                <p className="text-gray-500">Provide the total and irrigated land area available.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Total Land (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={totalAcres}
                    onChange={(e) => setTotalAcres(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Irrigated Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={irrigatedAcres}
                    onChange={(e) => setIrrigatedAcres(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Soil information */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 3: Soil Characteristics</h3>
                <p className="text-gray-500">Select dominant soil type and optional lab telemetry if available.</p>
              </div>

              <div className="space-y-3">
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

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Soil pH</label>
                    <input
                      type="number"
                      step="0.1"
                      value={soilPh}
                      onChange={(e) => setSoilPh(e.target.value)}
                      placeholder="e.g. 6.8"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Nitrogen (N)</label>
                    <input
                      type="number"
                      value={nitrogenKg}
                      onChange={(e) => setNitrogenKg(e.target.value)}
                      placeholder="kg/ha"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Phosphorus (P)</label>
                    <input
                      type="number"
                      value={phosphorusKg}
                      onChange={(e) => setPhosphorusKg(e.target.value)}
                      placeholder="kg/ha"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Potassium (K)</label>
                    <input
                      type="number"
                      value={potassiumKg}
                      onChange={(e) => setPotassiumKg(e.target.value)}
                      placeholder="kg/ha"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Water Availability */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 4: Irrigation & Water Availability</h3>
                <p className="text-gray-500">Specify your reliable water supply during the upcoming season.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Primary Irrigation System</label>
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
                  <label className="block font-semibold text-gray-700 mb-1">Expected Water Availability</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['High', 'Moderate', 'Low'] as const).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWaterAvailability(w)}
                        className={`p-2.5 rounded-lg border text-center font-bold ${
                          waterAvailability === w
                            ? 'bg-[#eef8f2] border-emerald-400 text-[#1b4332]'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Current crop */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 5: Current Plot Status</h3>
                <p className="text-gray-500">What is currently standing in this plot?</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Current Standing Crop</label>
                <select
                  value={currentCrop}
                  onChange={(e) => setCurrentCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                >
                  <option>Fallow / Preparing Land</option>
                  <option>Vegetative Stage Horticulture</option>
                  <option>Maturity Stage Cereal</option>
                  <option>Harvest Completed</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 6: Previous crop */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 6: Previous Crop History</h3>
                <p className="text-gray-500">Helps the AI evaluate residual soil nitrogen and crop rotation hygiene.</p>
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
                  <option>Maize</option>
                  <option>Fallow (Resting Soil)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 7: Preferences */}
          {step === 7 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 7: Planning Preferences</h3>
                <p className="text-gray-500">Specify your budget, preferred harvest window, and risk tolerance.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Working Budget (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Target Harvest Window</label>
                  <select
                    value={targetHarvestPeriod}
                    onChange={(e) => setTargetHarvestPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option>Nov to Dec (Early Rabi)</option>
                    <option>Jan to Feb (Mid Rabi)</option>
                    <option>March to April (Late Rabi / Summer)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Risk Tolerance</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Medium', 'High'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRiskTolerance(r)}
                        className={`p-2 rounded-lg border text-center font-bold ${
                          riskTolerance === r
                            ? 'bg-[#eef8f2] border-emerald-400 text-[#1b4332]'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
              >
                Previous
              </button>
            ) : <div />}

            {step < 7 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 bg-[#1b4332] text-white font-bold rounded-lg hover:bg-[#143628] flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] shadow-agri-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{loading ? 'Registering Farm...' : 'Generate My Farm Plan'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
