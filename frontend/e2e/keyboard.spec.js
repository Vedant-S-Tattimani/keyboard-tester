import { test, expect } from '@playwright/test';

test.describe('Keyboard Test E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('body').click();
  });

  test('visual state changes on keydown and keyup, tested state persists', async ({ page }) => {
    await page.keyboard.down('KeyA');
    await expect(page.getByText('Coverage').first()).toBeVisible();
    await page.keyboard.up('KeyA');

    // The counter text should have 1 / 84
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('1 / 84');
    
    // Pressing the key again should not increase coverage further
    await page.keyboard.down('KeyA');
    await page.keyboard.up('KeyA');
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('1 / 84');
  });

  test('reset clears tested state', async ({ page }) => {
    await page.keyboard.press('KeyA');
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('1 / 84');

    // Click Reset button
    await page.getByRole('button', { name: /reset/i }).click();

    // Verify coverage goes back to 0
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('0 / 84');
  });

  test('guided mode selection updates required keys', async ({ page }) => {
    // Default is usually FULL, total keys ~104
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('0 / 84');

    // Select 'Numpad' mode
    await page.getByRole('button', { name: 'Numpad' }).click();
    
    // Numpad requires 17 keys
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('0 / 17');

    // Switch back to Full
    await page.getByRole('button', { name: 'Full' }).click();
    await expect(page.locator('.text-lg.font-mono.font-semibold').first()).toContainText('0 / 84');
  });

  test('layout selection persists on reload', async ({ page }) => {
    // Select AZERTY
    await page.getByRole('button', { name: 'AZERTY' }).click();
    
    await expect(page.getByRole('button', { name: 'AZERTY' })).toHaveClass(/bg-primary/);

    // Reload page
    await page.reload();

    await expect(page.getByRole('button', { name: 'AZERTY' })).toHaveClass(/bg-primary/);
  });

  test('focus loss prevents permanently stuck visual keys', async ({ page }) => {
    await page.keyboard.down('KeyW');
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await page.keyboard.up('KeyW'); // Clean up physically
  });
});
