import loc from '../support/locators'
import { GenetareDataFakeBuilder } from '../e2e/builders/GenetareDataFakeBuilder'

describe('Call center system tests', () => {
  const dataFakeBuilder = new GenetareDataFakeBuilder();
  beforeEach(function() {
    cy.visit('../src/index.html')
  })

  it('Validate Title', () => {
    cy.validateTittle('Central de Atendimento ao Cliente TAT')
  })

  it('fill in the required fields and send the form', () => {
    cy.fillMandatoryFiledsAndSubmit(dataFakeBuilder.generateName(),dataFakeBuilder.generateSurName(),dataFakeBuilder.generateEmail(),Cypress.env('longText'))
    cy.get(loc.DEFAULT_PAGE.MSG_SUCESS).should('be.visible','Mensagem enviada com sucesso.')
  })

  it('validate error mensage invalid e-mail', () => {
    cy.fillMandatoryFiledsAndSubmit(dataFakeBuilder.generateName(),dataFakeBuilder.generateSurName(),'1234',Cypress.env('longText'))
    cy.get(loc.DEFAULT_PAGE.MSG_ERROR).should('be.visible','Valide os campos obrigatórios!')
  })

  it('validate that the phone field does not accept characters', () => {
    cy.get(loc.DEFAULT_PAGE.INPUT_PHONE).type('sadadasddsadasd').should('have.value','')
  })

  it('validate requiered filed phone', () => {
    cy.get(loc.DEFAULT_PAGE.CHECKBOX_PHONE).check()
    cy.fillMandatoryFiledsAndSubmit(dataFakeBuilder.generateName(),dataFakeBuilder.generateSurName(),dataFakeBuilder.generateEmail(),Cypress.env('longText'))
    cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
    cy.get(loc.DEFAULT_PAGE.MSG_ERROR).should('be.visible','Valide os campos obrigatórios!')
  })

  it('must validate message display of requirents fields', () => {
    cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
    cy.get(loc.DEFAULT_PAGE.MSG_ERROR).should('be.visible','Valide os campos obrigatórios!')
  })

  it('select products', () => {
      const products = ['Blog','Cursos','Mentoria','YouTube']
      for (let product of products) {
        cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(dataFakeBuilder.generateName())
        cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(dataFakeBuilder.generateSurName())
        cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(dataFakeBuilder.generateEmail(0))
        cy.get(loc.DEFAULT_PAGE.SELECT_PRODUCT).select(product).should('have.value',product.toLowerCase())
        cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(Cypress.env('longText'),{delay:0})
        cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
      }
    }
  )

  it('validate type of service', () => {
      const typeservices = ['ajuda','elogio','feedback']
      for (let type of typeservices) {
        cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(dataFakeBuilder.generateName())
        cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(dataFakeBuilder.generateSurName())
        cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(dataFakeBuilder.generateEmail(0))
        cy.get(`input[type="radio"][value=${type}]`).click().should('have.value',type)
        cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(Cypress.env('longText'),{delay:0})
        cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
      }
    }
  )

  it('select file folder fixtures', () => {
      cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(dataFakeBuilder.generateName())
      cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(dataFakeBuilder.generateSurName())
      cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(dataFakeBuilder.generateEmail(0))
      cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(Cypress.env('longText'),{delay:0})
      cy.get(loc.DEFAULT_PAGE.FILE_UPLOAD).should('not.have.value')
      .selectFile('cypress/fixtures/example.json').should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
     //cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
    }
  )

  it('select file folder fixtures - drag-drop', () => {
    cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(dataFakeBuilder.generateName())
    cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(dataFakeBuilder.generateSurName())
    cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(dataFakeBuilder.generateEmail(0))
    cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(Cypress.env('longText'),{delay:0})
    cy.get(loc.DEFAULT_PAGE.FILE_UPLOAD).should('not.have.value')
    .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
   //cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
  }
)

it('select file folder alias fixtures', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get(loc.DEFAULT_PAGE.INPUT_NAME).type(dataFakeBuilder.generateName())
  cy.get(loc.DEFAULT_PAGE.INPUT_LAST_NAME).type(dataFakeBuilder.generateSurName())
  cy.get(loc.DEFAULT_PAGE.INPUT_EMAIL).type(dataFakeBuilder.generateEmail(0))
  cy.get(loc.DEFAULT_PAGE.INPUT_TEXT_AREA).type(Cypress.env('longText'),{delay:0})
  cy.get(loc.DEFAULT_PAGE.FILE_UPLOAD).should('not.have.value')
  .selectFile('@sampleFile')
  .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
  })
 //cy.contains(loc.DEFAULT_PAGE.CY_SEND).click()
}
)


})