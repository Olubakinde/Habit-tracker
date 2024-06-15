import { describe, expect, test, beforeAll, jest } from "@jest/globals";
import { HabitAddComponent } from "./Habit-Add.component";
import { bootstrap } from "@gsilber/webez";

/**
 * Test suite for the HabitAddComponent class.
 * This suite covers the constructor, methods, and event handling of the HabitAddComponent.
 * It utilizes Jest, a testing framework for JavaScript.
 */
describe("HabitAddComponent", () => {
    let component: HabitAddComponent; // The instance of HabitAddComponent being tested

    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`; // HTML structure for testing
        component = bootstrap<HabitAddComponent>( // Bootstrap the HabitAddComponent
            HabitAddComponent,
            html,
            "main-target", // Pass habit name here
            "Sleep", // Pass habit goal here
            10, // Pass habit ID here
            1, // Pass habit ID here
        );
    });

    /**
     * Test suite for the constructor of HabitAddComponent.
     * It checks if the instance is created successfully and initializes properties correctly.
     */
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitAddComponent); // Expect the instance to be of type HabitAddComponent
        });

        test("Correctly initializes text value", () => {
            expect(component.textvalue).toBe("main-target"); // Expect the textvalue property to be initialized correctly
        });

        test("Correctly initializes number value", () => {
            expect(component.number).toBe("Sleep"); // Expect the number property to be initialized correctly
        });

        test("Correctly initializes ID value", () => {
            expect(component.id).toBe(10); // Expect the id property to be initialized correctly
        });
    });

    /**
     * Test suite for methods of HabitAddComponent.
     * It verifies the behavior of methods.
     */
    describe("Methods", () => {
        test("getId method returns correct ID", () => {
            expect(component.getId()).toBe(10); // Expect the getId method to return the correct ID
        });
    });

    /**
     * Test suite for event handling in HabitAddComponent.
     * It verifies if events are triggered correctly.
     */
    describe("Event Handling", () => {
        test("Clicking on remove button triggers removeEvent", () => {
            const removeEventSpy = jest.spyOn(component.removeEvent, "next"); // Spy on removeEvent subject
            component.remove(); // Trigger remove method
            expect(removeEventSpy).toHaveBeenCalled(); // Expect removeEvent to have been called
        });
    });
});
