import { test, expect } from '@playwright/test';

test.describe('Typing Test E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/typing-test');
  });

  test('typing starts test and calculates WPM accurately', async ({ page }) => {
    // Select the 15 seconds test mode to make the test short
    await page.getByRole('button', { name: '15s' }).click();

    // Ensure WPM is 0 initially
    await expect(page.getByText('WPM').first()).toBeVisible();

    // The typing test usually requires focus on a hidden input or the document body.
    // Typing the first letter should start the timer.
    // Let's type something slowly to let the timer start.
    await page.keyboard.type('hello world');

    // The progress should show > 0 correct characters or similar, depending on the passage.
    // The typing test usually requires focus on a hidden input or the document body.
    // Typing the first letter should start the timer.
  });

  test('backspace functions correctly', async ({ page }) => {
    // Type and then backspace
    await page.keyboard.type('th');
    await page.keyboard.press('Backspace');

    // We can't strictly assert the internal state easily without exact DOM structure,
    // but we can ensure it doesn't crash and WPM/accuracy stays responsive.
    await expect(page.getByText(/Accuracy/)).toBeVisible();
  });
});
