import React from 'react';

const getLocationLabel = (loc) => {
  switch (loc) {
    case 0: return '0 — Standard';
    case 1: return '1 — Left';
    case 2: return '2 — Right';
    case 3: return '3 — Numpad';
    default: return `${loc} — Unknown`;
  }
};

const BooleanBadge = ({ value }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
    value ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
  }`}>
    {value ? 'True' : 'False'}
  </span>
);

const EventDetailsPanel = ({ event }) => {
  if (!event) {
    return (
      <div className="w-full h-full min-h-[300px] bg-card border border-border rounded-xl shadow-sm flex items-center justify-center p-6 text-center text-muted-foreground">
        Select an event from the log to view its raw properties.
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-muted/30 border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-sm uppercase tracking-wider">Event Properties</h3>
        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
          event.type === 'keydown' ? 'bg-blue-500/20 text-blue-500' : 'bg-orange-500/20 text-orange-500'
        }`}>
          {event.type}
        </span>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-4">
        
        {/* Identity Group */}
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Identity</h4>
          <div className="grid grid-cols-2 gap-2 bg-muted/20 p-3 rounded-lg border border-border/50">
            <div>
              <span className="block text-xs text-muted-foreground mb-1">event.key</span>
              <span className="font-mono font-medium">{event.key === ' ' ? '(Space)' : event.key}</span>
            </div>
            <div>
              <span className="block text-xs text-muted-foreground mb-1">event.code</span>
              <span className="font-mono font-medium">{event.code}</span>
            </div>
          </div>
        </div>

        {/* State Group */}
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">State</h4>
          <div className="grid grid-cols-2 gap-2 bg-muted/20 p-3 rounded-lg border border-border/50">
            <div>
              <span className="block text-xs text-muted-foreground mb-1">event.location</span>
              <span className="font-mono font-medium text-sm">{getLocationLabel(event.location)}</span>
            </div>
            <div>
              <span className="block text-xs text-muted-foreground mb-1">event.repeat</span>
              <BooleanBadge value={event.repeat} />
            </div>
            <div className="col-span-2 mt-1">
              <span className="block text-xs text-muted-foreground mb-1">event.isComposing</span>
              <BooleanBadge value={event.isComposing} />
            </div>
          </div>
        </div>

        {/* Modifiers Group */}
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Modifiers Active</h4>
          <div className="grid grid-cols-4 gap-2 bg-muted/20 p-3 rounded-lg border border-border/50">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] text-muted-foreground uppercase">Shift</span>
              <BooleanBadge value={event.shiftKey} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] text-muted-foreground uppercase">Ctrl</span>
              <BooleanBadge value={event.ctrlKey} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] text-muted-foreground uppercase">Alt</span>
              <BooleanBadge value={event.altKey} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] text-muted-foreground uppercase">Meta</span>
              <BooleanBadge value={event.metaKey} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailsPanel;
