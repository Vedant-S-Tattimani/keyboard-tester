import React, { useState } from 'react';

const DiagnosticSessionPanel = ({
  diagnostic,
  onStart,
  onStop,
  onReset
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const { isActive, startedAt, counters, anomalies, holdDurations } = diagnostic;

  const avgHold = holdDurations.length > 0 
    ? Math.round(holdDurations.reduce((a, b) => a + b, 0) / holdDurations.length)
    : 0;

  const hasStarted = startedAt !== null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-6 flex flex-col gap-4 transition-[shadow,border-color]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight uppercase">Event Diagnostics</h2>
          <p className="text-sm text-muted-foreground">
             Analyze browser-level event behavior over a test session.
          </p>
        </div>
        
        <div className="flex gap-2">
          {!isActive && (
            <button
              onClick={onStart}
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start Diagnostic
            </button>
          )}
          {isActive && (
            <button
              onClick={onStop}
              className="px-4 py-2 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/50 font-bold uppercase tracking-wider text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Stop Diagnostic
            </button>
          )}
          {hasStarted && !isActive && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border font-bold uppercase tracking-wider text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {hasStarted && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Events Observed</span>
                <span className="font-mono text-xl font-bold">{counters.events}</span>
             </div>
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Paired Key Events</span>
                <span className="font-mono text-xl font-bold">{counters.paired} / {counters.keydown - counters.repeats}</span>
             </div>
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Repeated Keydowns</span>
                <span className="font-mono text-xl font-bold">{counters.repeats}</span>
             </div>
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Avg Hold Duration</span>
                <span className="font-mono text-xl font-bold">{avgHold} ms</span>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 flex justify-between items-center">
                 <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Focus Interruptions</span>
                 <span className={`font-mono font-bold ${counters.focusInterruptions > 0 ? 'text-amber-500' : 'text-foreground'}`}>{counters.focusInterruptions}</span>
             </div>
             <div className="bg-muted/10 border border-border/50 rounded-lg p-4 flex justify-between items-center">
                 <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Anomalies Detected</span>
                 <span className={`font-mono font-bold ${anomalies.length > 0 ? 'text-amber-500' : 'text-green-500'}`}>{anomalies.length}</span>
             </div>
          </div>

          {(anomalies.length > 0 || holdDurations.length > 0) && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary hover:underline font-bold uppercase tracking-wider text-start mt-2"
            >
              {expanded ? 'Hide Advanced Details' : 'Show Advanced Details'}
            </button>
          )}

          {expanded && (
             <div className="mt-4 flex flex-col gap-6 p-4 bg-background border border-border rounded-lg">
                {anomalies.length > 0 && (
                   <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Detected Anomalies</h3>
                      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pe-">
                         {anomalies.map((anom, idx) => (
                           <div key={idx} className="flex flex-col gap-1 text-sm bg-muted/20 border border-border p-3 rounded">
                              <div className="flex justify-between items-start">
                                 <span className={`font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${anom.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                     {anom.type}
                                 </span>
                                 <span className="text-muted-foreground font-mono text-[10px]">{Math.round(anom.timestamp)}ms</span>
                              </div>
                              <div className="font-mono mt-1">{anom.code}</div>
                              <div className="text-muted-foreground text-xs">{anom.explanation}</div>
                           </div>
                         ))}
                      </div>
                   </div>
                )}
                
                {holdDurations.length > 0 && (
                   <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Observed Key Hold Durations</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {(() => {
                             const cats = { '< 50ms': 0, '50-100ms': 0, '100-250ms': 0, '250-500ms': 0, '> 500ms': 0 };
                             holdDurations.forEach(d => {
                                if (d < 50) cats['< 50ms']++;
                                else if (d < 100) cats['50-100ms']++;
                                else if (d < 250) cats['100-250ms']++;
                                else if (d < 500) cats['250-500ms']++;
                                else cats['> 500ms']++;
                             });
                             return Object.entries(cats).map(([label, count]) => (
                               <div key={label} className="bg-muted/20 border border-border rounded p-2 text-center">
                                  <span className="block text-[10px] uppercase text-muted-foreground">{label}</span>
                                  <span className="font-mono font-bold text-sm">{count}</span>
                               </div>
                             ));
                          })()}
                      </div>
                   </div>
                )}
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default DiagnosticSessionPanel;
