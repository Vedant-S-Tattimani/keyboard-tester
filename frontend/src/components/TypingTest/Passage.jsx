import React from 'react';

const Passage = ({ passage, userInput, status }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 bg-card border border-border rounded-xl shadow-sm min-h-[200px] mb-8 select-none font-mono text-lg leading-relaxed tracking-wide">
      
      {status === 'paused' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
          <span className="text-xl font-bold text-primary animate-pulse">Test Paused - Press any key to resume</span>
        </div>
      )}

      {status === 'idle' && (
        <div className="absolute top-4 left-4 text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
          Press any key to begin...
        </div>
      )}

      <div className="flex flex-wrap break-words whitespace-pre-wrap text-muted-foreground/50">
        {passage.split('').map((char, index) => {
          let colorClass = '';
          let isCurrent = false;

          if (index < userInput.length) {
            colorClass = userInput[index] === char 
              ? 'text-primary' 
              : 'text-destructive bg-destructive/20 underline decoration-destructive underline-offset-4';
          } else if (index === userInput.length && status !== 'finished') {
            isCurrent = true;
          }

          return (
            <span 
              key={index} 
              className={`
                relative
                ${colorClass}
                ${isCurrent ? 'text-foreground' : ''}
              `}
            >
              {char}
              {isCurrent && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary animate-pulse" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Passage;
