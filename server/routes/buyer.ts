import { Router, Request, Response } from 'express';
import { db, BuyerDemand } from '../db/database';

export const buyerRouter = Router();

// Get all demands (or filtered)
buyerRouter.get('/demands', (req: Request, res: Response) => {
  const { crop, state, district, buyerId } = req.query;
  const rawDb = db.getRaw();

  let results = [...rawDb.demands];

  if (crop && typeof crop === 'string' && crop !== 'All') {
    results = results.filter((d) => d.crop.toLowerCase().includes(crop.toLowerCase()));
  }
  if (state && typeof state === 'string' && state !== 'All') {
    results = results.filter((d) => d.state.toLowerCase() === state.toLowerCase());
  }
  if (district && typeof district === 'string' && district !== 'All') {
    results = results.filter((d) => d.district.toLowerCase() === district.toLowerCase());
  }
  if (buyerId && typeof buyerId === 'string') {
    results = results.filter((d) => d.buyerId === buyerId);
  }

  return res.json({ demands: results });
});

// Post a new buyer forward demand
buyerRouter.post('/demands', (req: Request, res: Response) => {
  const {
    buyerId,
    buyerName,
    buyerType,
    crop,
    variety,
    quantityTonnes,
    grade,
    qualityRequirements,
    minPricePerQuintal,
    maxPricePerQuintal,
    targetDeliveryDate,
    deliveryLocation,
    district,
    state,
    requiredCertifications
  } = req.body;

  if (!crop || !quantityTonnes || !maxPricePerQuintal || !targetDeliveryDate) {
    return res.status(400).json({ error: 'Crop, quantity, maximum price, and target delivery date are required.' });
  }

  const rawDb = db.getRaw();
  const newDemand: BuyerDemand = {
    id: `dem-${Date.now()}`,
    buyerId: buyerId || 'user-buyer-001',
    buyerName: buyerName || 'Verified Institutional Buyer',
    buyerType: buyerType || 'Food Processor',
    crop,
    variety: variety || 'Standard Commercial Variety',
    quantityTonnes: Number(quantityTonnes),
    grade: grade || 'Grade A',
    qualityRequirements: Array.isArray(qualityRequirements) ? qualityRequirements : [qualityRequirements || 'Grade A Quality'],
    minPricePerQuintal: Number(minPricePerQuintal) || Number(maxPricePerQuintal) * 0.9,
    maxPricePerQuintal: Number(maxPricePerQuintal),
    targetDeliveryDate,
    deliveryLocation: deliveryLocation || `${district || 'Central'}, ${state || 'India'}`,
    district: district || 'Nashik',
    state: state || 'Maharashtra',
    contractStatus: 'Open',
    requiredCertifications: Array.isArray(requiredCertifications) ? requiredCertifications : [],
    createdAt: new Date().toISOString().split('T')[0]
  };

  rawDb.demands.unshift(newDemand);
  db.save();

  return res.status(201).json({
    message: 'Forward buyer procurement contract published.',
    demand: newDemand
  });
});

// Close or update demand status
buyerRouter.put('/demands/:demandId/status', (req: Request, res: Response) => {
  const { demandId } = req.params;
  const { status } = req.body;

  const rawDb = db.getRaw();
  const demand = rawDb.demands.find((d) => d.id === demandId);
  if (!demand) {
    return res.status(404).json({ error: 'Demand not found.' });
  }

  demand.contractStatus = status;
  db.save();

  return res.json({ message: 'Demand status updated.', demand });
});

// Calculate matching farmers and FPOs for a demand
buyerRouter.get('/matches/:demandId', (req: Request, res: Response) => {
  const { demandId } = req.params;
  const rawDb = db.getRaw();

  const demand = rawDb.demands.find((d) => d.id === demandId);
  if (!demand) {
    return res.status(404).json({ error: 'Demand not found.' });
  }

  // Find matching crop plans
  const matchedPlans = rawDb.cropPlans.filter(
    (p) => p.crop.toLowerCase().includes(demand.crop.toLowerCase()) || demand.crop.toLowerCase().includes(p.crop.toLowerCase())
  );

  // Find matching FPO batches
  const matchedBatches = rawDb.fpoBatches.filter((b) => b.buyerDemandId === demand.id);

  return res.json({
    demand,
    matchedCropPlansCount: matchedPlans.length,
    matchedPlans,
    matchedBatches
  });
});
