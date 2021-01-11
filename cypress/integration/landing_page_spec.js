describe("The Landing Page", () => {
  it("Successfully loads", () => {
    cy.visit("/");

    cy.pause();
  });
});
