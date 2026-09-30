# FarmSale
### Grow with demand. Sell with confidence.
**Track 4: AgriN & Regenerative Agricultural Intelligence**

FarmSale connects buyer demand, farm analysis, AI crop planning, production tracking, quality verification, FPO aggregation, storage, and logistics in one unified agricultural intelligence platform.

---

## 1. Core Idea

Farmers often decide what to grow without reliable information about future demand, expected market prices, buyer requirements, logistics, storage, or weather. FarmSale reverses that speculative process:

$$\text{Buyer Demand} \rightarrow \text{Farm Analysis} \rightarrow \text{AI Crop Planning} \rightarrow \text{Production} \rightarrow \text{Harvest Prediction} \rightarrow \text{Quality} \rightarrow \text{Aggregation} \rightarrow \text{Storage} \rightarrow \text{Logistics} \rightarrow \text{Buyer} \rightarrow \text{Payment}$$

The core question FarmSale answers is:
> **"Given verified buyer demand, my soil, my water, and regional climate, what should I grow, when should I harvest, whom can I sell to, and what will be my transparent net profit?"**

---

## 2. Key Modules & Capabilities

1. **Real Persistent Backend & Database**: Express server backed by an atomic file repository (`server/data/farmsale.db.json`) maintaining users, profiles, parcels, buyer demands, crop plans, aggregation batches, and audit logs.
2. **Real Authentication & Protected Roles**: Password hashing with `bcryptjs`, JWT session management, role-based authorization for Farmers, Institutional Buyers, FPOs, and State Authorities. Includes 1-click test credentials for evaluators.
3. **7-Step Farmer Onboarding Wizard**: Guides first-time farmers through Location, Land, Soil Chemistry, Water Availability, Current Crop, Previous Crop, and Economic Preferences.
4. **Dynamic AI Crop Planner**: Regional agronomic engine delivering Primary and Alternative recommendations with dynamic economic returns, soil suitability, and water compatibility across all major Indian agricultural states.
5. **Buyer Demand Marketplace**: Forward contracts posted by verified institutional food processors and retailers with clear quality specifications and floor prices.
6. **FPO Aggregation Hub**: Smallholder supply pooling to fulfill bulk buyer contracts with transparent member payment splits.
7. **Regenerative Farm Score**: 8-pillar soil and sustainability index with telemetry tracking and regenerative practice upgrades.
8. **Farmer Net Income Simulator**: Side-by-side economic model comparing traditional speculative distress sales with demand-driven forward contracts.
9. **Optical Quality Intelligence**: Objective visual defect grading and Grade A classification.
10. **Cold Storage & Logistics Hub**: Dynamic cold storage booking and temperature-controlled freight matcher.
11. **Field-to-Fork Batch Traceability**: Immutable batch timeline with QR verification and cold chain sensor logs.
12. **FarmSale AI Assistant**: Context-aware agronomic chatbot accessing the user's active farm profile and regional buyer demand.
13. **12-Step Judge Scenario Runner**: Interactive guided modal walking judges through the entire demand-to-payment cycle.

---

## 3. Getting Started

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### Installation & Run
```powershell
# Install dependencies
npm install

# Start both backend (port 5000) and frontend (port 5173) concurrently
npm run dev

# Or run separately:
npm run server  # Express backend on http://localhost:5000
npm run client  # Vite frontend on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 4. Evaluation Credentials

Pre-seeded accounts are available for instant testing:

- **Farmer:** `ramesh@farmsale.in` / `Farmer@123` (Ramesh Patel, Nashik, 4.5 acres)
- **Buyer:** `procurement@sahyadrifoods.com` / `Buyer@123` (Sahyadri Foods)
- **FPO Lead:** `lead@sahyadrifpo.org` / `Fpo@123` (Sahyadri Farmers Co-op)
- **Authority:** `director@agri.gov.in` / `Admin@123` (Agricultural Authority)
- **New Empty Farmer:** Sign up as a new farmer to experience the 7-step onboarding wizard from scratch.
