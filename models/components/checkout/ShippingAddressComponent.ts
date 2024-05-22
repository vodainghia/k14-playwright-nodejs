import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-shipping")
export default class ShippingAddressComponent extends CheckoutBaseComponent {

    protected component: Locator;

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }
    
}