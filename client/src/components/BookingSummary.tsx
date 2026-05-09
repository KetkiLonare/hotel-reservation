import React from 'react';
import { useHotelStore } from '../store/useHotelStore';

export const BookingSummary: React.FC = () => {
  const { lastBooking } = useHotelStore();
  if (!lastBooking) return null;

  const byFloor: Record<number, number[]> = {};
  lastBooking.rooms.forEach(r => {
    (byFloor[r.floor] = byFloor[r.floor] || []).push(r.id);
  });

  return (
    <div style={{
      marginTop: 20, padding: '14px 18px',
      background: '#f0fdf4', border: '1px solid #86efac',
      borderRadius: 10, fontSize: 13,
    }}>
      <div style={{ fontWeight: 600, color: '#166534', marginBottom: 6 }}>Booking confirmed</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
        {Object.entries(byFloor).sort((a, b) => +a[0] - +b[0]).map(([floor, ids]) => (
          <span key={floor} style={{ color: '#15803d' }}>
            Floor {floor}: <strong>{ids.join(', ')}</strong>
          </span>
        ))}
      </div>
      <div style={{ color: '#64748b' }}>
        Total travel time: <strong style={{ color: '#166534' }}>{lastBooking.travelTime} min</strong>
      </div>
    </div>
  );
};
