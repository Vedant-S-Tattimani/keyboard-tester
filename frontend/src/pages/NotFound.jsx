import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const NotFound = () => {
  useSEO({
    title: 'Page Not Found | KeyCheck',
    description: 'The page you are looking for does not exist.',
    url: 'https://keyboardtester1.com/404'
  });

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-8xl font-black text-muted mb-2">404</h1>
      <h2 className="text-4xl font-bold tracking-tight text-primary uppercase mb-4">Page Not Found</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-md transition-colors hover:bg-primary/90"
      >
        Back to Keyboard Test
      </Link>
    </div>
  );
};

export default NotFound;
