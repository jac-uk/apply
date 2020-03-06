/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {

    cy.wait(400)


    // cy.get($body).then($body) => {
    // if ($body.find('.govuk-\!-margin-right-1').length == 1 ) {
    //   cy.get('.govuk-\!-margin-right-1').click()
    // }
  })

  it('user is able to sign in', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/sign-in')
    cy.get('#email').type('test123@gmail.com')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#password').type('123456')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-heading-xl').should('have.text', ' Applications ') //assertion
  })

  it('user is able to apply to legal vacancy', () => {
    cy.get(':nth-child(1) > .govuk-link').click()
    cy.get(':nth-child(2) > :nth-child(1) > .govuk-link').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-panel__body > .govuk-button').click()
    cy.get('#citizenship__1').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(1) > .govuk-list > .container-border-top > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#fullName').type('Test')
    cy.get('#fullName').type('test123@gmail.com')
    cy.get('#date-of-birth-day').type('27')
    cy.get('#date-of-birth-month').type('3')
    cy.get('#date-of-birth-year').clear().type('1964')
    cy.get('#national-insurance-number').clear().type('QQ 12 34 56 C')
    cy.get('#citizenship__3').click()
    cy.get('#reasonable-adjustments__8').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(1) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(1) > .govuk-list > :nth-child(3) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#current-legal-role__17').click()
    cy.get('#fee-paid-judicial-role__30').click()
    cy.get('#state-or-fee-school__34').click()
    cy.get('#oxbridge-universities__41').click()
    cy.get('#state-or-fee-school__34').click()
    cy.get('#ethnic-group__47').click()
    cy.get('#gender__65').click()
    cy.get('#changed-gender__70').click()
    cy.get('#sexual-orientation__76').click()
    cy.get('#disability__80').click()
    cy.get('#religion-faith__82').click()
    cy.get('#atttended-outreach-events__93').click()
    cy.get('#participated-in-judicial-workshadowing-scheme__95').click()
    cy.get('#has-taken-paje__98').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(2) > .govuk-list > .container-border-top > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#location-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(2) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#jurisdiction-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(3) > .govuk-list > .container-border-top > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#qualification_type_0__101').click()
    cy.get('#qualification_type_0__105').click()
    cy.get('#qualification_date_0-month').type('1')
    cy.get('#qualification_date_0-year').type('2019')
    cy.get('.govuk-grid-column-two-thirds > :nth-child(4)').click()
    cy.get(':nth-child(3) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#experience_job_title_0').type('Beast mode')
    cy.get('#experience_org_business_name_0').type('Supreme Court master')
    cy.get('#experience_start_date_0-month').type('01')
    cy.get('#experience_start_date_0-year').type('2020')
    cy.get('#experience_end_date_0-month').type('02')
    cy.get('#experience_end_date_0-year').type('2020')
    cy.get('#tasks_0__1').click()
    cy.get('.govuk-grid-column-two-thirds > :nth-child(5)').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#qualification_type_0__101').click()
    cy.get('#qualification_location_0__105').click() //for some reason cypress registers this as qualification_type_0__105 instead of what is explained
    // not sure why
    // could add cy.get('[data-cy=submit]').click() to code for best practices
    cy.get('#qualification_date_0-month').type('01')
    cy.get('#qualification_date_0-year').type('2020')
    cy.get('.govuk-grid-column-two-thirds > :nth-child(4)').click()
    cy.get(':nth-child(3) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#fee-or-salaried-judge__12').click()
    cy.get(':nth-child(1) > .govuk-radios__item > #fee-or-salaried-sat-thirty-days__17').click()
    cy.get('#fee-or-salaried-sitting-days-details').type('10')
    cy.get('#quasi-judicial-sat-thirty-days__20').click()
    cy.get('#quasi-judicial-sitting-days-details').type(10)
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get(':nth-child(4) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('#tasks_0__28').click()
    cy.get(':nth-child(5) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    cy.get('.govuk-grid-column-two-thirds > :nth-child(5)').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#first-assessor-full-name').type('test')
    cy.get('#first-assessor-title').type('test')
    cy.get('#first-assessor-email').type('test@gmail.com')
    cy.get('#first-assessor-Phone').type('test')
    cy.get('#second-assessor-full-name').type('test')
    cy.get('#second-assessor-title').type('test')
    cy.get('#second-assessor-email').type('test@gmail.com')
    cy.get('#second-assessor-Phone').type('test')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-full > .govuk-button').click()







  })

  // it('user is able to apply to non legal vacancy', () => {
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('#password').type('123456')
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('.govuk-heading-xl').should('have.text', ' Applications ')
  // })
  //
  // it('user is able to apply to leadership vacancy', () => {
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('#password').type('123456')
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('.govuk-heading-xl').should('have.text', ' Applications ')
  // })
  //
  // it('user is able to apply to leadership non legal vacancy', () => {
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('#password').type('123456')
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('.govuk-heading-xl').should('have.text', ' Applications ')
  // })

})
