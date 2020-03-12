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

  it('user is able to fill out character information section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/character-information')
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

  it('user is able to fill out character information section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/equality-and-diversity-survey')
    cy.get('#share-data__1').click()
    cy.get('#professional-background__2').click()
    cy.get('#current-legal-role__6').click()
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
    cy.get('#participated-in-judicial-workshadowing-scheme__69').click()
    cy.get('#has-taken-paje__72').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#equality-and-diversity-survey-completed').should('be.visible')
  })

  it('user is able to fill out location preferences section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/location-preferences')
    cy.get('#location-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#location-preferences-completed').should('be.visible')
  })

  it('user is able to fill out jurisdiction preferences section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/jurisdiction-preferences')
    cy.get('#jurisdiction-preferences-answer-0').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#jurisdiction-preferences-completed').should('be.visible')
  })

  it('user is able to fill out relevant qualifications section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/relevant-qualifications')
    cy.get('#qualification_type_0__1').click()
    cy.get('#qualification_location_0__5').click()
    cy.get('#qualification_date_0-month').clear().type('12')
    cy.get('#qualification_date_0-year').clear().type('2019')
    cy.get('.govuk-grid-column-two-thirds > :nth-child(4)').click()
    cy.get('#relevant-qualifications-completed').should('be.visible')
  })

  it('user is able to fill out post qualification work experience section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/post-qualification-work-experience')
    cy.get('#experience_job_title_0').clear().type('Beast mode')
    cy.get('#experience_org_business_name_0').clear().type('Supreme Court master')
    cy.get('#experience_start_date_0-month').clear().type('01')
    cy.get('#experience_start_date_0-year').clear().type('2019')
    cy.get('#experience_end_date_0-month').clear().type('02')
    cy.get('#experience_end_date_0-year').clear().type('2019')
    cy.get('#tasks_0__1').click()
    cy.get('.govuk-grid-column-two-thirds > :nth-child(5)').click()
    cy.get('#post-qualification-work-experience-completed').should('be.visible')
  })

  it.only('user is able to fill out judicial experience section', () => {
    cy.visit('https://apply-staging.judicialappointments.digital/apply/GIIXvf2Pp0hMVIdEcfor/judicial-experience')
    cy.get('#fee-or-salaried-judge__1').click()
    cy.get('#fee-or-salaried-sat-thirty-days__3').click()
    cy.get('#fee-or-salaried-sitting-days-details').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    cy.get('#judicial-experience-completed').should('be.visible')
  })



})
