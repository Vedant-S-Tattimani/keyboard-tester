import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import CompareTestArea from '../components/Compare/CompareTestArea';
import ComparisonTable from '../components/Compare/ComparisonTable';
import CompareExport from '../components/Compare/CompareExport';
import { useLanguage } from '../contexts/LanguageContext';

const Compare = () => {
  const { t } = useLanguage();
  useSEO({
    title: t('seo.compare.title', 'Compare Keyboards - KeyCheck'),
    description: t('seo.compare.desc', 'Perform separate keyboard tests and compare their browser-observable results like coverage and missing keys.'),
    url: 'https://keyboardtester1.com/compare'
  });

  const [keyboardA, setKeyboardA] = useState(() => {
    try {
      const stored = sessionStorage.getItem('keycheck-compare-session');
      if (stored) {
        const data = JSON.parse(stored);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          return data.keyboardA || null;
        }
      }
      return null;
    } catch { return null; }
  });

  const [keyboardB, setKeyboardB] = useState(() => {
    try {
      const stored = sessionStorage.getItem('keycheck-compare-session');
      if (stored) {
        const data = JSON.parse(stored);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          return data.keyboardB || null;
        }
      }
      return null;
    } catch { return null; }
  });

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const stored = sessionStorage.getItem('keycheck-compare-session');
      if (stored) {
        const data = JSON.parse(stored);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          if (data.keyboardA && data.keyboardB) return 'COMPARISON';
          if (data.keyboardA) return 'B';
        }
      }
    } catch {}
    return 'A';
  });



  // Save to sessionStorage when either changes
  useEffect(() => {
    if (!keyboardA && !keyboardB) {
      sessionStorage.removeItem('keycheck-compare-session');
    } else {
      sessionStorage.setItem('keycheck-compare-session', JSON.stringify({ keyboardA, keyboardB }));
    }
  }, [keyboardA, keyboardB]);

  const handleSaveA = (data) => {
    setKeyboardA(data);
    setActiveTab('B');
  };

  const handleSaveB = (data) => {
    setKeyboardB(data);
    setActiveTab('COMPARISON');
  };

  const handleRetestA = () => {
    setKeyboardA(null);
    setActiveTab('A');
  };

  const handleRetestB = () => {
    setKeyboardB(null);
    setActiveTab('B');
  };

  const handleReset = () => {
    setKeyboardA(null);
    setKeyboardB(null);
    setActiveTab('A');
  };

  return (
    <div id="main-content" className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-300 print:w-full print:max-w-none print:p-0 print:m-0">
      <header className="mb-8 text-center print:text-start print:mb-4">
        <h1 className="text-3xl font-bold tracking-tight uppercase">{t('compare.title', 'Compare Keyboards')}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto mt-2 print:hidden">
          Test two keyboards separately and compare their test coverage and missing keys.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 print:hidden" role="tablist" aria-label="Comparison Views">
         <button 
           role="tab"
           aria-selected={activeTab === 'A'}
           onClick={() => setActiveTab('A')}
           className={`px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeTab === 'A' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:bg-muted/50'}`}
         >
           Keyboard A {keyboardA ? '✓' : ''}
         </button>
         <button 
           role="tab"
           aria-selected={activeTab === 'B'}
           onClick={() => setActiveTab('B')}
           className={`px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeTab === 'B' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:bg-muted/50'}`}
         >
           Keyboard B {keyboardB ? '✓' : ''}
         </button>
         <button 
           role="tab"
           aria-selected={activeTab === 'COMPARISON'}
           onClick={() => setActiveTab('COMPARISON')}
           disabled={!keyboardA && !keyboardB}
           className={`px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeTab === 'COMPARISON' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:bg-muted/50'}`}
         >
           Comparison
         </button>
      </div>

      <div className="w-full bg-card border border-border rounded-xl p-6 shadow-sm print:shadow-none print:border-none print:p-0">
        {activeTab === 'A' && (
          <div className="print:hidden">
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wider text-center">{t('compare.testA', 'Test Keyboard A')}</h2>
            {keyboardA ? (
              <div className="text-center space-y-4">
                 <p className="text-green-500 font-bold">✓ Keyboard A Result Saved</p>
                 <div className="text-sm font-mono text-muted-foreground">Coverage: {keyboardA.testedKeys} / {keyboardA.totalKeys}</div>
                 <button onClick={handleRetestA} className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('compare.retestA', 'Retest Keyboard A')}</button>
                 <button onClick={() => setActiveTab('B')} className="px-4 py-2 ms-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('compare.proceedToB', 'Proceed to Keyboard B')}</button>
              </div>
            ) : (
              <CompareTestArea label="Keyboard A" onSave={handleSaveA} />
            )}
          </div>
        )}

        {activeTab === 'B' && (
          <div className="print:hidden">
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wider text-center">{t('compare.testB', 'Test Keyboard B')}</h2>
            {keyboardB ? (
              <div className="text-center space-y-4">
                 <p className="text-green-500 font-bold">✓ Keyboard B Result Saved</p>
                 <div className="text-sm font-mono text-muted-foreground">Coverage: {keyboardB.testedKeys} / {keyboardB.totalKeys}</div>
                 <button onClick={handleRetestB} className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('compare.retestB', 'Retest Keyboard B')}</button>
                 <button onClick={() => setActiveTab('COMPARISON')} className="px-4 py-2 ms-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('compare.viewComparison', 'View Comparison')}</button>
              </div>
            ) : (
              <CompareTestArea label="Keyboard B" onSave={handleSaveB} />
            )}
          </div>
        )}

        {activeTab === 'COMPARISON' && (
          <div className="flex flex-col gap-8">
            <ComparisonTable kA={keyboardA} kB={keyboardB} />
            <div className="flex justify-between items-center print:hidden">
               <button onClick={handleReset} className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                 Reset Comparison
               </button>
               <CompareExport kA={keyboardA} kB={keyboardB} />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Compare;
