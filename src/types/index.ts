// FarmSale Domain Models & Types

export type UserRole = 'farmer' | 'buyer' | 'fpo' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  location: string;
  state: string;
  district: string;
  phone?: string;
  organization?: string;
  avatar?: string;
}

export interface SoilData {
  soilType: string;
  ph: number;
  moisturePercent: number;
  organicMatterPercent: number;
  nitrogenKgPerHa: number;
  phosphorusKgPerHa: number;
  potassiumKgPerHa: number;
  status: 'Optimal' | 'Attention Needed' | 'Sub-optimal';
  recommendations: string[];
}

export interface LandParcel {
  id: string;
  name: string;
  sizeAcres: number;
  soil: SoilData;
  irrigationType: 'Drip' | 'Borewell' | 'Canal' | 'Rainfed' | 'Sprinkler';
  currentCrop?: string;
  previousCrop: string;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  totalLandAcres: number;
  irrigatedAcres: number;
  fpoMembershipId?: string;
  fpoName?: string;
  parcels: LandParcel[];
  regenerativeScore: number;
}

export type CropGrade = 'Grade A' | 'Grade B' | 'Grade C' | 'Export Quality' | 'Processing Grade';

export interface BuyerDemand {
  id: string;
  buyerName: string;
  buyerType: 'Food Processor' | 'Export House' | 'Retail Supermarket Chain' | 'Wholesale Aggregator' | 'Government Procurement';
  crop: string;
  variety?: string;
  quantityTonnes: number;
  grade: CropGrade;
  qualityRequirements: string[];
  maxPricePerQuintal: number;
  minPricePerQuintal: number;
  targetDeliveryDate: string; // YYYY-MM-DD
  deliveryLocation: string;
  destinationState: string;
  destinationDistrict: string;
  state?: string;
  district?: string;
  contractStatus: 'Open' | 'Partially Matched' | 'Fulfilled' | 'Under Review';
  distanceKm?: number;
  requiredCertifications: string[];
  createdAt: string;
}

export interface CropPlanRecommendation {
  crop: string;
  variety: string;
  recommendedAreaAcres: number;
  expectedYieldTonnes: number;
  estimatedRevenueInr: number;
  estimatedNetProfitInr: number;
  targetHarvestWindow: string; // e.g. "Nov 15 - Dec 05"
  confidencePercent: number;
  demandMatchRating: 'Very High' | 'High' | 'Medium' | 'Low';
  reasons: string[];
  risks: {
    factor: string;
    level: 'Low' | 'Medium' | 'High';
    explanation: string;
    mitigation: string;
  }[];
  sustainabilityNotes: {
    soilImpact: 'Improves Nitrogen' | 'Conserves Moisture' | 'Maintains Organic Carbon' | 'Nutrient Depleting';
    waterUsage: 'Low' | 'Moderate' | 'High';
    carbonFootprint: 'Net Sink' | 'Low' | 'Moderate';
    explanation: string;
  };
  matchingBuyers: {
    buyerId: string;
    buyerName: string;
    requiredTonnes: number;
    offeredPricePerQuintal: number;
    matchScore: number;
  }[];
}

export interface ActiveCropPlan {
  id: string;
  farmerId: string;
  parcelId: string;
  crop: string;
  variety: string;
  areaAcres: number;
  plantingDate: string;
  growthStage: 'Germination' | 'Vegetative Growth' | 'Flowering & Fruiting' | 'Maturity / Pre-harvest' | 'Harvest Ready';
  daysToHarvest: number;
  expectedHarvestDate: string;
  expectedYieldTonnes: number;
  confidencePercent: number;
  matchedDemandId?: string;
  matchedBuyerName?: string;
  contractPricePerQuintal?: number;
  status: 'In Progress' | 'Harvest Ready' | 'Harvested' | 'Aggregated';
}

export interface MatchingScoreFactor {
  title: string;
  achieved: boolean;
  weight: number;
  details: string;
}

export interface MatchingResult {
  farmerId: string;
  demandId: string;
  overallScorePercent: number;
  factors: MatchingScoreFactor[];
  logisticsFeasibility: 'High' | 'Moderate' | 'Complex';
  estimatedNetMarginPercent: number;
}

