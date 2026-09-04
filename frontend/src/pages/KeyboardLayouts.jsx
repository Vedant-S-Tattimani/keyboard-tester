import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const KeyboardLayouts = () => {
  const { t } = useLanguage();
  
  useSEO({
    title: t('seo.keyboardLayouts.title', 'Keyboard Layouts — Physical vs Logical Key Mapping'),
    description: t('seo.keyboardLayouts.desc', 'Explore how different physical keyboard layouts (QWERTY, AZERTY, etc.) interact with operating systems and browser events.'),
    url: 'https://keycheck.example.com/keyboard-layouts'
  });

  return (
    <main id="main-content" className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{t('footer.keyboardLayouts', 'Keyboard Layouts')}</h1>
        <p className="text-xl text-muted-foreground">Understanding Physical, Logical, and Visual Key Mappings.</p>
      </header>

      <section className="space-y-8 text-foreground/90 leading-relaxed">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">The Three Layers of a Layout</h2>
          <p className="mb-4">
            When diagnosing keyboard issues, it's critical to understand that a "Keyboard Layout" actually refers to three separate layers working together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">1. Physical Layout</h3>
              <p className="text-sm">The actual arrangement and shape of the plastic keys on your board (e.g., ANSI, ISO, JIS). This determines if your Enter key is horizontal or L-shaped.</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">2. Visual Legends</h3>
              <p className="text-sm">The letters printed on the keycaps (e.g., QWERTY, AZERTY, Dvorak). This is purely cosmetic and tells the user what to press.</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border/50 rounded-lg">
              <h3 className="font-bold text-primary mb-2">3. Logical OS Layout</h3>
              <p className="text-sm">The software setting in Windows/macOS that translates hardware scan codes into actual characters. This is the ultimate source of truth for what character appears on screen.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">Supported Visual Layouts in KeyCheck</h2>
          <p className="mb-4">
            Our tool allows you to switch the on-screen visual layout to match your physical keyboard. Currently supported layouts include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>QWERTY:</strong> The standard layout used in the US, UK, and many other regions.</li>
            <li><strong>AZERTY:</strong> Commonly used in France and Belgium. Note the swapped A/Q and Z/W keys.</li>
            <li><strong>QWERTZ:</strong> Used widely in Central Europe, particularly Germany.</li>
            <li><strong>Dvorak:</strong> An alternative ergonomic layout designed to increase typing speed.</li>
            <li><strong>Colemak:</strong> A modern ergonomic alternative that maintains some QWERTY similarities.</li>
          </ul>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2 text-amber-500">Why doesn't the key I pressed match the screen?</h2>
          <p className="text-sm">
            Web browsers rely on standard <code>KeyboardEvent.code</code> mapping. If you have a physical AZERTY keyboard, but your OS is set to a QWERTY logical layout, pressing the physical 'A' key (top row) will output 'Q' to the computer. KeyCheck primarily highlights keys based on their physical location on a standard board, not the letter printed on your plastic keycap. 
          </p>
          <p className="text-sm mt-2">
            To test your specific configuration, ensure both the on-screen Layout selector in KeyCheck and your OS language settings match your physical keyboard.
          </p>
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

export default KeyboardLayouts;
