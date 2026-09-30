import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Truck,
  Warehouse,
  ShieldCheck,
  User,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { TRACEABILITY_DEMO } from '../../data/mockData';
import { Badge } from '../common/Badge';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const TraceabilityView: React.FC = () => {
  const batch = TRACEABILITY_DEMO;
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-[#eef8f2] px-2.5 py-0.5 rounded-full border border-[#d8f3dc]">
              Supply Trace Provenance
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Field-to-Fork Batch Journey
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            Batch Traceability & Provenance
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Verifiable digital passport tracking harvest origin, FPO aggregation, cold storage staging, and carrier transit.
          </p>
        </div>

        <DisclaimerBanner type="demo" />
      </div>

      {/* Batch Overview Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-extrabold text-[#1b4332] bg-[#eef8f2] px-3 py-1 rounded-lg border border-[#d8f3dc]">
                Batch ID: {batch.batchId}
              </span>
              <Badge variant="blue">{batch.currentStatus}</Badge>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-2">
              {batch.quantityTonnes} Tonnes {batch.crop} ({batch.variety})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Source: {batch.farmerOrFpo} • Destination: {batch.buyerDestination}
            </p>
          </div>

          {/* QR Code Trigger Box */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-white rounded-lg border border-gray-300 flex items-center justify-center p-1">
              {/* Simulated QR Code Visual */}
              <div className="grid grid-cols-4 gap-0.5 w-full h-full p-0.5">
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-200 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-200 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-200 rounded-2xs" />
                <div className="bg-gray-200 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-200 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
                <div className="bg-gray-900 rounded-2xs" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-gray-900 block">Digital Batch Tag</span>
              <span className="text-[11px] text-gray-500 block">Scannable QR Verified</span>
            </div>
          </div>
        </div>

        {/* 6-Stage Journey Tracker */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Chain of Custody Events
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-600/40 space-y-6">
            {batch.events.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Stepper Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-[#1b4332] text-white flex items-center justify-center ring-4 ring-[#eef8f2]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                </div>

                <div className="bg-[#fbfbfa] p-4 rounded-xl border border-gray-200 space-y-2 hover:border-emerald-300 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900">
                        {event.stepName}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {event.verificationBadge}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {event.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {event.details}
                  </p>

                  <div className="text-[11px] text-gray-500 flex flex-wrap items-center gap-4 pt-1 border-t border-gray-200/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      {event.actor} ({event.role})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
