export const TEST_MODES = {
  FULL: {
    id: 'FULL',
    label: 'Full',
    description: 'Test every supported key.',
    filter: () => true
  },
  MAIN: {
    id: 'MAIN',
    label: 'Main',
    description: 'Test the primary typing keys.',
    filter: (code) => {
      if (code.startsWith('Key')) return true;
      if (code.startsWith('Digit')) return true;
      const mainCodes = new Set([
        'Backquote', 'Minus', 'Equal', 'Backspace', 'Tab', 'BracketLeft', 'BracketRight', 
        'Backslash', 'CapsLock', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'ShiftRight', 
        'Comma', 'Period', 'Slash', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 
        'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight'
      ]);
      return mainCodes.has(code);
    }
  },
  FUNCTION: {
    id: 'FUNCTION',
    label: 'Function',
    description: 'Test F1–F12.',
    filter: (code) => {
      const funcCodes = new Set([
        'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 
        'PrintScreen', 'ScrollLock', 'Pause'
      ]);
      return funcCodes.has(code);
    }
  },
  NAVIGATION: {
    id: 'NAVIGATION',
    label: 'Navigation',
    description: 'Test navigation and cursor-control keys.',
    filter: (code) => {
      const navCodes = new Set([
        'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', 
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
      ]);
      return navCodes.has(code);
    }
  },
  NUMPAD: {
    id: 'NUMPAD',
    label: 'Numpad',
    description: 'Test the numeric keypad.',
    filter: (code) => code.startsWith('Numpad') || code === 'NumLock'
  }
};
