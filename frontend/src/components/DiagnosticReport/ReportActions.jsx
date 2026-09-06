import React, { useState } from 'react';
import { downloadJSON, copyToClipboard, shareReport, generateReportText } from '../../utils/reportUtils';
import { useLanguage } from '../../contexts/LanguageContext';

const ReportActions = ({ reportData, filename }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        className="flex-1 py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t('report.printPdf')}
      </button>
      <button
        onClick={handleDownload}
        className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t('report.downloadJson')}
      </button>
      <button
        onClick={handleCopy}
        className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {copied ? t('report.copied') : t('report.copySummary')}
      </button>
      {shareSupported && (
        <button
          onClick={handleShare}
          className="flex-1 py-2 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-md text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t('report.shareReport')}
        </button>
      )}
    </div>
  );
};

export default ReportActions;
