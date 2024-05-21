import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-payment_info")
export default class PaymentInformationComponent {

    protected component: Locator;

    public constructor(component: Locator) {
        this.component = component;
    }
}