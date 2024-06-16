import {test} from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import CheapComputerComponent from "../../models/components/computer/CheapComputerComponent";
import testData from '../../test-data/computer/CheapComputerData.json';
import PAYMENT_METHOD from "../../constants/Payment";
import CREDIT_CARD_TYPE from "../../constants/CreditCardType";
import TAGS from "../../constants/Tags";

testData.forEach(computerData => {
    test(`${TAGS.smoke} | Test Cheap Computer Component
    Processor Type: ${computerData.processorType} | RAM: ${computerData.ram} | HDD: ${computerData.hdd} | Software: ${computerData.software}`,
        async ({page}) => {
            await page.goto('/build-your-cheap-own-computer');
            let orderComputerFlow: OrderComputerFlow = new OrderComputerFlow(page, CheapComputerComponent, computerData);
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
});
