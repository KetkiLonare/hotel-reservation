import { Room } from '../types/room';

export function travelTime(r1: Room, r2: Room): number {
  if (r1.floor === r2.floor) return Math.abs(r1.position - r2.position);
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
  