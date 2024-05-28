import {Locator} from "@playwright/test";
import {selector} from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-payment_method")
export default class PaymentMethodComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private codSel: string = '[value="Payments.CashOnDelivery"]';
    private checkMoneyOrderSel: string = '[value="Payments.CheckMoneyOrder"]';
    private creditCardSel: string = '[value="Payments.Manual"]';
    private purchaseOrderSel: string = '[value="Payments.PurchaseOrder"]';

    private readonly paymentMethodsSel = 'input[id^="paymentmethod"] + label';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async selectAPaymentMethod(): Promise<string> {
        return await this.selectMethodOption(this.paymentMethodsSel);
    }

    public async selectCODMethod(): Promise<void> {
        await this.component.locator(this.codSel).click();
    }

    public async selectCheckMoneyOrderMethod(): Promise<void> {
        await this.component.locator(this.checkMoneyOrderSel).click();
    }

    public async selectCreditCardMethod(): Promise<void> {
        await this.component.locator(this.creditCardSel).click();
    }

    public async selectPurchaseOrderMethod(): Promise<void> {
        await this.component.locator(this.purchaseOrderSel).click();
    }

}