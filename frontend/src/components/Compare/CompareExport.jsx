import React from 'react';
import { downloadJSON } from '../../utils/reportUtils';

const CompareExport = ({ kA, kB }) => {
  if (!kA || !kB) return null;

  const handleDownload = () => {
    const isDirectComparison = kA.layout === kB.layout && kA.mode === kB.mode;
    
    // Create an aggregate data object to export without raw events
    const reportData = {
      reportVersion: 1,
      generatedAt: new Date().toISOString(),
      comparisonType: isDirectComparison ? 'DIRECT' : 'LIMITED',
      comparison: {
        keyboardA: {
          layout: kA.layout,
          mode: kA.mode,
          testedKeys: kA.testedKeys,
          totalTestableKeys: kA.totalKeys,
          completionPercentage: kA.completionPercentage,
          durationSeconds: kA.duration,
          status: kA.status
        },
        keyboardB: {
          layout: kB.layout,
          mode: kB.mode,
          testedKeys: kB.testedKeys,
          totalTestableKeys: kB.totalKeys,
          completionPercentage: kB.completionPercentage,
          durationSeconds: kB.duration,
          status: kB.status
        }
      }
    };
    
    downloadJSON(reportData, 'keyboard_comparison_report.json');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={handlePrint}
        className="px-4 py-2 bg-card hover:bg-muted/50 border border-border text-foreground font-bold uppercase tracking-wider text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Print / Save PDF
      </button>
      <button 
        onClick={handleDownload}
        className="px-4 py-2 bg-card hover:bg-muted/50 border border-border text-foreground font-bold uppercase tracking-wider text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Download JSON
      </button>
    </div>
  );
};

export default CompareExport;
