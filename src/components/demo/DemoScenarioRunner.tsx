import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  X,
  Play,
  CheckCircle2,
  Building2,
  UserCheck,
  Cpu,
  TrendingUp,
  Warehouse
} from 'lucide-react';
import { DEMO_SCENARIO_STEPS } from '../../data/demoScenarios';
import { useAppState, AppViewTab } from '../../context/AppStateContext';
import { useRole } from '../../context/RoleContext';

export const DemoScenarioRunner: React.FC = () => {
  const {
    demoModalOpen,
    setDemoModalOpen,
    demoCurrentStep,
    setDemoCurrentStep,
    setCurrentTab
  } = useAppState();
  const { switchRole } = useRole();

  if (!demoModalOpen) return null;

  const currentStepData =
    DEMO_SCENARIO_STEPS.find((s) => s.step === demoCurrentStep) ||
    DEMO_SCENARIO_STEPS[0];

  const handleNext = () => {
    if (demoCurrentStep < DEMO_SCENARIO_STEPS.length) {
      setDemoCurrentStep(demoCurrentStep + 1);
    }
  };

  const handlePrev = () => {
    if (demoCurrentStep > 1) {
      setDemoCurrentStep(demoCurrentStep - 1);
    }
  };

  const handleJumpToScreen = () => {
    // Sync role and view
    if (currentStepData.actorRole === 'buyer') {
      switchRole('buyer');
    } else if (currentStepData.actorRole === 'farmer') {
      switchRole('farmer');
    } else if (currentStepData.actorRole === 'fpo') {
      switchRole('fpo');
    } else if (currentStepData.actorRole === 'admin') {
      switchRole('admin');
    }
    setCurrentTab(currentStepData.highlightedView as AppViewTab);
    setDemoModalOpen(false);
  };

  const getActorIcon = (role: string) => {
    switch (role) {
      case 'buyer':
        return <Building2 className="w-4 h-4 text-blue-700" />;
      case 'farmer':
        return <UserCheck className="w-4 h-4 text-emerald-700" />;
      case 'fpo':
        return <Warehouse className="w-4 h-4 text-[#8b5e3c]" />;
      default:
        return <Cpu className="w-4 h-4 text-purple-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#1b4332] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/40 border border-emerald-400/30 flex items-center justify-center">
              <Play className="w-4 h-4 text-emerald-300 fill-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  FarmSale 12-Step Demand-Driven Cycle Walkthrough
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 font-semibold border border-emerald-400/30">
                  Judges Demo
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Track 4: AgriN & Regenerative Agricultural Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={() => setDemoModalOpen(false)}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 12-Step Progress Stepper */}
        <div className="bg-[#f4f7f4] border-b border-gray-200 px-6 py-3 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-1">
            {DEMO_SCENARIO_STEPS.map((step) => {
              const isDone = step.step < demoCurrentStep;
              const isCurrent = step.step === demoCurrentStep;
              return (
                <button
                  key={step.step}
                  onClick={() => setDemoCurrentStep(step.step)}
                  className="flex flex-col items-center group relative flex-1 text-center"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#1b4332] text-white ring-3 ring-emerald-200 scale-105'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.step}
                  </div>
                  <span
                    className={`text-[10px] mt-1 line-clamp-1 font-medium transition-colors ${
                      isCurrent
                        ? 'text-[#1b4332] font-bold'
                        : 'text-gray-500 group-hover:text-gray-800'
                    }`}
                  >
                    {step.stageName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Step Tag & Actor */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#eef8f2] text-[#1b4332] border border-[#d8f3dc]">
                Step {currentStepData.step} of 12: {currentStepData.stageName}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                {getActorIcon(currentStepData.actorRole)}
                <span>Actor: {currentStepData.actor}</span>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              Target View: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-[11px]">{currentStepData.highlightedView}</code>
            </span>
          </div>

          {/* Title & Summary */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {currentStepData.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {currentStepData.summary}
            </p>
          </div>

          {/* Metric Highlight Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-br from-[#fbfbfa] to-[#f4f7f4] border border-gray-200 rounded-xl p-4">
            <div className="sm:col-span-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4 flex flex-col justify-center">
              <span className="text-xs text-gray-500 font-medium">
                {currentStepData.metricHeadline}
              </span>
              <div className="text-2xl font-extrabold text-[#1b4332] mt-0.5">
                {currentStepData.metricValue}
              </div>
              <span className="text-[11px] text-gray-600 mt-1">
                {currentStepData.metricLabel}
              </span>
            </div>

            <div className="sm:col-span-2 pt-2 sm:pt-0 sm:pl-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Operational Verified Data Points
              </h4>
              <ul className="space-y-1.5">
                {currentStepData.keyDetails.map((detail, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#fbfbfa] border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={demoCurrentStep === 1}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={demoCurrentStep === DEMO_SCENARIO_STEPS.length}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#1b4332] text-white hover:bg-[#143628] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors shadow-xs"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleJumpToScreen}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Open & Interact with this Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
