import { test } from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import StandardComputerComponent from "../../models/components/computer/StandardComputerComponent";
import testData from '../../test-data/computer/StandardComputerData.json';

test('Test Standard Computer Component', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const orderComputerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent, testData);
    await orderComputerFlow.buildCompSpecAndAddToCart();
    await orderComputerFlow.verifyShoppingCart();
    await orderComputerFlow.agreeTOSAndCheckout();
    await orderComputerFlow.inputBillingAddress();
    await orderComputerFlow.inputShippingAddress();
    await orderComputerFlow.selectShippingMethod();
    await orderComputerFlow.selectPaymentMethod();
});