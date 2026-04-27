import { test, expect } from '@playwright/test';

test.describe('Landing page E2E', () => {
  test('TC-E2E-001: Landing page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/.+/);
  });
});