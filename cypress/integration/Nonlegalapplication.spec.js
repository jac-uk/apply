/// <reference types="cypress" />
// describe('')
context('Actions', () => {
  // beforeEach(() => {
  // })

  it('user is able to sign in', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/sign-in')
    cy.get('#email').clear().type('test123@gmail.com')
    cy.get('#password').type('123456')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-heading-xl').should('have.text', ' Applications ') //assertion
  })

  it('user is able to click and enter non legal vacancy', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/vacancy/sZhJ2BWMS52eDJ8yzC16/')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-panel__body > .govuk-button').click()
    cy.get('#citizenship__1').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('.govuk-caption-xl').should('have.text', ' JAC00141 Non-legal test ')
  })

  it('user is able to fill out personal details section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/personal-details')
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
  
  it('user is able to fill out character information section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/character-information')
    cy.get('#criminal-offenses__2').click()
    cy.get('#non-motoring-fixed-pentalty-notice__4').click()
    cy.get('#driving-disqualification-drink-drugs__6').click()
    cy.get('#driving-endorsements-of-fixed-penalty__8').click()
    cy.get('#declared-bankrupt-or-iva__10').click()
    cy.get('#late-tax-return-or-fined-by-hmrc__12').click()
    cy.get('#involved-in-professional-misconduct__14').click()
    cy.get('#subject-to-diciplinary-or-asked-to-resign__16').click()
    cy.get('#other-character-issues__18').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#apply-character-information-completed').should('be.visible')
  })

  it('user is able to fill out equality and diversity section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/equality-and-diversity-survey')
    cy.get('#share-data__1').click()
    cy.get('#professional-background__2').click()
    cy.get('#fee-paid-judicial-role__4').click()
    cy.get('#state-or-fee-school__8').click()
    cy.get('#oxbridge-universities__15').click()
    cy.get('#first-generation-student__18').click()
    cy.get('#ethnic-group__21').click()
    cy.get('#gender__39').click()
    cy.get('#changed-gender__44').click()
    cy.get('#sexual-orientation__50').click()
    cy.get('#disability__54').click()
    cy.get('#religion-faith__56').click()
    cy.get('#atttended-outreach-events__67').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#equality-and-diversity-survey-completed').should('be.visible')
  })

  it('user is able to fill out part time work section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/part-time-working-preferences')
    cy.get('#part-time-working-preferences__2').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  })

  it('user is able to fill out location preferences section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/location-preferences')
    cy.get('#location-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#location-preferences-completed').should('be.visible')
  })

  it('user is able to fill out jurisdiction preferences section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/jurisdiction-preferences')
    cy.get('#jurisdiction-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#jurisdiction-preferences-completed').should('be.visible')
  })

  it('user is able to fill out relevant memberships section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/relevant-memberships')
    cy.get('#professional-memberships__1').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#relevant-memberships-completed').should('be.visible')
  })

  it('user is able to fill out relevant experience section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/relevant-experience')
    cy.get('#experience_job_title_0').clear().type('I was me')
    cy.get('#experience_org_business_name_0').clear().type('I was the boss')
    cy.get('#experience_start_date_0-month').clear().type('02')
    cy.get('#experience_end_date_0-year').clear().type('2019')
    cy.get('.govuk-grid-column-two-thirds > :nth-child(4)').click()
    cy.get('#relevant-experience-completed').should('be.visible')
  })

  it('user is able to fill out employments section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/employment-gaps')
    cy.get('#start_date_0-month').clear().type('03')
    cy.get('#start_date_0-year').clear().type('2020')
    cy.get('#end_date_0-month').clear().type('04')
    cy.get('#end_date_0-year').clear().type('2020')
    cy.get('#details_0').clear().type('I took a break ok relax')
    cy.get('.govuk-grid-column-two-thirds > :nth-child(5)').click()
    cy.get('#employment-gaps-completed').should('be.visible')
  })

  it('user is able to fill out reasonable length of service section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/reasonable-length-of-service')
    cy.get('#can-give-reasonable-los__1').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#reasonable-length-of-service-completed').should('be.visible')
  })

  it('user is able to fill out independent assessors section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/assessors-details')
    cy.get('#first-assessor-full-name').clear().type('Test')
    cy.get('#first-assessor-title').clear().type('Boss man')
    cy.get('#first-assessor-email').clear().type('test321@gmail.com')
    cy.get('#first-assessor-Phone').clear().type('07123456789')
    cy.get('#second-assessor-full-name').clear().type('Tester')
    cy.get('#second-assessor-title').clear().type('Supreme Court Leader')
    cy.get('#second-assessor-email').clear().type('sett123@gmail.com')
    cy.get('#second-assessor-Phone').clear().type('07987654321')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#assessors-details-completed').should('be.visible')

  })

  it('user is able to review application after completing every section and able to click continue', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16')
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').should('be.visible')
  })

  it('user is able to send application after reviewing every section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/sZhJ2BWMS52eDJ8yzC16/review')
    cy.get('.govuk-grid-column-full > .govuk-button').should('be.visible')

  })
})
