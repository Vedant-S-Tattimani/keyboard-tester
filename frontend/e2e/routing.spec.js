import { test, expect } from '@playwright/test';

test.describe('Routing E2E', () => {
  const routes = [
    { path: '/', title: 'Test Your Keyboard' },
    { path: '/ghosting-test', title: 'Multi-Key Test' },
    { path: '/typing-test', title: 'Typing Test' },
    { path: '/event-inspector', title: 'Event Inspector' },
    { path: '/compare', title: 'Compare Keyboards' },
  ];

  for (const route of routes) {
    test(`navigates to ${route.path} and persists on refresh`, async ({ page }) => {
      // 1. Navigate directly
      await page.goto(route.path);
      
      // 2. Verify page loads & expected heading content
      // The app has an h1 or identifiable title text for the tool
      await expect(page.locator('h1, h2').filter({ hasText: route.title }).first()).toBeVisible();

      // 3. Refresh
      await page.reload();

      // 4. Verify page still loads
      await expect(page.locator('h1, h2').filter({ hasText: route.title }).first()).toBeVisible();
    });
  }

  test('browser back and forward navigation works without 404s', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1, h2').filter({ hasText: 'Test Your Keyboard' }).first()).toBeVisible();

    // Click the navigation link to Typing Test
    // Depending on actual DOM, usually an <a> or <button> inside a nav bar
    await page.getByRole('link', { name: /typing test/i }).first().click();
    await expect(page).toHaveURL(/.*\/typing-test/);
    await expect(page.locator('h1, h2').filter({ hasText: 'Typing Test' }).first()).toBeVisible();

    // Navigate back
    await page.goBack();
    await expect(page).toHaveURL(/.*\//); // might be just /
    await expect(page.locator('h1, h2').filter({ hasText: 'Test Your Keyboard' }).first()).toBeVisible();

    // Navigate forward
    await page.goForward();
    await expect(page).toHaveURL(/.*\/typing-test/);
    await expect(page.locator('h1, h2').filter({ hasText: 'Typing Test' }).first()).toBeVisible();
  });

  test('invalid route redirects or handles 404 gracefully', async ({ page }) => {
    const response = await page.goto('/invalid-route-that-does-not-exist');
    // For SPA, it usually renders a 404 component or falls back. 
    // We just verify it doesn't crash the browser or return a literal network 404 from the dev server (vite will serve index.html).
    expect(response.status()).toBe(200);
  });

  test('localized subpaths load with translated content', async ({ page }) => {
    // Filipino home
    await page.goto('/fil');
    await expect(page.locator('h1, h2').filter({ hasText: 'Subukan ang Iyong Keyboard' }).first()).toBeVisible();

    // Ukrainian home
    await page.goto('/uk');
    await expect(page.locator('h1, h2').filter({ hasText: 'Перевірте вашу клавіатуру' }).first()).toBeVisible();

    // Thai ghosting test
    await page.goto('/th/ghosting-test');
    await expect(page.locator('h1, h2').filter({ hasText: 'ทดสอบการกดพร้อมกัน' }).first()).toBeVisible();

    // Spanish typing test
    await page.goto('/es/typing-test');
    await expect(page.locator('h1, h2').filter({ hasText: 'Prueba de Mecanografía' }).first()).toBeVisible();
  });

  test('informational pages render translated content for localized routes', async ({ page }) => {
    // Filipino privacy
    await page.goto('/fil/privacy');
    await expect(page.locator('h1').filter({ hasText: 'Patakaran sa Pagkapribado' }).first()).toBeVisible();

    // Thai how testing works
    await page.goto('/th/how-testing-works');
    await expect(page.locator('h1').filter({ hasText: 'การทำงานของการทดสอบคีย์บอร์ด' }).first()).toBeVisible();

    // Ukrainian keyboard limitations
    await page.goto('/uk/keyboard-limitations');
    await expect(page.locator('h1').filter({ hasText: 'Обмеження клавіатури' }).first()).toBeVisible();

    // German keyboard layouts
    await page.goto('/de/keyboard-layouts');
    await expect(page.locator('h1').filter({ hasText: 'Tastaturlayouts' }).first()).toBeVisible();

    // Spanish accessibility
    await page.goto('/es/accessibility');
    await expect(page.locator('h1').filter({ hasText: 'Accesibilidad' }).first()).toBeVisible();
  });

  test('head contains hreflang tags for all 10 target languages and x-default', async ({ page }) => {
    await page.goto('/ghosting-test');

    const expectedLangs = ['en', 'hi', 'fil', 'pt', 'id', 'uk', 'th', 'es', 'fr', 'de', 'x-default'];
    for (const lang of expectedLangs) {
      const link = page.locator(`head link[rel="alternate"][hreflang="${lang}"]`);
      await expect(link).toHaveCount(1);
      const href = await link.getAttribute('href');
      expect(href).toContain(lang === 'x-default' ? '/en/ghosting-test' : `/${lang}/ghosting-test`);
    }

    // Check canonical link
    const canonical = page.locator('head link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });
});
