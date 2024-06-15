import html from "./main.component.html";
import css from "./main.component.css";
import { EzComponent } from "@gsilber/webez";
import { HabitDisplayComponent } from "./Habit-Display/Habit-Display.component";

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    public HabitDisplay: HabitDisplayComponent = new HabitDisplayComponent();

    constructor() {
        super(html, css);
        this.addComponent(this.HabitDisplay, "display");
    }
}
