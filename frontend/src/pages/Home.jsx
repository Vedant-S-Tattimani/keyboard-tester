import React from 'react';
import { Link } from 'react-router-dom';
import Keyboard from '../components/Keyboard/Keyboard';
import LayoutSelector from '../components/Controls/LayoutSelector';
import ModeSelector from '../components/Controls/ModeSelector';
import DiagnosticSummary from '../components/KeyboardTest/DiagnosticSummary';
import TestHistory from '../components/KeyboardTest/TestHistory';
import ResetButton from '../components/ResetButton';
import { useKeyboard } from '../hooks/useKeyboard';
import { useLayout } from '../hooks/useLayout';
import { useTestHistory } from '../hooks/useTestHistory';
import { getAllModeKeys } from '../components/Keyboard/keyboardUtils';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

function Home() {
  const { t } = useLanguage();
  useSEO({
    title: t('seo.home.title', 'Keyboard Tester – Test Your Keyboard Online | KeyCheck'),
    description: t('seo.home.desc', 'Test your physical keyboard online with instant visual feedback. Check every key, test simultaneous input, and verify your keyboard is working correctly.'),
    url: 'https://keycheck.example.com/'
  });

  const { layout } = useLayout();
  const [mode, setMode] = useState('FULL');
  const { history, saveSession, clearHistory } = useTestHistory();
  
  const { 
    pressedKeys, 
    testedKeys, 
    status,
    elapsedTime,
    requiredKeys,
    requiredTestedCount,
    totalRequired,
    completionPercentage,
    reset,
    finishTest
  } = useKeyboard(layout, mode);

  const activeModeKeys = getAllModeKeys(layout, mode);

  // Prevent duplicate saves using a ref
  const hasSavedSession = useRef(false);

  useEffect(() => {
    if (status === 'NOT STARTED' || status === 'TESTING') {
      hasSavedSession.current = false;
    } else if ((status === 'COMPLETE' || status === 'INCOMPLETE' || status === 'POSSIBLE ISSUE') && !hasSavedSession.current) {
      saveSession({
        startedAt: new Date(),
        completedAt: new Date(),
        selectedLayout: layout,
        mode: mode,
        testedKeys: requiredTestedCount,
        totalKeys: totalRequired,
        completionPercentage,
        elapsedTime,
        status
      });
      hasSavedSession.current = true;
    }
  }, [status, layout, mode, requiredTestedCount, totalRequired, completionPercentage, elapsedTime, saveSession]);

  return (
    <div className="w-full p-8 flex flex-col items-center">
      
      <header className="mb-12 text-center max-w-2xl mx-auto space-y-4 mt-4 md:mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">{t('home.title')}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {t('home.subtitle')}
        </p>
      </header>
      
      <main id="main-content" className="w-full flex flex-col items-center gap-4">
        <div className="w-full max-w-max mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-2">
          <LayoutSelector />
          <ModeSelector activeMode={mode} onChange={setMode} />
        </div>
        <Keyboard 
          pressedKeys={pressedKeys} 
          testedKeys={testedKeys} 
          activeModeKeys={activeModeKeys}
        />
        
        <div className="w-full max-w-5xl mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <DiagnosticSummary 
              status={status}
              testedCount={requiredTestedCount}
              totalRequired={totalRequired}
              completionPercentage={completionPercentage}
              elapsedTime={elapsedTime}
              layout={layout}
              modeId={mode}
              requiredKeys={requiredKeys}
              testedKeys={testedKeys}
              onReset={reset}
              onFinish={finishTest}
            />
          </div>
          <div className="md:col-span-1">
            <ResetButton onReset={reset} />
          </div>
        </div>

        <div className="w-full max-w-5xl">
          <TestHistory history={history} onClear={clearHistory} />
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-24 border-t border-border/50 pt-12 text-center">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">{t('footer.whatCanYouTest')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          <Link to="/" className="p-6 bg-card border border-primary/20 rounded-xl hover:border-primary/50 transition-colors shadow-sm cursor-default">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider">{t('nav.keyboardTest')}</h3>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase rounded-sm">{t('footer.primary')}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.keyboardTestDesc')}</p>
          </Link>
          <Link to="/ghosting-test" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('nav.multiKeyTest')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.multiKeyTestDesc')}</p>
          </Link>
          <Link to="/typing-test" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('nav.typingTest')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.typingTestDesc')}</p>
          </Link>
          <Link to="/event-inspector" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('inspector.title')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.eventInspectorDesc')}</p>
          </Link>
          <Link to="/compare" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('history.compare')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.compareDesc')}</p>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-muted/20 border border-border rounded-xl text-start max-w-3xl mx-auto space-y-4">
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">{t('footer.howItWorks')}</h3>
          <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-2">
            <li>{t('footer.step1')}</li>
            <li>{t('footer.step2')}</li>
            <li>{t('footer.step3')}</li>
            <li>{t('footer.step4')}</li>
            <li>{t('footer.step5')}</li>
          </ol>
          
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider mt-6">{t('footer.browserLimitations')}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('footer.limitationsDesc')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
