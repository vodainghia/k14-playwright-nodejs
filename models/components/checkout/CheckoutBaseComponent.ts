import { Locator } from "@playwright/test";

export default class CheckoutBaseComponent {

    protected component: Locator;

    protected readonly continueBtnSel = 'input[value="Continue"]';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async clickContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({ state: 'hidden', timeout: 5 * 1000 });
    }
    
}