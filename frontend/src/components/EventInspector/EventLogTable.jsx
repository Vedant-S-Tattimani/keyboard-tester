import React from 'react';

const formatTime = (ts) => {
  // Extract a stable milliseconds representation 
  // performance.now() gives milliseconds with decimals.
  // We'll just pad it for alignment
  return (ts % 100000).toFixed(1).padStart(7, '0');
};

const EventLogTable = ({ events, selectedEventId, onSelectEvent }) => {
  return (
    <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/30 border-b border-border sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 font-semibold w-24">Time</th>
              <th className="px-4 py-3 font-semibold w-24">Type</th>
              <th className="px-4 py-3 font-semibold w-20">Key</th>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold w-20 text-center">Loc</th>
              <th className="px-4 py-3 font-semibold w-20 text-center">Repeat</th>
            </tr>
          </thead>
        </table>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-12 text-center text-muted-foreground">
                  No events captured yet. Press a key to start.
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr 
                  key={e.id}
                  onClick={() => onSelectEvent(e.id)}
                  className={`border-b border-border/50 cursor-pointer transition-colors ${
                    selectedEventId === e.id 
                      ? 'bg-primary/10 hover:bg-primary/15' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <td className="px-4 py-2 font-mono text-muted-foreground text-xs w-24">{formatTime(e.timestamp)}</td>
                  <td className={`px-4 py-2 font-mono text-xs w-24 font-bold ${e.type === 'keydown' ? 'text-blue-500' : 'text-orange-500'}`}>
                    {e.type}
                  </td>
                  <td className="px-4 py-2 font-mono font-medium w-20">
                    {e.key === ' ' ? 'Space' : e.key}
                  </td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{e.code}</td>
                  <td className="px-4 py-2 font-mono text-center w-20 text-muted-foreground">{e.location}</td>
                  <td className="px-4 py-2 font-mono text-center w-20">
                    {e.repeat ? <span className="text-[10px] uppercase bg-muted px-1.5 py-0.5 rounded font-bold">Yes</span> : <span className="text-muted-foreground/30">-</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventLogTable;
