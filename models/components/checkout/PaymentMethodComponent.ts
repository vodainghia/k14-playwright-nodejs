import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-payment_method")
export default class PaymentMethodComponent {

    protected component: Locator;

    public constructor(component: Locator) {
        this.component = component;
    }
}