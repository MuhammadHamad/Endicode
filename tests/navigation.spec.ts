import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('all navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    
    const pages = [
      { link: '[data-testid="nav-services"]', url: '/services', title: /Services/ },
      { link: '[data-testid="nav-case-studies"]', url: '/case-studies', title: /Case Studies/ },
      { link: '[data-testid="nav-process"]', url: '/process', title: /Process/ },
      { link: '[data-testid="nav-pricing"]', url: '/pricing', title: /Pricing/ },
      { link: '[data-testid="nav-about"]', url: '/about', title: /About/ },
      { link: '[data-testid="nav-contact"]', url: '/contact', title: /Contact/ },
    ];

    for (const pageTest of pages) {
      await page.goto('/');
      await page.click(pageTest.link);
      await expect(page).toHaveURL(pageTest.url);
      await expect(page).toHaveTitle(pageTest.title);
    }
  });

  test('active navigation state is correct', async ({ page }) => {
    await page.goto('/services');
    
    // The services nav item should have active styling
    const servicesNav = page.locator('[data-testid="nav-services"]');
    await expect(servicesNav).toHaveClass(/text-foreground/);
  });

  test('mobile navigation toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu should be hidden initially
    await expect(page.locator('[data-testid="mobile-nav-services"]')).not.toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="button-mobile-menu"]');
    
    // Mobile nav items should be visible
    await expect(page.locator('[data-testid="mobile-nav-services"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-nav-contact"]')).toBeVisible();
    
    // Test mobile navigation
    await page.click('[data-testid="mobile-nav-services"]');
    await expect(page).toHaveURL('/services');
  });

  test('back navigation works on subpages', async ({ page }) => {
    await page.goto('/demo');
    
    // Click back to home link
    await page.click('[data-testid="link-back-home"]');
    
    await expect(page).toHaveURL('/');
  });

  test('footer navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Test footer links
    await page.click('[data-testid="footer-link-about"]');
    await expect(page).toHaveURL('/about');
    
    await page.goto('/');
    await page.click('[data-testid="footer-support-contact"]');
    await expect(page).toHaveURL('/contact');
  });

  test('social media links exist in footer', async ({ page }) => {
    await page.goto('/');
    
    // Check social links are present
    await expect(page.locator('[data-testid="link-twitter"]')).toBeVisible();
    await expect(page.locator('[data-testid="link-linkedin"]')).toBeVisible();  
    await expect(page.locator('[data-testid="link-github"]')).toBeVisible();
  });
});
