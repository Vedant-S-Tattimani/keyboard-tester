import React from 'react';

import { useLanguage } from '../../contexts/LanguageContext';

const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

const TestHistory = ({ history, onClear }) => {
  const { t } = useLanguage();
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full mt-12 mb-8">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{t('history.title')}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your local test history?')) {
                onClear();
              }
            }}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('history.clear')}
          </button>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-start">
            <thead className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/20 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Layout</th>
                <th className="px-4 py-3 font-semibold text-center">Coverage</th>
                <th className="px-4 py-3 font-semibold">Mode</th>
                <th className="px-4 py-3 font-semibold text-center">Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((session, i) => {
                const dateObj = new Date(session.completedAt || session.startedAt);
                const isToday = new Date().toDateString() === dateObj.toDateString();
                const displayDate = isToday 
                  ? `Today, ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                  : dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

                return (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3 text-card-foreground whitespace-nowrap">{displayDate}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{session.selectedLayout}</td>
                    <td className="px-4 py-3 font-mono text-center">
                      <span className={session.completionPercentage === 100 ? 'text-green-500 font-bold' : ''}>
                        {session.testedKeys} / {session.totalKeys}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{session.mode || 'FULL'}</td>
                    <td className="px-4 py-3 font-mono text-center text-muted-foreground">{formatTime(session.elapsedTime)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        session.status === 'COMPLETE' ? 'bg-green-500/10 text-green-500' :
                        session.status === 'INCOMPLETE' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {session.status === 'COMPLETE' ? t('summary.status.complete') : session.status === 'INCOMPLETE' ? t('summary.status.incomplete') : t('summary.status.issue')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestHistory;