export interface FPOMemberSupply {
  farmerId: string;
  farmerName: string;
  village: string;
  crop: string;
  pledgedTonnes: number;
  harvestWindow: string;
  qualityEstimated: CropGrade;
  status: 'Pledged' | 'Collected' | 'In Transit' | 'Settled';
}

export interface FPOAggregationBatch {
  id: string;
  fpoName: string;
  buyerDemandId: string;
  buyerName: string;
  crop: string;
  targetTonnes: number;
  collectedTonnes: number;
  memberContributions: FPOMemberSupply[];
  collectionCenter: string;
  dispatchDeadline: string;
  status: 'Forming' | 'Target Reached' | 'Quality Verified' | 'Dispatched' | 'Delivered';
}

export interface QualityAssessment {
  id: string;
  crop: string;
  scanTimestamp: string;
  imageUrl?: string;
  cropHealthPercent: number;
  visualQualityScore: number; // 0 - 100
  estimatedGrade: CropGrade;
  pestRisk: 'None' | 'Minor Aphids' | 'Mild Blight' | 'Severe';
  harvestReadiness: 'Premature' | 'Approaching Peak' | 'Peak Harvest' | 'Overripe';
  defectsDetected: string[];
  recommendedAction: string;
  confidencePercent: number;
  isPrototype: boolean;
}

export interface LogisticsOption {
  id: string;
  providerName: string;
  vehicleType: '14-Tonne Refrigerated Reefer' | '8-Tonne Covered Agri-Truck' | '3.5-Tonne Mini Agri-Carrier' | '22-Tonne Multi-Axle Carrier';
  temperatureControl: boolean;
  currentLocation: string;
  capacityTonnes: number;
  ratePerKmInr: number;
  estimatedTransitTimeHours: number;
  rating: number;
  availableDate: string;
  matchingScore: number;
}

export interface StorageFacility {
  id: string;
  name: string;
  facilityType: 'Solar Cold Storage' | 'Dry Multi-Commodity Warehouse' | 'Controlled Atmosphere (CA) Store' | 'FPO Collection Godown';
  location: string;
  district: string;
  state: string;
  distanceKm: number;
  totalCapacityTonnes: number;
  availableCapacityTonnes: number;
  temperatureRange: string;
  monthlyRatePerQuintalInr: number;
  cropSuitability: string[];
  humidityControlled: boolean;
  contactNumber?: string;
}

export interface RegenerativePillar {
  pillar: string;
  score: number; // 0 - 100
  weight: number;
  status: 'Strong' | 'Good' | 'Needs Improvement';
  currentPractice: string;
  suggestedPractice: string;
  potentialScoreGain: number;
}

export interface RegenerativeScoreRecord {
  overallScore: number; // 0 - 100
  benchmarkStateAverage: number;
  pillars: RegenerativePillar[];
  carbonEstimatedOffsetKgPerAcre: number;
  waterSavedMetersCubedPerYear: number;
  recommendations: string[];
}

export interface TraceabilityEvent {
  stepName: string;
  timestamp: string;
  location: string;
  actor: string;
  role: string;
  details: string;
  verificationBadge: string;
}

export interface BatchTraceabilityRecord {
  batchId: string;
  qrPayload: string;
  crop: string;
  variety: string;
  quantityTonnes: number;
  grade: CropGrade;
  farmerOrFpo: string;
  harvestDate: string;
  storageFacilityUsed: string;
  transportVehicleNumber: string;
  buyerDestination: string;
  currentStatus: 'Farm Gate' | 'Collection Hub' | 'Cold Storage' | 'In Transit' | 'Delivered' | 'Settlement Complete';
  events: TraceabilityEvent[];
}

export interface RiskAlert {
  id: string;
  type: 'Weather' | 'Pest' | 'Disease' | 'Market Price' | 'Logistics Bottleneck';
  severity: 'Low' | 'Medium' | 'High';
  title: string;
  affectedRegion: string;
  affectedCrops: string[];
  explanation: string;
  actionRequired: string;
  reportedDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'demand' | 'harvest' | 'storage' | 'quality' | 'risk';
}
