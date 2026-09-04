import React from 'react';

const DurationSelector = ({ currentDuration, onSelect, disabled }) => {
  const durations = [15, 30, 60];

  return (
    <div className="flex justify-center gap-4 mb-8">
      {durations.map(duration => (
        <button
          key={duration}
          onClick={() => onSelect(duration)}
          disabled={disabled}
          aria-pressed={currentDuration === duration}
          className={`
            px-4 py-2 rounded-md font-mono text-sm font-semibold transition-colors
            border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${currentDuration === duration 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-transparent text-muted-foreground border-border hover:bg-muted/50'}
          `}
        >
          {duration}s
        </button>
      ))}
    </div>
  );
};

export default DurationSelector;
