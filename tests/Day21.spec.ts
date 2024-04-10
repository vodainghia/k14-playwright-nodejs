import { test, Page } from "@playwright/test";

const jsAlertUrl = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenuUrl = 'https://the-internet.herokuapp.com/floating_menu';

// Handle JS Alerts

test('Handle JS Alert', async ({ page }) => {
    await page.goto(jsAlertUrl);

    const jsAlertBtnEle = await page.locator('[onclick="jsAlert()"]');

    // MUST define the event first (Playwright will click to dismiss or close the dialog by default)
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // Trigger the js alert
    await jsAlertBtnEle.click();

    await page.waitForTimeout(2000);
});

test('Handle JS Confirm', async ({ page }) => {
    await page.goto(jsAlertUrl);

    const jsConfirmBtnEle = await page.locator('[onclick="jsConfirm()"]');

    // MUST define the event first (Playwright will click to dismiss or close the dialog by default)
    page.on('dialog', async dialog => {
        // Get the alert content
        console.log(`Alert content is: ${dialog.message()}`);

        // Dismiss/Cancel
        await dialog.dismiss();
    });

    // Trigger the js alert
    await jsConfirmBtnEle.click();

    await page.waitForTimeout(2000);
});

test('Handle JS Prompt', async ({ page }) => {
    await page.goto(jsAlertUrl);

    const jsPromptBtnEle = await page.locator('[onclick="jsPrompt()"]');

    // MUST define the event first (Playwright will click to dismiss or close the dialog by default)
    page.on('dialog', async dialog => {
        // Get the alert content
        console.log(`Alert content is: ${dialog.message()}`);

        await dialog.accept("I'm accepting the js prompt!!");
    });

    // Trigger the js alert
    await jsPromptBtnEle.click();

    await page.waitForTimeout(2000);
});

test('Let Playwright handles JS Alert by default', async ({ page }) => {
    await page.goto(jsAlertUrl);

    const jsAlertBtnEle = await page.locator('[onclick="jsAlert()"]');

    // Trigger the js alert
    await jsAlertBtnEle.click();

    await page.waitForTimeout(2000);
});

// Execute JS scripts

test('Execute JS WITHOUT parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);

    // Scroll to bottom
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait 2s
    await page.waitForTimeout(2000);

    // Scroll to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    // Wait 2s
    await page.waitForTimeout(2000);

    // Explore the highlight function
    page.locator('h3').highlight();

    // Wait 2s
    await page.waitForTimeout(4000);
});

test('Execute JS WITH parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);

    // Scroll to bottom
    await scrollToBottom(page, 0.5);

    await page.waitForTimeout(2000);
});

test.only('Execute JS and return the value', async ({ page }) => {
    await page.goto('https://www.foodandwine.com/');
    await page.waitForTimeout(5000);

    const returnAdsValue = await getAdParams(page, 'leaderboard-flex-1');

    console.log(returnAdsValue);
    await page.waitForTimeout(2000);
});

async function scrollToBottom(page: Page, scrollPercentage: number) {
    await page.evaluate(scrollPercentage => {
        window.scrollTo(0, scrollPercentage * document.body.scrollHeight);
    }, scrollPercentage);
}

async function getAdParams(page: Page, adSlot: string) {
    return await page.evaluate(adSlot => {
        const slot = googletag.pubads().getSlots().find(({ getSlotElementId }) => getSlotElementId() === adSlot);
        return slot.getTargetingMap();
    }, adSlot);
}