import {
    BindAttribute,
    BindCheckedToBoolean,
    BindValue,
    Change,
    EventSubject,
    EzComponent,
    ValueEvent,
} from "@gsilber/webez";
import html from "./Habit-Track.component.html";
import css from "./Habit-Track.component.css";

/**
 * Represents a component to track habit completion.
 */
export class HabitTrackComponent extends EzComponent {
    @BindCheckedToBoolean("check")
    /** Indicates whether the habit has been completed */
    public isCompleted: boolean = false;

    /** Array to store completed dates */
    public completedDates: string[] = [];

    /** Current date */
    public currentDate: Date = new Date();

    /** EventSubject for tracking change in completion status */
    public changeEvent: EventSubject<boolean> = new EventSubject<boolean>();

    @BindValue("name")
    /** Name of the habit being tracked */
    public habitName: string = "";

    @BindAttribute("check", "checkbox", (id: number) => id.toString())
    /** ID of the habit being tracked */
    public habitId: number;

    /**
     * Constructs a new instance of HabitTrackComponent.
     * @param habitName - The name of the habit.
     * @param id - The ID of the habit.
     * @param currentDateSubject - EventSubject for current date.
     */
    constructor(
        habitName: string,
        id: number,
        currentDateSubject: EventSubject<Date>,
    ) {
        super(html, css);
        this.habitName = habitName;
        this.habitId = id;

        currentDateSubject.subscribe((date) => {
            this.currentDate = date;
            this.isCompleted = this.completedDates.includes(
                date.toDateString(),
            );
        });
    }

    /**
     * Handles the change event of the checkbox.
     * @param event ValueEvent object
     */
    @Change("check")
    onCheckboxChange(event: ValueEvent) {
        if (event.value === "on") {
            this.changeEvent.next(true);
            this.isCompleted = true;
            this.completedDates.push(this.currentDate.toDateString());
        } else {
            this.changeEvent.next(false);
            this.isCompleted = false;
            this.completedDates.splice(
                this.completedDates.indexOf(this.currentDate.toDateString()),
                1,
            );
        }
    }
}
