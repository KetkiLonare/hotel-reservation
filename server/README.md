# Hotel Reservation — Backend

Node.js + Express + TypeScript backend using **in-memory state** (no database required).

## Tech Stack
- Node.js + TypeScript (ES2020 modules)
- Express
- `tsx` for development, `tsc` for production build
- In-memory singleton store (no DB setup needed)

## Why in-memory?
For this assessment the state lives in a `HotelStore` singleton class on the server.
In a production system you'd swap it for MySQL with `SELECT FOR UPDATE` transactions
to handle race conditions — the algorithm and API contract stay identical.

## Folder Structure

```
server/
├── src/
│   ├── algorithms/
│   │   └── booking.ts         # findBestRooms, travelTime, totalTravelTime
│   ├── controllers/
│   │   └── roomController.ts  # All API handlers
│   ├── middleware/
│   │   └── errorHandler.ts    # Global error handler
│   ├── routes/
│   │   └── rooms.ts           # Express Router
│   ├── store/
│   │   └── hotelStore.ts      # In-memory singleton — 97 rooms + booking history
│   ├── types/
│   │   └── index.ts           # Room, Booking, request/response types
│   └── index.ts               # App entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## Local Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev        # tsx watch — no build needed
```

Server: http://localhost:4000

## Environment Variables

| Variable     | Description         | Example                        |
|--------------|---------------------|--------------------------------|
| `PORT`       | Server port         | `4000`                         |
| `CLIENT_URL` | Frontend URL (CORS) | `https://your-app.vercel.app`  |
| `NODE_ENV`   | Environment         | `production`                   |

## Scripts

| Script        | Description                     |
|---------------|---------------------------------|
| `npm run dev` | Start with tsx watch            |
| `npm run build` | Compile TypeScript → dist/    |
| `npm start`   | Run compiled dist/index.js      |

## API Endpoints

| Method | Endpoint                 | Body                      | Description           |
|--------|--------------------------|---------------------------|-----------------------|
| GET    | `/health`                | —                         | Health check          |
| GET    | `/api/rooms`             | —                         | All rooms + status    |
| POST   | `/api/rooms/book`        | `{ count: 1-5 }`          | Auto-book N rooms     |
| POST   | `/api/rooms/book-manual` | `{ roomIds: number[] }`   | Book specific rooms   |
| POST   | `/api/rooms/random`      | —                         | Random occupancy      |
| DELETE | `/api/rooms/reset`       | —                         | Reset all rooms       |
| GET    | `/api/rooms/bookings`    | —                         | Last 20 bookings      |

## Deploy to Railway

1. Push to GitHub
2. New Project → Deploy from GitHub
3. Set env vars: `CLIENT_URL`, `NODE_ENV=production`
4. Build: `cd server && npm install && npm run build`
5. Start: `cd server && npm start`

No database plugin needed.
