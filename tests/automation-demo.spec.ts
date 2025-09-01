import { test, expect } from '@playwright/test';

test.describe('Automation Demo', () => {
  test('automation demo opens from hero button', async ({ page }) => {
    await page.goto('/');
    
    // Click the automation demo button
    await page.click('[data-testid="button-automation-demo"]');
    
    // Should navigate to demo page
    await expect(page).toHaveURL('/demo');
    
    // Launch the demo modal
    await page.click('[data-testid="button-launch-demo"]');
    
    // Check if modal is visible
    await expect(page.locator('[data-testid="automation-demo-modal"]')).toBeVisible();
  });

  test('lead triage classifies automation inquiry correctly', async ({ page }) => {
    await page.goto('/demo');
    
    // Launch demo
    await page.click('[data-testid="button-launch-demo"]');
    
    // Ensure we're on the lead triage tab
    await page.click('[data-testid="tab-lead-triage"]');
    
    // Enter sample automation inquiry
    const automationInquiry = "We need help automating our invoice processing workflow with QuickBooks integration. This is urgent!";
    await page.fill('[data-testid="input-inquiry-text"]', automationInquiry);
    
    // Analyze the inquiry
    await page.click('[data-testid="button-analyze-inquiry"]');
    
    // Check results
    await expect(page.locator('[data-testid="triage-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="result-intent"]')).toContainText('Automation');
    await expect(page.locator('[data-testid="result-urgency"]')).toContainText('High');
  });

  test('lead triage generates draft reply', async ({ page }) => {
    await page.goto('/demo');
    
    // Launch demo and analyze inquiry
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-lead-triage"]');
    
    const inquiry = "Looking for help with our website and some basic automation";
    await page.fill('[data-testid="input-inquiry-text"]', inquiry);
    await page.click('[data-testid="button-analyze-inquiry"]');
    
    // Check draft reply is generated
    await expect(page.locator('[data-testid="draft-reply"]')).toBeVisible();
    
    const replyContent = await page.locator('[data-testid="draft-reply"]').textContent();
    expect(replyContent).toContain('FoundryFlow');
    expect(replyContent).toContain('discovery call');
  });

  test('copy functionality works for analysis and reply', async ({ page }) => {
    await page.goto('/demo');
    
    // Launch demo and analyze inquiry
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-lead-triage"]');
    
    const inquiry = "Need automation help";
    await page.fill('[data-testid="input-inquiry-text"]', inquiry);
    await page.click('[data-testid="button-analyze-inquiry"]');
    
    // Test copy analysis button
    await page.click('[data-testid="button-copy-analysis"]');
    
    // Test copy reply button
    await page.click('[data-testid="button-copy-reply"]');
    
    // Note: We can't easily test clipboard content in Playwright without additional setup
    // but we can verify the buttons are clickable and don't error
  });
});
