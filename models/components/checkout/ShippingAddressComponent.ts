import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-shipping")
export default class ShippingAddressComponent{

    protected component: Locator;

    public constructor(component: Locator) {
        this.component = component;
    }
}