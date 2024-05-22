import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-shipping_method")
export default class ShippingMethodComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private readonly shippingMethodsSel = 'input[id^="shippingoption"] + label';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async selectAShippingMethod(): Promise<string> {
        return await this.selectMethodOption(this.shippingMethodsSel);
    }

}