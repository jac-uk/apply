/// <reference types="cypress" />

context('Actions', () => {
  // beforeEach(() => {
  //
  //   cy.wait(400)
  //
  //
  //   // cy.get($body).then($body) => {
  //   // if ($body.find('.govuk-\!-margin-right-1').length == 1 ) {
  //   //   cy.get('.govuk-\!-margin-right-1').click()
  //   // }
  // })

  it('user is able to sign in', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/sign-in')
    cy.get('#email').clear().type('test123@gmail.com')
    cy.get('#password').type('123456')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-heading-xl').should('have.text', ' Applications ') //assertion
  })



  it('user is able to click and enter legal vacancy', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/vacancy/GIIXvf2Pp0hMVIdEcfor/')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-panel__body > .govuk-button').click()
    cy.get('#citizenship__1').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-caption-xl').should('have.text', ' JAC00134 Legal test v2 ')
  })

  it('user is able to fill out personal details section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/personal-details')
    cy.get('#fullName').clear().type('Test')
    cy.get('#email').clear().type('test123@gmail.com')
    cy.get('#date-of-birth-day').clear().type('31')
    cy.get('#date-of-birth-month').clear().type('12')
    cy.get('#date-of-birth-year').clear().type('1964')
    cy.get('#national-insurance-number').clear().type('QQ 12 34 56 C')
    cy.get('#citizenship__1').click()
    cy.get('#reasonable-adjustments__6').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#apply-personal-details-completed').should('be.visible')
  })

})
