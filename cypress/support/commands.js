import loc from '../support/locators'

Cypress.Commands.add('validateTittle', tittle => {
    cy.title().should('be.equal',tittle)
})

Cypress.Commands.add('validateTextBody', text => {
    cy.get('body').should('contain', text)
})

Cypress.Commands.add('fillMandatoryFiledsAndSubmit', (name,lastname,email,textarea) => {
    cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(name)
    cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(lastname)
    cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(email)
    cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(textarea,{delay:0})
    cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
})