import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";

export default class OrderComputerFlow {

    constructor(private page: Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.selectProcessorType("2.2 GHz");
        await computerComp.selectRAMType("4GB");
        await computerComp.selectHDDType("400 GB");
        //await computerComp.selectSoftwareType("Office Suite");

        // Debug
        await this.page.waitForTimeout(3 * 1000);
    }
}