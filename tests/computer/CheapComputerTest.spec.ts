import { test } from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import CheapComputerComponent from "../../models/components/computer/CheapComputerComponent";
import testData from '../../test-data/computer/CheapComputerData.json';
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";

test('Test Cheap Computer Component', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-cheap-own-computer');
    const orderComputerFlow: OrderComputerFlow = new OrderComputerFlow(page, CheapComputerComponent, testData);
    await orderComputerFlow.buildCompSpecAndAddToCart();
    await orderComputerFlow.verifyShoppingCart();

    //Debug purpose only: Test Shopping Cart Page
    const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(page);
    const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
    const totalComponent = shoppingCartPage.totalComponent();

    for (const cartItemRowComponent of cartItemRowComponentList) {
        const unitPrice = await cartItemRowComponent.unitPrice();
        const quantity = await cartItemRowComponent.quantity();
        const subtotal = await cartItemRowComponent.subtotal();

        console.log(`unitPrice: ${unitPrice}, quantity: ${quantity}, subtotal: ${subtotal}`);
        
    }

    const priceCategories = await totalComponent.priceCategories();
    console.log(`priceCategories: ${JSON.stringify(priceCategories)}`);
    

});