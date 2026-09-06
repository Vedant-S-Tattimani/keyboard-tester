import React, { useMemo } from 'react';
import ReportActions from './ReportActions';
import { generateReportData, formatKeyCode } from '../../utils/reportUtils';
import { useLanguage } from '../../contexts/LanguageContext';

const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

const DiagnosticReport = ({ testState, onClose }) => {
  const { t } = useLanguage();
  const reportData = useMemo(() => generateReportData(testState), [testState]);
  const { test, generatedAt } = reportData;
  
  const generatedDate = new Date(generatedAt);
  const formattedDate = generatedDate.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = generatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const dateString = `${formattedDate}, ${formattedTime}`;
  
  const dateStrForFile = generatedDate.toISOString().split('T')[0];
  const filenameMode = test.mode.toLowerCase().replace(/\s+/g, '-');
  const filename = `keyboard-diagnostic-${filenameMode}-${dateStrForFile}.json`;

  const isComplete = test.status === 'COMPLETE';
  
  return (
    <div className="w-full flex flex-col print-report-container">
      {/* 
        This wrapper serves to hide the close button during print 
        and apply the print-specific background.
      */}
      <div className="w-full p-8 bg-card border border-border rounded-xl shadow-sm print-report max-w-2xl mx-auto mt-4">
        
        <div className="flex justify-between items-start mb-8 border-b border-border/50 pb-4 no-print">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{t('report.preview')}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-wider font-bold transition-colors"
          >
            {t('report.close')}
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight uppercase">{t('report.title')}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t('report.generated')} {dateString}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
          <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('report.status')}</span>
            <span className={`text-sm font-bold ${isComplete ? 'text-green-500' : 'text-yellow-500'}`}>
              {isComplete ? t('report.complete') : t('report.incomplete')}
            </span>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('report.coverage')}</span>
            <span className="text-lg font-mono font-bold">{test.testedKeys} / {test.totalTestableKeys}</span>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('summary.completion')}</span>
            <span className="text-lg font-mono font-bold">{test.completionPercentage}%</span>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-muted/10">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('report.duration')}</span>
            <span className="text-lg font-mono font-bold">{formatTime(test.durationSeconds)}</span>
          </div>
        </div>

        <div className="flex justify-around mb-8 border-t border-b border-border/50 py-4">
          <div className="text-center">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('report.testMode')}</span>
            <span className="text-sm font-mono">{test.mode}</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{t('report.layout')}</span>
            <span className="text-sm font-mono">{test.layout}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-border/50 pb-2 mb-4">{t('report.resultTitle')}</h3>
          {isComplete ? (
            <p className="text-sm text-green-500 font-medium">
              {t('report.allPassed')}
            </p>
          ) : (
            <div>
              <p className="text-sm text-yellow-500 font-medium mb-4">
                {t('report.someMissing')}
              </p>
              {test.remainingKeys.length > 0 && (
                <div className="page-break-inside-avoid">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t('report.remainingKeys', { count: test.remainingKeys.length })}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {test.remainingKeys.map(code => (
                      <span key={code} className="inline-flex items-center px-2 py-1 rounded bg-background border border-border text-[10px] font-mono text-muted-foreground">
                        {formatKeyCode(code)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-[10px] text-muted-foreground text-center border-t border-border/50 pt-4 mt-8">
          <p>Browser or operating-system limitations may affect some key events.</p>
          <p>The browser cannot directly inspect electrical hardware.</p>
        </div>

        <ReportActions reportData={reportData} filename={filename} />
      </div>
    </div>
  );
};

export default DiagnosticReport;
