import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-shipping_method")
export default class ShippingMethodComponent {

    protected component: Locator;

    public constructor(component: Locator) {
        this.component = component;
    }
}