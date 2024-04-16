import { Locator, Page } from "@playwright/test";

export default class SearchComponent {

    public static selector = '.search-box'; // To find this component

    // When having the component -> can find elements in it
    private searchBoxLoc = 'input[id="small-searchterms"]';
    private searchBtnLoc = 'input[class*="search-box-button"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    // Narrow down searching scope (not use page -> use component)
    searchBox(): Locator {
        return this.component.locator(this.searchBoxLoc);
    }

    searchBtn(): Locator {
        return this.component.locator(this.searchBtnLoc);
    }
}