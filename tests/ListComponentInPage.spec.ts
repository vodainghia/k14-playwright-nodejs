import { test } from "@playwright/test";
import HomePage from "../models/pages/HomePage";
import ProductItemComponent from "../models/components/ProductItemComponent";
import PageBodyComponent from "../models/components/PageBodyComponent";

test('Test POM - List of Components in Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    const homePage: HomePage = new HomePage(page);
    const pageBodyComponent: PageBodyComponent = await homePage.pageBodyComponent();
    const productItemComponentList: ProductItemComponent[] = await pageBodyComponent.productItemComponentList();

    for (const productItemComponent of productItemComponentList) {
        const productTitle = await productItemComponent.productTitle().textContent();
        const productPrice = await productItemComponent.productPrice().textContent();
        console.log(`${productTitle.trim()}: ${productPrice?.trim()}`);
    }    

    // Debug only
    await page.waitForTimeout(2000);
});