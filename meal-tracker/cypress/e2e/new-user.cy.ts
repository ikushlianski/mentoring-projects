describe("New user screen", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  specify("Show a button to configure application", () => {
    cy.visit("/");

    cy.contains("button", "Configure app");
  });

  specify("Show extra button 'I have already configured the app'", () => {
    cy.visit("/");

    cy.contains("button", "I have already configured the app");
  });

  specify("User is redirected to /welcome page", () => {
    cy.visit("/");

    cy.url().should("include", "/welcome");
  });
});

export {};
