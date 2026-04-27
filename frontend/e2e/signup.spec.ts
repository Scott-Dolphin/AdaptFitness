import { test, expect } from '@playwright/test';

test.describe('Signup page E2E', () => {
  test('TC-E2E-004: Signup page loads and renders all required fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL(/\/signup/);
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('TC-E2E-005: Mismatched passwords blocks signup submission', async ({ page }) => {
    await page.goto('/signup');
    
    const passwordInputs = page.locator('input[type="password"]');
    const inputCount = await passwordInputs.count();
    
    // Only run if there are 2 password fields (password + confirm)
    test.skip(inputCount < 2, 'Signup form does not have separate confirm password field');
    
    await page.locator('input[type="email"]').first().fill('test@adapt.local');
    await passwordInputs.nth(0).fill('Password123!');
    await passwordInputs.nth(1).fill('DifferentPass456!');
    await page.locator('button[type="submit"]').first().click();
    
    await expect(page.getByText(/passwords do not match/i)).toBeVisible({ timeout: 5_000 });
  });
});