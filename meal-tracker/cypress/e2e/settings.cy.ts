import {
  ConfigurableAppSettings,
  defaultAppSettings,
} from "../../src/core/settings/constants";

describe("App settings", () => {
  describe("Default values", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    specify(
      "Redirects to settings page if Configure App button is clicked",
      () => {
        cy.visit("/");

        cy.contains("button", "Configure app").click();

        cy.url().should("include", "/settings");
      }
    );

    specify("Default meals per day is 6", () => {
      cy.visit("/");

      cy.contains("button", "Configure app").click();

      cy.get('[placeholder="How many meals per day do I need?"]').should(
        "have.value",
        defaultAppSettings[ConfigurableAppSettings.MealsPerDay]
      );
    });

    specify("Default interval between meals is 140 min", () => {
      cy.visit("/");

      cy.contains("button", "Configure app").click();

      cy.get(
        '[placeholder="How much time between meals would I prefer?"]'
      ).should(
        "have.value",
        defaultAppSettings[ConfigurableAppSettings.IntervalBetweenMealsMinutes]
      );
    });

    specify("Default time from waking up to first meal is 20 min", () => {
      cy.visit("/");

      cy.contains("button", "Configure app").click();

      cy.get(
        '[placeholder="How soon do I have breakfast after waking up?"]'
      ).should(
        "have.value",
        defaultAppSettings[
          ConfigurableAppSettings.TimeFromWakeUpTillBreakfastMinutes
        ]
      );
    });
  });

  describe("Settings saving", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    specify("Options are saved to local storage", () => {
      cy.visit("/");
      cy.contains("button", "Configure app").click();
      cy.get('[placeholder="How many meals per day do I need?"]')
        .clear()
        .type("5");

      cy.contains("button", "Save & close").click();
      cy.contains("a", "Settings").click();
      cy.get('[placeholder="How many meals per day do I need?"]').should(
        "have.value",
        5
      );
    });
  });
});

export {};
