import React, { useState } from 'react';

const TypingResult = ({ wpm, accuracy, correctCharacters, incorrectCharacters, duration, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const totalCharacters = correctCharacters + incorrectCharacters;

  const handleShare = async () => {
    const resultText = `KeyCheck Typing Test\n${wpm} WPM\n${accuracy}% accuracy\n${duration} seconds\n\nhttps://keycheck.example.com/typing-test`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My KeyCheck Typing Score',
          text: resultText,
        });
      } catch (err) {
        // User cancelled or unsupported, fallback to copy
        if (err.name !== 'AbortError') {
          copyToClipboard(resultText);
        }
      }
    } else {
      copyToClipboard(resultText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-12 bg-card border border-border rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-3xl font-bold tracking-tight text-primary uppercase mb-8">Your Result</h2>
      
      <div className="w-full grid grid-cols-2 gap-8 mb-10 text-center">
        <div className="flex flex-col items-center justify-center p-6 bg-muted/20 border border-border/50 rounded-lg">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">WPM</span>
          <span className="text-6xl font-mono font-bold text-primary">{wpm}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-6 bg-muted/20 border border-border/50 rounded-lg">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Accuracy</span>
          <span className="text-6xl font-mono font-bold text-primary">{accuracy}<span className="text-3xl text-muted-foreground">%</span></span>
        </div>
      </div>

      <div className="w-full flex justify-around mb-10 text-center border-t border-b border-border/50 py-6">
        <div>
          <span className="block text-xl font-mono font-bold">{correctCharacters}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Correct</span>
        </div>
        <div>
          <span className="block text-xl font-mono font-bold text-destructive">{incorrectCharacters}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Incorrect</span>
        </div>
        <div>
          <span className="block text-xl font-mono font-bold">{totalCharacters}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Characters</span>
        </div>
        <div>
          <span className="block text-xl font-mono font-bold">{duration}s</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Duration</span>
        </div>
      </div>

      <div className="w-full flex gap-4">
        <button 
          onClick={handleShare}
          className="flex-1 py-4 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-bold uppercase tracking-wider transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          {copied ? 'Copied ✓' : (navigator.share ? 'Share Result' : 'Copy Result')}
        </button>
        <button 
          onClick={onRestart}
          className="flex-1 py-4 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-bold uppercase tracking-wider transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TypingResult;
