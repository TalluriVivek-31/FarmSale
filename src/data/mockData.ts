import {
  Farmer,
  BuyerDemand,
  CropPlanRecommendation,
  ActiveCropPlan,
  FPOAggregationBatch,
  StorageFacility,
  LogisticsOption,
  RegenerativeScoreRecord,
  BatchTraceabilityRecord,
  RiskAlert,
  NotificationItem,
  QualityAssessment
} from '../types';

export const CURRENT_FARMER: Farmer = {
  id: 'FARM-IND-001',
  name: 'Ramesh Patel',
  village: 'Pimpalgaon Baswant',
  district: 'Nashik',
  state: 'Maharashtra',
  totalLandAcres: 4.5,
  irrigatedAcres: 4.0,
  fpoMembershipId: 'FPO-NSK-44',
  fpoName: 'Sahyadri Agri Farmers Cooperative',
  regenerativeScore: 74,
  parcels: [
    {
      id: 'PARCEL-01',
      name: 'North Plot (Canal & Drip)',
      sizeAcres: 2.5,
      irrigationType: 'Drip',
      currentCrop: 'Hybrid Tomato (Abhinav)',
      previousCrop: 'Soybean',
      soil: {
        soilType: 'Medium Deep Black Clay Loam',
        ph: 6.8,
        moisturePercent: 44,
        organicMatterPercent: 0.72,
        nitrogenKgPerHa: 210,
        phosphorusKgPerHa: 22,
        potassiumKgPerHa: 290,
        status: 'Optimal',
        recommendations: [
          'Maintain drip fertigation cycle for fruiting phase',
          'Add farmyard manure mulching to retain soil moisture',
          'Incorporate pulse intercropping in next cycle for biological nitrogen fixation'
        ]
      }
    },
    {
      id: 'PARCEL-02',
      name: 'South Plot (Borewell)',
      sizeAcres: 2.0,
      irrigationType: 'Borewell',
      currentCrop: 'Red Onion (Garwa)',
      previousCrop: 'Wheat',
      soil: {
        soilType: 'Red Gravelly Loam',
        ph: 7.2,
        moisturePercent: 38,
        organicMatterPercent: 0.58,
        nitrogenKgPerHa: 185,
        phosphorusKgPerHa: 19,
        potassiumKgPerHa: 240,
        status: 'Attention Needed',
        recommendations: [
          'Soil moisture is below optimal 45% range for bulb development',
          'Increase organic carbon through compost application',
          'Rotate with legume cover crop before next planting'
        ]
      }
    }
  ]
};

