# Hotel Reservation — Frontend

React + TypeScript + Vite frontend for the Hotel Room Reservation System.

## Tech Stack
- React 18
- TypeScript
- Vite
- Zustand (state management)
- Axios (API calls)

## Folder Structure

```
client/
├── src/
│   ├── algorithms/
│   │   └── booking.ts         # Travel time + total travel time calculation
│   ├── components/
│   │   ├── BookingSummary.tsx  # Shows last booking result
│   │   ├── Controls.tsx        # Auto/manual mode, book/reset/random buttons
│   │   ├── Legend.tsx          # Room status color legend
│   │   ├── RoomCell.tsx        # Single room box UI
│   │   └── RoomGrid.tsx        # Full hotel floor grid
│   ├── data/
│   │   ├── api.ts              # Axios API calls to backend
│   │   └── helpers.ts          # getRoomId(), roomsOnFloor()
│   ├── store/
│   │   └── useHotelStore.ts    # Zustand global state
│   ├── types/
│   │   └── room.ts             # Room, RoomStatus, Booking types
│   ├── App.tsx                 # Root component
│   └── main.tsx               # Entry point
├── .env.example               # Environment variable template
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Local Setup

```bash
# From the client/ directory:
npm install

# Copy env file and set API URL
cp .env.example .env
# Edit .env:
# VITE_API_URL=http://localhost:4000/api

# Start dev server
npm run dev
```

App runs at: http://localhost:5173

> Make sure the backend server is running on port 4000 before starting the frontend.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://your-app.railway.app/api` |

For local development use: `http://localhost:4000/api`
For production use: your Railway backend URL

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Build for production (outputs to dist/) |
| `npm run preview` | Preview production build locally |

## Key Components

### Controls.tsx
Handles two booking modes:
- **Auto mode** — enter number of rooms (1–5), system finds optimal rooms
- **Manual mode** — click rooms on grid, see live travel time, confirm booking

### RoomGrid.tsx
Renders all 10 floors top-to-bottom (floor 10 at top). Each floor shows:
- Floor label on the left
- Lift indicator (left side of building)
- Room cells ordered left to right (closest to lift = position 1)

### RoomCell.tsx
Color-coded room statuses:
| Status | Color |
|--------|-------|
| Available | Light gray |
| Occupied | Red |
| Selected | Blue |
| Just booked | Teal/green |
| Previously booked | Light green |

### useHotelStore.ts (Zustand)
Global state — rooms, booking result, manual selection, mode, errors, loading.
All actions call the backend API and refresh room state from DB.

## Deploy to Vercel

1. Push the full repo to GitHub
2. Import on vercel.com
3. Add env variable: `VITE_API_URL` = your Railway backend URL
4. Deploy (Vite is auto-detected)

Vercel config is in `vercel.json` at the root of the project.
