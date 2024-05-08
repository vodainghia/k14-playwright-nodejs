import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponent from "../components/computer/ComputerEssentialComponent";

export type ComputerComponentConstructor<T extends ComputerEssentialComponent> = new (component: Locator) => T;

export default class ComputerDetailsPage {

    constructor(private page: Page) {
        this.page = page;
    }

    // Boundary Generic type: Generic but have a limitation
    computerComp<T extends ComputerEssentialComponent>(computerComponentClass: ComputerComponentConstructor<T>): T {
        return new computerComponentClass(this.page.locator(computerComponentClass.selectorValue));
    }
}