import { Locator } from "@playwright/test";

// NOTE: a base component has NO selector
export default class FooterColumnComponent {

    private titleSel: string = "h3"; 
    private linkSel: string = "li a";

    // This one is to force concrete classes (Component)'s constructor to call parent (BaseComponent)'s constructor
    constructor(private component: Locator) {
        this.component = component;
        this.component.scrollIntoViewIfNeeded();
    }

    title(): Locator {
        return this.component.locator(this.titleSel);
    }

    links(): Promise<Locator[]> {
        return this.component.locator(this.linkSel).all();
    }
}