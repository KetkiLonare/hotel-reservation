export type RoomStatus = 'available' | 'occupied' | 'selected' | 'booked' | 'newly-booked';

export interface Room {
  id: number;
  floor: number;
  position: number;
  status: RoomStatus;
}

export interface Booking {
  id: number;
  room_ids: number[];
  travel_time: number;
  booked_at: string;
}
