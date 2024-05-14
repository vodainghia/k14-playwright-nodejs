import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";

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

        // Debug
        await this.page.waitForTimeout(3 * 1000);
    }

    public async verifyShoppingCart(): Promise<void> {

    }

    private extractAdditionalPrice(fullText: string): number {
        const regex = /\+\d+\.\d+/g;
        const matches = fullText.match(regex) ?? '0';
        return Number(matches[0].replace('+', ''));
    }

}