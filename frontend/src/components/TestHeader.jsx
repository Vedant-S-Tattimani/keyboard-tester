import React from 'react';

const TestHeader = () => {
  return (
    <header className="mb-8 text-center max-w-2xl mx-auto space-y-2 mt-4 md:mt-12">
      <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Test Your Keyboard</h1>
      <p className="text-muted-foreground text-sm">
        Press any key to begin testing.
      </p>
    </header>
  );
};

export default TestHeader;
