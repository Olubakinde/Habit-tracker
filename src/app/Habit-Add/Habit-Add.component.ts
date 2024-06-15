import {
    BindAttribute,
    BindValue,
    BindValueToNumber,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import html from "./Habit-Add.component.html";
import css from "./Habit-Add.component.css";

/**
 * Represents a component to add a new habit.
 */
export class HabitAddComponent extends EzComponent {
    /**
     * Text value representing the habit.
     */
    @BindValue("text")
    public textvalue: string = "Sleep: 10 hours";

    /**
     * Numeric value representing the habit goal.
     */
    @BindValueToNumber("number")
    public number: number = 0;

    /**
     * ID of the habit.
     */
    @BindAttribute("remove", "text", (id: number) => id.toString())
    public id: number;

    /**
     * Event subject for removing the habit.
     */
    removeEvent: EventSubject = new EventSubject();

    /**
     * Constructs a new instance of HabitAddComponent.
     * @param habit - The habit name.
     * @param goal - The habit goal.
     * @param id - The habit ID.
     */
    constructor(habit: string, goal: number, id: number) {
        super(html, css);
        this.textvalue = habit;
        this.number = goal;
        this.id = id;
    }

    /**
     * Gets the ID of the habit.
     * @returns The habit ID.
     */
    getId() {
        return this.id;
    }

    /**
     * Handles click event to remove the habit.
     */
    @Click("remove")
    remove() {
        this.removeEvent.next();
    }
}
