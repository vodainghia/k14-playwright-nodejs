import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { test } from '@playwright/test';

test('Login Test', async () => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('https://playwright.dev');

    // Debug only
    await page.waitForTimeout(1000);

    await browser.close();
});
