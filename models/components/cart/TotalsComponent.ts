import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector(".cart-footer .totals")
export default class TotalsComponent {

    protected component: Locator;

    private priceTableRowSel = 'table tr';
    private priceTypeSel = '.cart-total-left span';
    private priceValueSel = '.cart-total-right .product-price';
    private termsOfServiceCheckboxSel = '#termsofservice';
    private checkoutBtnSel = '#checkout';

    public constructor(component: Locator) {
        this.component = component;
    }

    public async priceCategories(): Promise<any> {
        let priceCategories = {};
        const priceTableRowElems = await this.component.locator(this.priceTableRowSel).all();

        for (const tableRowElem of priceTableRowElems) {
            const priceTypeText = await tableRowElem.locator(this.priceTypeSel).innerText() ?? 'null';
            const priceValueText = await tableRowElem.locator(this.priceValueSel).textContent();
            priceCategories[priceTypeText] = Number(priceValueText);
        }

        return priceCategories;
    }

    public async acceptTOS(): Promise<void> {
        await this.component.locator(this.termsOfServiceCheckboxSel).click();
    }

    public async clickOnCheckoutBtn(): Promise<void> {
        await this.component.locator(this.checkoutBtnSel).click();
    }

}