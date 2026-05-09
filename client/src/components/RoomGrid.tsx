import React from 'react';
import { RoomCell } from './RoomCell';
import { useHotelStore } from '../store/useHotelStore';
import { roomsOnFloor, getRoomId } from '../data/helpers';

export const RoomGrid: React.FC = () => {
  const { rooms, mode, toggleManualSelect } = useHotelStore();
  const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      {floors.map(floor => (
        <div key={floor} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 60, textAlign: 'right', fontSize: 12, color: '#64748b', flexShrink: 0, fontWeight: 500 }}>
            F{floor}
          </div>
          {/* Lift indicator */}
          <div style={{
            width: 14, height: 52, background: '#e2e8f0', borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, color: '#94a3b8', writingMode: 'vertical-rl', flexShrink: 0,
          }}>lift</div>
          {Array.from({ length: roomsOnFloor(floor) }, (_, i) => i + 1).map(pos => {
            const id = getRoomId(floor, pos);
            const room = rooms[id];
            if (!room) return null;
            return (
              <RoomCell
                key={id}
                room={room}
                onClick={mode === 'manual' ? toggleManualSelect : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
