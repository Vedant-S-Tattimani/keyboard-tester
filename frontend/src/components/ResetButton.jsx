import React from 'react';

const ResetButton = ({ onReset }) => {
  return (
    <div className="flex flex-col p-6 bg-card border border-border rounded-xl shadow-sm justify-between">
      <div>
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Controls</h2>
        <button 
          onClick={onReset}
          className="w-full py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Reset Test
        </button>
      </div>
      
      <div className="mt-6 text-[11px] text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-lg border border-border/50">
        <strong className="block mb-1">Privacy Statement</strong>
        Keyboard input is processed locally in your browser. Individual key presses are never sent to our server.
      </div>
    </div>
  );
};

export default ResetButton;
