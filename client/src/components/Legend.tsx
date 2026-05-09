import React from 'react';

const items = [
  { label: 'Available', bg: '#f0f4f8', border: '#cbd5e1' },
  { label: 'Occupied',  bg: '#fecaca', border: '#f87171' },
  { label: 'Selected',  bg: '#3b82f6', border: '#1d4ed8' },
  { label: 'Just booked', bg: '#34d399', border: '#059669' },
  { label: 'Previously booked', bg: '#86efac', border: '#22c55e' },
];

export const Legend: React.FC = () => (
  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
    {items.map(({ label, bg, border }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 12, height: 12, borderRadius: 3, background: bg, border: `1px solid ${border}` }} />
        <span style={{ fontSize: 12, color: '#64748b' }}>{label}</span>
      </div>
    ))}
  </div>
);
