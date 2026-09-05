import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { SUPPORTED_LANGUAGES } from './index';

describe('Multi-Language Routing & Hreflang Component Test', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    localStorage.clear();
  });

  it('renders English by default at /', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /test your keyboard/i, level: 1 })).toBeDefined();
    expect(document.documentElement.lang).toBe('en');
  });

  it('renders language selector with exactly the 10 target languages', async () => {
    render(<App />);
    const select = screen.getAllByRole('combobox', { name: /language/i })[0];
    const options = Array.from(select.querySelectorAll('option'));
    
    expect(options).toHaveLength(10);
    const codes = options.map((opt) => opt.value);
    expect(codes.sort()).toEqual(['de', 'en', 'es', 'fil', 'fr', 'hi', 'id', 'pt', 'th', 'uk']);

    // Ensure obsolete languages are not present
    expect(codes).not.toContain('ar');
    expect(codes).not.toContain('ja');
    expect(codes).not.toContain('zh');
    expect(codes).not.toContain('ru');
    expect(codes).not.toContain('he');
  });

  it('renders Filipino content when navigating to /fil', async () => {
    window.history.pushState({}, '', '/fil');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /subukan ang iyong keyboard/i, level: 1 })).toBeDefined();
      expect(document.documentElement.lang).toBe('fil');
    });
  });

  it('renders Thai content when navigating to /th', async () => {
    window.history.pushState({}, '', '/th');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /ทดสอบคีย์บอร์ดของคุณ/i, level: 1 })).toBeDefined();
      expect(document.documentElement.lang).toBe('th');
    });
  });

  it('renders Ukrainian content when navigating to /uk', async () => {
    window.history.pushState({}, '', '/uk');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /перевірте свою клавіатуру/i, level: 1 })).toBeDefined();
      expect(document.documentElement.lang).toBe('uk');
    });
  });

  it('renders Indonesian content when navigating to /id', async () => {
    window.history.pushState({}, '', '/id');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /tes keyboard anda/i, level: 1 })).toBeDefined();
      expect(document.documentElement.lang).toBe('id');
    });
  });

  it('changing language via selector changes the route and document language', async () => {
    render(<App />);
    const select = screen.getAllByRole('combobox', { name: /language/i })[0];
    
    fireEvent.change(select, { target: { value: 'fil' } });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/fil');
      expect(document.documentElement.lang).toBe('fil');
    });
  });

  it('injects all 10 hreflang tags plus x-default into head', async () => {
    window.history.pushState({}, '', '/ghosting-test');
    render(<App />);

    await waitFor(() => {
      SUPPORTED_LANGUAGES.forEach(({ code }) => {
        const link = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
        expect(link, `Link for ${code} should exist in document head`).not.toBeNull();
        expect(link.getAttribute('href')).toContain(`/${code}/ghosting-test`);
      });

      const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      expect(xDefault, 'x-default link should exist in head').not.toBeNull();
      expect(xDefault.getAttribute('href')).toContain('/en/ghosting-test');

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical, 'canonical link should exist in head').not.toBeNull();
      expect(canonical.getAttribute('href')).toContain('/en/ghosting-test');
    });
  });
});