export const BUYER_DEMANDS: BuyerDemand[] = [
  {
    id: 'DEM-2026-081',
    buyerName: 'Sahyadri Foods Processing Pvt Ltd',
    buyerType: 'Food Processor',
    crop: 'Tomato',
    variety: 'Hybrid Processing (Firm skin, TSS > 4.8)',
    quantityTonnes: 500,
    grade: 'Grade A',
    qualityRequirements: ['Firmness > 3.5 kg/cm2', 'Brix > 4.8%', 'No fruit borer punctures', 'Uniform deep red'],
    minPricePerQuintal: 2800,
    maxPricePerQuintal: 3200,
    targetDeliveryDate: '2026-11-15',
    deliveryLocation: 'Dindori Processing Hub, Nashik',
    destinationDistrict: 'Nashik',
    destinationState: 'Maharashtra',
    contractStatus: 'Open',
    distanceKm: 28,
    requiredCertifications: ['Residue-free test certificate', 'FPO Traceability tag'],
    createdAt: '2026-09-20'
  },
  {
    id: 'DEM-2026-094',
    buyerName: 'AgroFresh Organics & Retail Ltd',
    buyerType: 'Retail Supermarket Chain',
    crop: 'Guntur Sannam Chilli',
    variety: 'S17 High Pungency',
    quantityTonnes: 150,
    grade: 'Export Quality',
    qualityRequirements: ['SHU > 35,000', 'Moisture < 10%', 'Aflatoxin < 5 ppb', 'Natural bright red'],
    minPricePerQuintal: 18500,
    maxPricePerQuintal: 21000,
    targetDeliveryDate: '2026-11-28',
    deliveryLocation: 'APMC Logistics Terminal, Guntur',
    destinationDistrict: 'Guntur',
    destinationState: 'Andhra Pradesh',
    contractStatus: 'Partially Matched',
    distanceKm: 640,
    requiredCertifications: ['Spices Board Quality Seal', 'GlobalGAP preferred'],
    createdAt: '2026-09-22'
  },
  {
    id: 'DEM-2026-102',
    buyerName: 'ITC Agri Business Division',
    buyerType: 'Food Processor',
    crop: 'Sharbati Wheat',
    variety: 'C-306 Golden Lustre',
    quantityTonnes: 1200,
    grade: 'Grade A',
    qualityRequirements: ['Protein > 12.5%', 'Moisture < 11%', 'Zero admixture', 'Bold grain'],
    minPricePerQuintal: 3400,
    maxPricePerQuintal: 3750,
    targetDeliveryDate: '2026-12-10',
    deliveryLocation: 'Malwa Grain Silos, Sehore',
    destinationDistrict: 'Sehore',
    destinationState: 'Madhya Pradesh',
    contractStatus: 'Open',
    distanceKm: 490,
    requiredCertifications: ['FSSAI Food Grade', 'Moisture certificate'],
    createdAt: '2026-09-25'
  },
  {
    id: 'DEM-2026-115',
    buyerName: 'KisanSetu Institutional Wholesale',
    buyerType: 'Wholesale Aggregator',
    crop: 'Red Onion',
    variety: 'Nashik Garwa Medium (45-55mm)',
    quantityTonnes: 350,
    grade: 'Grade A',
    qualityRequirements: ['Neck thickness < 5mm', 'Moisture < 12%', 'Cured outer skin', 'Zero sprouting'],
    minPricePerQuintal: 2400,
    maxPricePerQuintal: 2750,
    targetDeliveryDate: '2026-11-05',
    deliveryLocation: 'Vashi Agricultural Terminal, Navi Mumbai',
    destinationDistrict: 'Thane',
    destinationState: 'Maharashtra',
    contractStatus: 'Open',
    distanceKm: 180,
    requiredCertifications: ['Sorting & grading certificate'],
    createdAt: '2026-09-26'
  },
  {
    id: 'DEM-2026-128',
    buyerName: 'Mother Dairy Fresh Foods',
    buyerType: 'Food Processor',
    crop: 'Potato',
    variety: 'Kufri Chipsona-1',
    quantityTonnes: 600,
    grade: 'Processing Grade',
    qualityRequirements: ['Specific gravity > 1.080', 'Reducing sugars < 0.1%', 'Tuber size 50-80mm'],
    minPricePerQuintal: 1950,
    maxPricePerQuintal: 2250,
    targetDeliveryDate: '2026-12-01',
    deliveryLocation: 'Hassan Cold Storage Terminal, Karnataka',
    destinationDistrict: 'Hassan',
    destinationState: 'Karnataka',
    contractStatus: 'Open',
    distanceKm: 780,
    requiredCertifications: ['Chipsona variety verification'],
    createdAt: '2026-09-28'
  }
];

export const ACTIVE_CROP_PLANS: ActiveCropPlan[] = [
  {
    id: 'PLAN-001',
    farmerId: 'FARM-IND-001',
    parcelId: 'PARCEL-01',
    crop: 'Tomato',
    variety: 'Hybrid Processing (Abhinav)',
    areaAcres: 2.5,
    plantingDate: '2026-08-25',
    growthStage: 'Flowering & Fruiting',
    daysToHarvest: 22,
    expectedHarvestDate: '2026-10-22',
    expectedYieldTonnes: 18.5,
    confidencePercent: 91,
    matchedDemandId: 'DEM-2026-081',
    matchedBuyerName: 'Sahyadri Foods Processing Pvt Ltd',
    contractPricePerQuintal: 3100,
    status: 'In Progress'
  },
  {
    id: 'PLAN-002',
    farmerId: 'FARM-IND-001',
    parcelId: 'PARCEL-02',
    crop: 'Red Onion',
    variety: 'Garwa Winter Variety',
    areaAcres: 2.0,
    plantingDate: '2026-09-02',
    growthStage: 'Vegetative Growth',
    daysToHarvest: 45,
    expectedHarvestDate: '2026-11-14',
    expectedYieldTonnes: 14.2,
    confidencePercent: 88,
    matchedDemandId: 'DEM-2026-115',
    matchedBuyerName: 'KisanSetu Institutional Wholesale',
    contractPricePerQuintal: 2650,
    status: 'In Progress'
  }
];

