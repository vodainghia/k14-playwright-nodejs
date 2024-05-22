import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-payment_method")
export default class PaymentMethodComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private readonly paymentMethodsSel = 'input[id^="paymentmethod"] + label';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async selectAPaymentMethod(): Promise<string> {
        return await this.selectMethodOption(this.paymentMethodsSel);
    }

}