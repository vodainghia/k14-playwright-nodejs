import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CheckoutBaseComponent from "./CheckoutBaseComponent";

@selector("#opc-billing")
export default class BillingAddressComponent extends CheckoutBaseComponent {

    protected component: Locator;

    private readonly firstNameSel = '#BillingNewAddress_FirstName';
    private readonly lastNameSel = '#BillingNewAddress_LastName';
    private readonly emailAddressSel = '#BillingNewAddress_Email';
    private readonly countryDropdownSel = '#BillingNewAddress_CountryId';
    private readonly stateProvinceDropdownSel = '#BillingNewAddress_StateProvinceId';
    private readonly citySel = '#BillingNewAddress_City';
    private readonly add1Sel = '#BillingNewAddress_Address1';
    private readonly zipCodeSel = '#BillingNewAddress_ZipPostalCode';
    private readonly phoneNumSel = '#BillingNewAddress_PhoneNumber';

    public constructor(component: Locator) {
        super(component);
        this.component = component;
    }

    public async inputFirstname(firstName: string): Promise<void> {
        await this.component.locator(this.firstNameSel).fill(firstName);
    }

    public async inputLastname(lastName: string): Promise<void> {
        await this.component.locator(this.lastNameSel).fill(lastName);
    }

    public async inputEmailAddress(email: string): Promise<void> {
        await this.component.locator(this.emailAddressSel).fill(email);
    }

    public async selectCountry(country: string): Promise<void> {
        await this.component.locator(this.countryDropdownSel).selectOption(country);
    }

    public async selectStateProvince(state: string): Promise<void> {
        await this.component.locator(this.stateProvinceDropdownSel).selectOption(state);
    }

    public async inputCity(city: string): Promise<void> {
        await this.component.locator(this.citySel).fill(city);
    }

    public async inputAddress1(address1: string): Promise<void> {
        await this.component.locator(this.add1Sel).fill(address1);
    }

    public async inputZipCode(zipCode: string): Promise<void> {
        await this.component.locator(this.zipCodeSel).fill(zipCode);
    }

    public async inputPhoneNum(phoneNum: string): Promise<void> {
        await this.component.locator(this.phoneNumSel).fill(phoneNum);
    }

}