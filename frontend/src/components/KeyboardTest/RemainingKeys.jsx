import React, { useState } from 'react';

const RemainingKeys = ({ requiredKeys, testedKeys }) => {
  const [expanded, setExpanded] = useState(false);
  
  const remainingArray = Array.from(requiredKeys).filter(k => !testedKeys.has(k)).sort();
  
  if (remainingArray.length === 0) return null;

  const displayCount = expanded ? remainingArray.length : Math.min(10, remainingArray.length);
  const hiddenCount = remainingArray.length - displayCount;

  return (
    <div className="mt-4 p-4 bg-muted/20 border border-border/50 rounded-lg">
      <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider mb-3 flex justify-between items-center">
        Untested Required Keys
        <span className="bg-muted px-2 py-0.5 rounded text-[10px]">{remainingArray.length}</span>
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {remainingArray.slice(0, displayCount).map(code => (
          <span key={code} className="inline-flex items-center px-2 py-1 rounded bg-background border border-border text-[10px] font-mono text-muted-foreground">
            {code}
          </span>
        ))}
      </div>
      
      {hiddenCount > 0 && !expanded && (
        <button 
          onClick={() => setExpanded(true)}
          className="mt-3 text-[10px] text-primary hover:underline font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted rounded px-1"
        >
          + Show {hiddenCount} more
        </button>
      )}
      
      {expanded && hiddenCount > 0 && (
         <button 
          onClick={() => setExpanded(false)}
          className="mt-3 text-[10px] text-primary hover:underline font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted rounded px-1"
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default RemainingKeys;
