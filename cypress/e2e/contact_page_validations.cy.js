describe('Validation over the Contact page - Test cases 1 and 2', () => {
  it('The Contact page should check that all mandatory fields are populated by the user', () => {
    cy.contains('Submit').click();
    cy.contains('but we won\'t get it unless you complete the form correctly.').should('be.visible');
  })

  it('The Contact page should validate the successful submission message', () => {
    cy.get('#forename').type('Jhon Doe');
    cy.get('#email').type('jhondoe@testemail.com');
    cy.get('#message').type('Hey! I\'m Jhon Doe and I\'d like to contact you');
    cy.contains('Submit').click();
    cy.contains('Thanks Jhon', {timeout:15000}).should('be.visible');
  })
  beforeEach(() => {
    cy.visit('https://jupiter.cloud.planittesting.com/');
    cy.contains('Contact').click();
  })
})