import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('contact form validates required fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('[data-testid="button-send-message"]');
    
    // Should show validation errors
    await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible();
  });

  test('contact form submits successfully with valid data', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the form with valid data
    await page.fill('[data-testid="input-name"]', 'John Doe');
    await page.fill('[data-testid="input-email"]', 'john@example.com');
    await page.fill('[data-testid="input-company"]', 'Test Company');
    await page.fill('[data-testid="input-website"]', 'https://example.com');
    await page.selectOption('[data-testid="select-budget"]', '15k-50k');
    await page.fill('[data-testid="input-message"]', 'This is a test message for our automation needs.');
    
    // Submit the form
    await page.click('[data-testid="button-send-message"]');
    
    // Should show success message
    await expect(page.locator('text=Message sent successfully!')).toBeVisible();
    
    // Form should be reset
    await expect(page.locator('[data-testid="input-name"]')).toHaveValue('');
  });

  test('email validation works correctly', async ({ page }) => {
    await page.goto('/contact');
    
    // Enter invalid email
    await page.fill('[data-testid="input-email"]', 'invalid-email');
    await page.fill('[data-testid="input-name"]', 'Test User');
    await page.fill('[data-testid="input-message"]', 'Test message here');
    
    await page.click('[data-testid="button-send-message"]');
    
    // Should show email validation error
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('book call button navigates to booking page', async ({ page }) => {
    await page.goto('/contact');
    
    await page.click('[data-testid="button-book-call"]');
    
    // Should navigate to booking page
    await expect(page).toHaveURL('/book');
  });
});
