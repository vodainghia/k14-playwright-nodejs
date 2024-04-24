import { test } from "@playwright/test";
import HomePage from "../models/pages/HomePage";
import HeaderComponent from "../models/components/global/header/HeaderComponent";
import SearchComponent from "../models/components/global/header/SearchComponent";

test('Test POM - Component in Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    const homePage: HomePage = new HomePage(page);
    const headerComponent: HeaderComponent = homePage.headerComponent();
    const searchComponent: SearchComponent = headerComponent.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBtn().click();

    // Debug only
    await page.waitForTimeout(2000);
});