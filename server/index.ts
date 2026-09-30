import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { farmerRouter } from './routes/farmer';
import { buyerRouter } from './routes/buyer';
import { fpoRouter } from './routes/fpo';
import { aiPlannerRouter } from './routes/aiPlanner';
import { marketRouter } from './routes/market';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    platform: 'FarmSale',
    tagline: 'Grow with demand. Sell with confidence.',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/farmer', farmerRouter);
app.use('/api/buyer', buyerRouter);
app.use('/api/fpo', fpoRouter);
app.use('/api/ai', aiPlannerRouter);
app.use('/api/market', marketRouter);

app.listen(PORT, () => {
  console.log(`[FarmSale Backend] API server running on http://localhost:${PORT}`);
});
