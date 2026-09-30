import { Router, Request, Response } from 'express';
import { db, LandParcel, CropPlan } from '../db/database';

export const farmerRouter = Router();

// First-time onboarding submission
farmerRouter.post('/onboarding', (req: Request, res: Response) => {
  const {
    userId,
    state,
    district,
    village,
    totalAcres,
    irrigatedAcres,
    soilType,
    irrigationType,
    currentCrop,
    previousCrop,
    ph,
    nitrogenKg,
    phosphorusKg,
    potassiumKg,
    moisturePercent,
    organicCarbonPercent
  } = req.body;

  if (!userId || !state || !district || !totalAcres) {
    return res.status(400).json({ error: 'User ID, state, district, and land acreage are required.' });
  }

  const rawDb = db.getRaw();
  const profileIndex = rawDb.farmerProfiles.findIndex((p) => p.userId === userId);

  const profileData = {
    userId,
    state,
    district,
    village: village || '',
    totalAcres: Number(totalAcres),
    irrigatedAcres: Number(irrigatedAcres) || Number(totalAcres),
    preferredLanguage: 'English',
    onboardingCompleted: true
  };

  if (profileIndex >= 0) {
    rawDb.farmerProfiles[profileIndex] = profileData;
  } else {
    rawDb.farmerProfiles.push(profileData);
  }

  // Create primary farm parcel
  const parcelId = `parcel-${Date.now()}`;
  const newParcel: LandParcel = {
    id: parcelId,
    farmerId: userId,
    name: 'Primary Plot (Plot 1)',
    sizeAcres: Number(totalAcres),
    soilType: soilType || 'Local Agro-Soil',
    ph: ph ? Number(ph) : undefined,
    nitrogenKgPerHa: nitrogenKg ? Number(nitrogenKg) : undefined,
    phosphorusKgPerHa: phosphorusKg ? Number(phosphorusKg) : undefined,
    potassiumKgPerHa: potassiumKg ? Number(potassiumKg) : undefined,
    moisturePercent: moisturePercent ? Number(moisturePercent) : undefined,
    organicCarbonPercent: organicCarbonPercent ? Number(organicCarbonPercent) : undefined,
    irrigationType: irrigationType || 'Standard',
    currentCrop: currentCrop || 'Fallow',
    previousCrop: previousCrop || 'None'
  };

  rawDb.parcels.push(newParcel);
  db.save();

  return res.json({
    message: 'Farm profile and primary plot registered successfully.',
    profile: profileData,
    parcel: newParcel
  });
});

// Get farmer parcels
farmerRouter.get('/parcels/:farmerId', (req: Request, res: Response) => {
  const { farmerId } = req.params;
  const rawDb = db.getRaw();
  const parcels = rawDb.parcels.filter((p) => p.farmerId === farmerId);
  return res.json({ parcels });
});

// Add new parcel
farmerRouter.post('/parcels', (req: Request, res: Response) => {
  const { farmerId, name, sizeAcres, soilType, irrigationType, currentCrop, previousCrop } = req.body;
  if (!farmerId || !sizeAcres) {
    return res.status(400).json({ error: 'Farmer ID and parcel size are required.' });
  }

  const rawDb = db.getRaw();
  const newParcel: LandParcel = {
    id: `parcel-${Date.now()}`,
    farmerId,
    name: name || `Plot ${rawDb.parcels.filter((p) => p.farmerId === farmerId).length + 1}`,
    sizeAcres: Number(sizeAcres),
    soilType: soilType || 'Standard Loam',
    irrigationType: irrigationType || 'Rainfed',
    currentCrop: currentCrop || 'Fallow',
    previousCrop: previousCrop || 'None'
  };

  rawDb.parcels.push(newParcel);
  db.save();

  return res.status(201).json({ parcel: newParcel });
});

// Get farmer crop plans
farmerRouter.get('/plans/:farmerId', (req: Request, res: Response) => {
  const { farmerId } = req.params;
  const rawDb = db.getRaw();
  const plans = rawDb.cropPlans.filter((p) => p.farmerId === farmerId);
  return res.json({ plans });
});

// Commit / save a crop plan
farmerRouter.post('/plans', (req: Request, res: Response) => {
  const planData: Omit<CropPlan, 'id'> = req.body;
  if (!planData.farmerId || !planData.crop || !planData.areaAcres) {
    return res.status(400).json({ error: 'Farmer ID, crop, and area are required.' });
  }

  const rawDb = db.getRaw();
  const newPlan: CropPlan = {
    ...planData,
    id: `plan-${Date.now()}`
  };

  rawDb.cropPlans.push(newPlan);
  db.save();

  return res.status(201).json({ plan: newPlan });
});
