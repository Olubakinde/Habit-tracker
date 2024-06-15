import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitTrackComponent } from "./Habit-Track.component";
import { bootstrap, ValueEvent, EventSubject } from "@gsilber/webez";

/**
 * Test suite for the HabitTrackComponent class.
 * This suite covers the functionality of the HabitTrackComponent including constructor, event handling, and property updates.
 */
describe("HabitTrackComponent", () => {
    let component: HabitTrackComponent; // The instance of HabitTrackComponent being tested
    let currentDateSubject: EventSubject<Date>; // Subject for managing current date updates

    /**
     * Setup function executed before all tests.
     * It initializes necessary dependencies and bootstraps the HabitTrackComponent.
     */
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`; // HTML structure for testing
        currentDateSubject = new EventSubject<Date>(); // Subject for managing current date updates
        component = bootstrap<HabitTrackComponent>( // Bootstrap the HabitTrackComponent
            HabitTrackComponent,
            html,
            "habit-name",
            123, // Sample habit ID
            currentDateSubject,
        );
    });

    /**
     * Test suite for the constructor of HabitTrackComponent.
     * It checks if the instance is created successfully.
     */
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitTrackComponent); // Expect the instance to be of type HabitTrackComponent
        });
    });

    /**
     * Test suite for handling checkbox change events in HabitTrackComponent.
     * It checks the behavior when completing or uncompleting a habit.
     */
    describe("Checkbox Change Event", () => {
        test("Complete Habit", () => {
            // Simulate completion of habit
            component.onCheckboxChange({ value: "on" } as ValueEvent);
            expect(component.isCompleted).toBe(true); // Expect the habit to be marked as completed
            expect(component.completedDates).toContain(
                // Expect the completed dates to contain the current date
                component.currentDate.toDateString(),
            );
        });

        test("Uncomplete Habit", () => {
            // Simulate uncompletion of habit
            component.onCheckboxChange({ value: "off" } as ValueEvent);
            expect(component.isCompleted).toBe(false); // Expect the habit to be marked as not completed
            expect(component.completedDates).not.toContain(
                // Expect the completed dates not to contain the current date
                component.currentDate.toDateString(),
            );
        });
    });

    /**
     * Test suite for updating the current date in HabitTrackComponent.
     * It verifies if updating the current date works as expected.
     */
    describe("Current Date", () => {
        test("Update Current Date", () => {
            const newDate = new Date("2024-05-28"); // Sample new date
            currentDateSubject.next(newDate); // Update the current date
            expect(component.currentDate).toEqual(newDate); // Expect the current date to be updated accordingly
        });
    });

    /**
     * Test suite for updating the habit name property in HabitTrackComponent.
     * It checks if updating the habit name works correctly.
     */
    describe("Habit Name", () => {
        test("Update Habit Name", () => {
            component.habitName = "New Habit"; // Update habit name
            expect(component.habitName).toBe("New Habit"); // Expect the habit name to be updated correctly
        });
    });

    /**
     * Test suite for updating the habit ID property in HabitTrackComponent.
     * It verifies if updating the habit ID works correctly.
     */
    describe("Habit ID", () => {
        test("Update Habit ID", () => {
            component.habitId = 5; // Update habit ID
            expect(component.habitId).toBe(5); // Expect the habit ID to be updated correctly
        });
    });
});
