import { Page } from "@playwright/test";
import CartItemRowComponent from "../components/cart/CartItemRowComponent";
import TotalsComponent from "../components/cart/TotalsComponent";

export default class ShoppingCartPage {

    constructor(private page: Page) {
        this.page = page;
    }

    public async cartItemRowComponentList(): Promise<CartItemRowComponent[]> {
        const cartItemRowComponents = await this.page.locator(CartItemRowComponent.selectorValue).all();
        return cartItemRowComponents.map(comp => new CartItemRowComponent(comp));
    }

    public totalComponent(): TotalsComponent {
        return new TotalsComponent(this.page.locator(TotalsComponent.selectorValue));
    }

}