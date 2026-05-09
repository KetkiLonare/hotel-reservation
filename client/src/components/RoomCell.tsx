import React from 'react';
import { Room } from '../types/room';

const styles: Record<string, React.CSSProperties> = {
  available:       { background: '#f0f4f8', border: '1px solid #cbd5e1', color: '#64748b', cursor: 'pointer' },
  occupied:        { background: '#fecaca', border: '1px solid #f87171', color: '#7f1d1d', cursor: 'not-allowed' },
  selected:        { background: '#3b82f6', border: '1px solid #1d4ed8', color: '#fff', cursor: 'pointer' },
  booked:          { background: '#86efac', border: '1px solid #22c55e', color: '#14532d', cursor: 'not-allowed' },
  'newly-booked':  { background: '#34d399', border: '1px solid #059669', color: '#064e3b', cursor: 'not-allowed' },
};

interface Props {
  room: Room;
  onClick?: (id: number) => void;
}

export const RoomCell: React.FC<Props> = ({ room, onClick }) => (
  <div
    title={`Room ${room.id} (${room.status})`}
    onClick={() => onClick?.(room.id)}
    style={{
      width: 52,
      height: 52,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600,
      userSelect: 'none',
      transition: 'all 0.15s',
      flexShrink: 0,
      ...styles[room.status],
    }}
  >
    {room.id}
  </div>
);
