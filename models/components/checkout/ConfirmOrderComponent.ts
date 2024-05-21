import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-confirm_order")
export default class ConfirmOrderComponent {

    protected component: Locator;

    public constructor(component: Locator) {
        this.component = component;
    }
}