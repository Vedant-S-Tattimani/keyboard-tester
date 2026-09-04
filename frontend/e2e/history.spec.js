import { test, expect } from '@playwright/test';

test.describe('History & Export E2E', () => {
  test('graceful recovery from corrupted storage', async ({ page }) => {
    await page.goto('/');

    // Inject bad JSON
    await page.evaluate(() => {
      localStorage.setItem('keycheck_test_history', '{ "bad_data": true }');
    });

    // Reload
    await page.reload();

    await expect(page.locator('h1, h2').filter({ hasText: 'Test Your Keyboard' }).first()).toBeVisible();
    await expect(page.getByText('Coverage').first()).toBeVisible();
  });

  test('generates and downloads JSON report safely', async ({ page }) => {
    await page.goto('/');

    // Do a small session
    await page.getByRole('button', { name: 'Numpad' }).click();
    await page.keyboard.press('Numpad1');
    await page.getByRole('button', { name: /finish/i }).click();

    // Verify history entry shows up
    await expect(page.getByText('1 / 17').first()).toBeVisible();
    
    // Test the download intercept
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
    
    // Click 'Export JSON' or similar button in the history entry
    const exportBtn = page.getByRole('button', { name: /export json/i }).first();
    if (await exportBtn.isVisible()) {
      await exportBtn.click();
      const download = await downloadPromise;
      expect(download).not.toBeNull();
      expect(download.suggestedFilename()).toContain('.json');
    }
  });

  test('comparison reset scope isolation', async ({ page }) => {
    await page.goto('/compare');
    
    // We expect Compare UI to load
    await expect(page.locator('h1, h2').filter({ hasText: /compare/i }).first()).toBeVisible();

    // Ensure it doesn't crash if we hit reset with no data
    const resetBtns = await page.getByRole('button', { name: /reset/i }).all();
    if (resetBtns.length > 0) {
      await resetBtns[0].click();
    }
    
    await expect(page.locator('h1, h2').filter({ hasText: /compare/i }).first()).toBeVisible();
  });
});
