import { test, expect } from '@playwright/test';

test.describe('CSV Upload Functionality', () => {
  test('CSV upload and processing works end-to-end', async ({ page }) => {
    await page.goto('/demo');
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-csv-scorer"]');
    
    // Create test CSV content
    const csvContent = `name,email,company,message
John Doe,john@techcorp.com,TechCorp,We need automation solutions with Shopify and HubSpot integration for our AI processes
Jane Smith,jane@startup.com,StartupInc,Looking for basic website development
Bob Wilson,bob@enterprise.com,Enterprise LLC,Need RPA automation with QuickBooks and Slack integration urgently`;

    // Upload CSV file
    await page.evaluate((content) => {
      const blob = new Blob([content], { type: 'text/csv' });
      const file = new File([blob], 'test-leads.csv', { type: 'text/csv' });
      
      const input = document.querySelector('[data-testid="input-csv-upload"]') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, csvContent);
    
    // Wait for results to appear
    await expect(page.locator('[data-testid="csv-results"]')).toBeVisible();
    
    // Check table has data
    const tableRows = page.locator('[data-testid="csv-table-body"] tr');
    await expect(tableRows).toHaveCount(3);
    
    // Check first lead has high score (should be Hot due to automation keywords)
    await expect(page.locator('[data-testid="lead-name-0"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="lead-segment-0"]')).toContainText('Hot');
    
    // Check segment counts
    const hotCount = await page.locator('[data-testid="count-hot"]').textContent();
    expect(parseInt(hotCount || '0')).toBeGreaterThan(0);
  });

  test('CSV export functionality works', async ({ page }) => {
    await page.goto('/demo');
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-csv-scorer"]');
    
    // Upload test data
    const csvContent = `name,email,company,message
Test User,test@example.com,TestCorp,Automation needed`;

    await page.evaluate((content) => {
      const blob = new Blob([content], { type: 'text/csv' });
      const file = new File([blob], 'test.csv', { type: 'text/csv' });
      
      const input = document.querySelector('[data-testid="input-csv-upload"]') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, csvContent);
    
    await expect(page.locator('[data-testid="csv-results"]')).toBeVisible();
    
    // Test export button
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-testid="button-export-scores"]');
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('scored_leads.csv');
    
    // Should show success message
    await expect(page.locator('text=Lead scores exported successfully')).toBeVisible();
  });

  test('CSV deduplication works correctly', async ({ page }) => {
    await page.goto('/demo');
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-csv-scorer"]');
    
    // CSV with duplicate emails
    const csvContent = `name,email,company,message
John Doe,john@example.com,TechCorp,First message
John Smith,john@example.com,TechCorp,Duplicate email
Jane Doe,jane@example.com,DataCorp,Unique email`;

    await page.evaluate((content) => {
      const blob = new Blob([content], { type: 'text/csv' });
      const file = new File([blob], 'duplicates.csv', { type: 'text/csv' });
      
      const input = document.querySelector('[data-testid="input-csv-upload"]') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, csvContent);
    
    await expect(page.locator('[data-testid="csv-results"]')).toBeVisible();
    
    // Should only have 2 rows (duplicates removed)
    const tableRows = page.locator('[data-testid="csv-table-body"] tr');
    await expect(tableRows).toHaveCount(2);
  });

  test('empty CSV handling', async ({ page }) => {
    await page.goto('/demo');
    await page.click('[data-testid="button-launch-demo"]');
    await page.click('[data-testid="tab-csv-scorer"]');
    
    // Empty CSV content
    const csvContent = `name,email,company,message`;

    await page.evaluate((content) => {
      const blob = new Blob([content], { type: 'text/csv' });
      const file = new File([blob], 'empty.csv', { type: 'text/csv' });
      
      const input = document.querySelector('[data-testid="input-csv-upload"]') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, csvContent);
    
    // Should show error for no valid leads
    await expect(page.locator('text=No valid leads found')).toBeVisible();
  });
});
