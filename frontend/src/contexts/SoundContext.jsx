import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { triggerKeySound } from '../utils/soundManager';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('keycheck_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('keycheck_sound_volume');
      return saved !== null ? parseFloat(saved) : 0.6;
    } catch {
      return 0.6;
    }
  });

  const [preset, setPreset] = useState(() => {
    try {
      return localStorage.getItem('keycheck_sound_preset') || 'mechanical';
    } catch {
      return 'mechanical';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('keycheck_sound_enabled', JSON.stringify(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('keycheck_sound_volume', volume.toString());
    } catch {}
  }, [volume]);

  useEffect(() => {
    try {
      localStorage.setItem('keycheck_sound_preset', preset);
    } catch {}
  }, [preset]);

  const playSound = useCallback((code = '') => {
    if (soundEnabled) {
      triggerKeySound({ preset, volume, code });
    }
  }, [soundEnabled, volume, preset]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Global keydown event listener to trigger click sound on any keyboard keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.repeat && soundEnabled) {
        triggerKeySound({ preset, volume, code: e.code });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [soundEnabled, volume, preset]);

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      setSoundEnabled,
      toggleSound,
      volume,
      setVolume,
      preset,
      setPreset,
      playSound
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