export const DEMO_RECOMMENDATION: CropPlanRecommendation = {
  crop: 'Hybrid Processing Tomato',
  variety: 'Abhinav / US-440',
  recommendedAreaAcres: 2.0,
  expectedYieldTonnes: 15.5,
  estimatedRevenueInr: 480500,
  estimatedNetProfitInr: 298000,
  targetHarvestWindow: 'Nov 12 - Dec 02',
  confidencePercent: 92,
  demandMatchRating: 'Very High',
  reasons: [
    'Strong buyer demand in Nashik district: 500 tonnes contract open from Sahyadri Foods',
    'Black loam soil pH of 6.8 is within the ideal 6.5 to 7.2 bracket for lycopene and firm skin formation',
    'Drip fertigation infrastructure already installed on North Plot reduces water waste by 38%',
    'Historical pricing index indicates pre-winter tomato processing premiums reach ₹2,900-3,200/quintal',
    'Harvest window aligns precisely with Sahyadri Foods intake schedule'
  ],
  risks: [
    {
      factor: 'Unseasonal Post-Monsoon Showers',
      level: 'Medium',
      explanation: 'Possibility of brief cloudbursts in late October affecting early fruit setting',
      mitigation: 'Implement copper oxychloride prophylactic spray and ensure raised bed drainage'
    },
    {
      factor: 'Early Blight Pressure',
      level: 'Low',
      explanation: 'Night temperature drops below 19°C can foster leaf spot in humid conditions',
      mitigation: 'Sticky pheromone traps and trichoderma viride bio-fungicide drenching'
    },
    {
      factor: 'Local APMC Price Volatility',
      level: 'Low',
      explanation: 'Open mandi price can fluctuate drastically depending on Karnataka inflow',
      mitigation: 'Pre-matched platform contract with buyer fixes floor price at ₹2,800/quintal'
    }
  ],
  sustainabilityNotes: {
    soilImpact: 'Conserves Moisture',
    waterUsage: 'Moderate',
    carbonFootprint: 'Low',
    explanation: 'Growing with plastic mulch and drip reduces water evaporation by 40%. Rotating after soybean maintains residual nitrogen balance.'
  },
  matchingBuyers: [
    {
      buyerId: 'DEM-2026-081',
      buyerName: 'Sahyadri Foods Processing Pvt Ltd',
      requiredTonnes: 500,
      offeredPricePerQuintal: 3100,
      matchScore: 94
    },
    {
      buyerId: 'DEM-2026-115',
      buyerName: 'KisanSetu Institutional Wholesale',
      requiredTonnes: 350,
      offeredPricePerQuintal: 2950,
      matchScore: 86
    }
  ]
};

