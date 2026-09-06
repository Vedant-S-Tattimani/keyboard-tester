import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MouseCheck = () => {
  const { t } = useLanguage();
  const [testedButtons, setTestedButtons] = useState(new Set());
  const [activeButton, setActiveButton] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(null); // 'up' | 'down' | null
  const [scrollCount, setScrollCount] = useState(0);

  const containerRef = useRef(null);

  // Attach non-passive wheel listener to prevent web page scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault(); // Traps scroll event inside box, preventing page scroll
      if (e.deltaY < 0) {
        setScrollDirection('up');
        setTestedButtons((prev) => new Set(prev).add('scrollUp'));
        setScrollCount((c) => c + 1);
      } else if (e.deltaY > 0) {
        setScrollDirection('down');
        setTestedButtons((prev) => new Set(prev).add('scrollDown'));
        setScrollCount((c) => c + 1);
      }

      // Reset visual indicator flash after 200ms
      setTimeout(() => setScrollDirection(null), 200);
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Clear active press indicator after release
  const handleMouseDown = (e) => {
    e.preventDefault();
    const btn = e.button; // 0: Left, 1: Middle, 2: Right, 3: Back, 4: Forward
    setActiveButton(btn);
    setTestedButtons((prev) => new Set(prev).add(btn));
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setActiveButton(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent right-click browser menu inside tester
  };

  const resetMouseTest = () => {
    setTestedButtons(new Set());
    setActiveButton(null);
    setScrollDirection(null);
    setScrollCount(0);
  };

  // Button mapping helpers
  const buttonsList = [
    { id: 0, key: 'lmb', label: t('mouse.left', 'Left Click'), shortLabel: 'LMB' },
    { id: 1, key: 'mmb', label: t('mouse.middle', 'Scroll Click'), shortLabel: 'MMB' },
    { id: 2, key: 'rmb', label: t('mouse.right', 'Right Click'), shortLabel: 'RMB' },
    { id: 3, key: 'back', label: t('mouse.back', 'Back Button'), shortLabel: 'MB4' },
    { id: 4, key: 'forward', label: t('mouse.forward', 'Forward Button'), shortLabel: 'MB5' },
    { id: 'scrollUp', key: 'scrollUp', label: t('mouse.scrollUp', 'Scroll Up'), shortLabel: 'Wheel ▲' },
    { id: 'scrollDown', key: 'scrollDown', label: t('mouse.scrollDown', 'Scroll Down'), shortLabel: 'Wheel ▼' },
  ];

  return (
    <div 
      ref={containerRef}
      className="flex flex-col p-5 bg-card border border-border rounded-xl shadow-sm justify-between select-none relative overflow-hidden h-full min-h-[320px]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            {t('mouse.title', 'Mouse Check')}
          </h2>
          <button 
            onClick={(e) => { e.stopPropagation(); resetMouseTest(); }}
            className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors px-2 py-0.5 rounded bg-muted/40 hover:bg-muted"
            title={t('mouse.resetTitle', 'Reset Mouse Test')}
          >
            {t('mouse.reset', 'Reset')}
          </button>
        </div>

        <div className="p-2.5 mb-4 bg-primary/10 border border-primary/25 rounded-lg text-center">
          <p className="text-[11px] font-semibold text-primary leading-snug">
            💡 {t('mouse.instruction', 'Click & scroll anywhere in this box to test mouse buttons.')}
          </p>
        </div>

        {/* Visual Mouse Representation */}
        <div className="relative w-28 h-40 mx-auto mb-4 bg-muted/20 border-2 border-border rounded-t-full rounded-b-3xl p-1.5 flex flex-col items-center">
          {/* Scroll Wheel */}
          <div 
            className={`w-3.5 h-7 rounded-full border border-border flex flex-col items-center justify-between py-0.5 transition-colors z-10 ${
              activeButton === 1 
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105' 
                : testedButtons.has(1)
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500'
                  : 'bg-card text-muted-foreground'
            }`}
          >
            <span className={`text-[8px] transition-opacity ${scrollDirection === 'up' ? 'opacity-100 font-bold text-primary' : 'opacity-30'}`}>▲</span>
            <span className={`text-[8px] transition-opacity ${scrollDirection === 'down' ? 'opacity-100 font-bold text-primary' : 'opacity-30'}`}>▼</span>
          </div>

          {/* Left / Right Split Line behind scroll wheel */}
          <div className="absolute top-0 left-0 w-full h-1/2 flex border-b border-border">
            {/* Left Button Zone */}
            <div 
              className={`w-1/2 h-full rounded-tl-full border-r border-border transition-colors flex items-end justify-center pb-2 ${
                activeButton === 0 
                  ? 'bg-primary text-primary-foreground' 
                  : testedButtons.has(0)
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-transparent'
              }`}
            >
              <span className="text-[10px] font-bold">LMB</span>
            </div>
            {/* Right Button Zone */}
            <div 
              className={`w-1/2 h-full rounded-tr-full transition-colors flex items-end justify-center pb-2 ${
                activeButton === 2 
                  ? 'bg-primary text-primary-foreground' 
                  : testedButtons.has(2)
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-transparent'
              }`}
            >
              <span className="text-[10px] font-bold">RMB</span>
            </div>
          </div>

          {/* Side Buttons (Left side of mouse body) */}
          <div className="absolute left-[-8px] top-16 flex flex-col gap-1">
            <div 
              className={`w-2 h-4 rounded-l-md border border-r-0 border-border transition-colors ${
                activeButton === 4 
                  ? 'bg-primary' 
                  : testedButtons.has(4)
                    ? 'bg-emerald-500'
                    : 'bg-card'
              }`}
              title={t('mouse.forwardBtn', 'Forward (MB5)')}
            />
            <div 
              className={`w-2 h-4 rounded-l-md border border-r-0 border-border transition-colors ${
                activeButton === 3 
                  ? 'bg-primary' 
                  : testedButtons.has(3)
                    ? 'bg-emerald-500'
                    : 'bg-card'
              }`}
              title={t('mouse.backBtn', 'Back (MB4)')}
            />
          </div>
        </div>
      </div>

      {/* Button Status Chips */}
      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
        {buttonsList.map((btn) => {
          const isPressed = activeButton === btn.id || (btn.id === 'scrollUp' && scrollDirection === 'up') || (btn.id === 'scrollDown' && scrollDirection === 'down');
          const isTested = testedButtons.has(btn.id);

          let statusStyle = 'bg-muted/30 text-muted-foreground border-border/50';
          if (isPressed) {
            statusStyle = 'bg-primary text-primary-foreground border-primary font-bold shadow-sm';
          } else if (isTested) {
            statusStyle = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-semibold';
          }

          return (
            <div 
              key={btn.key}
              className={`px-2 py-1 rounded border flex items-center justify-between transition-colors ${statusStyle}`}
            >
              <span>{btn.shortLabel}</span>
              <span>{isTested ? '✓' : '—'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MouseCheck;
