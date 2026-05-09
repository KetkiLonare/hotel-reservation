// Room status type
export type RoomStatus = 'available' | 'occupied' | 'newly-booked' | 'booked';

// Room row from DB
export interface Room {
  id: number;
  floor: number;
  position: number;
  status: RoomStatus;
}

// Booking row from DB
export interface Booking {
  id: number;
  room_ids: number[];
  travel_time: number;
  booked_at: Date;
}

// API request bodies
export interface BookRequestBody {
  count: number;
}

export interface BookManualRequestBody {
  roomIds: number[];
}

// API response shapes
export interface RoomsResponse {
  rooms: Room[];
}

export interface BookingResponse {
  bookedRooms: Room[];
  travelTime: number;
  booking: Booking;
}

export interface BookingsResponse {
  bookings: Booking[];
}

export interface ErrorResponse {
  error: string;
}
