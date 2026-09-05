import { useState, useEffect } from 'react';
import { isMac } from '../utils/platformUtils';

const PLATFORM_KEY = 'keycheck_platform';

export const usePlatform = () => {
  const [platform, setPlatformState] = useState(() => {
    try {
      const saved = localStorage.getItem(PLATFORM_KEY);
      if (saved && ['windows', 'mac'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error('Failed to read platform from localStorage', e);
    }
    return isMac() ? 'mac' : 'windows';
  });

  const setPlatform = (newPlatform) => {
    if (['windows', 'mac'].includes(newPlatform)) {
      setPlatformState(newPlatform);
      try {
        localStorage.setItem(PLATFORM_KEY, newPlatform);
      } catch (e) {
        console.error('Failed to save platform to localStorage', e);
      }
      
      // Dispatch custom event so all components update simultaneously
      window.dispatchEvent(new CustomEvent('platformChange', { detail: newPlatform }));
    }
  };

  useEffect(() => {
    const handlePlatformChange = (e) => {
      if (e.detail && e.detail !== platform) {
        setPlatformState(e.detail);
      }
    };

    window.addEventListener('platformChange', handlePlatformChange);
    return () => window.removeEventListener('platformChange', handlePlatformChange);
  }, [platform]);

  return { platform, setPlatform };
};
