import React from 'react';

const Key = ({ code, label, width = '1', height = '1', isPressed, isTested, spacer, inMode = true }) => {
  const baseSize = 3.5; // rem
  const w = parseFloat(width) * baseSize;
  // Account for the 4px vertical margin gap (0.25rem) between rows for tall keys
  const h = parseFloat(height) * baseSize + (parseFloat(height) - 1) * 0.25;
  const isTall = parseFloat(height) > 1;

  if (spacer) {
    return <div style={{ width: `${w}rem`, height: `${baseSize}rem` }} className="shrink-0" />;
  }

  // Visual classes based on state priority
  let stateClasses = 'bg-card text-card-foreground border-border shadow-[0_3px_0_0_var(--color-border)]';
  
  if (isPressed) {
    stateClasses = 'bg-primary text-primary-foreground translate-y-[3px] shadow-none border-primary ring-1 ring-primary ring-offset-1 ring-offset-background z-20';
  } else if (!inMode) {
    stateClasses = 'bg-muted/10 text-muted-foreground/30 border-muted/30 shadow-[0_3px_0_0_var(--color-muted)] opacity-40';
  } else if (isTested) {
    stateClasses = 'bg-muted/30 text-muted-foreground border-muted shadow-[0_3px_0_0_var(--color-muted)] opacity-60';
  }

  return (
    <div 
      className="relative shrink-0 m-[2px]"
      style={{ width: `${w}rem`, height: `${baseSize}rem` }}
    >
      <div
        className={`
          absolute top-0 left-0 flex items-center justify-center rounded-md border 
          transition-all duration-75 ease-out font-sans select-none
          ${stateClasses}
        `}
        style={{ width: `${w}rem`, height: `${h}rem`, zIndex: isTall ? 10 : 1 }}
      >
        <span className="text-xs font-medium pointer-events-none">
          {label || code}
        </span>
        {isTested && !isPressed && (
          <span className="absolute top-[4px] right-[4px] text-[10px] font-bold opacity-70 pointer-events-none text-muted-foreground leading-none">✓</span>
        )}
      </div>
    </div>
  );
};

export default React.memo(Key);
