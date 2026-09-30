import React, { useState } from 'react';
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Camera,
  Layers,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { SAMPLE_QUALITY_ASSESSMENT } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const QualityIntelligence: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<'sample-tomato' | 'sample-chilli' | 'sample-potato'>('sample-tomato');
  const [isScanning, setIsScanning] = useState(false);
  const [assessment, setAssessment] = useState(SAMPLE_QUALITY_ASSESSMENT);

  const sampleProfiles = {
    'sample-tomato': {
      title: 'Field Sample: Nashik Processing Tomato',
      variety: 'Abhinav Hybrid (Lot #881)',
      health: 94,
      visual: 91,
      grade: 'Grade A' as const,
      pest: 'None' as const,
      readiness: 'Approaching Peak' as const,
      defects: ['Uniform circumference 55-65mm', 'Minor sun-scald on 2% of sample'],
      recommendation: 'Target harvest between Nov 10 and Nov 15 to capture maximum Grade A premium.'
    },
    'sample-chilli': {
      title: 'Field Sample: Guntur S17 Red Chilli',
      variety: 'Guntur Sannam Pungent',
      health: 89,
      visual: 86,
      grade: 'Export Quality' as const,
      pest: 'Minor Aphids' as const,
      readiness: 'Peak Harvest' as const,
      defects: ['Moisture 9.8% optimal', 'Good capsaicin coloring (>35,000 SHU)'],
      recommendation: 'Harvest immediately; apply solar drying tarpaulin to maintain <10% moisture.'
    },
    'sample-potato': {
      title: 'Field Sample: Processing Potato',
      variety: 'Kufri Chipsona-1',
      health: 88,
      visual: 85,
      grade: 'Processing Grade' as const,
      pest: 'None' as const,
      readiness: 'Approaching Peak' as const,
      defects: ['Specific gravity 1.082 measured', 'Tuber size 55-75mm'],
      recommendation: 'Cure skin for 7 days in covered shed prior to cold transit dispatch.'
    }
  };

  const handleSelectSample = (sampleKey: 'sample-tomato' | 'sample-chilli' | 'sample-potato') => {
    setSelectedSample(sampleKey);
    setIsScanning(true);
    setTimeout(() => {
      const data = sampleProfiles[sampleKey];
      setAssessment({
        id: `QA-${Date.now()}`,
        crop: data.title,
        scanTimestamp: 'Just now',
        cropHealthPercent: data.health,
        visualQualityScore: data.visual,
        estimatedGrade: data.grade,
        pestRisk: data.pest,
        harvestReadiness: data.readiness,
        defectsDetected: data.defects,
        recommendedAction: data.recommendation,
        confidencePercent: 92,
        isPrototype: true
      });
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Optical Inspection Module
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Field-Level AI Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Crop Quality Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Analyze crop health, visual defects, and harvest readiness directly from field imagery.
          </p>
        </div>

        <DisclaimerBanner
          type="prototype"
          message="Prototype AI assessment. Does not claim certified government or laboratory quality grading."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Selector / Upload Simulation (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">
              Crop Image Input
            </h2>
            <p className="text-xs text-gray-500">
              Select a field capture or test with benchmark agricultural samples
            </p>
          </div>

          {/* Sample Selectors */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Select Demo Field Image Sample
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: 'sample-tomato', label: 'Processing Tomato (Abhinav Hybrid)' },
                { key: 'sample-chilli', label: 'Red Chilli (Guntur S17 Pungent)' },
                { key: 'sample-potato', label: 'Processing Potato (Chipsona-1)' }
              ].map((sample) => (
                <button
                  key={sample.key}
                  onClick={() => handleSelectSample(sample.key as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                    selectedSample === sample.key
                      ? 'bg-[#eef8f2] border-emerald-300 text-[#1b4332]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{sample.label}</span>
                  {selectedSample === sample.key && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Image Upload Dropzone */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-[#fbfbfa] space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">
                Capture or Upload Field Photo
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                PNG, JPG or HEIC up to 10MB (Prototype simulation)
              </p>
            </div>
            <button
              onClick={() => handleSelectSample(selectedSample)}
              disabled={isScanning}
              className="px-4 py-2 bg-[#1b4332] text-white text-xs font-bold rounded-lg hover:bg-[#143628] transition-colors"
            >
              {isScanning ? 'Running Neural Inspection...' : 'Trigger Instant Scan'}
            </button>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-start gap-2 border border-gray-200">
            <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <span>
              In field deployments, photos captured via smartphone camera are analyzed on-device to classify coloration, sizing, and blemish percentage.
            </span>
          </div>
        </div>

        {/* Right Column: AI Analysis Result Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
                Analysis Report
              </span>
              <h3 className="text-xl font-extrabold text-gray-950 mt-1">
                {assessment.crop}
              </h3>
              <p className="text-xs text-gray-500">
                Timestamp: {assessment.scanTimestamp} • Mode: Prototype AI Assessment
              </p>
            </div>
            <Badge variant="green" size="md">
              {assessment.estimatedGrade}
            </Badge>
          </div>

          {/* Key Optical Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 text-[11px]">Crop Health</span>
              <div className="font-extrabold text-[#1b4332] text-xl mt-0.5">
                {assessment.cropHealthPercent}%
              </div>
              <span className="text-[10px] text-gray-400">Vigor & foliage</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 text-[11px]">Visual Quality</span>
              <div className="font-extrabold text-gray-900 text-xl mt-0.5">
                {assessment.visualQualityScore} / 100
              </div>
              <span className="text-[10px] text-gray-400">Color & blemish index</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 text-[11px]">Pest / Disease</span>
              <div className="font-extrabold text-emerald-700 text-sm mt-1">
                {assessment.pestRisk}
              </div>
              <span className="text-[10px] text-gray-400">Defect threshold</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 text-[11px]">Harvest Readiness</span>
              <div className="font-extrabold text-blue-800 text-sm mt-1">
                {assessment.harvestReadiness}
              </div>
              <span className="text-[10px] text-gray-400">Maturity index</span>
            </div>
          </div>

          {/* Defects & Features Detected */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Inspection Observations</span>
            </h4>
            <div className="space-y-2">
              {assessment.defectsDetected.map((defect, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#fbfbfa] border border-gray-200 text-xs text-gray-700 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{defect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Recommendation */}
          <div className="p-4 rounded-xl bg-[#eef8f2] border border-[#d8f3dc] text-xs space-y-1.5">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Recommended Agronomic & Post-Harvest Action
            </div>
            <p className="text-emerald-900 leading-relaxed text-[11px]">
              {assessment.recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
