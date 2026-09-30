import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_DIR = path.join(process.cwd(), 'server', 'data');
const DB_PATH = path.join(DB_DIR, 'farmsale.db.json');

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'farmer' | 'buyer' | 'fpo' | 'admin';
  name: string;
  phone?: string;
  createdAt: string;
}

export interface FarmerProfile {
  userId: string;
  state: string;
  district: string;
  village?: string;
  totalAcres: number;
  irrigatedAcres: number;
  preferredLanguage: string;
  onboardingCompleted: boolean;
}

export interface BuyerProfile {
  userId: string;
  organizationName: string;
  contactPerson: string;
  businessType: string;
  location: string;
  district: string;
  state: string;
}

export interface FPOProfile {
  userId: string;
  fpoName: string;
  registrationNumber: string;
  contactPerson: string;
  memberCount: number;
  district: string;
  state: string;
}

export interface LandParcel {
  id: string;
  farmerId: string;
  name: string;
  sizeAcres: number;
  soilType: string;
  ph?: number;
  nitrogenKgPerHa?: number;
  phosphorusKgPerHa?: number;
  potassiumKgPerHa?: number;
  moisturePercent?: number;
  organicCarbonPercent?: number;
  irrigationType: string;
  currentCrop?: string;
  previousCrop: string;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  crop: string;
  variety?: string;
  quantityTonnes: number;
  grade: string;
  qualityRequirements: string[];
  minPricePerQuintal: number;
  maxPricePerQuintal: number;
  targetDeliveryDate: string;
  deliveryLocation: string;
  district: string;
  state: string;
  contractStatus: 'Open' | 'Partially Matched' | 'Fulfilled' | 'Closed';
  requiredCertifications: string[];
  createdAt: string;
}

export interface CropPlan {
  id: string;
  farmerId: string;
  parcelId: string;
  crop: string;
  variety: string;
  areaAcres: number;
  expectedYieldTonnes: number;
  plantingDate: string;
  expectedHarvestDate: string;
  daysToHarvest: number;
  growthStage: string;
  confidencePercent: number;
  estimatedRevenue: number;
  estimatedNetReturn: number;
  matchedDemandId?: string;
  matchedBuyerName?: string;
  contractPricePerQuintal?: number;
  status: string;
}

export interface FPOAggregationBatch {
  id: string;
  fpoId: string;
  fpoName: string;
  buyerDemandId: string;
  buyerName: string;
  crop: string;
  targetTonnes: number;
  collectedTonnes: number;
  collectionCenter: string;
  status: string;
  memberContributions: {
    farmerId: string;
    farmerName: string;
    village: string;
    pledgedTonnes: number;
    harvestWindow: string;
    qualityEstimated: string;
    status: string;
  }[];
}

export interface StorageFacility {
  id: string;
  name: string;
  facilityType: string;
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
}

export interface LogisticsOption {
  id: string;
  providerName: string;
  vehicleType: string;
  temperatureControl: boolean;
  currentLocation: string;
  capacityTonnes: number;
  ratePerKmInr: number;
  estimatedTransitTimeHours: number;
  availableDate: string;
  rating: number;
}

export interface TraceabilityBatch {
  batchId: string;
  crop: string;
  variety: string;
  quantityTonnes: number;
  grade: string;
  farmerOrFpo: string;
  harvestDate: string;
  storageFacilityUsed: string;
  transportVehicleNumber: string;
  buyerDestination: string;
  currentStatus: string;
  events: {
    stepName: string;
    timestamp: string;
    location: string;
    actor: string;
    role: string;
    details: string;
    verificationBadge: string;
  }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: string;
  read: boolean;
  timestamp: string;
}

