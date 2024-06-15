import { describe, expect, test, beforeAll, jest } from "@jest/globals";
import { HabitDisplayComponent } from "./Habit-Display.component";
import { bootstrap } from "@gsilber/webez";

/**
 * Test suite for the HabitDisplayComponent class.
 * This suite covers the functionality of the HabitDisplayComponent, including constructor,
 * adding habits, checking habit existence, and navigating dates.
 * It utilizes Jest, a testing framework for JavaScript.
 */
describe("HabitDisplayComponent", () => {
    let component: HabitDisplayComponent; // The instance of HabitDisplayComponent being tested

    // Before all tests, bootstrap the component
    beforeAll(() => {
        const html = `<div>Testing Environment</div><div id='main-target'></div>`; // HTML structure for testing
        component = bootstrap<HabitDisplayComponent>(
            HabitDisplayComponent,
            html,
        ); // Bootstrap the HabitDisplayComponent
    });

    /**
     * Test suite for the constructor of HabitDisplayComponent.
     * It checks if the instance is created successfully.
     */
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitDisplayComponent); // Expect the instance to be of type HabitDisplayComponent
        });
    });

    /**
     * Test suite for adding a habit to the HabitDisplayComponent.
     * It verifies whether habits are added correctly.
     */
    describe("Adding a Habit", () => {
        test("Add New Habit", () => {
            const habitName = "Test Habit"; // Sample habit name
            const habitGoal = 3; // Sample habit goal
            component.addHabit(habitName, habitGoal); // Add a new habit
            // Expect the habit to be added to the list of habits
            expect(component.habits.includes(habitName)).toBe(true);
        });

        test("Add Existing Habit", () => {
            const habitName = "Test Habit"; // Sample habit name
            const habitGoal = 3; // Sample habit goal
            // Adding the same habit again should not add it to the list
            component.addHabit(habitName, habitGoal);
            expect(component.habits.length).toBe(1); // Expect the length of habits list to remain the same
        });
    });

    /**
     * Test suite for checking the existence of a habit in the HabitDisplayComponent.
     * It verifies whether habit existence is correctly determined.
     */
    describe("Checking Habit Existence", () => {
        test("Existing Habit", () => {
            const habitName = "Test Habit"; // Sample habit name
            // The habit added previously should exist
            expect(component.habitExists(habitName)).toBe(true);
        });

        test("Non-Existing Habit", () => {
            const habitName = "Non-Existing Habit"; // Sample non-existing habit name
            // A non-existing habit should not exist
            expect(component.habitExists(habitName)).toBe(false);
        });
    });

    /**
     * Test suite for navigating dates in the HabitDisplayComponent.
     * It verifies whether date navigation functions work as expected.
     */
    describe("Navigating Dates", () => {
        test("Go To Previous Date", () => {
            // Mock the currentDateSubject's next method
            const mockNext = jest.spyOn(component.currentDateSubject, "next");
            component.goToPreviousDate(); // Trigger navigation to previous date
            // Expect the next method to have been called with a date one day earlier
            expect(mockNext).toHaveBeenCalledWith(expect.any(Date));
        });

        test("Go To Next Date", () => {
            // Mock the currentDateSubject's next method
            const mockNext = jest.spyOn(component.currentDateSubject, "next");
            component.goToNextDate(); // Trigger navigation to next date
            // Expect the next method to have been called with a date one day later
            expect(mockNext).toHaveBeenCalledWith(expect.any(Date));
        });
    });
});
