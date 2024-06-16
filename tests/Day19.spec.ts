import { test } from '@playwright/test';

test('Link Test - XPATH', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.locator('//a[contains(text(), "Elemental")]');

    // Simulate Explicit Wait:
    const footerLinkExplicitWaitEle = await page.waitForSelector('//a[contains(text(), "Elemental_teo")]', { timeout: 10000 });

    await footerLinkExplicitWaitEle.click();

    // Debug only
    await page.waitForTimeout(2000);
});

test('Link Test - CSS', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.locator('a:has-text("Elemental")');

    await footerLinkEle.click();

    // Debug only
    await page.waitForTimeout(2000);
});

test('Link Test - Filtering', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.locator('a').filter({ hasText: "Elemental" });

    await footerLinkEle.scrollIntoViewIfNeeded();
    // Debug only
    await page.waitForTimeout(2000);

    await footerLinkEle.click();

    // Debug only
    await page.waitForTimeout(2000);
});

test('Multiple matching', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Not encourage
    // await page.locator('a').elementHandle() <=> await page.$('a')
    // await page.locator('a').elementHandles() <=> await page.$$('a')
    
    const footerLinkEles = await page.locator('a').elementHandles();
    
    await footerLinkEles[10].click();

    // Debug only
    await page.waitForTimeout(2000);
});

test('Handle login form', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Navigating to login form
    await page.locator('a').filter({hasText: 'Form Authentication'}).click();
    await page.waitForLoadState('domcontentloaded');

    // Form interaction
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin');
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');

    // Debug only
    await page.waitForTimeout(2000);
});

test('Element get Text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Navigating to login form
    await page.locator('a').filter({ hasText: 'Form Authentication' }).click();
    await page.waitForLoadState('domcontentloaded');

    // Form interaction
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin');
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');

    // textContent: All text in the tag
    // innerText: Only visible text
    const textContent = await page.locator('h4').textContent();
    const innerText = await page.locator('h4').innerText();

    console.log(textContent);
    console.log(innerText);

    // Debug only
    await page.waitForTimeout(2000);
});