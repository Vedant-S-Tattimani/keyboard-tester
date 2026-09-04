import React from 'react';
import DurationSelector from '../components/TypingTest/DurationSelector';
import Passage from '../components/TypingTest/Passage';
import TypingStats from '../components/TypingTest/TypingStats';
import TypingResult from '../components/TypingTest/TypingResult';
import { useTypingTest } from '../hooks/useTypingTest';
import { useSEO } from '../hooks/useSEO';

const TypingTestPage = () => {
  useSEO({
    title: 'Typing Test – Measure WPM & Accuracy Online | KeyCheck',
    description: 'Take a free online typing test and measure your typing speed, WPM, accuracy, and performance.',
    url: 'https://keycheck.example.com/typing-test'
  });
  const {
    passage,
    userInput,
    duration,
    timeRemaining,
    wpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
    status,
    changeDuration,
    resetTest
  } = useTypingTest();

  if (status === 'finished') {
    return (
      <div className="w-full p-8 mt-12 flex flex-col items-center">
        <TypingResult 
          wpm={wpm}
          accuracy={accuracy}
          correctCharacters={correctCharacters}
          incorrectCharacters={incorrectCharacters}
          duration={duration}
          onRestart={resetTest}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center max-w-2xl mx-auto space-y-2 mt-4 md:mt-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Typing Test</h1>
        <p className="text-muted-foreground text-sm">
          Measure your typing speed and accuracy.
        </p>
      </header>

      <main className="w-full flex flex-col items-center">
        <DurationSelector 
          currentDuration={duration} 
          onSelect={changeDuration} 
          disabled={status !== 'idle'}
        />

        <Passage 
          passage={passage} 
          userInput={userInput} 
          status={status}
        />

        <TypingStats 
          wpm={wpm} 
          accuracy={accuracy} 
          timeRemaining={timeRemaining} 
        />

        <div className="mt-8">
          <button 
            onClick={resetTest}
            className="py-2 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Restart
          </button>
        </div>
      </main>
    </div>
  );
};

export default TypingTestPage;
