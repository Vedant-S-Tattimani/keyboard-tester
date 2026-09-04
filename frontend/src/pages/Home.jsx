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
import { useEffect, useRef, useState } from 'react';

function Home() {
  useSEO({
    title: 'Keyboard Tester – Test Your Keyboard Online | KeyCheck',
    description: 'Test your physical keyboard online with instant visual feedback. Check every key, test simultaneous input, and verify your keyboard is working correctly.',
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
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Test Your Keyboard</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Check every key on your physical keyboard with instant visual feedback. <br/>
          Press any key to begin testing.
        </p>
      </header>
      
      <main className="w-full flex flex-col items-center gap-4">
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
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">What Can You Test?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <Link to="/" className="p-6 bg-card border border-primary/20 rounded-xl hover:border-primary/50 transition-colors shadow-sm cursor-default">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider">Keyboard Test</h3>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase rounded-sm">Primary</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Check individual keys and verify that they correctly register in your browser.</p>
          </Link>
          <Link to="/ghosting-test" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">Multi-Key Test</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Test simultaneous key input and observe browser-level rollover and ghosting behavior.</p>
          </Link>
          <Link to="/typing-test" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">Typing Test</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Measure typing speed and accuracy using a structured text passage.</p>
          </Link>
          <Link to="/event-inspector" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">Event Inspector</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Inspect browser keyboard events directly and monitor how they are dispatched.</p>
          </Link>
          <Link to="/compare" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">Compare</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Compare two separate keyboard test sessions to evaluate differences in layout or coverage.</p>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-muted/20 border border-border rounded-xl text-left max-w-3xl mx-auto space-y-4">
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">How It Works</h3>
          <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-2">
            <li>Press a key on your physical keyboard.</li>
            <li>The browser receives the key event.</li>
            <li>The corresponding physical key is highlighted.</li>
            <li>Test all available keys.</li>
            <li>Review the diagnostic result.</li>
          </ol>
          
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider mt-6">Browser Limitations</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Websites can detect keyboard events exposed by the browser, but cannot directly inspect the keyboard's electrical circuitry or switch hardware. Some system-level keys (like F1, F5, or PrintScreen) may behave differently or be blocked depending on your operating system and browser combination.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
