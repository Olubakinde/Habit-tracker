/**
 * Import necessary components and dependencies.
 */
import {
    BindValue,
    BindValueToNumber,
    Click,
    EventSubject,
    EzComponent,
    EzDialog,
    Input,
    ValueEvent,
} from "@gsilber/webez";
import html from "./Habit-Display.component.html";
import css from "./Habit-Display.component.css";
import { HabitAddComponent } from "../Habit-Add/Habit-Add.component";
import { HabitTrackComponent } from "../Habit-Track/Habit-Track.component";
import { HabitGraphComponent } from "../Habit-Graph/Habit-Graph.component";

/**
 * HabitDisplayComponent class representing the main component.
 */
export class HabitDisplayComponent extends EzComponent {
    /** Name of the Exercise habit */
    private exercisedHabit: string = "Exercise";
    /** Name of the Read habit */
    private readHabit: string = "Read";
    /** Name of the Meditate habit */
    private meditateHabit: string = "Meditate";
    /** Name of the Study habit */
    private studyHabit: string = "Study";
    /** Name of the Code habit */
    private codeHabit: string = "Code";
    /** Default goal for habits */
    private defaultGoal: number = 3;
    /** ID of the latest habit */
    private latestHabitId: number = 0;
    /** Current date */
    private currentDate: Date = new Date();
    /** EventSubject for current date */
    public currentDateSubject: EventSubject<Date> = new EventSubject<Date>();
    /** Array to store habit names */
    public habits: string[] = [];

    @BindValue("text")
    /** Input field for habit name */
    public habitNameInput: string = "";

    @BindValueToNumber("number")
    /** Input field for habit goal */
    protected habitGoalInput: number = 0;

    @BindValue("date")
    /** Displayed current date */
    private currentDateDisplay: string =
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    /**
     * Constructor to initialize the component.
     */
    constructor() {
        super(html, css);
        this.currentDateSubject.subscribe((date) => {
            this.currentDate = date;
            this.currentDateDisplay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
    }

    /**
     * Handle name input event.
     * @param event ValueEvent object
     */
    @Input("text")
    handleHabitNameInput(event: ValueEvent) {
        this.habitNameInput = event.value;
    }

    /**
     * Handle goal input event.
     * @param event ValueEvent object
     */
    @Input("number")
    handleHabitGoalInput(event: ValueEvent) {
        this.habitGoalInput = parseInt(event.value);
    }

    /**
     * Add a new habit.
     * @param habitName Name of the habit
     * @param defaultGoal Default goal for the habit
     */
    addHabit(habitName: string, defaultGoal: number) {
        if (habitName.trim() === "") {
            EzDialog.popup(
                this,
                "Habit name cannot be empty",
                "Invalid Input",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        const habitAddComponent = new HabitAddComponent(
            habitName,
            defaultGoal,
            this.latestHabitId,
        );
        const habitTrackComponent = new HabitTrackComponent(
            habitName,
            this.latestHabitId,
            this.currentDateSubject,
        );
        const habitGraphComponent = new HabitGraphComponent(
            habitName,
            this.latestHabitId,
        );
        if (!this.habitExists(habitName)) {
            this.habits.push(habitName);
            this.addComponent(habitAddComponent, "textt");
            this.addComponent(habitTrackComponent, "tracktext");
            this.addComponent(habitGraphComponent, "graph");
            habitAddComponent.removeEvent.subscribe(() => {
                this.removeComponent(habitAddComponent);
                this.removeComponent(habitTrackComponent);
                this.removeComponent(habitGraphComponent);
                this.removeFromHabits(habitName);
            });
            habitTrackComponent.changeEvent.subscribe((check: boolean) => {
                if (check) {
                    habitGraphComponent.width += 15;
                } else {
                    habitGraphComponent.width -= 15;
                }
            });
        } else {
            EzDialog.popup(
                this,
                `Habit already exists: ${habitName}`,
                "Try a Different Name",
                ["Ok"],
                "btn btn-primary",
            );
        }
    }

    /**
     * Check if a habit already exists.
     * @param habitName Name of the habit
     * @returns Boolean indicating if habit exists
     */
    public habitExists(habitName: string): boolean {
        return this.habits.includes(habitName);
    }

    @Click("button1")
    /** Event handler for adding a habit */
    add() {
        this.addHabit(this.habitNameInput, this.habitGoalInput);
    }

    @Click("exercise")
    /** Event handler for adding Exercise habit */
    addExerciseHabit() {
        this.addHabit(this.exercisedHabit, this.defaultGoal);
    }

    @Click("read")
    /** Event handler for adding Read habit */
    addReadHabit() {
        this.addHabit(this.readHabit, this.defaultGoal - 1);
    }

    @Click("meditate")
    /** Event handler for adding Meditate habit */
    addMeditateHabit() {
        this.addHabit(this.meditateHabit, this.defaultGoal - 2);
    }

    @Click("study")
    /** Event handler for adding Study habit */
    addStudyHabit() {
        this.addHabit(this.studyHabit, this.defaultGoal - 1);
    }

    @Click("code")
    /** Event handler for adding Code habit */
    addCodeHabit() {
        this.addHabit(this.codeHabit, this.defaultGoal - 1);
    }

    @Click("PD")
    /** Event handler for navigating to the previous date */
    goToPreviousDate() {
        let previousDate = new Date(this.currentDate.getTime());
        previousDate.setDate(previousDate.getDate() - 1);

        this.currentDateSubject.next(previousDate);
    }

    @Click("ND")
    /** Event handler for navigating to the next date */
    goToNextDate() {
        let nextDate = new Date(this.currentDate.getTime());
        nextDate.setDate(nextDate.getDate() + 1);

        this.currentDateSubject.next(nextDate);
    }

    /**
     * Remove habit from the list of tracked habits.
     * @param habitToRemove Name of the habit to remove
     */
    removeFromHabits(habitToRemove: string) {
        this.habits.splice(this.habits.indexOf(habitToRemove), 1);
    }
}