export interface DatabaseSchema {
  users: User[];
  farmerProfiles: FarmerProfile[];
  buyerProfiles: BuyerProfile[];
  fpoProfiles: FPOProfile[];
  parcels: LandParcel[];
  demands: BuyerDemand[];
  cropPlans: CropPlan[];
  fpoBatches: FPOAggregationBatch[];
  storageFacilities: StorageFacility[];
  logistics: LogisticsOption[];
  traceabilityBatches: TraceabilityBatch[];
  notifications: Notification[];
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('Error reading database file, initializing clean database', err);
      }
    }

    const initial = this.getInitialSchema();
    this.saveDirect(initial);
    return initial;
  }

  private saveDirect(data: DatabaseSchema): void {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tmpPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, DB_PATH);
  }

  public save(): void {
    this.saveDirect(this.data);
  }

  public getRaw(): DatabaseSchema {
    return this.data;
  }

  public reload(): DatabaseSchema {
    this.data = this.load();
    return this.data;
  }

  public resetToFresh(): DatabaseSchema {
    this.data = this.getInitialSchema();
    this.saveDirect(this.data);
    return this.data;
  }

  private getInitialSchema(): DatabaseSchema {
    // Seed controlled test accounts and baseline infrastructure for evaluation
    const passwordHash = bcrypt.hashSync('FarmSale@2026', 10);

    return {
      users: [
        {
          id: 'user-farmer-001',
          email: 'farmer.ramesh@farmsale.in',
          passwordHash,
          role: 'farmer',
          name: 'Ramesh Patel',
          phone: '+91 98220 41209',
          createdAt: '2026-09-01T10:00:00Z'
        },
        {
          id: 'user-buyer-001',
          email: 'buyer.procurement@sahyadrifoods.com',
          passwordHash,
          role: 'buyer',
          name: 'Sahyadri Foods Procurement',
          phone: '+91 253 289400',
          createdAt: '2026-09-01T10:00:00Z'
        },
        {
          id: 'user-fpo-001',
          email: 'contact@sahyadrifpo.org',
          passwordHash,
          role: 'fpo',
          name: 'Sahyadri Agri Farmers Cooperative',
          phone: '+91 255 241100',
          createdAt: '2026-09-01T10:00:00Z'
        },
        {
          id: 'user-admin-001',
          email: 'admin.cell@farmsale.gov.in',
          passwordHash,
          role: 'admin',
          name: 'State Agricultural Intelligence Cell',
          phone: '+91 22 22020101',
          createdAt: '2026-09-01T10:00:00Z'
        }
      ],
      farmerProfiles: [
        {
          userId: 'user-farmer-001',
          state: 'Maharashtra',
          district: 'Nashik',
          village: 'Pimpalgaon Baswant',
          totalAcres: 4.5,
          irrigatedAcres: 4.0,
          preferredLanguage: 'English',
          onboardingCompleted: true
        }
      ],
      buyerProfiles: [
        {
          userId: 'user-buyer-001',
          organizationName: 'Sahyadri Foods Processing Pvt Ltd',
          contactPerson: 'Arun Deshmukh',
          businessType: 'Food Processor',
          location: 'Dindori Processing Hub',
          district: 'Nashik',
          state: 'Maharashtra'
        }
      ],
      fpoProfiles: [
        {
          userId: 'user-fpo-001',
          fpoName: 'Sahyadri Agri Farmers Cooperative',
          registrationNumber: 'NSK-COOP-44-2021',
          contactPerson: 'Kailas Shinde',
          memberCount: 420,
          district: 'Nashik',
          state: 'Maharashtra'
        }
      ],
      parcels: [
        {
          id: 'parcel-nsk-01',
          farmerId: 'user-farmer-001',
          name: 'North Plot (Drip Irrigated)',
          sizeAcres: 2.5,
          soilType: 'Medium Deep Black Clay Loam',
          ph: 6.8,
          nitrogenKgPerHa: 210,
          phosphorusKgPerHa: 22,
          potassiumKgPerHa: 290,
          moisturePercent: 44,
          organicCarbonPercent: 0.72,
          irrigationType: 'Drip',
          currentCrop: 'Hybrid Processing Tomato',
          previousCrop: 'Soybean'
        },
        {
          id: 'parcel-nsk-02',
          farmerId: 'user-farmer-001',
          name: 'South Plot (Borewell)',
          sizeAcres: 2.0,
          soilType: 'Red Gravelly Loam',
          ph: 7.2,
          nitrogenKgPerHa: 185,
          phosphorusKgPerHa: 19,
          potassiumKgPerHa: 240,
          moisturePercent: 38,
          organicCarbonPercent: 0.58,
          irrigationType: 'Borewell',
          currentCrop: 'Red Onion',
          previousCrop: 'Wheat'
        }
      ],
      demands: [
        {
          id: 'dem-2026-001',
          buyerId: 'user-buyer-001',
          buyerName: 'Sahyadri Foods Processing Pvt Ltd',
          buyerType: 'Food Processor',
          crop: 'Tomato',
          variety: 'Hybrid Processing (Firm skin, TSS > 4.8 Brix)',
          quantityTonnes: 500,
          grade: 'Grade A',
          qualityRequirements: [
            'Firmness > 3.5 kg/cm2',
            'Brix > 4.8%',
            'No fruit borer punctures',
            'Uniform deep red'
          ],
          minPricePerQuintal: 2800,
          maxPricePerQuintal: 3200,
          targetDeliveryDate: '2026-11-15',
          deliveryLocation: 'Dindori Processing Hub, Nashik',
          district: 'Nashik',
          state: 'Maharashtra',
          contractStatus: 'Open',
          requiredCertifications: ['Residue-free test certificate', 'FPO Traceability tag'],
          createdAt: '2026-09-20'
        },
        {
          id: 'dem-2026-002',
          buyerId: 'user-buyer-002',
          buyerName: 'AgroFresh Organics & Retail Ltd',
          buyerType: 'Retail Supermarket Chain',
          crop: 'Guntur Sannam Chilli',
          variety: 'S17 High Pungency',
          quantityTonnes: 150,
          grade: 'Export Quality',
          qualityRequirements: [
            'SHU > 35,000',
            'Moisture < 10%',
            'Aflatoxin < 5 ppb',
            'Natural bright red'
          ],
          minPricePerQuintal: 18500,
          maxPricePerQuintal: 21000,
          targetDeliveryDate: '2026-11-28',
          deliveryLocation: 'APMC Logistics Terminal, Guntur',
          district: 'Guntur',
          state: 'Andhra Pradesh',
          contractStatus: 'Open',
          requiredCertifications: ['Spices Board Quality Seal'],
          createdAt: '2026-09-22'
        },
        {
          id: 'dem-2026-003',
          buyerId: 'user-buyer-003',
          buyerName: 'ITC Agri Business Division',
          buyerType: 'Food Processor',
          crop: 'Sharbati Wheat',
          variety: 'C-306 Golden Lustre',
          quantityTonnes: 1200,
          grade: 'Grade A',
          qualityRequirements: ['Protein > 12.5%', 'Moisture < 11%', 'Zero admixture'],
          minPricePerQuintal: 3400,
          maxPricePerQuintal: 3750,
          targetDeliveryDate: '2026-12-10',
          deliveryLocation: 'Malwa Grain Silos, Sehore',
          district: 'Sehore',
          state: 'Madhya Pradesh',
          contractStatus: 'Open',
          requiredCertifications: ['FSSAI Food Grade'],
          createdAt: '2026-09-25'
        }
      ],
      cropPlans: [
        {
          id: 'plan-001',
          farmerId: 'user-farmer-001',
          parcelId: 'parcel-nsk-01',
          crop: 'Hybrid Processing Tomato',
          variety: 'Abhinav / US-440',
          areaAcres: 2.0,
          expectedYieldTonnes: 15.5,
          plantingDate: '2026-08-25',
          expectedHarvestDate: '2026-11-12',
          daysToHarvest: 22,
          growthStage: 'Flowering & Fruiting',
          confidencePercent: 92,
          estimatedRevenue: 480500,
          estimatedNetReturn: 298000,
          matchedDemandId: 'dem-2026-001',
          matchedBuyerName: 'Sahyadri Foods Processing Pvt Ltd',
          contractPricePerQuintal: 3100,
          status: 'Active'
        }
      ],
      fpoBatches: [
        {
          id: 'batch-fpo-500',
          fpoId: 'user-fpo-001',
          fpoName: 'Sahyadri Agri Farmers Cooperative',
          buyerDemandId: 'dem-2026-001',
          buyerName: 'Sahyadri Foods Processing Pvt Ltd',
          crop: 'Processing Tomato (Grade A)',
          targetTonnes: 500,
          collectedTonnes: 500,
          collectionCenter: 'Pimpalgaon APMC Central Aggregation Hub',
          status: 'Quality Verified',
          memberContributions: [
            {
              farmerId: 'f-1',
              farmerName: 'Ramesh Patel',
              village: 'Pimpalgaon',
              pledgedTonnes: 80,
              harvestWindow: 'Nov 02 to Nov 06',
              qualityEstimated: 'Grade A',
              status: 'Collected'
            },
            {
              farmerId: 'f-2',
              farmerName: 'Balasaheb Shinde',
              village: 'Niphad',
              pledgedTonnes: 60,
              harvestWindow: 'Nov 04 to Nov 07',
              qualityEstimated: 'Grade A',
              status: 'Collected'
            },
            {
              farmerId: 'f-3',
              farmerName: 'Vishnu Khairnar',
              village: 'Dindori',
              pledgedTonnes: 90,
              harvestWindow: 'Nov 05 to Nov 09',
              qualityEstimated: 'Grade A',
              status: 'Collected'
            },
            {
              farmerId: 'f-4',
              farmerName: 'Anand Deshmukh',
              village: 'Chandwad',
              pledgedTonnes: 120,
              harvestWindow: 'Nov 06 to Nov 10',
              qualityEstimated: 'Grade A',
              status: 'Collected'
            },
            {
              farmerId: 'f-5',
              farmerName: 'Sunita Jadhav',
              village: 'Yeola',
              pledgedTonnes: 150,
              harvestWindow: 'Nov 07 to Nov 12',
              qualityEstimated: 'Grade A',
              status: 'Collected'
            }
          ]
        }
      ],
      storageFacilities: [
        {
          id: 'store-01',
          name: 'Nashik Agro-Logistics Cold Chain Hub',
          facilityType: 'Solar Cold Storage',
          location: 'Pimpalgaon MIDC Road, Nashik',
          district: 'Nashik',
          state: 'Maharashtra',
          distanceKm: 9.4,
          totalCapacityTonnes: 1500,
          availableCapacityTonnes: 320,
          temperatureRange: '2°C to 12°C',
          monthlyRatePerQuintalInr: 70,
          cropSuitability: ['Tomato', 'Grapes', 'Pomegranate', 'Green Chilli'],
          humidityControlled: true
        },
        {
          id: 'store-02',
          name: 'Lasalgaon Central Multi-Commodity Warehouse',
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
          humidityControlled: false
        }
      ],
      logistics: [
        {
          id: 'log-01',
          providerName: 'Kisan Express Reefer Logistics',
          vehicleType: '14-Tonne Refrigerated Reefer',
          temperatureControl: true,
          currentLocation: 'Nashik City Hub (12 km away)',
          capacityTonnes: 14,
          ratePerKmInr: 34,
          estimatedTransitTimeHours: 1.5,
          availableDate: 'Immediate',
          rating: 4.8
        },
        {
          id: 'log-02',
          providerName: 'Bharat Rural Agri Fleet',
          vehicleType: '8-Tonne Covered Agri-Truck',
          temperatureControl: false,
          currentLocation: 'Pimpalgaon Market (4 km away)',
          capacityTonnes: 8,
          ratePerKmInr: 22,
          estimatedTransitTimeHours: 1.8,
          availableDate: 'Within 4 Hours',
          rating: 4.6
        }
      ],
      traceabilityBatches: [
        {
          batchId: 'FS-NSK-2026-B881',
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
              stepName: 'Farm Harvest & Optical Inspection',
              timestamp: '2026-10-18 07:45 IST',
              location: 'North Plot, Pimpalgaon Baswant',
              actor: 'Ramesh Patel',
              role: 'Cultivator',
              details: 'Harvested 18.5 tonnes. Optical field scan recorded 94% Grade A fruit firmness and TSS 4.9 Brix.',
              verificationBadge: 'Field Verified'
            },
            {
              stepName: 'FPO Collection Hub Check-In',
              timestamp: '2026-10-18 10:15 IST',
              location: 'Pimpalgaon APMC Central Aggregation Hub',
              actor: 'K. Deshmukh',
              role: 'FPO Quality Officer',
              details: 'Batch weighed and digital manifest generated. Integrated into 500T Master Processing Order.',
              verificationBadge: 'FPO Seal Confirmed'
            },
            {
              stepName: 'Pre-Cooling & Cold Chain Staging',
              timestamp: '2026-10-18 12:30 IST',
              location: 'Nashik Agro-Logistics Hub Bay 4',
              actor: 'Cold Store Operator',
              role: 'Storage Provider',
              details: 'Pulp temperature lowered from 26°C to 8°C under controlled humidity staging.',
              verificationBadge: 'IoT Telemetry Logged (8.2°C)'
            },
            {
              stepName: 'Dispatch & GPS En-Route',
              timestamp: '2026-10-18 14:00 IST',
              location: 'Highway NH-848 en route to Dindori',
              actor: 'Kisan Express Reefer',
              role: 'Logistics Partner',
              details: 'Dispatched to buyer processing terminal. Estimated arrival in 45 minutes.',
              verificationBadge: 'GPS Live Verified'
            }
          ]
        }
      ],
      notifications: [
        {
          id: 'notif-01',
          userId: 'user-farmer-001',
          title: 'Buyer Demand Match Alert',
          message: 'Sahyadri Foods confirmed purchase demand for 500 tonnes of Processing Tomato.',
          category: 'demand',
          read: false,
          timestamp: '25 mins ago'
        },
        {
          id: 'notif-02',
          userId: 'user-farmer-001',
          title: 'Harvest Window Approaching',
          message: 'North Plot Tomato is 22 days from target harvest window.',
          category: 'harvest',
          read: false,
          timestamp: '2 hours ago'
        }
      ]
    };
  }
}

export const db = new Database();
