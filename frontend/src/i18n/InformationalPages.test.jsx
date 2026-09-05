import React from 'react';
import { render, screen, waitFor, cleanup, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from '../App';

describe('Informational Pages Multi-Language Content Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders Filipino translated content for Privacy page at /fil/privacy', async () => {
    window.history.pushState({}, '', '/fil/privacy');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /Patakaran sa Pagkapribado/i })).toBeDefined();
      expect(within(main).getByText(/Ang input sa keyboard ay nananatili sa iyong browser/i)).toBeDefined();
      expect(within(main).getByText(/Ang Maikling Bersyon/i)).toBeDefined();
      expect(within(main).getByText(/Lokal na Pagproseso/i)).toBeDefined();
    });
  });

  it('renders Thai translated content for How Testing Works at /th/how-testing-works', async () => {
    window.history.pushState({}, '', '/th/how-testing-works');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /การทำงานของการทดสอบคีย์บอร์ด/i })).toBeDefined();
      expect(within(main).getByText(/ทำความเข้าใจกลไกการวินิจฉัยปุ่มคีย์บอร์ดผ่านเว็บเบราว์เซอร์/i)).toBeDefined();
      expect(within(main).getByText(/การกดปุ่มจริงทางกายภาพ/i)).toBeDefined();
      expect(within(main).getByText(/การแปลงรหัสของระบบปฏิบัติการ/i)).toBeDefined();
    });
  });

  it('renders Ukrainian translated content for Keyboard Limitations at /uk/keyboard-limitations', async () => {
    window.history.pushState({}, '', '/uk/keyboard-limitations');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /Обмеження клавіатури/i })).toBeDefined();
      expect(within(main).getByText(/Що браузерні тести клавіатури можуть і чого не можуть виявити/i)).toBeDefined();
      expect(within(main).getByText(/Як працює тестування в браузері/i)).toBeDefined();
      expect(within(main).getByText(/Що ми МОЖЕМО виявити/i)).toBeDefined();
    });
  });

  it('renders German translated content for Keyboard Layouts at /de/keyboard-layouts', async () => {
    window.history.pushState({}, '', '/de/keyboard-layouts');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /Tastaturlayouts/i })).toBeDefined();
      expect(within(main).getByText(/Physische, logische und visuelle Tastenzuordnungen verstehen/i)).toBeDefined();
      expect(within(main).getByText(/Die Drei Ebenen eines Layouts/i)).toBeDefined();
      expect(within(main).getByText(/Unterstützte Visuelle Layouts in KeyCheck/i)).toBeDefined();
    });
  });

  it('renders Spanish translated content for Accessibility at /es/accessibility', async () => {
    window.history.pushState({}, '', '/es/accessibility');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /Accesibilidad/i })).toBeDefined();
      expect(within(main).getByText(/Nuestro compromiso con diagnósticos de teclado inclusivos/i)).toBeDefined();
      expect(within(main).getByText(/Estado de conformidad/i)).toBeDefined();
      expect(within(main).getByText(/Características de accesibilidad/i)).toBeDefined();
    });
  });

  it('renders Hindi translated content for Privacy at /hi/privacy', async () => {
    window.history.pushState({}, '', '/hi/privacy');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /गोपनीयता नीति/i })).toBeDefined();
      expect(within(main).getByText(/कीबोर्ड इनपुट आपके ब्राउज़र में ही रहता है/i)).toBeDefined();
      expect(within(main).getByText(/संक्षिप्त विवरण/i)).toBeDefined();
    });
  });

  it('renders Portuguese translated content for Keyboard Limitations at /pt/keyboard-limitations', async () => {
    window.history.pushState({}, '', '/pt/keyboard-limitations');
    render(<App />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(within(main).getByRole('heading', { level: 1, name: /Limitações do Teclado/i })).toBeDefined();
      expect(within(main).getByText(/O que os testes de teclado baseados em navegador podem e não podem detectar/i)).toBeDefined();
      expect(within(main).getByText(/Como Funciona o Teste no Navegador/i)).toBeDefined();
    });
  });
});
