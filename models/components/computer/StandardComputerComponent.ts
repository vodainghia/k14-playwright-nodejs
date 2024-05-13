import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttrSel = 'select[id^="product_attribute"]';

    constructor(component: Locator) {
        super(component);
    }

    public async selectProcessorType(type: string): Promise<string> {
        const PROCESSOR_DROPDOWN_INDEX = 0;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        return await this.selectOption(allDropdown[PROCESSOR_DROPDOWN_INDEX], type);
    }

    public async selectRAMType(type: string): Promise<string> {
        const RAM_DROPDOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        return await this.selectOption(allDropdown[RAM_DROPDOWN_INDEX], type);
    }

    private async selectOption(dropdown: Locator, type: string): Promise<string> {
        const allOptions = await dropdown.locator('option').all();
        let optionIndex: undefined | number = undefined;
        let optionFullText = '';

        for (const [index, optionEle] of allOptions.entries()) {
            optionFullText = await optionEle.textContent() ?? '';

            if (optionFullText?.startsWith(type)) {
                optionIndex = index;
                break;
            }
        }

        if (optionIndex === undefined) {
            throw new Error(`Option starting with "${type}" not found.`);
        }

        await dropdown.selectOption({ index: optionIndex });
        return optionFullText;
    }

}