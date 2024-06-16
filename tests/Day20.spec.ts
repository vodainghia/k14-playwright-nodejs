import test from "@playwright/test";

test('Handle Dropdown option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Target the dropdown element
    const dropdownEle = await page.locator('#dropdown');

    // Select option 1
    await dropdownEle.selectOption({ index: 1 });
    await page.waitForTimeout(1000);

    // Select option 2
    await dropdownEle.selectOption({ index: 2 });
    await page.waitForTimeout(1000);

});

test('Handle iFrame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');

    // Target the iframe using frameLocator
    const iframeEle = await page.frameLocator('iframe[id^="mce"]');

    // Find edit text area in the iframe
    const editTextAreaEle = await iframeEle.locator('body p');

    // Clear then input the new content
    await editTextAreaEle.click();
    await editTextAreaEle.clear();
    await editTextAreaEle.fill('New content');
    await page.waitForTimeout(1000);

    // Interact with the main frame's element: No need to switch to main frame
    const footerPowerByLinkEle = await page.locator('a:has-text("Elemental")');
    await footerPowerByLinkEle.click();

    await page.waitForTimeout(1000);
});

test('Mouse hover and narrow down the searching scope', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    // Find all figures
    const allFigureEles = await page.locator('.figure').all();

    // Loop all the figures
    for (const figureEle of allFigureEles) {
        // And narrow down searching scope
        const imgEle = await figureEle.locator('img');

        const usernameEle = await figureEle.locator('h5');
        const viewProfileHyperlinkEle = await figureEle.locator('a');
        const isUsernameVisible = await usernameEle.isVisible();
        const isViewProfileHyperlinkVisible = await viewProfileHyperlinkEle.isVisible();

        console.log(`isUsernameVisible: ${isUsernameVisible}`);
        console.log(`isViewProfileHyperlinkVisible: ${isViewProfileHyperlinkVisible}`);


        // Mouse hover
        await imgEle.hover();

        const isUsernameVisibleAfter = await usernameEle.isVisible();
        const isViewProfileHyperlinkVisibleAfter = await viewProfileHyperlinkEle.isVisible();

        console.log(`isUsernameVisible: ${isUsernameVisibleAfter}`);
        console.log(`isViewProfileHyperlinkVisible: ${isViewProfileHyperlinkVisibleAfter}`);

        await page.waitForTimeout(1500);
    }
});

test('Checking element status and handle dynamic states', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    // Locate 2 parent components
    const checkboxComp = await page.locator('#checkbox-example');
    const inputExampleComp = await page.locator('#input-example');

    // Interact with the checkbox component
    const checkboxEle = await checkboxComp.locator('#checkbox input');
    const isEnabled = await checkboxEle.isEnabled();
    let isSelected = await checkboxEle.isChecked();

    console.log(`Is checkbox enabled: ${isEnabled}`);
    console.log(`Is checkbox selected: ${isSelected}`);

    await page.waitForTimeout(2000);

    if (!isSelected) {
        await checkboxEle.click();
    }

    let isSelectedAfter = await checkboxEle.isChecked();
    console.log(`Is checkbox selected after selecting: ${isSelectedAfter}`);

    if (!isSelectedAfter) {
        await checkboxEle.click();
    }

    //await page.waitForTimeout(2000);

    const removeBtnEle = await checkboxComp.locator('button');
    await removeBtnEle.click();
    await page.waitForSelector('#checkbox-example #checkbox input', { state: 'hidden', timeout: 5 * 1000 });

    // TODO: Interact with the input component

});