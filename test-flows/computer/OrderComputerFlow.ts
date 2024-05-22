import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutOptionsPage from "../../models/pages/CheckoutOptionsPage";
import defaultCheckoutUserData from "../../test-data/DefaultCheckoutUser.json";
import CheckoutPage from "../../models/pages/CheckoutPage";
import BillingAddressComponent from "../../models/components/checkout/BillingAddressComponent";
import ShippingAddressComponent from "../../models/components/checkout/ShippingAddressComponent";
import ShippingMethodComponent from "../../models/components/checkout/ShippingMethodComponent";

export default class OrderComputerFlow {

    private totalPrice: number;
    private productQuantity: number;

    constructor(
        private page: Page,
        private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>,
        private computerData: any
    ) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
        this.computerData = computerData;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        // Build computer spec
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();

        const selectedProcessorText = await computerComp.selectProcessorType(this.computerData.processorType);
        const selectedRAMText = await computerComp.selectRAMType(this.computerData.ram);
        const selectedHDDText = await computerComp.selectHDDType(this.computerData.hdd);
        const selectedSoftwareText = await computerComp.selectSoftwareType(this.computerData.software);

        let additionalOsPrice = 0;
        if (this.computerData.os) {
            const selectedOSText = await computerComp.selectSoftwareType(this.computerData.os);
            additionalOsPrice = this.extractAdditionalPrice(selectedOSText);
        }

        // Calculate current product price
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices =
            this.extractAdditionalPrice(selectedProcessorText) +
            this.extractAdditionalPrice(selectedRAMText) +
            this.extractAdditionalPrice(selectedHDDText) +
            this.extractAdditionalPrice(selectedSoftwareText) +
            additionalOsPrice;

        this.productQuantity = await computerComp.getProductQuantity();
        this.totalPrice = (basePrice + additionalPrices) * this.productQuantity;

        // Handle waiting add to cart
        await computerComp.clickOnAddToCartBtn();
        const barNotificationText = await computerDetailsPage.getBarNotificationText();
        if (!barNotificationText.startsWith("The product has been added")) {
            throw new Error('Failed to add product to cart');
        }

        // Navigate to the shopping cart
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();
    }

    public async verifyShoppingCart(): Promise<void> {
        // Will add assertions later
        const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
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
    }

    public async agreeTOSAndCheckout(): Promise<void> {
        const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
        await shoppingCartPage.totalComponent().acceptTOS();
        await shoppingCartPage.totalComponent().clickOnCheckoutBtn();

        // Exceptional case that the flow step is handling 2 pages (the page is very small to break down to a page file)
        const checkoutPage: CheckoutOptionsPage = new CheckoutOptionsPage(this.page);
        await checkoutPage.checkoutAsGuest();
    }

    public async inputBillingAddress(): Promise<void> {
        // Should utilize default data
        const { firstName, lastName, email, country, state, city, add1, zipcode, phoneNum } = defaultCheckoutUserData;
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const billingAddressComponent: BillingAddressComponent = checkoutPage.billingAddressComponent();
        await billingAddressComponent.inputFirstname(firstName);
        await billingAddressComponent.inputLastname(lastName);
        await billingAddressComponent.inputEmailAddress(email);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectStateProvince(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputAddress1(add1);
        await billingAddressComponent.inputZipCode(zipcode);
        await billingAddressComponent.inputPhoneNum(phoneNum);
        await billingAddressComponent.clickContinueBtn();
    }

    public async inputShippingAddress(): Promise<void> {
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingAddressComponent: ShippingAddressComponent = checkoutPage.shippingAddressComponent();
        await shippingAddressComponent.clickContinueBtn();

        // Debug
        await this.page.waitForTimeout(3 * 1000);
    }

    public async selectShippingMethod(): Promise<void> {
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingMethodComponent: ShippingMethodComponent = checkoutPage.shippingMethodComponent();
        await shippingMethodComponent.selectAShippingMethod();
        await shippingMethodComponent.clickContinueBtn();

        // Debug
        await this.page.waitForTimeout(3 * 1000);
    }

    private extractAdditionalPrice(fullText: string): number {
        const regex = /\+\d+\.\d+/g;
        const matches = fullText.match(regex) ?? '0';
        return Number(matches[0].replace('+', ''));
    }

}