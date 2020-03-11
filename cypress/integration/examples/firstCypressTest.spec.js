/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {

    cy.wait(400)


    // cy.get($body).then($body) => {
    // if ($body.find('.govuk-\!-margin-right-1').length == 1 ) {
    //   cy.get('.govuk-\!-margin-right-1').click()
    // }
  })

  // it('user is able to sign in', () => {
    // cy.visit('https://apply-staging.judicialappointments.digital/sign-in')
    // cy.get('#email').clear().type('test123@gmail.com')
    //   cy.get('#password').type('123456')
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
  //   cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get('.govuk-heading-xl').should('have.text', ' Applications ') //assertion
  // })

// Look up css selectors


  it('user is able to apply to legal vacancy', () => {
    // sign in
    // cy.url().should('eq', 'https://apply-staging.judicialappointments.digital/applications')
    // cy.get(':nth-child(1) > .govuk-link').click()
    cy.visit('https://apply-staging.judicialappointments.digital/vacancies')
    cy.wait(1000) //waits a second for database response, could be fixed
    // cy.get('click').click('Legal test v2')
    // cy.get('#fullName').clear().type('Test') // fills in full name with name
    // cy.get('#main-content > div > div > div.govuk-grid-column-three-quarters > div.openApplicationsList > ul').children()
    // .eq(-15).children().eq(0).click('Legal test v2')
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on button(check if you're eligible to apply)
    // cy.get('.govuk-panel__body > .govuk-button').click() //clicks on continue
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on continue button
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on continue button
    cy.contains('Legal test v2').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //
    cy.get('.govuk-panel__body > .govuk-button').click() //clicks on continue
    cy.get('#citizenship__1').click() //clicks on yes to citizenship question
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on continue
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() // clicks on continue
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on save and continue
    cy.contains('Personal details').click() //clicks on personal details to start filling in the details
    cy.get('#fullName').clear().type('test123@gmail.com') //fills in email address with email
    cy.get('#date-of-birth-day').type('27') //fills in day of birth
    cy.get('#date-of-birth-month').type('3') //fills in months of birth
    cy.get('#date-of-birth-year').clear().type('1964') // fills in year of birth
    cy.get('#national-insurance-number').clear().type('QQ 12 34 56 C') // fills in
    cy.get('#citizenship__3').click()
    cy.get('#reasonable-adjustments__8').click()
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // assert?
    cy.contains('Character information').click() //clicks on Character information
    cy.get('#criminal-offenses__10').click() //clicks on no to being convicted of criminal offence
    cy.get('#non-motoring-fixed-pentalty-notice__12').click() //clicks no to being convicted of non motoring penalty recently
    cy.get('#driving-disqualification-drink-drugs__14').click() //clicks no to being disqualified from driving or convicted for DUIs
    cy.get('#driving-endorsements-of-fixed-penalty__16').click() //clicks no to receiving endorsements on license
    cy.get('#declared-bankrupt-or-iva__18').click() //clicks no to ever being declared bankrupt or entered IVA
    cy.get('#late-tax-return-or-fined-by-hmrc__20').click() //clicks no to ever filed late tax returns or fined by HRMC
    cy.get('#involved-in-professional-misconduct__40').click() //clicks no to being subject to professional misconduct etc
    cy.get('#subject-to-diciplinary-or-asked-to-resign__42').click() //clicks no to ever being subject to complaints etc
    cy.get('#other-character-issues__44').click() //clicks no when asked about any other character features about me
    cy.get('.govuk-grid-column-two-thirds > .govuk-button').click() //clicks on save and continue
    // assert?
    cy.contains('Equality and diversity').click() //clicks on equality and diversity link
    cy.get('#share-data__45').click() //clicks on allow data to be shared from this application
    cy.get('#professional-background__6').click() //clicks on previous background in the industry
    cy.get('#current-legal-role__17').click() //
    cy.get('#fee-paid-judicial-role__6').click()
    cy.get('#state-or-fee-school__10').click()
    cy.get('#oxbridge-universities__17').click()
    cy.get('#first-generation-student__20').click()
    cy.get('#ethnic-group__23').click()
    cy.get('#gender__41').click()
    cy.get('#changed-gender__46').click()
    cy.get('#sexual-orientation__52').click() //Sexual orientation
    cy.get('#disability__56').click() //Am i in any way disabled?
    cy.get('#religion-faith__58').click()

    // cy.get(':nth-child(1) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get(':nth-child(1) > .govuk-list > :nth-child(3) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#state-or-fee-school__102').click()
    // cy.get('#state-or-fee-school__41')
    // //
    // cy.get('#state-or-fee-school__34').click()
    // cy.get('#oxbridge-universities__41').click()
    // cy.get('#state-or-fee-school__34').click()
    // cy.get('#ethnic-group__47').click()
    // cy.get('#gender__65').click()
    // cy.get('#changed-gender__70').click()
    // cy.get('#sexual-orientation__76').click()
    // cy.get('#disability__80').click()
    // cy.get('#religion-faith__82').click()
    // cy.get('#atttended-outreach-events__93').click()
    // cy.get('#participated-in-judicial-workshadowing-scheme__95').click()
    // cy.get('#has-taken-paje__98').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get(':nth-child(2) > .govuk-list > .container-border-top > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#location-preferences-answer-0').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get(':nth-child(2) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#jurisdiction-preferences-answer-0').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get(':nth-child(3) > .govuk-list > .container-border-top > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    //
    // cy.get('#qualification_type_0__101').click()
    // cy.get('#qualification_date_0-month').type('1')
    // cy.get('#qualification_date_0-year').type('2019')
    // cy.get('.govuk-grid-column-two-thirds > :nth-child(4)').click()
    // cy.get(':nth-child(3) > .govuk-list > :nth-child(2) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#experience_job_title_0').type('Beast mode')
    // cy.get('#experience_org_business_name_0').type('Supreme Court master')
    // cy.get('#experience_start_date_0-month').type('01')
    // cy.get('#experience_start_date_0-year').type('2020')
    // cy.get('#experience_end_date_0-month').type('02')
    // cy.get('#experience_end_date_0-year').type('2020')
    // cy.get('#tasks_0__18').click()
    // cy.get('.govuk-grid-column-two-thirds > :nth-child(5)').click()
    // cy.get(':nth-child(4) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#start_date_0-month').type('09')
    // cy.get('#start_date_0-year').type('2019')
    // cy.get('#end_date_0-month').type('10')
    // cy.get('#end_date_0-year').type('2019')
    // cy.get('#details_0').clear().type('Took a vacation ok give me a break')
    // cy.get('#tasks_0__27').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get(':nth-child(5) > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#can-give-reasonable-los__108').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // Assessments
    //
    // cy.get(':nth-child(4) > .govuk-list > .govuk-!-margin-bottom-0 > .govuk-grid-row > .govuk-grid-column-three-quarters > .govuk-link').click()
    // cy.get('#first-assessor-full-name').type('test')
    // cy.get('#first-assessor-title').type('test')
    // cy.get('#first-assessor-email').type('test@gmail.com')
    // cy.get('#first-assessor-Phone').type('test')
    // cy.get('#second-assessor-full-name').type('test')
    // cy.get('#second-assessor-title').type('test')
    // cy.get('#second-assessor-email').type('test@gmail.com')
    // cy.get('#second-assessor-Phone').type('test')
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get('.govuk-grid-column-two-thirds > .govuk-button').click()
    // cy.get('.govuk-grid-column-full > .govuk-button').click()
    //






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
