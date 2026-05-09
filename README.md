# Hotel Room Reservation System

Full-stack hotel room booking system built with React, Node.js, Express, and PostgreSQL.

## Live Demo
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-app.railway.app

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite |
| State | Zustand |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Deploy | Vercel (frontend) + Railway (backend + DB) |

## Features
- Auto room booking (same-floor priority, cross-floor fallback)
- Manual room selection with live travel time
- Random occupancy generator
- Full reset
- Booking history stored in PostgreSQL
- Race condition handling via DB transactions (SELECT FOR UPDATE)

## Project Structure
```
hotel-reservation/
├── client/          # React frontend (deploys to Vercel)
│   └── src/
│       ├── algorithms/   # booking algorithm
│       ├── components/   # UI components
│       ├── data/         # API client + helpers
│       ├── store/        # Zustand state
│       └── types/        # TypeScript types
├── server/          # Node.js backend (deploys to Railway)
│   ├── controllers/ # business logic
│   ├── db/          # PostgreSQL pool + migrations
│   ├── middleware/  # error handling
│   └── routes/      # Express routes
├── vercel.json      # Vercel deploy config
└── railway.json     # Railway deploy config
```

## Local Setup

```bash
# 1. Clone
git clone <your-repo-url>
cd hotel-reservation

# 2. Install dependencies
npm run install:all

# 3. Setup server env
cp server/.env.example server/.env
# Edit server/.env with your PostgreSQL connection string

# 4. Run DB migration (creates tables + seeds 97 rooms)
cd server && node db/migrate.js

# 5. Setup client env
cp client/.env.example client/.env
# Edit client/.env — set VITE_API_URL=http://localhost:4000/api for local dev

# 6. Start both servers
cd ..
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:4000

## Deploy to Vercel + Railway

### Backend (Railway)
1. Push to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Select your repo
4. Add PostgreSQL plugin
5. Set env vars: DATABASE_URL (auto-set), CLIENT_URL, NODE_ENV=production
6. Run migration: railway run node server/db/migrate.js
7. Copy your Railway URL

### Frontend (Vercel)
1. Go to vercel.com → Import Git Repository
2. Set Root Directory to: . (root)
3. Add env var: VITE_API_URL = https://your-railway-url/api
4. Deploy

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/rooms | Get all rooms with status |
| POST | /api/rooms/book | Auto book N rooms |
| POST | /api/rooms/book-manual | Book specific rooms |
| POST | /api/rooms/random | Generate random occupancy |
| DELETE | /api/rooms/reset | Reset all rooms |
| GET | /api/rooms/bookings | Booking history |

## Booking Algorithm
1. **Same-floor priority** — finds tightest cluster of N available rooms on one floor
2. **Cross-floor fallback** — sliding window across all rooms sorted by floor+position, minimizes travel time
3. **Travel time formula**:
   - Same floor: `|pos1 - pos2|` minutes
   - Cross-floor: `(pos1-1) + (pos2-1) + |floor1-floor2| × 2` minutes
4. **Race condition handling** — PostgreSQL `SELECT FOR UPDATE` prevents double booking
