import { create } from 'zustand';
import { Room } from '../types/room';
import { totalTravelTime } from '../algorithms/booking';
import * as api from '../data/api';

interface BookingResult {
  rooms: Room[];
  travelTime: number;
}

interface HotelStore {
  rooms: Record<number, Room>;
  lastBooking: BookingResult | null;
  manualSelected: number[];
  mode: 'auto' | 'manual';
  error: string | null;
  loading: boolean;

  loadRooms: () => Promise<void>;
  setMode: (mode: 'auto' | 'manual') => void;
  bookRooms: (count: number) => Promise<void>;
  toggleManualSelect: (id: number) => void;
  confirmManual: () => Promise<void>;
  randomOccupancy: () => Promise<void>;
  resetAll: () => Promise<void>;
}

function toRecord(arr: Room[]): Record<number, Room> {
  return arr.reduce((acc, r) => { acc[r.id] = r; return acc; }, {} as Record<number, Room>);
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  rooms: {},
  lastBooking: null,
  manualSelected: [],
  mode: 'auto',
  error: null,
  loading: false,

  loadRooms: async () => {
    set({ loading: true });
    try {
      const { data } = await api.fetchRooms();
      set({ rooms: toRecord(data.rooms), loading: false });
    } catch {
      set({ error: 'Failed to load rooms', loading: false });
    }
  },

  setMode: (mode) => {
    const { rooms, manualSelected } = get();
    const updated = { ...rooms };
    manualSelected.forEach(id => {
      if (updated[id]?.status === 'selected')
        updated[id] = { ...updated[id], status: 'available' };
    });
    set({ mode, manualSelected: [], rooms: updated, error: null });
  },

  bookRooms: async (count) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.autoBook(count);
      const { data: fresh } = await api.fetchRooms();
      set({
        rooms: toRecord(fresh.rooms),
        lastBooking: { rooms: data.bookedRooms, travelTime: data.travelTime },
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.error || 'Booking failed', loading: false });
    }
  },

  toggleManualSelect: (id) => {
    const { rooms, manualSelected } = get();
    const room = rooms[id];
    if (!room || !['available', 'selected'].includes(room.status)) return;

    if (room.status === 'selected') {
      set({
        rooms: { ...rooms, [id]: { ...room, status: 'available' } },
        manualSelected: manualSelected.filter(x => x !== id),
        error: null,
      });
    } else {
      if (manualSelected.length >= 5) { set({ error: 'Max 5 rooms at a time' }); return; }
      set({
        rooms: { ...rooms, [id]: { ...room, status: 'selected' } },
        manualSelected: [...manualSelected, id],
        error: null,
      });
    }
  },

  confirmManual: async () => {
    const { manualSelected } = get();
    if (!manualSelected.length) return;
    set({ loading: true, error: null });
    try {
      const { data } = await api.manualBook(manualSelected);
      const { data: fresh } = await api.fetchRooms();
      set({
        rooms: toRecord(fresh.rooms),
        lastBooking: { rooms: data.bookedRooms, travelTime: data.travelTime },
        manualSelected: [],
        loading: false,
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.error || 'Manual booking failed', loading: false });
    }
  },

  randomOccupancy: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.randomOccupancy();
      set({ rooms: toRecord(data.rooms), lastBooking: null, manualSelected: [], loading: false });
    } catch {
      set({ error: 'Random occupancy failed', loading: false });
    }
  },

  resetAll: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.resetRooms();
      set({ rooms: toRecord(data.rooms), lastBooking: null, manualSelected: [], loading: false });
    } catch {
      set({ error: 'Reset failed', loading: false });
    }
  },
}));
