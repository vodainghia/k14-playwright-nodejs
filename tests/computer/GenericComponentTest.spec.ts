import { test } from "@playwright/test";
import CheapComputerComponent from "../../models/components/computer/CheapComputerComponent";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";
import StandardComputerComponent from "../../models/components/computer/StandardComputerComponent";

test('Test Generic Component in Page', async ({ page }) => {
    const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(page);
    const cheapComputerComponent = computerDetailsPage.computerComp(CheapComputerComponent);
    const standardComputerComponent = computerDetailsPage.computerComp(StandardComputerComponent);

    await cheapComputerComponent.selectProcessorType('111');
    await standardComputerComponent.selectProcessorType('222');
});