export const FPO_AGGREGATION_DEMO: FPOAggregationBatch = {
  id: 'BATCH-NSK-TOM-500',
  fpoName: 'Sahyadri Agri Farmers Cooperative (420 members)',
  buyerDemandId: 'DEM-2026-081',
  buyerName: 'Sahyadri Foods Processing Pvt Ltd',
  crop: 'Processing Tomato (Grade A)',
  targetTonnes: 500,
  collectedTonnes: 500,
  collectionCenter: 'Pimpalgaon APMC Central Aggregation Hub',
  dispatchDeadline: '2026-11-15',
  status: 'Quality Verified',
  memberContributions: [
    {
      farmerId: 'FARM-A-101',
      farmerName: 'Farmer Ramesh Patel (Pimpalgaon)',
      village: 'Pimpalgaon Baswant',
      crop: 'Tomato',
      pledgedTonnes: 80,
      harvestWindow: 'Nov 02 - Nov 06',
      qualityEstimated: 'Grade A',
      status: 'Collected'
    },
    {
      farmerId: 'FARM-B-102',
      farmerName: 'Farmer Balasaheb Shinde (Niphad)',
      village: 'Niphad',
      crop: 'Tomato',
      pledgedTonnes: 60,
      harvestWindow: 'Nov 04 - Nov 07',
      qualityEstimated: 'Grade A',
      status: 'Collected'
    },
    {
      farmerId: 'FARM-C-103',
      farmerName: 'Farmer Vishnu Khairnar (Dindori)',
      village: 'Dindori',
      crop: 'Tomato',
      pledgedTonnes: 90,
      harvestWindow: 'Nov 05 - Nov 09',
      qualityEstimated: 'Grade A',
      status: 'Collected'
    },
    {
      farmerId: 'FARM-D-104',
      farmerName: 'Farmer Anand Deshmukh (Chandwad)',
      village: 'Chandwad',
      crop: 'Tomato',
      pledgedTonnes: 120,
      harvestWindow: 'Nov 06 - Nov 10',
      qualityEstimated: 'Grade A',
      status: 'Collected'
    },
    {
      farmerId: 'FARM-E-105',
      farmerName: 'Farmer Sunita Jadhav (Yeola)',
      village: 'Yeola',
      crop: 'Tomato',
      pledgedTonnes: 150,
      harvestWindow: 'Nov 07 - Nov 12',
      qualityEstimated: 'Grade A',
      status: 'Collected'
    }
  ]
};

export const REGENERATIVE_RECORD: RegenerativeScoreRecord = {
  overallScore: 74,
  benchmarkStateAverage: 58,
  carbonEstimatedOffsetKgPerAcre: 480,
  waterSavedMetersCubedPerYear: 1850,
  pillars: [
    {
      pillar: 'Soil Organic Carbon',
      score: 78,
      weight: 15,
      status: 'Good',
      currentPractice: 'Crop residue retention with mulching on North Plot',
      suggestedPractice: 'Add green manure (sunn hemp) during monsoon fallow',
      potentialScoreGain: 6
    },
    {
      pillar: 'Crop Diversification & Rotation',
      score: 82,
      weight: 15,
      status: 'Strong',
      currentPractice: 'Soybean followed by Tomato and Garwa Onion rotation',
      suggestedPractice: 'Introduce pigeon pea perimeter borders for natural pest barrier',
      potentialScoreGain: 4
    },
    {
      pillar: 'Water Conservation & Efficiency',
      score: 88,
      weight: 15,
      status: 'Strong',
      currentPractice: 'Precision drip irrigation with fertigation unit on 2.5 acres',
      suggestedPractice: 'Install solar sensor automation for night drip cycles',
      potentialScoreGain: 3
    },
    {
      pillar: 'Chemical Input Optimization',
      score: 65,
      weight: 15,
      status: 'Needs Improvement',
      currentPractice: 'Reduced synthetic spray by 25% using neem oil formulations',
      suggestedPractice: 'Transition 50% nitrogen to bio-fertilizers (Azotobacter & PSB)',
      potentialScoreGain: 8
    },
    {
      pillar: 'Residue & Biomass Management',
      score: 75,
      weight: 10,
      status: 'Good',
      currentPractice: 'Zero stubble burning; waste converted to compost pits',
      suggestedPractice: 'Biochar incorporation to stabilize persistent organic matter',
      potentialScoreGain: 5
    },
    {
      pillar: 'Biodiversity & Pollinator Habitat',
      score: 60,
      weight: 10,
      status: 'Needs Improvement',
      currentPractice: 'Marigold trap crop strips around tomato borders',
      suggestedPractice: 'Establish permanent native flowering hedge on southern ridge',
      potentialScoreGain: 7
    },
    {
      pillar: 'Cover Cropping',
      score: 70,
      weight: 10,
      status: 'Good',
      currentPractice: 'Cowpea cover crop after kharif harvest',
      suggestedPractice: 'Multi-species mixed cover crop (sorghum + cowpea + clover)',
      potentialScoreGain: 5
    },
    {
      pillar: 'Tillage Reduction',
      score: 72,
      weight: 10,
      status: 'Good',
      currentPractice: 'Minimum tillage on bed preparation for horticulture',
      suggestedPractice: 'Permanent bed zero-till system for alternate seasons',
      potentialScoreGain: 6
    }
  ],
  recommendations: [
    'Increase crop diversity by planting pigeon pea borders on field edges (+4 pts)',
    'Transition 30% of synthetic nitrogen to bio-fertilizers (Azotobacter) (+8 pts)',
    'Add sunn hemp green manure in vacant pre-rabi window to boost soil carbon (+6 pts)',
    'Establish native flowering hedge on southern parcel ridge for natural pollinators (+7 pts)'
  ]
};

