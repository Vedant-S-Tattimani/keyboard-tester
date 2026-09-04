import { useState, useEffect } from 'react';

const LAYOUT_KEY = 'keycheck_layout';

export const useLayout = () => {
  // Initialize from localStorage or default to QWERTY
  const [layout, setLayoutState] = useState(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_KEY);
      if (saved && ['QWERTY', 'AZERTY', 'QWERTZ'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error('Failed to read layout from localStorage', e);
    }
    return 'QWERTY';
  });

  const setLayout = (newLayout) => {
    if (['QWERTY', 'AZERTY', 'QWERTZ'].includes(newLayout)) {
      setLayoutState(newLayout);
      try {
        localStorage.setItem(LAYOUT_KEY, newLayout);
      } catch (e) {
        console.error('Failed to save layout to localStorage', e);
      }
      
      // Dispatch custom event so other components (like GhostingTest) update simultaneously
      window.dispatchEvent(new CustomEvent('layoutChange', { detail: newLayout }));
    }
  };

  useEffect(() => {
    const handleLayoutChange = (e) => {
      if (e.detail && e.detail !== layout) {
        setLayoutState(e.detail);
      }
    };

    window.addEventListener('layoutChange', handleLayoutChange);
    return () => window.removeEventListener('layoutChange', handleLayoutChange);
  }, [layout]);

  return { layout, setLayout };
};
