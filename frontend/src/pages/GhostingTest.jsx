import React from 'react';
import Keyboard from '../components/Keyboard/Keyboard';
import LayoutSelector from '../components/Controls/LayoutSelector';
import { useMultiKeyTest } from '../hooks/useMultiKeyTest';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../contexts/LanguageContext';

const GhostingTest = () => {
  const { t } = useLanguage();
  useSEO({
    title: t('seo.ghostingtest.title', 'Keyboard Ghosting Test – Test Key Rollover Online | KeyCheck'),
    description: t('seo.ghostingtest.desc', 'Test simultaneous keyboard input and observe how many keys your browser receives at once.'),
    url: 'https://keycheck.example.com/ghosting-test'
  });
  const { pressedKeys, maxSimultaneous, eventHistory, reset } = useMultiKeyTest();
  
  // Create an array of sorted keys for Current Combination
  const combinationArray = Array.from(pressedKeys).sort();

  return (
    <div className="w-full flex flex-col items-center p-8">
      <header className="mb-8 text-center max-w-2xl mx-auto space-y-2 mt-4 md:mt-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">{t('ghosting.title')}</h1>
        <p className="text-muted-foreground text-sm">
          {t('ghosting.subtitle')}
        </p>
      </header>
      
      <main id="main-content" className="w-full flex flex-col items-center gap-8">
        
        {/* Top Info Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          
          {/* Status Box */}
          <div className="flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm justify-between">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">{t('ghosting.testObservation', 'Test Observation')}</h2>
            <div className="mb-4">
              <span aria-live="polite" className="block text-4xl font-mono font-semibold text-primary leading-none mb-1">{maxSimultaneous}</span>
              <span className="text-sm font-semibold text-muted-foreground">{t('ghosting.maxSimultaneous')}</span>
            </div>
            
            <div className="text-[11px] text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-lg border border-border/50">
              <strong className="block mb-1 text-card-foreground">{t('ghosting.browserEvents', 'Browser key events received')}</strong>
              This test measures simultaneous key input successfully delivered to the browser.
            </div>
          </div>

          {/* Current Combination */}
          <div className="flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{t('ghosting.currentlyHeld')}</h2>
              <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                {pressedKeys.size} Held
              </span>
            </div>
            
            <div className="flex-1 min-h-[120px] bg-muted/20 border border-border/50 rounded-lg p-4 flex flex-wrap content-start gap-2 overflow-y-auto">
              {combinationArray.length > 0 ? (
                combinationArray.map(code => (
                  <span key={code} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-mono font-bold bg-primary text-primary-foreground">
                    {code}
                  </span>
                ))
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                  <span className="text-xl mb-1">—</span>
                  <span className="text-sm">{t('ghosting.empty')}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* The Visual Keyboard */}
        <div className="w-full max-w-max mx-auto flex flex-col gap-4 items-end">
          <LayoutSelector />
          <Keyboard pressedKeys={pressedKeys} testedKeys={new Set()} />
        </div>

        {/* Bottom Grid: History & Info */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* History Panel */}
          <div className="flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm h-80">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">{t('ghosting.inputHistory', 'Input History')}</h2>
            <div className="flex-1 overflow-y-auto space-y-1 pe-2 font-mono text-xs">
              {eventHistory.length > 0 ? (
                eventHistory.map(evt => (
                  <div key={evt.id} className="flex justify-between py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{evt.timestamp}</span>
                    <span className={evt.type === '+' ? 'text-primary font-bold' : 'text-muted-foreground'}>
                      {evt.type} {evt.code}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground opacity-50 text-center mt-8">{t('ghosting.noHistory', 'No history yet')}</div>
              )}
            </div>
          </div>

          {/* Education Panel */}
          <div className="flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm md:col-span-2">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">{t('ghosting.whatIsGhosting', 'What is Keyboard Ghosting?')}</h2>
            
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-card-foreground">Key Rollover (KRO)</strong> defines the maximum number of keys that can be simultaneously registered by a keyboard. A keyboard with "N-Key Rollover" (NKRO) can theoretically register every single key at once.
              </p>
              <p>
                <strong className="text-card-foreground">Ghosting</strong> occurs when simultaneous keystrokes inadvertently cause the keyboard's internal circuitry matrix to misinterpret or drop signals. Many budget and laptop keyboards exhibit ghosting limit constraints, particularly for combinations outside the WASD cluster.
              </p>
              <div className="p-4 bg-muted/20 border border-border rounded-lg mt-4">
                <strong className="text-card-foreground text-xs uppercase tracking-wider mb-2 block">Browser Limitations</strong>
                <p className="text-xs">
                  This test measures simultaneous key events received by your browser. It cannot directly inspect the keyboard's electrical matrix. If a combination fails to register, it may indicate hardware ghosting, but it could also be caused by standard USB rollover limits or operating-system shortcut interception.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Reset Button */}
        <div className="w-full max-w-5xl mt-2">
          <button 
            onClick={reset}
            className="w-full py-3 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            {t('controls.reset')}
          </button>
        </div>

      </main>
    </div>
  );
};

export default GhostingTest;
