import {expect, Locator} from "@playwright/test";

export default class CheckoutBaseComponent {

    protected component: Locator;

    protected readonly continueBtnSel: string = 'input[value="Continue"]';
    protected readonly checkoutStepTagSel: string = 'div[id^="checkout-step-"]';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async clickContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        //await this.component.locator(this.checkoutStepTagSel).getAttribute('style' );
        await expect(this.component.locator(this.checkoutStepTagSel)).toHaveAttribute('style', 'display: none;');
    }

    protected async selectMethodOption(methodSel: string): Promise<string> {
        const methodElems: Locator[] = await this.component.locator(methodSel).all();
        const randomIndex = this.getRandomIndexFromLocatorList(methodElems);
        await methodElems[randomIndex].click();

        return await methodElems[randomIndex].textContent() ?? '';
    }

    protected getRandomIndexFromLocatorList(listItems: Locator[]): number {
        return Math.floor(Math.random() * listItems.length);
    }

}