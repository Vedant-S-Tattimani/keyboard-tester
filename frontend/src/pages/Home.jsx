import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Keyboard from '../components/Keyboard/Keyboard';
import LayoutSelector from '../components/Controls/LayoutSelector';
import PlatformSelector from '../components/Controls/PlatformSelector';
import ModeSelector from '../components/Controls/ModeSelector';
import DiagnosticSummary from '../components/KeyboardTest/DiagnosticSummary';
import MouseCheck from '../components/MouseCheck';
import { useKeyboard } from '../hooks/useKeyboard';
import { useLayout } from '../hooks/useLayout';
import { getAllModeKeys } from '../components/Keyboard/keyboardUtils';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../contexts/LanguageContext';
import HomeSeoSection from '../components/HomeSeoSection';

function Home() {
  const { t, getLocalizedPath } = useLanguage();
  useSEO({
    title: t('seo.home.title', 'Keyboard Tester – Test Your Keyboard Online | KeyCheck'),
    description: t('seo.home.desc', 'Test your physical keyboard online with instant visual feedback. Check every key, test simultaneous input, and verify your keyboard is working correctly.'),
    url: 'https://keyboardtester1.com/'
  });

  const { layout } = useLayout();
  const [mode, setMode] = useState('FULL');
  
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

  return (
    <div className="w-full p-8 flex flex-col items-center">
      
      <header className="mb-12 text-center max-w-2xl mx-auto space-y-4 mt-4 md:mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">{t('home.title')}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {t('home.subtitle')}
        </p>
      </header>
      
      <main id="main-content" className="w-full flex flex-col items-center gap-4">
        <div className="w-full max-w-[1240px] flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
          {/* Master Unified Controls Bar */}
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border shadow-sm flex-wrap justify-center md:justify-start">
            <LayoutSelector embedded />
            <div className="h-6 w-[1.5px] bg-neutral-400 dark:bg-neutral-500 mx-1.5 self-center shrink-0" />
            <PlatformSelector embedded />
            <div className="h-6 w-[1.5px] bg-neutral-400 dark:bg-neutral-500 mx-1.5 self-center shrink-0" />
            <ModeSelector activeMode={mode} onChange={setMode} embedded />
          </div>

          {/* Standalone Reset Button at EXTREME RIGHT */}
          <button
            onClick={reset}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-card hover:bg-muted text-foreground border border-border shadow-sm transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/40 shrink-0"
            aria-label="Reset keyboard test"
          >
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{t('controls.reset', 'Reset')}</span>
          </button>
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
            <MouseCheck />
          </div>
        </div>

        {/* Companion Screen Testing Banner */}
        <div className="w-full max-w-5xl mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-card via-card to-primary/10 border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:border-primary/40">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/25 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-primary">
                  {t('home.screenBannerBadge', 'Companion Hardware Tool')}
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-primary/15 text-primary border border-primary/20">
                  {t('home.screenBannerFree', 'Online Free')}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {t('home.screenBannerTitle', 'Testing Your Monitor Or Display?')}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t('home.screenBannerDesc', 'Check for dead pixels, backlight bleed, color calibration, and screen refresh rate online with Screen Tester.')}
              </p>
            </div>
          </div>
          <a
            href="https://screen-tester.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-sm group hover:scale-[1.02]"
          >
            <span>{t('home.screenBannerCta', 'Launch Screen Tester')}</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <HomeSeoSection />
      </main>

      <footer className="w-full max-w-5xl mt-24 border-t border-border/50 pt-12 text-center">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">{t('footer.whatCanYouTest')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          <Link to={getLocalizedPath('/')} className="p-6 bg-card border border-primary/20 rounded-xl hover:border-primary/50 transition-colors shadow-sm cursor-default">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider">{t('nav.keyboardTest')}</h3>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase rounded-sm">{t('footer.primary')}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.keyboardTestDesc')}</p>
          </Link>
          <Link to={getLocalizedPath('/ghosting-test')} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('nav.multiKeyTest')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.multiKeyTestDesc')}</p>
          </Link>
          <Link to={getLocalizedPath('/typing-test')} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('nav.typingTest')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.typingTestDesc')}</p>
          </Link>
          <Link to={getLocalizedPath('/event-inspector')} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('inspector.title')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.eventInspectorDesc')}</p>
          </Link>
          <Link to={getLocalizedPath('/compare')} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-2">{t('history.compare')}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('footer.compareDesc')}</p>
          </Link>
          <a 
            href="https://screen-tester.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all shadow-sm group hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                    {t('footer.screenTester', 'Screen Tester')}
                  </h3>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-sm">
                    {t('footer.displayBadge', 'Display')}
                  </span>
                </div>
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('footer.screenTesterDesc', 'Test your monitor for dead pixels, screen burn-in, color accuracy, and refresh rate online at screen-tester.com.')}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-primary gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>screen-tester.com</span>
              <span>&rarr;</span>
            </div>
          </a>
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
