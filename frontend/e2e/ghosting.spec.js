import { test, expect } from '@playwright/test';

test.describe('Ghosting / Multi-Key E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ghosting-test');
  });

  test('tracks active and peak simultaneous keys', async ({ page }) => {
    // Assert initial state
    await expect(page.getByText('0 Held')).toBeVisible();
    await expect(page.getByText('0', { exact: true }).first()).toBeVisible();

    // Press W, A, S, D simultaneously
    await page.keyboard.down('KeyW');
    await page.keyboard.down('KeyA');
    
    await expect(page.getByText('2 Held')).toBeVisible();

    await page.keyboard.down('KeyS');
    await page.keyboard.down('KeyD');

    await expect(page.getByText('4 Held')).toBeVisible();

    // Release one key
    await page.keyboard.up('KeyW');
    
    await expect(page.getByText('3 Held')).toBeVisible();

    // Release all
    await page.keyboard.up('KeyA');
    await page.keyboard.up('KeyS');
    await page.keyboard.up('KeyD');

    await expect(page.getByText('0 Held')).toBeVisible();
  });

  test('reset clears peak tracking', async ({ page }) => {
    await page.keyboard.down('KeyQ');
    await page.keyboard.down('KeyE');
    await page.keyboard.up('KeyQ');
    await page.keyboard.up('KeyE');

    await expect(page.getByText('2', { exact: true }).first()).toBeVisible();

    // Click Reset
    await page.getByRole('button', { name: /reset/i }).click();

    await expect(page.getByText('0', { exact: true }).first()).toBeVisible();
  });
});
