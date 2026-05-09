export function getRoomId(floor: number, pos: number): number {
  return floor === 10 ? 1000 + pos : floor * 100 + pos;
}

export function roomsOnFloor(floor: number): number {
  return floor === 10 ? 7 : 10;
}
