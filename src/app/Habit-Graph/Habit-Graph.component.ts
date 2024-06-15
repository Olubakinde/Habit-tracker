import {
    BindStyleToNumberAppendPx,
    BindValue,
    EzComponent,
} from "@gsilber/webez";
import html from "./Habit-Graph.component.html";
import css from "./Habit-Graph.component.css";

/**
 * Represents a component to display a habit graph.
 */
export class HabitGraphComponent extends EzComponent {
    @BindStyleToNumberAppendPx("inside", "width")
    /** Width of the graph */
    public width: number = 10;

    /**
     * Name of the habit.
     */
    @BindValue("name")
    /** Name of the habit */
    public habitName: string = "";

    /**
     * Habit number.
     */
    public habitNumber: number;

    /**
     * Constructs a new instance of HabitGraphComponent.
     * @param name - The name of the habit.
     * @param number - The habit number.
     */
    constructor(name: string, number: number) {
        super(html, css); // Call parent class constructor

        // Assign provided name and number to instance variables
        this.habitName = name || "";
        this.habitNumber = number;
    }
}
