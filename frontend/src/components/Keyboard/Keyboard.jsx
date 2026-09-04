import React from 'react';
import KeyboardRow from './KeyboardRow';
import { layouts } from './layouts';
import { useLayout } from '../../hooks/useLayout';

const Keyboard = ({ pressedKeys, testedKeys, activeModeKeys }) => {
  const { layout } = useLayout();
  const activeLayout = layouts[layout] || layouts['QWERTY'];

  return (
    <div className="w-full @container mx-auto bg-card p-2 sm:p-6 rounded-xl border border-border shadow-sm flex justify-center relative" dir="ltr">
      <div className="flex flex-col" style={{ fontSize: 'clamp(4px, 1.25cqw, 16px)' }}>
        {activeLayout.map((row, index) => (
          <KeyboardRow 
            key={`row-${index}`} 
            keys={row} 
            pressedKeys={pressedKeys} 
            testedKeys={testedKeys} 
            activeModeKeys={activeModeKeys}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
