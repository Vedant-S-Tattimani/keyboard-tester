import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useEventInspector } from '../hooks/useEventInspector';
import EventLogTable from '../components/EventInspector/EventLogTable';
import EventDetailsPanel from '../components/EventInspector/EventDetailsPanel';
import DiagnosticSessionPanel from '../components/EventInspector/DiagnosticSessionPanel';
import Keyboard from '../components/Keyboard/Keyboard';
import { useLanguage } from '../contexts/LanguageContext';

const EventInspector = () => {
  const { t } = useLanguage();
  useSEO({
    title: t('seo.inspector.title', 'Keyboard Event Inspector - KeyCheck'),
    description: t('seo.inspector.desc', 'Advanced diagnostic tool for web developers to inspect raw browser keyboard events including key, code, location, and modifier states.'),
    url: 'https://keycheck.example.com/event-inspector'
  });

  const {
    events,
    isPaused,
    pressedKeys,
    counters,
    clearEvents,
    togglePause,
    diagnostic,
    startDiagnostic,
    stopDiagnostic,
    resetDiagnostic
  } = useEventInspector();

  const [selectedEventId, setSelectedEventId] = useState(null);

  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  const handleClear = () => {
    clearEvents();
    setSelectedEventId(null);
  };

  return (
    <div id="main-content" className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300 flex flex-col gap-8">
      
      {/* Header and Controls */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t('inspector.title')}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {t('inspector.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {/* Counters */}
          <div className="flex items-center gap-4 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{t('inspector.eventsLabel', 'Events')}</span>
              <span className="font-mono font-bold">{counters.total}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{t('inspector.keyDownLabel', 'KeyDown')}</span>
              <span className="font-mono font-bold text-blue-500">{counters.keydown}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{t('inspector.keyUpLabel', 'KeyUp')}</span>
              <span className="font-mono font-bold text-orange-500">{counters.keyup}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{t('inspector.repeatsLabel', 'Repeats')}</span>
              <span className="font-mono font-bold">{counters.repeats}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={togglePause}
              className={`px-4 py-1.5 rounded text-sm font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isPaused 
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30' 
                  : 'bg-card text-foreground border-border hover:bg-muted'
              }`}
            >
              {isPaused ? t('inspector.resumeLog') : t('inspector.pauseLog')}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-1.5 bg-card hover:bg-destructive hover:text-destructive-foreground text-foreground border border-border rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('inspector.clearLog')}
            </button>
          </div>
        </div>
      </header>

      <DiagnosticSessionPanel
        diagnostic={diagnostic}
        onStart={startDiagnostic}
        onStop={stopDiagnostic}
        onReset={resetDiagnostic}
      />

      {/* Main Grid: Log and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EventLogTable 
            events={events} 
            selectedEventId={selectedEventId} 
            onSelectEvent={setSelectedEventId} 
          />
        </div>
        <div className="lg:col-span-1">
          <EventDetailsPanel event={selectedEvent} />
        </div>
      </div>

      {/* Visual Keyboard Feedback */}
      <div className="w-full flex flex-col items-center opacity-80 pointer-events-none mt-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">{t('inspector.livePhysicalState', 'Live Physical State')}</span>
        <Keyboard 
          pressedKeys={pressedKeys} 
          testedKeys={new Set()} 
        />
      </div>

      {/* Educational Section */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-4xl mx-auto w-full space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">{t('inspector.understandingEvents', 'Understanding Keyboard Events')}</h2>
          <p className="text-sm text-muted-foreground">
            Web browsers distinguish between the physical key you pressed and the character it produces. 
            This tool helps visualize how those two concepts split inside the Javascript Event API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <h3 className="font-semibold mb-2 font-mono text-sm">event.code</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Represents the <strong>physical key position</strong> identifier on the keyboard hardware, completely ignoring software layout (like QWERTY vs AZERTY) and modifiers (like Shift).
            </p>
            <div className="text-xs font-mono bg-background p-2 rounded border border-border">
              Physical "A" key → "KeyA"
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <h3 className="font-semibold mb-2 font-mono text-sm">event.key</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Represents the <strong>interpreted character value</strong>. This changes based on your operating system's selected language layout and active modifiers (like CapsLock or Shift).
            </p>
            <div className="text-xs font-mono bg-background p-2 rounded border border-border">
              Shift + Physical "A" key → "A" (or "Q" on AZERTY)
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3">
          <div className="text-amber-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-1">System Shortcut Limitations</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Some operating-system and browser shortcuts (such as <kbd className="font-mono bg-background px-1 border border-border rounded">Ctrl+W</kbd>, <kbd className="font-mono bg-background px-1 border border-border rounded">Alt+Tab</kbd>, or Windows/Meta keys) may be intercepted directly by your OS before the webpage ever receives them. 
              The browser cannot bypass these security restrictions. If a key does not log an event here, it is being swallowed by your system sandbox.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EventInspector;
