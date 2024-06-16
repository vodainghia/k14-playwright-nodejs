import {Locator} from "@playwright/test";
import {selector} from "../SelectorDecorator";

@selector("#opc-confirm_order")
export default class ConfirmOrderComponent {

    protected component: Locator;

    private readonly confirmOrderBtnSel: string = 'input[class*="confirm-order-next-step-button"]';

    public constructor(component: Locator) {
        this.component = component;
    }

    public async clickConfirmBtn(): Promise<void> {
        await this.component.locator(this.confirmOrderBtnSel).click();
        await this.component.locator(this.confirmOrderBtnSel).waitFor({state: 'hidden'});
    }
}