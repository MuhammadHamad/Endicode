import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads homepage and basic elements', async ({ page }) => {
    await page.goto('/');
    
    // Check page loads
    await expect(page).toHaveTitle(/FoundryFlow/);
    
    // Check hero section
    await expect(page.locator('[data-testid="hero-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="hero-subtitle"]')).toBeVisible();
    
    // Check navigation is visible
    await expect(page.locator('[data-testid="logo-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-services"]')).toBeVisible();
  });

  test('hero CTA buttons work', async ({ page }) => {
    await page.goto('/');
    
    // Test discovery call button
    const discoveryButton = page.locator('[data-testid="button-discovery-call"]');
    await expect(discoveryButton).toBeVisible();
    await discoveryButton.click();
    await expect(page).toHaveURL('/contact');
    
    // Go back and test demo button
    await page.goto('/');
    const demoButton = page.locator('[data-testid="button-automation-demo"]');
    await expect(demoButton).toBeVisible();
    await demoButton.click();
    await expect(page).toHaveURL('/demo');
  });

  test('services section displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check services section
    await expect(page.locator('[data-testid="services-title"]')).toBeVisible();
    
    // Check all three service cards
    await expect(page.locator('[data-testid="service-web-app-development"]')).toBeVisible();
    await expect(page.locator('[data-testid="service-process-automation"]')).toBeVisible();
    await expect(page.locator('[data-testid="service-ai-assistants"]')).toBeVisible();
  });

  test('ROI chart is visible and displays data', async ({ page }) => {
    await page.goto('/');
    
    // Check ROI chart section
    await expect(page.locator('[data-testid="roi-chart"]')).toBeVisible();
    
    // Check chart items
    await expect(page.locator('[data-testid="chart-item-manual-steps"]')).toBeVisible();
    await expect(page.locator('[data-testid="chart-item-time-hours"]')).toBeVisible();
    await expect(page.locator('[data-testid="chart-item-errors"]')).toBeVisible();
  });

  test('case studies section displays', async ({ page }) => {
    await page.goto('/');
    
    // Check case studies
    await expect(page.locator('[data-testid="case-study-0"]')).toBeVisible();
    await expect(page.locator('[data-testid="case-study-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="case-study-2"]')).toBeVisible();
  });

  test('testimonials section displays', async ({ page }) => {
    await page.goto('/');
    
    // Check testimonials
    await expect(page.locator('[data-testid="testimonial-0"]')).toBeVisible();
    await expect(page.locator('[data-testid="testimonial-1"]')).toBeVisible();
  });

  test('logo marquee displays company logos', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('[data-testid="logo-marquee"]')).toBeVisible();
    await expect(page.locator('[data-testid="logo-techcorp"]')).toBeVisible();
    await expect(page.locator('[data-testid="logo-innovatelab"]')).toBeVisible();
  });

  test('footer links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test footer links
    await page.click('[data-testid="footer-link-services"]');
    await expect(page).toHaveURL('/services');
    
    await page.goto('/');
    await page.click('[data-testid="footer-link-pricing"]');
    await expect(page).toHaveURL('/pricing');
  });
});
