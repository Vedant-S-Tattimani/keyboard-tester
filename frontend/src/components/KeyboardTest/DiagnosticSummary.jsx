import React, { useState } from 'react';
import RemainingKeys from './RemainingKeys';
import DiagnosticReport from '../DiagnosticReport/DiagnosticReport';
import { TEST_MODES } from '../Keyboard/keyboardModes';
import { useLanguage } from '../../contexts/LanguageContext';

const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

const DiagnosticSummary = ({ 
  status, 
  testedCount, 
  totalRequired, 
  completionPercentage, 
  elapsedTime, 
  layout,
  modeId,
  requiredKeys,
  testedKeys,
  onReset,
  onFinish
}) => {
  const { t } = useLanguage();
  const [showReport, setShowReport] = useState(false);

  let statusColor = 'text-muted-foreground';
  let statusMessage = t('summary.status.notStarted');

  if (status === 'TESTING') {
    statusColor = 'text-blue-500';
    statusMessage = t('summary.status.testing');
  } else if (status === 'COMPLETE') {
    statusColor = 'text-green-500';
    statusMessage = t('summary.status.complete');
  } else if (status === 'INCOMPLETE') {
    statusColor = 'text-yellow-500';
    statusMessage = t('summary.status.incomplete');
  } else if (status === 'POSSIBLE ISSUE') {
    statusColor = 'text-red-500';
    statusMessage = t('summary.status.issue');
  }

  const isFinished = status === 'COMPLETE' || status === 'INCOMPLETE' || status === 'POSSIBLE ISSUE';

  return (
    <div className="w-full flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Diagnostic Summary</h2>
          <p aria-live="polite" className={`text-sm font-bold ${statusColor}`}>{statusMessage}</p>
        </div>
        <div className="text-end">
          <span className="block text-2xl font-mono font-bold text-primary leading-none">{formatTime(elapsedTime)}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{t('summary.time')}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('summary.coverage')}</span>
          <span className="text-lg font-mono font-semibold">{testedCount} <span className="text-muted-foreground text-sm">/ {totalRequired}</span></span>
        </div>
        <div>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Completion</span>
          <span className="text-lg font-mono font-semibold">{completionPercentage}%</span>
        </div>
        <div>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Mode</span>
          <span className="text-lg font-mono font-semibold">{TEST_MODES[modeId]?.label || 'Full'}</span>
        </div>
        <div>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Layout</span>
          <span className="text-lg font-mono font-semibold">{layout}</span>
        </div>
      </div>
      
      {!isFinished && (
        <div className="mb-6 p-3 bg-muted/20 border border-border/50 rounded-lg text-center">
          <span className="text-xs font-bold text-card-foreground uppercase tracking-wider block mb-1">Guided Testing</span>
          <p className="text-xs text-muted-foreground">
            {TEST_MODES[modeId]?.description || 'Test every supported key.'}
          </p>
        </div>
      )}

      {!isFinished && status === 'TESTING' && (
        <button 
          onClick={onFinish}
          className="mb-4 w-full py-2 bg-secondary/50 text-secondary-foreground hover:bg-secondary rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
        >
          {t('summary.finishTest')}
        </button>
      )}

      {isFinished && status !== 'COMPLETE' && !showReport && (
        <RemainingKeys requiredKeys={requiredKeys} testedKeys={testedKeys} />
      )}

      {isFinished && !showReport && (
        <div className="mt-4 flex gap-3">
          <button 
            onClick={onReset}
            className="flex-1 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md font-bold uppercase tracking-wider transition-colors"
          >
            Test Again
          </button>
          <button 
            onClick={() => setShowReport(true)}
            className="flex-1 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold uppercase tracking-wider transition-colors"
          >
            Generate Report
          </button>
        </div>
      )}

      {showReport && (
        <DiagnosticReport 
          testState={{ 
            layout, 
            mode: TEST_MODES[modeId]?.label || 'Full', 
            status, 
            requiredTestedCount: testedCount, 
            totalRequired, 
            completionPercentage, 
            elapsedTime, 
            requiredKeys, 
            testedKeys 
          }}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};

export default DiagnosticSummary;
