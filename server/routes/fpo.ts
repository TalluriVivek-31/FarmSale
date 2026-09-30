import { Router, Request, Response } from 'express';
import { db, FPOAggregationBatch } from '../db/database';

export const fpoRouter = Router();

// Get aggregation batches
fpoRouter.get('/batches', (_req: Request, res: Response) => {
  const rawDb = db.getRaw();
  return res.json({ batches: rawDb.fpoBatches });
});

// Create new aggregation batch for a buyer demand
fpoRouter.post('/batches', (req: Request, res: Response) => {
  const { fpoId, fpoName, buyerDemandId, buyerName, crop, targetTonnes, collectionCenter } = req.body;

  if (!crop || !targetTonnes) {
    return res.status(400).json({ error: 'Crop and target tonnage are required.' });
  }

  const rawDb = db.getRaw();
  const newBatch: FPOAggregationBatch = {
    id: `batch-${Date.now()}`,
    fpoId: fpoId || 'user-fpo-001',
    fpoName: fpoName || 'Sahyadri Agri Farmers Cooperative',
    buyerDemandId: buyerDemandId || 'dem-custom',
    buyerName: buyerName || 'Direct Institutional Order',
    crop,
    targetTonnes: Number(targetTonnes),
    collectedTonnes: 0,
    collectionCenter: collectionCenter || 'Central FPO Aggregation Yard',
    status: 'Forming',
    memberContributions: []
  };

  rawDb.fpoBatches.push(newBatch);
  db.save();

  return res.status(201).json({ batch: newBatch });
});

// Pledge member harvest to an aggregation batch
fpoRouter.post('/batches/:batchId/pledge', (req: Request, res: Response) => {
  const { batchId } = req.params;
  const { farmerName, village, pledgedTonnes, harvestWindow, qualityEstimated } = req.body;

  const rawDb = db.getRaw();
  const batch = rawDb.fpoBatches.find((b) => b.id === batchId);
  if (!batch) {
    return res.status(404).json({ error: 'Aggregation batch not found.' });
  }

  const tonnes = Number(pledgedTonnes) || 10;
  batch.memberContributions.push({
    farmerId: `farmer-${Date.now()}`,
    farmerName: farmerName || 'Cooperative Member Farmer',
    village: village || 'Local Cluster',
    pledgedTonnes: tonnes,
    harvestWindow: harvestWindow || 'Upcoming Month',
    qualityEstimated: qualityEstimated || 'Grade A',
    status: 'Pledged'
  });

  batch.collectedTonnes = Math.min(batch.targetTonnes, batch.collectedTonnes + tonnes);
  if (batch.collectedTonnes >= batch.targetTonnes) {
    batch.status = 'Target Reached';
  }

  db.save();
  return res.json({ message: 'Member contribution recorded.', batch });
});
