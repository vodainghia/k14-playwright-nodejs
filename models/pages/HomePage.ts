import { Page } from "@playwright/test";
import HeaderComponent from "../components/global/header/HeaderComponent";
import PageBodyComponent from "../components/PageBodyComponent";
import FooterComponent from "../components/global/footer/FooterComponent";

export default class HomePage {

    constructor(private page: Page) {
        this.page = page;
    }

    headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    }

    pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.selector));
    } 

    footerComponent(): FooterComponent {
        return new FooterComponent(this.page.locator(FooterComponent.selector));
    }
}