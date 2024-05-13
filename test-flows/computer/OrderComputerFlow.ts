import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";

export default class OrderComputerFlow {

    private totalPrice: number;
    private productQuantity: number;

    constructor(private page: Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessorText = await computerComp.selectProcessorType("2.2 GHz");
        const selectedRAMText = await computerComp.selectRAMType("4GB");
        const selectedHDDText = await computerComp.selectHDDType("400 GB");
        //await computerComp.selectSoftwareType("Office Suite");
        console.log(`selectedProcessorText: ${this.extractAdditionalPrice(selectedProcessorText)}`);
        console.log(`selectedRAMText: ${this.extractAdditionalPrice(selectedRAMText)}`);
        console.log(`selectedHDDText: ${this.extractAdditionalPrice(selectedHDDText)}`);

        const basePrice = await computerComp.getProductPrice();
        const additionalPrices =
            this.extractAdditionalPrice(selectedProcessorText) +
            this.extractAdditionalPrice(selectedRAMText) +
            this.extractAdditionalPrice(selectedHDDText);

        this.productQuantity = await computerComp.getProductQuantity();
        this.totalPrice = (basePrice + additionalPrices) * this.productQuantity;
        console.log(`totalPrice: ${this.totalPrice}`);
        await computerComp.clickOnAddToCartBtn();

        // Handle waiting add to cart
        const barNotificationText = await computerDetailsPage.getBarNotificationText();
        console.log(barNotificationText);
        if (!barNotificationText.startsWith("The product has been added")) {
            throw new Error('Failed to add product to cart');
        }
        
        // Navigate to the shopping cart
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();

        // Debug
        await this.page.waitForTimeout(3 * 1000);
    }

    private extractAdditionalPrice(fullText: string): number {
        const regex = /\+\d+\.\d+/g;
        const matches = fullText.match(regex) ?? '0';
        return Number(matches[0].replace('+', ''));
    }

}