export const STORAGE_FACILITIES: StorageFacility[] = [
  {
    id: 'STORE-NSK-01',
    name: 'Nashik Agro-Logistics Cold Chain Hub',
    facilityType: 'Solar Cold Storage',
    location: 'Pimpalgaon Midc Road, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 9.4,
    totalCapacityTonnes: 1500,
    availableCapacityTonnes: 320,
    temperatureRange: '2°C to 12°C (Dual Zone)',
    monthlyRatePerQuintalInr: 70,
    cropSuitability: ['Tomato', 'Grapes', 'Pomegranate', 'Green Chilli'],
    humidityControlled: true,
    contactNumber: '+91 253 289410'
  },
  {
    id: 'STORE-NSK-02',
    name: 'Lasalgaon Central Onion Godown Complex',
    facilityType: 'Dry Multi-Commodity Warehouse',
    location: 'APMC Market Yard, Lasalgaon',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 24.0,
    totalCapacityTonnes: 3200,
    availableCapacityTonnes: 850,
    temperatureRange: 'Ambient with cross-ventilation',
    monthlyRatePerQuintalInr: 45,
    cropSuitability: ['Red Onion', 'Garlic', 'Pulses', 'Wheat'],
    humidityControlled: false,
    contactNumber: '+91 255 241108'
  },
  {
    id: 'STORE-PUN-03',
    name: 'Sahyadri Controlled Atmosphere Facility',
    facilityType: 'Controlled Atmosphere (CA) Store',
    location: 'Mohadi Industrial Area, Dindori',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 18.2,
    totalCapacityTonnes: 2000,
    availableCapacityTonnes: 410,
    temperatureRange: '0°C to 4°C (N2 enriched)',
    monthlyRatePerQuintalInr: 95,
    cropSuitability: ['Export Tomato', 'Capsicum', 'Exotic Vegetables'],
    humidityControlled: true,
    contactNumber: '+91 255 723900'
  }
];

export const LOGISTICS_FLEET: LogisticsOption[] = [
  {
    id: 'LOG-TRUCK-01',
    providerName: 'Kisan Express Reefer Logistics',
    vehicleType: '14-Tonne Refrigerated Reefer',
    temperatureControl: true,
    currentLocation: 'Nashik City Hub (12 km away)',
    capacityTonnes: 14,
    ratePerKmInr: 34,
    estimatedTransitTimeHours: 1.5,
    rating: 4.8,
    availableDate: 'Immediate',
    matchingScore: 96
  },
  {
    id: 'LOG-TRUCK-02',
    providerName: 'Bharat Rural Agri Fleet',
    vehicleType: '8-Tonne Covered Agri-Truck',
    temperatureControl: false,
    currentLocation: 'Pimpalgaon Market (4 km away)',
    capacityTonnes: 8,
    ratePerKmInr: 22,
    estimatedTransitTimeHours: 1.8,
    rating: 4.6,
    availableDate: 'Within 4 Hours',
    matchingScore: 89
  },
  {
    id: 'LOG-TRUCK-03',
    providerName: 'GreenWheels Electric Agri-Carrier',
    vehicleType: '3.5-Tonne Mini Agri-Carrier',
    temperatureControl: false,
    currentLocation: 'Baswant Chowk (2 km away)',
    capacityTonnes: 3.5,
    ratePerKmInr: 16,
    estimatedTransitTimeHours: 1.2,
    rating: 4.9,
    availableDate: 'Immediate',
    matchingScore: 84
  }
];

