import React, { useEffect } from 'react';
import { Controls } from './components/Controls';
import { RoomGrid } from './components/RoomGrid';
import { BookingSummary } from './components/BookingSummary';
import { Legend } from './components/Legend';
import { useHotelStore } from './store/useHotelStore';

export default function App() {
  const { loadRooms, loading } = useHotelStore();

  useEffect(() => { loadRooms(); }, []);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: '#0f172a' }}>
          Hotel Room Reservation
        </h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
          97 rooms · 10 floors · Lift on the left · Max 5 rooms per booking
        </p>
      </div>

      {loading && Object.keys(useHotelStore.getState().rooms).length === 0 && (
        <div style={{ color: '#64748b', fontSize: 14, padding: 20 }}>Loading rooms...</div>
      )}

      <Controls />
      <Legend />
      <RoomGrid />
      <BookingSummary />
    </div>
  );
}
