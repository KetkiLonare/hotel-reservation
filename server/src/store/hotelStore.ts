import { Room, RoomStatus, Booking } from '../types/index.js';

// Initialize all 97 rooms in memory
function initRooms(): Map<number, Room> {
  const rooms = new Map<number, Room>();
  for (let floor = 1; floor <= 10; floor++) {
    const count = floor === 10 ? 7 : 10;
    for (let pos = 1; pos <= count; pos++) {
      const id = floor === 10 ? 1000 + pos : floor * 100 + pos;
      rooms.set(id, { id, floor, position: pos, status: 'available' });
    }
  }
  return rooms;
}

class HotelStore {
  private rooms: Map<number, Room> = initRooms();
  private bookings: Booking[] = [];
  private bookingCounter = 1;

  // Get all rooms as sorted array
  getAllRooms(): Room[] {
    return Array.from(this.rooms.values()).sort((a, b) =>
      a.floor !== b.floor ? a.floor - b.floor : a.position - b.position
    );
  }

  getAvailableRooms(): Room[] {
    return this.getAllRooms().filter((r) => r.status === 'available');
  }

  updateStatus(ids: number[], status: RoomStatus): void {
    ids.forEach((id) => {
      const room = this.rooms.get(id);
      if (room) this.rooms.set(id, { ...room, status });
    });
  }

  // Demote all newly-booked → booked before a new booking
  demoteNewlyBooked(): void {
    this.rooms.forEach((room, id) => {
      if (room.status === 'newly-booked') {
        this.rooms.set(id, { ...room, status: 'booked' });
      }
    });
  }

  getRoomsByIds(ids: number[]): Room[] {
    return ids.map((id) => this.rooms.get(id)).filter(Boolean) as Room[];
  }

  saveBooking(roomIds: number[], travelTime: number): Booking {
    const booking: Booking = {
      id: this.bookingCounter++,
      room_ids: roomIds,
      travel_time: travelTime,
      booked_at: new Date(),
    };
    this.bookings.unshift(booking); // newest first
    return booking;
  }

  getBookings(): Booking[] {
    return this.bookings.slice(0, 20);
  }

  randomOccupancy(): void {
    // Only touch available rooms — preserve booked/newly-booked/occupied as-is
    const availableIds = Array.from(this.rooms.values())
      .filter((r) => r.status === 'available')
      .map((r) => r.id);

    if (availableIds.length === 0) return;

    // Randomly occupy a portion of currently available rooms
    const count = Math.max(
      1,
      Math.floor(availableIds.length * (0.3 + Math.random() * 0.3))
    );

    availableIds
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .forEach((id) => this.updateStatus([id], 'occupied'));
  }

  resetAll(): void {
    this.rooms.forEach((room, id) => {
      this.rooms.set(id, { ...room, status: 'available' });
    });
  }
}

// Singleton — shared across all requests
export const hotelStore = new HotelStore();