export const TRACEABILITY_DEMO: BatchTraceabilityRecord = {
  batchId: 'FS-NSK-2026-B881',
  qrPayload: 'https://farmsale.live/trace/FS-NSK-2026-B881',
  crop: 'Tomato',
  variety: 'Hybrid Processing (Abhinav)',
  quantityTonnes: 18.5,
  grade: 'Grade A',
  farmerOrFpo: 'Ramesh Patel via Sahyadri Agri Farmers Cooperative',
  harvestDate: '2026-10-18',
  storageFacilityUsed: 'Nashik Agro-Logistics Cold Chain Hub (Bay 4)',
  transportVehicleNumber: 'MH-15-EG-4921 (Reefer 14T)',
  buyerDestination: 'Sahyadri Foods Processing Pvt Ltd, Dindori',
  currentStatus: 'In Transit',
  events: [
    {
      stepName: 'Farm Harvest & Quality Scan',
      timestamp: '2026-10-18 07:45 IST',
      location: 'North Plot, Pimpalgaon Baswant',
      actor: 'Ramesh Patel (Farmer)',
      role: 'Cultivator',
      details: 'Harvested 18.5 tonnes. Optical field scan recorded 94% Grade A fruit firmness and TSS 4.9 Brix.',
      verificationBadge: 'Verified by Field Device Scan'
    },
    {
      stepName: 'FPO Collection Hub Check-In',
      timestamp: '2026-10-18 10:15 IST',
      location: 'Pimpalgaon APMC Central Aggregation Hub',
      actor: 'K. Deshmukh (FPO Quality Lead)',
      role: 'FPO Quality Officer',
      details: 'Batch weighed and digital manifest generated. Integrated into 500T Master Processing Order DEM-2026-081.',
      verificationBadge: 'FPO Seal Confirmed'
    },
    {
      stepName: 'Pre-Cooling & Cold Chain Staging',
      timestamp: '2026-10-18 12:30 IST',
      location: 'Nashik Agro-Logistics Hub Bay 4',
      actor: 'Cold Store Operator',
      role: 'Storage Provider',
      details: 'Pulp temperature lowered from 26°C to 8°C under controlled humidity staging.',
      verificationBadge: 'IoT Sensor Logged (8.2°C)'
    },
    {
      stepName: 'Dispatch & GPS En-Route',
      timestamp: '2026-10-18 14:00 IST',
      location: 'Highway NH-848 en route to Dindori',
      actor: 'Kisan Express Reefer (MH-15-EG-4921)',
      role: 'Logistics Partner',
      details: 'Dispatched to buyer processing terminal. Estimated arrival in 45 minutes.',
      verificationBadge: 'GPS Live Verified'
    }
  ]
};

export const RISK_ALERTS: RiskAlert[] = [
  {
    id: 'RISK-01',
    type: 'Weather',
    severity: 'Medium',
    title: 'Post-Monsoon Showers Forecasted in North Maharashtra',
    affectedRegion: 'Nashik, Dhule, Jalgaon Districts',
    affectedCrops: ['Tomato', 'Onion', 'Grapes'],
    explanation: 'Subtropical trough may bring 25-35 mm rain over 48 hours. Risk of water-logging in clayey soils.',
    actionRequired: 'Clear field drainage channels; delay non-urgent irrigation cycles.',
    reportedDate: '2026-09-29'
  },
  {
    id: 'RISK-02',
    type: 'Pest',
    severity: 'Low',
    title: 'Early Spodoptera Litura Trap Counts Detected',
    affectedRegion: 'Pimpalgaon and Niphad Talukas',
    affectedCrops: ['Soybean', 'Chilli', 'Tomato'],
    explanation: 'Pheromone trap count exceeded 8 moths/trap/day in nearby baseline monitors.',
    actionRequired: 'Install 5 sex pheromone traps per acre and apply neem-based azadirachtin 1500 ppm.',
    reportedDate: '2026-09-28'
  },
  {
    id: 'RISK-03',
    type: 'Market Price',
    severity: 'Medium',
    title: 'APMC Spot Price Fluctuations in Wholesale Markets',
    affectedRegion: 'Lasalgaon & Pimpalgaon Mandis',
    affectedCrops: ['Red Onion'],
    explanation: 'Inter-state arrivals causing ±18% day-to-day swing in open auction prices.',
    actionRequired: 'Contract through platform pre-commitments with floor price protection.',
    reportedDate: '2026-09-27'
  }
];

