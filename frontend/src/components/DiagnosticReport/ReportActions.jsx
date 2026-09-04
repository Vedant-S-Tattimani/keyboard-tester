import React, { useState } from 'react';
import { downloadJSON, copyToClipboard, shareReport, generateReportText } from '../../utils/reportUtils';

const ReportActions = ({ reportData, filename }) => {
  const [copyStatus, setCopyStatus] = useState('Copy Summary');
  const [shareSupported] = useState(() => typeof navigator !== 'undefined' && !!navigator.share);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadJSON(reportData, filename);
  };

  const handleCopy = async () => {
    const text = generateReportText(reportData);
    const success = await copyToClipboard(text);
    if (success) {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Summary'), 2000);
    }
  };

  const handleShare = async () => {
    const text = generateReportText(reportData);
    await shareReport(text);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6 no-print">
      <button
        onClick={handlePrint}
        className="flex-1 py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
      >
        Print / Save PDF
      </button>
      <button
        onClick={handleDownload}
        className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
      >
        Download JSON
      </button>
      <button
        onClick={handleCopy}
        className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
      >
        {copyStatus}
      </button>
      {shareSupported && (
        <button
          onClick={handleShare}
          className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Share Report
        </button>
      )}
    </div>
  );
};

export default ReportActions;
