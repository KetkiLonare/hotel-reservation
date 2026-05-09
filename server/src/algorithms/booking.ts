import { Room } from '../types/index.js';

export function travelTime(r1: Room, r2: Room): number {
  if (r1.floor === r2.floor) {
    return Math.abs(r1.position - r2.position);
  }
  return (r1.position - 1) + (r2.position - 1) + Math.abs(r1.floor - r2.floor) * 2;
}

export function totalTravelTime(rooms: Room[]): number {
  if (rooms.length < 2) return 0;
  const sorted = [...rooms].sort((a, b) =>
    a.floor !== b.floor ? a.floor - b.floor : a.position - b.position
  );
  let total = 0;
  for (let i = 1; i < sorted.length; i++) {
    total += travelTime(sorted[i - 1], sorted[i]);
  }
  return total;
}

export function findBestRooms(available: Room[], n: number): Room[] | null {
  if (available.length < n) return null;

  let best: Room[] | null = null;
  let bestCost = Infinity;

  // Step 1: same floor — tightest window
  const byFloor = available.reduce<Record<number, Room[]>>((acc, r) => {
    (acc[r.floor] ??= []).push(r);
    return acc;
  }, {});

  for (const floor in byFloor) {
    const fr = byFloor[floor].sort((a, b) => a.position - b.position);
    if (fr.length >= n) {
      for (let i = 0; i <= fr.length - n; i++) {
        const window = fr.slice(i, i + n);
        const cost = window[n - 1].position - window[0].position;
        if (cost < bestCost) { bestCost = cost; best = window; }
      }
    }
  }

  if (best) return best;

  // Step 2: cross-floor sliding window
  const sorted = [...available].sort((a, b) =>
    a.floor !== b.floor ? a.floor - b.floor : a.position - b.position
  );

  for (let i = 0; i <= sorted.length - n; i++) {
    const window = sorted.slice(i, i + n);
    const cost = travelTime(window[0], window[n - 1]);
    if (cost < bestCost) { bestCost = cost; best = window; }
  }

  return best;
}
