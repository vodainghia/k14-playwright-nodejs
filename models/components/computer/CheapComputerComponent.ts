import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { selector } from "../SelectorDecorator";

@selector(".CheapComputerComponent.selector")
export default class CheapComputerComponent extends ComputerEssentialComponent {

    constructor(component: Locator) {
        super(component);
    }

    public selectProcessorType(type: string): Promise<void> {
        console.log('selectProcessorType | CheapComputerComponent');
        return Promise.resolve(undefined);
    }

    public selectRAMType(type: string): Promise<void> {
        return Promise.resolve(undefined);
    }
    
}