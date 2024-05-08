import { test } from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import StandardComputerComponent from "../../models/components/computer/StandardComputerComponent";

test('Test Standard Computer Component', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const orderComputerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent);
    await orderComputerFlow.buildCompSpecAndAddToCart();
});