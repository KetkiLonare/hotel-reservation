import { Request, Response } from 'express';
import { hotelStore } from '../store/hotelStore.js';
import { findBestRooms, totalTravelTime } from '../algorithms/booking.js';
import {
  BookRequestBody,
  BookManualRequestBody,
  RoomsResponse,
  BookingResponse,
  BookingsResponse,
  ErrorResponse,
} from '../types/index.js';

// GET /api/rooms
export const getRooms = (
  _req: Request,
  res: Response<RoomsResponse>
): void => {
  res.json({ rooms: hotelStore.getAllRooms() });
};

// POST /api/rooms/book  body: { count: 1-5 }
export const bookRooms = (
  req: Request<{}, {}, BookRequestBody>,
  res: Response<BookingResponse | ErrorResponse>
): void => {
  const { count } = req.body;

  if (!count || count < 1 || count > 5) {
    res.status(400).json({ error: 'Room count must be between 1 and 5' });
    return;
  }

  const available = hotelStore.getAvailableRooms();
  const best = findBestRooms(available, count);

  if (!best) {
    res.status(409).json({ error: 'Not enough available rooms' });
    return;
  }

  const ids = best.map((r) => r.id);
  const tt = totalTravelTime(best);

  hotelStore.demoteNewlyBooked();
  hotelStore.updateStatus(ids, 'newly-booked');
  const booking = hotelStore.saveBooking(ids, tt);

  res.json({ bookedRooms: best, travelTime: tt, booking });
};

// POST /api/rooms/book-manual  body: { roomIds: number[] }
export const bookManual = (
  req: Request<{}, {}, BookManualRequestBody>,
  res: Response<BookingResponse | ErrorResponse>
): void => {
  const { roomIds } = req.body;

  if (!Array.isArray(roomIds) || roomIds.length < 1 || roomIds.length > 5) {
    res.status(400).json({ error: 'Select between 1 and 5 rooms' });
    return;
  }

  const rooms = hotelStore.getRoomsByIds(roomIds);
  const unavailable = rooms.filter((r) => r.status !== 'available');

  if (unavailable.length > 0) {
    res.status(409).json({
      error: `Rooms ${unavailable.map((r) => r.id).join(', ')} are not available`,
    });
    return;
  }

  const tt = totalTravelTime(rooms);

  hotelStore.demoteNewlyBooked();
  hotelStore.updateStatus(roomIds, 'newly-booked');
  const booking = hotelStore.saveBooking(roomIds, tt);

  res.json({ bookedRooms: rooms, travelTime: tt, booking });
};

// POST /api/rooms/random
export const randomOccupancy = (
  _req: Request,
  res: Response<RoomsResponse>
): void => {
  hotelStore.randomOccupancy();
  res.json({ rooms: hotelStore.getAllRooms() });
};

// DELETE /api/rooms/reset
export const resetRooms = (
  _req: Request,
  res: Response<RoomsResponse>
): void => {
  hotelStore.resetAll();
  res.json({ rooms: hotelStore.getAllRooms() });
};

// GET /api/rooms/bookings
export const getBookings = (
  _req: Request,
  res: Response<BookingsResponse>
): void => {
  res.json({ bookings: hotelStore.getBookings() });
};
