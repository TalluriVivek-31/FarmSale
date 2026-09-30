export interface DemoStep {
  step: number;
  title: string;
  stageName: string;
  actor: string;
  actorRole: 'buyer' | 'farmer' | 'fpo' | 'admin' | 'system';
  summary: string;
  keyDetails: string[];
  metricHeadline: string;
  metricValue: string;
  metricLabel: string;
  highlightedView: string;
}

export const DEMO_SCENARIO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Buyer Posts Institutional Demand',
    stageName: 'Demand Genesis',
    actor: 'Sahyadri Foods Processing Pvt Ltd',
    actorRole: 'buyer',
    summary: 'A commercial food processor in Nashik posts a forward requirement for 500 tonnes of Grade-A processing tomatoes at ₹2,800 to ₹3,200 per quintal with target delivery by mid-November.',
    keyDetails: [
      'Crop: Processing Tomato (Firm skin, TSS > 4.8 Brix)',
      'Required Quantity: 500 Tonnes (Bulk Institutional Order)',
      'Floor Price: ₹2,800/qtl | Ceiling: ₹3,200/qtl',
      'Delivery Hub: Dindori Processing Unit, Nashik'
    ],
    metricHeadline: 'Active Market Demand',
    metricValue: '500 Tonnes',
    metricLabel: 'Guaranteed purchase contract value: ₹1.55 Crore',
    highlightedView: 'buyer-marketplace'
  },
  {
    step: 2,
    title: 'AI Evaluates Regional Supply & Soil Fit',
    stageName: 'Demand Intelligence',
    actor: 'FarmSale Intelligence Engine',
    actorRole: 'system',
    summary: 'The platform scans regional agro-climatic conditions, soil records, water availability, and historical mandi arrivals across Nashik district, identifying a 350-tonne supply gap.',
    keyDetails: [
      'Identified regional deficit: 350 Tonnes for Grade A Tomatoes',
      'Target soil type: Deep Black Clay Loam (pH 6.5 to 7.2)',
      'Water requirement: Drip-fertigated plots prioritized',
      'Risk index: Low price risk due to contract floor pricing'
    ],
    metricHeadline: 'Supply Gap Deficit',
    metricValue: '350 Tonnes',
    metricLabel: 'Nashik horticulture clusters prioritized for alerts',
    highlightedView: 'demand-intelligence'
  },
  {
    step: 3,
    title: 'Farmer Receives Demand-Driven Recommendation',
    stageName: 'Crop Planning',
    actor: 'Ramesh Patel (Smallholder Farmer)',
    actorRole: 'farmer',
    summary: 'Farmer Ramesh enters his land parcel (2.5 acres, drip irrigation, previous crop soybean). The AI advises growing Hybrid Processing Tomato instead of speculative open-market crops.',
    keyDetails: [
      'Recommended Variety: Hybrid Processing (Abhinav / US-440)',
      'Recommended Area: 2.0 Acres on North Plot',
      'Primary Driver: Pre-matched buyer demand from Sahyadri Foods',
      'Soil Compatibility: pH 6.8 with residual nitrogen from soybean'
    ],
    metricHeadline: 'Recommendation Confidence',
    metricValue: '92%',
    metricLabel: 'Prototype AI estimate based on demand & soil fit',
    highlightedView: 'crop-planner'
  },
  {
    step: 4,
    title: 'Farmer Commits Production Plan',
    stageName: 'Production Planning',
    actor: 'Ramesh Patel (Farmer)',
    actorRole: 'farmer',
    summary: 'Ramesh confirms the AI crop plan, allocating 2.0 acres to tomatoes and syncing his planned harvest timeline with the buyer requirement.',
    keyDetails: [
      'Cultivation Area: 2.0 Acres (Drip Fertigation)',
      'Estimated Input Investment: ₹1,82,500',
      'Target Harvest Window: Nov 12 to Dec 02',
      'Regenerative Benefit: Plastic mulch + drip saves 38% water'
    ],
    metricHeadline: 'Allocated Acreage',
    metricValue: '2.0 Acres',
    metricLabel: 'Production synchronized with pre-order',
    highlightedView: 'farmer-dashboard'
  },
  {
    step: 5,
    title: 'Platform Predicts Yield & Growth Timeline',
    stageName: 'Harvest Forecast',
    actor: 'Harvest Intelligence Engine',
    actorRole: 'system',
    summary: 'Using thermal degree-days and local moisture readings, the platform projects an expected yield of 15.5 tonnes with harvest peaking in 22 days.',
    keyDetails: [
      'Projected Yield: 15.5 Tonnes (±1.2T confidence interval)',
      'Current Growth Stage: Flowering & Fruiting (BBCH 71)',
      'Days to Harvest: 22 Days',
      'Optimal Harvest Window: Nov 10 to Nov 16'
    ],
    metricHeadline: 'Predicted Yield',
    metricValue: '15.5 Tonnes',
    metricLabel: '91% statistical confidence based on plot inputs',
    highlightedView: 'harvest-forecast'
  },
  {
    step: 6,
    title: 'Platform Generates 94% Buyer Match Score',
    stageName: 'Farmer-Buyer Matching',
    actor: 'Matching Engine',
    actorRole: 'system',
    summary: 'The system matches Farmer Ramesh with Sahyadri Foods demand DEM-2026-081, providing an explainable breakdown of why this match succeeds.',
    keyDetails: [
      'Crop & Variety: Exact Match (Hybrid Processing Tomato)',
      'Harvest Window: Aligns within 3 days of buyer intake',
      'Delivery Radius: 28 km to Dindori Processing Hub',
      'Quality Compliance: Drip-fertigated Grade A parameters met'
    ],
    metricHeadline: 'Platform Match Score',
    metricValue: '94% Match',
    metricLabel: 'Verified contract terms: ₹3,100 per quintal',
    highlightedView: 'buyer-marketplace'
  },
  {
    step: 7,
    title: 'FPO Aggregates Supply from 5 Smallholders',
    stageName: 'FPO Aggregation',
    actor: 'Sahyadri Agri Farmers Cooperative',
    actorRole: 'fpo',
    summary: 'A single smallholder cannot supply 500 tonnes. The FPO aggregates 5 member farmers: Ramesh (80t), Balasaheb (60t), Vishnu (90t), Anand (120t), Sunita (150t) = 500 tonnes total.',
    keyDetails: [
      'Total Target Contract: 500 Tonnes fulfilled 100%',
      'Farmers Aggregated: 5 Smallholder & Medium Members',
      'Collection Hub: Pimpalgaon APMC Central Aggregation Hub',
      'Collective Bargaining: Premium contract rate locked for all 5'
    ],
    metricHeadline: 'Aggregated Supply',
    metricValue: '500 / 500 T',
    metricLabel: '100% Demand fulfilled through FPO aggregation',
    highlightedView: 'fpo-hub'
  },
  {
    step: 8,
    title: 'Optical Quality & Defect Inspection',
    stageName: 'Quality Intelligence',
    actor: 'Quality Assessment Module',
    actorRole: 'system',
    summary: 'Produce samples are scanned at the collection gate. The prototype AI evaluation confirms Grade A quality, 91 visual score, and TSS Brix of 4.9.',
    keyDetails: [
      'Visual Quality Index: 91 / 100 (Grade A Certified)',
      'Crop Health: 94% Optimal Firmness',
      'Pest / Disease Defect: Zero fruit borer punctures detected',
      'Recommendation: Ready for immediate cold staging and transit'
    ],
    metricHeadline: 'Quality Grade',
    metricValue: 'Grade A',
    metricLabel: 'Prototype AI assessment verified',
    highlightedView: 'quality-intelligence'
  },
  {
    step: 9,
    title: 'Cold Storage Staging Booked',
    stageName: 'Storage & Cold Chain',
    actor: 'Nashik Agro-Logistics Cold Hub',
    actorRole: 'system',
    summary: 'To prevent post-harvest loss while consolidating the 500 tonnes, the FPO stages batches in nearby dual-temperature cold storage (9.4 km away).',
    keyDetails: [
      'Facility: Nashik Agro-Logistics Cold Hub (320t available)',
      'Temperature Zone: 8°C pre-cooling and staging',
      'Distance from Hub: 9.4 km',
      'Storage Cost: ₹70 per quintal per month (minimal duration cost)'
    ],
    metricHeadline: 'Cold Storage Staged',
    metricValue: '8.2°C Staged',
    metricLabel: 'Post-harvest spoilage loss reduced from 22% to <2%',
    highlightedView: 'storage-network'
  },
  {
    step: 10,
    title: 'Logistics Dispatched with Route Optimization',
    stageName: 'Logistics Matching',
    actor: 'Kisan Express Reefer Fleet',
    actorRole: 'system',
    summary: 'A 14-tonne temperature-controlled reefer truck is assigned via smart matching based on load size, 28 km transit distance, and rapid 1.5-hour turnaround.',
    keyDetails: [
      'Vehicle: 14-Tonne Refrigerated Reefer (MH-15-EG-4921)',
      'Estimated Transit Time: 1.5 Hours to Dindori Hub',
      'Freight Rate: ₹34 per km (Total transit cost ₹952)',
      'Smart Match Score: 96% based on load and temperature compatibility'
    ],
    metricHeadline: 'Logistics Match',
    metricValue: '96% Fit',
    metricLabel: 'Refrigerated dispatch prevents pulp warming',
    highlightedView: 'logistics-hub'
  },
  {
    step: 11,
    title: 'Field-to-Fork Batch Traceability Logged',
    stageName: 'Supply Traceability',
    actor: 'FarmSale Traceability Engine',
    actorRole: 'system',
    summary: 'Batch FS-NSK-2026-B881 receives an immutable timeline with farm coordinates, FPO check-in seal, cold chain IoT log, and carrier GPS tracking.',
    keyDetails: [
      'Batch ID: FS-NSK-2026-B881',
      'Provenance: Ramesh Patel via Sahyadri FPO',
      'Cold Chain Log: Sensor telemetry recorded 8.2°C continuously',
      'Transparency: Scannable QR code generated for buyer audit'
    ],
    metricHeadline: 'Batch Verified',
    metricValue: '100% Traced',
    metricLabel: 'Immutable chain of custody from farm gate to factory',
    highlightedView: 'traceability'
  },
  {
    step: 12,
    title: 'Buyer Delivery & Net Income Settlement',
    stageName: 'Settlement & Impact',
    actor: 'Sahyadri Foods & Ramesh Patel',
    actorRole: 'farmer',
    summary: 'Produce is delivered at the Dindori terminal. The buyer confirms Grade A receipt and pays ₹3,100/qtl. Farmer Ramesh views his transparent net income statement.',
    keyDetails: [
      'Gross Buyer Price: ₹3,100 per Quintal',
      'Less Transport & Handling: -₹48 per Quintal',
      'Less Staging & Storage: -₹42 per Quintal',
      'Net Farmer Return: ₹3,010 per Quintal (Net Profit ₹2,98,000 for 2 acres)',
      'Comparison: +90% higher net earnings compared to speculative distress sale'
    ],
    metricHeadline: 'Net Farmer Price',
    metricValue: '₹3,010 / Qtl',
    metricLabel: 'Transparent deduction breakdown: ₹90 total supply chain cost',
    highlightedView: 'income-simulator'
  }
];
