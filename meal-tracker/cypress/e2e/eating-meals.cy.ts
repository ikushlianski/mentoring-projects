describe("Eating meals", () => {
  const planMealsBtnText = "Plan meals";

  beforeEach(() => {
    localStorage.clear();

    cy.visit("/");
    cy.contains("button", "Configure app").click();
    cy.contains("button", "Save & close").click();
  });

  specify(
    "Planning meals for the day lists meals starting with current time plus configured 20 min interval",
    () => {
      cy.clock(new Date("22 Jul 2022 08:00"));
      cy.contains("button", planMealsBtnText).click();
      cy.get("#meal-1 > .time").should("have.text", "08:20");
    }
  );

  specify("Eating first meal changes its time to current time", () => {
    cy.clock(new Date("22 Jul 2022 08:00")).then(($clock) => {
      cy.contains("button", planMealsBtnText)
        .click()
        .then(() => {
          // 31 minutes pass before we actually eat
          const min31 = 1000 * 60 * 31;

          $clock.tick(min31);

          cy.get("#meal-1 .eat").click();
          cy.contains("#meal-1 > .time", "08:31");
        });
    });
  });
});
