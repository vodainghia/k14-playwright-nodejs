import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttrSel = 'select[id^="product_attribute"]';

    constructor(component: Locator) {
        super(component);
    }

    public async selectProcessorType(type: string): Promise<void> {
        const PROCESSOR_DROPDOWN_INDEX = 0;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        await this.selectOption(allDropdown[PROCESSOR_DROPDOWN_INDEX], type);
    }

    public async selectRAMType(type: string): Promise<void> {
        const RAM_DROPDOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttrSel).all();
        await this.selectOption(allDropdown[RAM_DROPDOWN_INDEX], type);
    }

    private async selectOption(dropdown: Locator, type: string): Promise<void> {
        const allOptions = await dropdown.locator('option').all();
        const unexistedRange: number = -1;
        let optionIndex: number = unexistedRange;

        for (const optionEle of allOptions) {
            const optionText = await optionEle.textContent();

            if (optionText?.startsWith(type)) {
                optionIndex = allOptions.indexOf(optionEle);
                break;
            }
        }

        if (optionIndex > unexistedRange) {
            await dropdown.selectOption({ index: optionIndex });
        } else {
            // wait for better approach
            throw new Error(`Option starting with "${type}" not found.`);
        }

    }

}