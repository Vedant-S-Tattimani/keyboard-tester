import { layouts } from './layouts';
import { TEST_MODES } from './keyboardModes';

// Keys that browsers or operating systems frequently intercept, 
// making them unreliable for hardware diagnostics in a web environment.
export const browserRestrictedKeys = new Set([
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'PrintScreen', 'ScrollLock', 'Pause',
  'MetaLeft', 'MetaRight', 'ContextMenu',
  'Escape', 'Insert'
]);

/**
 * Calculates the total number of keys in a layout that are expected to be reliably testable for a specific mode.
 * Excludes spacers and browser-restricted keys.
 */
export const getRequiredTestableKeys = (layoutName, modeId = 'FULL') => {
  const activeLayout = layouts[layoutName] || layouts['QWERTY'];
  const modeFilter = TEST_MODES[modeId]?.filter || (() => true);
  const requiredKeys = new Set();
  
  activeLayout.forEach(row => {
    row.forEach(keyObj => {
      if (!keyObj.spacer && modeFilter(keyObj.code) && !browserRestrictedKeys.has(keyObj.code)) {
        requiredKeys.add(keyObj.code);
      }
    });
  });
  
  return requiredKeys;
};

/**
 * Returns a complete set of all key codes present in a layout.
 */
export const getAllLayoutKeys = (layoutName) => {
  const activeLayout = layouts[layoutName] || layouts['QWERTY'];
  const allKeys = new Set();
  
  activeLayout.forEach(row => {
    row.forEach(keyObj => {
      if (!keyObj.spacer) {
        allKeys.add(keyObj.code);
      }
    });
  });
  
  return allKeys;
};

/**
 * Returns a complete set of all key codes belonging to a specific mode.
 */
export const getAllModeKeys = (layoutName, modeId = 'FULL') => {
  const allKeys = getAllLayoutKeys(layoutName);
  const modeFilter = TEST_MODES[modeId]?.filter || (() => true);
  const activeKeys = new Set();
  
  allKeys.forEach(code => {
    if (modeFilter(code)) {
      activeKeys.add(code);
    }
  });
  
  return activeKeys;
};
