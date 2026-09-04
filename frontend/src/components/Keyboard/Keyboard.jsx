import React from 'react';
import KeyboardRow from './KeyboardRow';
import { layouts } from './layouts';
import { useLayout } from '../../hooks/useLayout';

const Keyboard = ({ pressedKeys, testedKeys, activeModeKeys }) => {
  const { layout } = useLayout();
  const activeLayout = layouts[layout] || layouts['QWERTY'];

  return (
    <div className="w-full max-w-max mx-auto bg-card p-6 rounded-xl border border-border shadow-sm overflow-x-auto relative">
      <div className="min-w-[1100px] flex flex-col">
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
