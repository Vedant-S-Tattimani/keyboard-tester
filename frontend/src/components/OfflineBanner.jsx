import React, { useState, useEffect } from 'react';

function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <aside 
        role="status" 
        aria-live="polite"
        className="w-full bg-amber-500/15 border-b border-amber-500/30 text-amber-800 dark:text-amber-300 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 sticky top-0 z-[60] backdrop-blur-md transition-all animate-in fade-in slide-in-from-top duration-300"
      >
        <svg 
          className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 000-5.656m-7.07 0a4 4 0 000 5.656m-3.536 3.536a9 9 0 010-12.728M12 12h.01" />
        </svg>
        <span>
          <strong>Offline Mode:</strong> Internet connection lost. You can continue testing your keyboard locally.
        </span>
      </aside>
    );
  }

  if (showReconnected) {
    return (
      <aside 
        role="status" 
        aria-live="polite"
        className="w-full bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-800 dark:text-emerald-300 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 sticky top-0 z-[60] backdrop-blur-md transition-all animate-in fade-in slide-in-from-top duration-300"
      >
        <svg 
          className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>
          <strong>Back Online:</strong> Internet connection restored.
        </span>
      </aside>
    );
  }

  return null;
}

export default OfflineBanner;
