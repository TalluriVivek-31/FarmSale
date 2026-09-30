import { Router, Request, Response } from 'express';
import { db, StorageFacility, LogisticsOption } from '../db/database';

export const marketRouter = Router();

// Get storage facilities
marketRouter.get('/storage', (_req: Request, res: Response) => {
  const rawDb = db.getRaw();
  return res.json({ facilities: rawDb.storageFacilities });
});

// Book storage space
marketRouter.post('/storage/book', (req: Request, res: Response) => {
  const { facilityId, tonnes } = req.body;
  const rawDb = db.getRaw();
  const facility = rawDb.storageFacilities.find((f) => f.id === facilityId);

  if (!facility) {
    return res.status(404).json({ error: 'Storage facility not found.' });
  }

  const requestedTonnes = Number(tonnes) || 10;
  if (facility.availableCapacityTonnes < requestedTonnes) {
    return res.status(400).json({ error: 'Insufficient available capacity in this facility.' });
  }

  facility.availableCapacityTonnes -= requestedTonnes;
  db.save();

  return res.json({
    message: `Successfully reserved ${requestedTonnes} tonnes space in ${facility.name}.`,
    facility
  });
});

// Get logistics fleet
marketRouter.get('/logistics', (_req: Request, res: Response) => {
  const rawDb = db.getRaw();
  return res.json({ fleet: rawDb.logistics });
});

// Book logistics dispatch
marketRouter.post('/logistics/book', (req: Request, res: Response) => {
  const { vehicleId, pickupLocation, destination, cargoTonnes } = req.body;
  const rawDb = db.getRaw();
  const vehicle = rawDb.logistics.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: 'Logistics vehicle not found.' });
  }

  return res.json({
    message: `Dispatch booked with ${vehicle.providerName} (${vehicle.vehicleType}) for ${cargoTonnes || 10} tonnes from ${pickupLocation || 'Farm Gate'} to ${destination || 'Processing Terminal'}.`,
    bookingId: `DISPATCH-${Date.now().toString().slice(-6)}`
  });
});

// Get traceability record
marketRouter.get('/traceability/:batchId', (req: Request, res: Response) => {
  const { batchId } = req.params;
  const rawDb = db.getRaw();
  const batch = rawDb.traceabilityBatches.find((b) => b.batchId.toLowerCase() === batchId.toLowerCase()) || rawDb.traceabilityBatches[0];

  return res.json({ batch });
});

// Admin metrics (only real data in database)
marketRouter.get('/admin/overview', (_req: Request, res: Response) => {
  const rawDb = db.getRaw();

  const totalDemandsTonnes = rawDb.demands.reduce((sum, d) => sum + (d.quantityTonnes || 0), 0);
  const totalSupplyPlansTonnes = rawDb.cropPlans.reduce((sum, p) => sum + (p.expectedYieldTonnes || 0), 0);
  const totalStorageCapacity = rawDb.storageFacilities.reduce((sum, s) => sum + s.totalCapacityTonnes, 0);
  const availableStorageCapacity = rawDb.storageFacilities.reduce((sum, s) => sum + s.availableCapacityTonnes, 0);

  return res.json({
    counts: {
      registeredFarmers: rawDb.users.filter((u) => u.role === 'farmer').length,
      registeredBuyers: rawDb.users.filter((u) => u.role === 'buyer').length,
      registeredFpos: rawDb.users.filter((u) => u.role === 'fpo').length,
      activeDemandsCount: rawDb.demands.filter((d) => d.contractStatus === 'Open').length,
      activeCropPlansCount: rawDb.cropPlans.length,
      aggregationBatchesCount: rawDb.fpoBatches.length
    },
    aggregates: {
      totalDemandsTonnes,
      totalSupplyPlansTonnes,
      storageOccupancyPercent: totalStorageCapacity > 0 ? Math.round(((totalStorageCapacity - availableStorageCapacity) / totalStorageCapacity) * 100) : 0,
      totalStorageCapacityTonnes: totalStorageCapacity,
      availableStorageTonnes: availableStorageCapacity
    },
    recentDemands: rawDb.demands.slice(0, 5),
    recentPlans: rawDb.cropPlans.slice(0, 5),
    lastUpdated: new Date().toISOString()
  });
});
