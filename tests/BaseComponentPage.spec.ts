import { test } from "@playwright/test";
import HomePage from "../models/pages/HomePage";
import FooterComponent from "../models/components/global/footer/FooterComponent";
import InformationColumnComponent from "../models/components/global/footer/InformationColumnComponent";
import CustomerServiceColumnComponent from "../models/components/global/footer/CustomerServiceColumnComponent";

test('Test Base Component in Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    const homePage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = homePage.footerComponent();
    const informationColumnComp: InformationColumnComponent = footerComponent.informationColumnComponent();
    const customerServiceColumnComp: CustomerServiceColumnComponent = footerComponent.customerServiceColumnComponent();

    // Component in Parent component
    const informationColumnTitle = await informationColumnComp.title().textContent();
    console.log(`informationColumnTitle: ${informationColumnTitle}`);

    const customerServiceColumnTitle = await customerServiceColumnComp.title().textContent();
    console.log(`customerServiceColumnTitle: ${customerServiceColumnTitle}`);

    // Debug only
    await page.waitForTimeout(2000);
});