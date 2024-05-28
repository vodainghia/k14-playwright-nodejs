import {Locator} from "@playwright/test";
import {selector} from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";
import CREDIT_CARD_TYPE from "../../../constants/CreditCardType";

@selector("#opc-payment_info")
export default class PaymentInformationComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private creditCardDropdownSel: string = '#CreditCardType';
    private cardHolderNameSel: string = '#CardholderName';
    private cardNumberSel: string = '#CardNumber';
    private cardExpirationMonthDropdownSel: string = '#ExpireMonth';
    private cardExpirationYearDropdownSel: string = '#ExpireYear';
    private cardCodeSel: string = '#CardCode';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async selectCardType(creditCardType: string): Promise<void> {
        const creditCardDropdown: Locator = this.component.locator(this.creditCardDropdownSel);

        switch (creditCardType) {
            case CREDIT_CARD_TYPE.visa:
                await creditCardDropdown.selectOption(CREDIT_CARD_TYPE.visa);
                break;
            case CREDIT_CARD_TYPE.masterCard:
                await creditCardDropdown.selectOption(CREDIT_CARD_TYPE.masterCard);
                break;
            case CREDIT_CARD_TYPE.discover:
                await creditCardDropdown.selectOption(CREDIT_CARD_TYPE.discover);
                break;
            default:
                await creditCardDropdown.selectOption(CREDIT_CARD_TYPE.amex);
                break;
        }
    }

    public async inputCardHolderName(name: string): Promise<void> {
        await this.component.locator(this.cardHolderNameSel).fill(name);
    }

    public async inputCardNumber(number: string): Promise<void> {
        await this.component.locator(this.cardNumberSel).fill(number);
    }

    public async selectExpirationMonth(month: string): Promise<void> {
        await this.component.locator(this.cardExpirationMonthDropdownSel).selectOption(month);
    }

    public async selectExpirationYear(year: string): Promise<void> {
        await this.component.locator(this.cardExpirationYearDropdownSel).selectOption(year);
    }

    public async inputCardCode(cardCode: string): Promise<void> {
        await this.component.locator(this.cardCodeSel).fill(cardCode);
    }

}