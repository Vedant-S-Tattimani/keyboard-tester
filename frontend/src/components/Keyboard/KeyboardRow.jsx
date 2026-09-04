import React from 'react';
import Key from './Key';

const KeyboardRow = ({ keys, pressedKeys, testedKeys, activeModeKeys }) => {
  return (
    <div className="flex justify-start w-full mb-[2px]">
      {keys.map((k, idx) => (
        <Key 
          key={k.code || `spacer-${idx}`} 
          code={k.code} 
          label={k.label} 
          width={k.width} 
          height={k.height}
          spacer={k.spacer}
          isPressed={k.code ? pressedKeys.has(k.code) : false} 
          isTested={k.code ? testedKeys.has(k.code) : false} 
          inMode={activeModeKeys ? (k.code ? activeModeKeys.has(k.code) : false) : true}
        />
      ))}
    </div>
  );
};

export default KeyboardRow;
