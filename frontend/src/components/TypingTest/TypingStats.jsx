import React from 'react';

const TypingStats = ({ wpm, accuracy, timeRemaining }) => {
  // Format time as 00:XX
  const formattedTime = `00:${timeRemaining.toString().padStart(2, '0')}`;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-8 text-center">
      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">WPM</span>
        <span className="text-5xl font-mono font-bold text-primary">{wpm}</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Accuracy</span>
        <span className="text-5xl font-mono font-bold text-primary">{accuracy}<span className="text-2xl text-muted-foreground">%</span></span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Time</span>
        <span className="text-5xl font-mono font-bold text-primary">{formattedTime}</span>
      </div>
    </div>
  );
};

export default TypingStats;
