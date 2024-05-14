import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector(".cart-item-row")
export default class CartItemRowComponent {

    protected component: Locator;

    private unitPriceSel = '.product-unit-price';
    private quantityInputSel = 'input[class*="qty-input"]';
    private subtotalSel = '.product-subtotal';

    public constructor(component: Locator) {
        this.component = component;
    }

    public async unitPrice(): Promise<number> {
        const unitPriceText = await this.component.locator(this.unitPriceSel).textContent();
        return Number(unitPriceText);
    }

    public async quantity(): Promise<number> {
        const quantityText = await this.component.locator(this.quantityInputSel).getAttribute('value');
        return Number(quantityText);
    }

    public async subtotal(): Promise<number> {
        const subtotalText = await this.component.locator(this.subtotalSel).textContent();
        return Number(subtotalText);
    }
    
}