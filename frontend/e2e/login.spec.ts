import { test, expect } from '@playwright/test';

test.describe('Login page E2E', () => {
  test('TC-E2E-002: Login page loads and renders form fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('TC-E2E-003: Invalid credentials show error message', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').first().fill('fake@nonexistent.test');
    await page.locator('input[type="password"]').first().fill('wrongpassword123');
    await page.locator('button[type="submit"]').first().click();
    
    // Wait for error to appear (Supabase rejects bad creds)
    await expect(page.getByText(/incorrect email or password|invalid/i)).toBeVisible({ timeout: 10_000 });
  });
});