import React, { useState } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import LayoutSelector from '../Controls/LayoutSelector';
import ModeSelector from '../Controls/ModeSelector';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useLayout } from '../../hooks/useLayout';
import { getAllModeKeys } from '../Keyboard/keyboardUtils';
import ResetButton from '../ResetButton';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const CompareTestArea = ({ label, onSave }) => {
  const { layout } = useLayout();
  const [mode, setMode] = useState('FULL');
  
  const { 
    pressedKeys, 
    testedKeys, 
    status,
    elapsedTime,
    requiredTestedCount,
    totalRequired,
    completionPercentage,
    reset,
    finishTest
  } = useKeyboard(layout, mode);

  const activeModeKeys = getAllModeKeys(layout, mode);

  const handleSave = () => {
    // If testing wasn't fully finished but they click save, mark it
    if (status === 'TESTING') {
      finishTest();
    }
    
    // Pass raw Set of tested key codes so we can compare them later
    onSave({
      label,
      layout,
      mode,
      testedKeys: requiredTestedCount,
      totalKeys: totalRequired,
      completionPercentage,
      duration: elapsedTime,
      status: status === 'NOT STARTED' ? 'INCOMPLETE' : (status === 'TESTING' ? 'INCOMPLETE' : status),
      rawTestedKeys: Array.from(testedKeys)
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      
      {/* Controls */}
      <div className="w-full max-w-max mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <LayoutSelector />
        <ModeSelector activeMode={mode} onChange={setMode} />
      </div>
      
      {/* Visual Keyboard */}
      <Keyboard 
        pressedKeys={pressedKeys} 
        testedKeys={testedKeys} 
        activeModeKeys={activeModeKeys}
      />
      
      {/* Summary & Save */}
      <div className="w-full max-w-4xl bg-muted/10 border border-border/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
         
         <div className="flex gap-8">
            <div>
               <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Status</span>
               <span className="font-mono font-bold text-sm">{status}</span>
            </div>
            <div>
               <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Coverage</span>
               <span className="font-mono font-bold text-sm">{requiredTestedCount} / {totalRequired} ({completionPercentage}%)</span>
            </div>
            <div>
               <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Duration</span>
               <span className="font-mono font-bold text-sm">{formatTime(elapsedTime)}</span>
            </div>
         </div>

         <div className="flex gap-2">
            <ResetButton onReset={reset} />
            <button 
               onClick={handleSave}
               disabled={status === 'NOT STARTED'}
               className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
               Save {label} Result
            </button>
         </div>

      </div>
    </div>
  );
};

export default CompareTestArea;
