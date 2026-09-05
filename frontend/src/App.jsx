import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SoundProvider } from './contexts/SoundContext';
import Header from './components/Header';
import Home from './pages/Home';
import GhostingTest from './pages/GhostingTest';
import TypingTestPage from './pages/TypingTestPage';
import EventInspector from './pages/EventInspector';
import Compare from './pages/Compare';
import NotFound from './pages/NotFound';
import KeyboardLimitations from './pages/KeyboardLimitations';
import HowTestingWorks from './pages/HowTestingWorks';
import KeyboardLayouts from './pages/KeyboardLayouts';
import Accessibility from './pages/Accessibility';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import './styles/print.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <Router>
            <div className="min-h-screen flex flex-col items-center justify-start bg-background text-foreground overflow-y-auto pb-12 transition-colors duration-200">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-bold focus:uppercase focus:tracking-wider"
              >
                Skip to main content
              </a>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ghosting-test" element={<GhostingTest />} />
                <Route path="/typing-test" element={<TypingTestPage />} />
                <Route path="/event-inspector" element={<EventInspector />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/keyboard-limitations" element={<KeyboardLimitations />} />
                <Route path="/how-testing-works" element={<HowTestingWorks />} />
                <Route path="/keyboard-layouts" element={<KeyboardLayouts />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
