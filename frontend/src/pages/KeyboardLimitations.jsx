import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const KeyboardLimitations = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('seo.keyboardLimitations.title', 'Keyboard Limitations — What Browser Keyboard Tests Can Detect'),
    description: t('seo.keyboardLimitations.desc', 'Understand the technical limitations of browser-based keyboard testing, including ghosting, polling rates, and OS-level shortcuts.'),
    url: 'https://keycheck.example.com/keyboard-limitations'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('footer.keyboardLimitations', 'Keyboard Limitations')}</h1>
        <p className="text-xl text-muted-foreground">What browser-based keyboard tests can and cannot detect.</p>
      </header>

      <section className="space-y-8 text-foreground/90 leading-relaxed">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">How Browser Testing Works</h2>
          <p className="mb-4">
            Web-based keyboard testers like KeyCheck operate by listening to DOM events (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">keydown</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-sm">keyup</code>) dispatched by your web browser. When you press a key, the hardware sends a signal to your OS, the OS translates it, and the browser exposes it to the website.
          </p>
          <p>
            Because we sit at the very end of this chain, we can only report what the browser allows us to see.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">What We CAN Detect</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Key presses:</strong> Whether a key successfully registers an input to the computer.</li>
            <li><strong>Physical Location:</strong> Using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">KeyboardEvent.code</code>, we can often determine the physical position of the key pressed (e.g., Left Shift vs Right Shift), regardless of your layout.</li>
            <li><strong>Interpreted Values:</strong> Using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">KeyboardEvent.key</code>, we can see what character your OS intended to type.</li>
            <li><strong>Browser-Level Ghosting:</strong> We can detect if multiple keys are simultaneously registered by the browser using our <Link to="/ghosting-test" className="text-primary hover:underline">Ghosting Test</Link>.</li>
            <li><strong>Modifier States:</strong> Whether Shift, Ctrl, Alt, or Meta are held down.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">What We CANNOT Detect (Hardware Limitations)</h2>
          <p className="mb-4 text-muted-foreground">Browsers do not have direct access to your keyboard's hardware or USB connection. Therefore, we cannot detect:</p>
          <ul className="list-disc list-inside space-y-4 ml-4">
            <li>
              <strong>True Hardware Anti-Ghosting / N-Key Rollover (NKRO):</strong> If your keyboard hardware fails to send a keycode because of a matrix limitation (hardware ghosting), the browser simply receives nothing. We can show you how many keys registered, but we cannot diagnose <em>why</em> a key failed to register at the hardware level.
            </li>
            <li>
              <strong>Switch Health & Electrical Faults:</strong> We cannot tell if a mechanical switch is failing, corroded, or double-clicking (chattering) at the hardware level unless it results in multiple distinct browser events.
            </li>
            <li>
              <strong>USB Polling Rate & Firmware Latency:</strong> Browsers process events through the main thread. Measuring exact millisecond latency or 1000Hz polling rates is impossible via standard web APIs due to OS and browser overhead.
            </li>
            <li>
              <strong>Hardware Debounce:</strong> How the keyboard firmware handles switch bounce is entirely hidden from the PC.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 mt-8">OS and Browser Interception</h2>
          <p className="mb-4">
            Some keys are intercepted by your Operating System or Browser before the website ever sees them. For example:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Fn (Function) Keys:</strong> The <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">Fn</kbd> key is purely hardware-level on most laptops and keyboards. It never sends a scan code to the PC.</li>
            <li><strong>System Shortcuts:</strong> <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">Ctrl+Alt+Del</kbd>, <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">Win+L</kbd> (Windows lock), and macOS power buttons are handled by the OS and cannot be observed.</li>
            <li><strong>Browser Shortcuts:</strong> <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">F5</kbd> (Refresh), <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">Ctrl+T</kbd> (New Tab), and <kbd className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">Ctrl+W</kbd> (Close Tab) are often intercepted by the browser, though we attempt to prevent default behavior where permitted.</li>
          </ul>
        </div>
      </section>
      
      <div className="mt-12 text-center">
        <Link to="/" className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          Go to Keyboard Test
        </Link>
      </div>
    </main>
  );
};

export default KeyboardLimitations;
