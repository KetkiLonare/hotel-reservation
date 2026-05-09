import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: BASE });

export const fetchRooms = () => api.get('/rooms');
export const autoBook = (count: number) => api.post('/rooms/book', { count });
export const manualBook = (roomIds: number[]) => api.post('/rooms/book-manual', { roomIds });
export const randomOccupancy = () => api.post('/rooms/random');
export const resetRooms = () => api.delete('/rooms/reset');
export const fetchBookings = () => api.get('/rooms/bookings');
