import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GhostingTest from './pages/GhostingTest';
import TypingTestPage from './pages/TypingTestPage';
import EventInspector from './pages/EventInspector';
import Compare from './pages/Compare';
import NotFound from './pages/NotFound';
import './styles/print.css';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-start bg-background text-foreground overflow-y-auto pb-12">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ghosting-test" element={<GhostingTest />} />
          <Route path="/typing-test" element={<TypingTestPage />} />
          <Route path="/event-inspector" element={<EventInspector />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
