import { test } from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import StandardComputerComponent from "../../models/components/computer/StandardComputerComponent";
import testData from '../../test-data/computer/StandardComputerData.json';
import PAYMENT_METHOD from "../../constants/Payment";
import CREDIT_CARD_TYPE from "../../constants/CreditCardType";

test('Test Standard Computer Component', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const orderComputerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent, testData);
    await orderComputerFlow.buildCompSpecAndAddToCart();
    await orderComputerFlow.verifyShoppingCart();
    await orderComputerFlow.agreeTOSAndCheckout();
    await orderComputerFlow.inputBillingAddress();
    await orderComputerFlow.inputShippingAddress();
    await orderComputerFlow.selectShippingMethod();
    await orderComputerFlow.selectPaymentMethod(PAYMENT_METHOD.creditCard);
    await orderComputerFlow.inputPaymentInformation(CREDIT_CARD_TYPE.visa);
    await orderComputerFlow.confirmOrder();

    // Debug
    await page.waitForTimeout(3 * 1000);
});