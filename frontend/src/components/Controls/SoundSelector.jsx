import React from 'react';
import { useSound } from '../../contexts/SoundContext';
import { useLanguage } from '../../contexts/LanguageContext';

const SoundSelector = () => {
  const { t } = useLanguage();
  const { soundEnabled, toggleSound, preset, setPreset, playSound } = useSound();

  const handlePresetChange = (e) => {
    const newPreset = e.target.value;
    setPreset(newPreset);
    playSound('KeyA');
  };

  return (
    <div className="flex items-center gap-1.5 bg-card border border-border rounded-md px-2 py-1 transition-colors">
      <button
        type="button"
        onClick={() => {
          toggleSound();
          if (!soundEnabled) {
            playSound('KeyA');
          }
        }}
        title={soundEnabled ? t('sound.mute') : t('sound.enable')}
        aria-label={soundEnabled ? t('sound.mute') : t('sound.enable')}
        className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      >
        {soundEnabled ? (
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>

      <label htmlFor="sound-preset-select" className="sr-only">
        {t('sound.profile')}
      </label>
      <select
        id="sound-preset-select"
        value={preset}
        onChange={handlePresetChange}
        disabled={!soundEnabled}
        className="bg-transparent text-card-foreground text-xs font-medium uppercase focus-visible:outline-none disabled:opacity-40 cursor-pointer"
      >
        <option value="mechanical">{t('sound.click')}</option>
        <option value="thock">{t('sound.thock')}</option>
        <option value="typewriter">{t('sound.typewriter')}</option>
      </select>
    </div>
  );
};

export default SoundSelector;
