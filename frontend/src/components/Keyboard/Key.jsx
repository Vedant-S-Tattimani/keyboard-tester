import React from 'react';

import { usePlatform } from '../../hooks/usePlatform';
import { useSound } from '../../contexts/SoundContext';

const getKeyLabel = (code, defaultLabel, platform) => {
  if (platform === 'mac') {
    switch (code) {
      case 'MetaLeft':
      case 'MetaRight':
        return 'cmd ⌘';
      case 'AltLeft':
      case 'AltRight':
        return 'option ⌥';
      case 'ControlLeft':
      case 'ControlRight':
        return 'control ⌃';
      case 'Backspace':
        return 'delete ⌫';
      case 'Delete':
        return 'del ⌦';
      case 'Enter':
      case 'NumpadEnter':
        return 'return ↩';
      case 'CapsLock':
        return 'caps lock';
      case 'ContextMenu':
        return 'option ⌥';
      case 'PrintScreen':
        return 'F13';
      case 'ScrollLock':
        return 'F14';
      case 'Pause':
        return 'F15';
      default:
        return defaultLabel;
    }
  }

  // Windows defaults
  switch (code) {
    case 'MetaLeft':
    case 'MetaRight':
      return 'Win';
    case 'AltLeft':
    case 'AltRight':
      return 'Alt';
    case 'ControlLeft':
    case 'ControlRight':
      return 'Ctrl';
    case 'Backspace':
      return 'Backspace';
    case 'Delete':
      return 'Del';
    case 'Enter':
    case 'NumpadEnter':
      return 'Enter';
    case 'CapsLock':
      return 'Caps Lock';
    case 'ContextMenu':
      return 'Menu';
    case 'PrintScreen':
      return 'PrtScn';
    case 'ScrollLock':
      return 'ScrLk';
    case 'Pause':
      return 'Pause';
    default:
      return defaultLabel;
  }
};

const Key = ({ code, label, width = '1', height = '1', isPressed, isTested, spacer, inMode = true }) => {
  const { platform } = usePlatform();
  const { playSound } = useSound();
  const baseSize = 3.5; // em
  const w = parseFloat(width) * baseSize;
  // Account for the gap between rows for tall keys
  const h = parseFloat(height) * baseSize + (parseFloat(height) - 1) * 0.25;
  const isTall = parseFloat(height) > 1;

  if (spacer) {
    return <div style={{ width: `${w}em`, height: `${baseSize}em` }} className="shrink-0" />;
  }
  
  const displayLabel = getKeyLabel(code, label || code, platform);

  // Visual classes based on state priority
  let stateClasses = 'bg-card text-card-foreground border-border shadow-[0_0.1875em_0_0_var(--color-border)]';
  
  if (isPressed) {
    stateClasses = 'bg-primary text-primary-foreground translate-y-[0.1875em] shadow-none border-primary ring-1 ring-primary ring-offset-1 ring-offset-background z-20';
  } else if (!inMode) {
    stateClasses = 'bg-muted/10 text-muted-foreground/30 border-muted/30 shadow-[0_0.1875em_0_0_var(--color-muted)] opacity-40';
  } else if (isTested) {
    stateClasses = 'bg-muted/30 text-muted-foreground border-muted shadow-[0_0.1875em_0_0_var(--color-muted)] opacity-60';
  }

  return (
    <div 
      className="relative shrink-0 cursor-pointer"
      style={{ width: `${w}em`, height: `${baseSize}em`, margin: '0.125em' }}
      onMouseDown={() => playSound(code)}
    >
      <div
        className={`
          absolute top-0 left-0 flex items-center justify-center border 
          transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-75 ease-out font-sans select-none
          ${stateClasses}
        `}
        style={{ 
          width: `${w}em`, 
          height: `${h}em`, 
          zIndex: isTall ? 10 : 1,
          borderRadius: '0.375em'
        }}
      >
        <span className="font-medium pointer-events-none" style={{ fontSize: '0.75em' }}>
          {displayLabel}
        </span>
        {isTested && !isPressed && (
          <span 
            className="absolute font-bold opacity-70 pointer-events-none text-muted-foreground leading-none"
            style={{ top: '0.25em', right: '0.25em', fontSize: '0.625em' }}
          >
            ✓
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(Key);
