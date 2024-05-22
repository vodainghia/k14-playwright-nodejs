import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-shipping_method")
export default class ShippingMethodComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private readonly shippingMethodsSel = 'input[id^="shippingoption"]';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async selectAShippingMethod(): Promise<void> {
        const shippingMethodElems: Locator[] = await this.component.locator(this.shippingMethodsSel).all();
        const randomIndex = this.getRandomIndexFromLocatorList(shippingMethodElems);
        await shippingMethodElems[randomIndex].click();
    }

    private getRandomIndexFromLocatorList(listItems: Locator[]): number {
        return Math.floor(Math.random() * listItems.length);
    }

}