export const DEMAND_FORECAST_DATA = [
  { month: 'Sep W1', actual: 420, forecast: 410, lowerBound: 380, upperBound: 440 },
  { month: 'Sep W2', actual: 460, forecast: 450, lowerBound: 420, upperBound: 480 },
  { month: 'Sep W3', actual: 510, forecast: 505, lowerBound: 470, upperBound: 540 },
  { month: 'Sep W4', actual: 580, forecast: 570, lowerBound: 530, upperBound: 610 },
  { month: 'Oct W1', forecast: 640, lowerBound: 590, upperBound: 690 },
  { month: 'Oct W2', forecast: 710, lowerBound: 650, upperBound: 770 },
  { month: 'Oct W3', forecast: 790, lowerBound: 720, upperBound: 860 },
  { month: 'Oct W4', forecast: 850, lowerBound: 770, upperBound: 930 },
  { month: 'Nov W1', forecast: 910, lowerBound: 820, upperBound: 1000 },
  { month: 'Nov W2', forecast: 980, lowerBound: 870, upperBound: 1090 },
  { month: 'Nov W3', forecast: 1040, lowerBound: 920, upperBound: 1160 },
  { month: 'Nov W4', forecast: 1100, lowerBound: 960, upperBound: 1240 },
];

export const REGIONAL_DEMAND_HEATMAP = [
  { state: 'Maharashtra', district: 'Nashik', crop: 'Tomato', demandTonnes: 1450, supplyTonnes: 1100, gapTonnes: -350, intensity: 'High' },
  { state: 'Maharashtra', district: 'Nashik', crop: 'Red Onion', demandTonnes: 3200, supplyTonnes: 3400, gapTonnes: 200, intensity: 'Balanced' },
  { state: 'Andhra Pradesh', district: 'Guntur', crop: 'Chilli', demandTonnes: 2400, supplyTonnes: 1850, gapTonnes: -550, intensity: 'Critical Deficit' },
  { state: 'Karnataka', district: 'Hassan', crop: 'Potato', demandTonnes: 1800, supplyTonnes: 1520, gapTonnes: -280, intensity: 'High' },
  { state: 'Madhya Pradesh', district: 'Sehore', crop: 'Sharbati Wheat', demandTonnes: 4500, supplyTonnes: 4100, gapTonnes: -400, intensity: 'High' },
  { state: 'Punjab', district: 'Ludhiana', crop: 'Mustard', demandTonnes: 900, supplyTonnes: 980, gapTonnes: 80, intensity: 'Balanced' },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Buyer Demand Match Alert',
    message: 'Sahyadri Foods increased purchase demand for Processing Tomato in Nashik to 500 tonnes at ₹3,100/quintal.',
    timestamp: '25 mins ago',
    read: false,
    category: 'demand'
  },
  {
    id: 'NOTIF-02',
    title: 'Harvest Window Approaching',
    message: 'North Plot Tomato is 22 days from expected harvest. Optimum firmness estimated by Nov 12.',
    timestamp: '2 hours ago',
    read: false,
    category: 'harvest'
  },
  {
    id: 'NOTIF-03',
    title: 'Cold Storage Capacity Open',
    message: 'Nashik Agro-Logistics Cold Hub has 320 tonnes of dual-temperature space available at ₹70/qtl/mo.',
    timestamp: '5 hours ago',
    read: false,
    category: 'storage'
  },
  {
    id: 'NOTIF-04',
    title: 'Weather Advisory',
    message: 'Moderate rain expected in Nashik belt. Adjust drip irrigation schedule accordingly.',
    timestamp: '1 day ago',
    read: true,
    category: 'risk'
  }
];

export const SAMPLE_QUALITY_ASSESSMENT: QualityAssessment = {
  id: 'QA-SCAN-902',
  crop: 'Tomato (Abhinav)',
  scanTimestamp: 'Today, 08:30 IST',
  cropHealthPercent: 94,
  visualQualityScore: 91,
  estimatedGrade: 'Grade A',
  pestRisk: 'None',
  harvestReadiness: 'Approaching Peak',
  defectsDetected: ['Minor sun-scald on 2% of sample', 'Uniform fruit circumference 55-65mm'],
  recommendedAction: 'Target harvest between Nov 10 and Nov 15 to capture maximum Grade A premium.',
  confidencePercent: 93,
  isPrototype: true
};
