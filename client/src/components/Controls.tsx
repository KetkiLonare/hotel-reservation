import React, { useState } from 'react';
import { useHotelStore } from '../store/useHotelStore';
import { totalTravelTime } from '../algorithms/booking';

export const Controls: React.FC = () => {
  const {
    mode, setMode, bookRooms, confirmManual,
    randomOccupancy, resetAll,
    manualSelected, rooms, error, loading,
  } = useHotelStore();

  const [roomCount, setRoomCount] = useState(2);
  const selectedRooms = manualSelected.map(id => rooms[id]).filter(Boolean);
  const liveTT = totalTravelTime(selectedRooms);

  const btnBase: React.CSSProperties = {
    padding: '8px 16px', borderRadius: 8, border: '1px solid #cbd5e1',
    fontSize: 13, fontWeight: 500, cursor: 'pointer', background: '#fff',
    transition: 'all 0.12s',
  };
  const btnPrimary: React.CSSProperties = { ...btnBase, background: '#3b82f6', color: '#fff', border: '1px solid #2563eb' };
  const btnDanger: React.CSSProperties  = { ...btnBase, background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' };
  const btnSuccess: React.CSSProperties = { ...btnBase, background: '#dcfce7', color: '#166534', border: '1px solid #86efac' };

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Mode + action buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <button
          style={mode === 'auto' ? btnPrimary : btnBase}
          onClick={() => setMode('auto')}
        >Auto book</button>
        <button
          style={mode === 'manual' ? btnPrimary : btnBase}
          onClick={() => setMode('manual')}
        >Manual select</button>
        <button style={btnBase} onClick={randomOccupancy} disabled={loading}>
          Random occupancy
        </button>
        <button style={btnDanger} onClick={resetAll} disabled={loading}>
          Reset all
        </button>
      </div>

      {/* Auto mode */}
      {mode === 'auto' && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="number" min={1} max={5} value={roomCount}
            onChange={e => setRoomCount(Number(e.target.value))}
            style={{ width: 80, padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
          />
          <span style={{ fontSize: 13, color: '#64748b' }}>rooms</span>
          <button style={btnSuccess} onClick={() => bookRooms(roomCount)} disabled={loading}>
            {loading ? 'Booking...' : 'Book'}
          </button>
        </div>
      )}

      {/* Manual mode */}
      {mode === 'manual' && (
        <div>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 10px' }}>
            Click any available room on the grid to select it (max 5).
          </p>
          {manualSelected.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, alignItems: 'center' }}>
              {manualSelected.map(id => (
                <span key={id} style={{
                  background: '#dbeafe', color: '#1e40af', borderRadius: 20,
                  padding: '3px 10px', fontSize: 12, fontWeight: 500,
                }}>Room {id}</span>
              ))}
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 4 }}>
                Travel time: <strong>{liveTT} min</strong>
              </span>
            </div>
          )}
          <button
            style={manualSelected.length === 0 ? { ...btnSuccess, opacity: 0.5, cursor: 'not-allowed' } : btnSuccess}
            disabled={manualSelected.length === 0 || loading}
            onClick={confirmManual}
          >
            {loading ? 'Confirming...' : `Confirm booking (${manualSelected.length} room${manualSelected.length !== 1 ? 's' : ''})`}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          marginTop: 12, padding: '10px 14px', background: '#fee2e2',
          color: '#991b1b', borderRadius: 8, fontSize: 13,
        }}>{error}</div>
      )}
    </div>
  );
};
