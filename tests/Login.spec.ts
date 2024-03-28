import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { test } from '@playwright/test';

test('Login Test', async ({page}) => {
    await page.goto('https://playwright.dev');

    await page.locator('teocodon').click();

    // Debug only
    await page.waitForTimeout(1000);
});
