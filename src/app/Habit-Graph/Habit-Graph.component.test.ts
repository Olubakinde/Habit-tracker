import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitGraphComponent } from "./Habit-Graph.component";
import { bootstrap } from "@gsilber/webez";

/**
 * Test suite for the HabitGraphComponent class.
 * This suite covers the constructor and property initialization of the HabitGraphComponent.
 * It utilizes Jest, a testing framework for JavaScript.
 */
describe("HabitGraphComponent", () => {
    let component: HabitGraphComponent; // The instance of HabitGraphComponent being tested

    /**
     * Setup function executed before all tests.
     * It initializes necessary dependencies and bootstraps the HabitGraphComponent.
     */
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`; // HTML structure for testing
        component = bootstrap<HabitGraphComponent>(HabitGraphComponent, html); // Bootstrap the HabitGraphComponent
    });

    /**
     * Test suite for the constructor of HabitGraphComponent.
     * It checks if the instance is created successfully.
     */
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitGraphComponent); // Expect the instance to be of type HabitGraphComponent
        });
    });

    /**
     * Test suite for verifying the initialization of properties in HabitGraphComponent.
     * It checks if properties are initialized to their default values.
     */
    describe("Properties", () => {
        test("Width Property", () => {
            // Check if width property is initialized to the default value
            expect(component.width).toBe(10); // Expect the width property to be initialized to 10
        });

        test("HabitName Property", () => {
            // Check if habitName property is initialized to an empty string
            expect(component.habitName).toBe(""); // Expect the habitName property to be initialized to an empty string
        });

        test("HabitNumber Property", () => {
            // Check if habitNumber property is initialized to undefined
            expect(component.habitNumber).toBeUndefined(); // Expect the habitNumber property to be initialized to undefined
        });
    });
});
