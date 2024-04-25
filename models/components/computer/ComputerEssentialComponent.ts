import { Locator } from "@playwright/test";

export default abstract class ComputerEssentialComponent {


    protected constructor(private component: Locator) {
        this.component =component;
    }

    public abstract selectProcessorType(type: string): Promise<void>;
    public abstract selectRAMType(type: string): Promise<void>;
}