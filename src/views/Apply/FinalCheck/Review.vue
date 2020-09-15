<template>
  <div class="govuk-grid-row">
    <form 
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-full">
        <BackLink class="govuk-!-margin-top-0" />

        <Countdown
          :close-time="vacancyCloseTime"
          :countdown-length="60"
        />

        <ErrorSummary :errors="errors" />

        <div class="govuk-!-margin-top-1">
          <h1
            class="govuk-heading-xl"
            style="display:inline-block;"
          >
            Review your application
          </h1>
          <a
            href="#"
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            @click="downloadAsPdf"
          >
            Download As PDF
          </a>
        </div>

        <div 
          ref="download-as-pdf-div"
        >
          <h1 class="govuk-heading-l">
            {{ vacancy.name }}
          </h1>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Personal details
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'apply-personal-details'}"
            >
              Change
            </RouterLink>
          </div>

          <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Full Name
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.personalDetails.fullName }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Email address
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.personalDetails.email }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Phone number
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.personalDetails.phone }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Date of birth
              </dt>
              <dd class="govuk-summary-list__value">
                <p v-if="application.personalDetails.dateOfBirth">
                  {{ application.personalDetails.dateOfBirth | formatDate }}
                </p>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                NI Number
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.personalDetails.nationalInsuranceNumber }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Citizenship
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.personalDetails.citizenship | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Reasonable adjustments
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.personalDetails.reasonableAdjustments | toYesNo }}
                <ul
                  v-if="application.personalDetails.reasonableAdjustmentsDetails"
                  class="govuk-!-margin-top-1"
                >
                  <li>
                    {{ application.personalDetails.reasonableAdjustmentsDetails }}
                  </li>
                </ul>
              </dd>
            </div>
          </dl>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Character information
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'apply-character-information'}"
            >
              Change
            </RouterLink>
          </div>

          <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever been cautioned or convicted of a criminal offence?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.criminalOffences | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.criminalOffences"
                  :events="application.characterInformation.criminalOffenceDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you received a non-motoring penalty notice in the last 4 years?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.nonMotoringFixedPenaltyNotices | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.nonMotoringFixedPenaltyNotices"
                  :events="application.characterInformation.nonMotoringFixedPenaltyNoticesDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever been disqualified from driving, or convicted for driving under the influence of drink or drugs?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.drivingDisqualificationDrinkDrugs | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.drivingDisqualificationDrinkDrugs"
                  :events="application.characterInformation.drivingDisqualificationDrinkDrugsDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Do you have any endorsements on your licence, or received any motoring fixed-penalty notices in the last 4 years?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.endorsementsOrMotoringFixedPenalties | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.endorsementsOrMotoringFixedPenalties"
                  :events="application.characterInformation.endorsementsOrMotoringFixedPenaltiesDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever been declared bankrupt or entered into an Individual Voluntary Agreement (IVA)?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.declaredBankruptOrIVA | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.declaredBankruptOrIVA"
                  :events="application.characterInformation.declaredBankruptOrIVADetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever filed late tax returns or been fined by HMRC?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.lateTaxReturnOrFined | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.lateTaxReturnOrFined"
                  :events="application.characterInformation.lateTaxReturnOrFinedDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever been, or are you currently, subject to professional misconduct, negligence, wrongful
                dismissal, discrimination or harassment proceedings?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.involvedInProfessionalMisconduct | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.involvedInProfessionalMisconduct"
                  :events="application.characterInformation.involvedInProfessionalMisconductDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Have you ever been subject to complaints or disciplinary action,
                or been asked to resign from a position?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.diciplinaryActionOrAskedToResign | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.diciplinaryActionOrAskedToResign"
                  :events="application.characterInformation.diciplinaryActionOrAskedToResignDetails"
                />
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Do you have any other issues that you think we should know about when considering your character?
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.characterInformation.otherCharacterIssues | toYesNo }}
                <EventRenderer
                  v-if="application.characterInformation.otherCharacterIssues"
                  :events="application.characterInformation.otherCharacterIssuesDetails"
                />
              </dd>
            </div>
          </dl>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Equality and diversity information
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'equality-and-diversity-survey'}"
            >
              Change
            </RouterLink>
          </div>

          <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Sharing your data:
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.shareData | toYesNo }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Professional background
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                <ul class="govuk-list">
                  <li
                    v-for="item in application.equalityAndDiversitySurvey.professionalBackground"
                    :key="item.name"
                  >
                    <p
                      v-if="item == 'other-professional-background'"
                      class="govuk-body govuk-!-margin-bottom-0"
                    >
                      <span class="govuk-caption-m">{{ item | lookup }}</span>
                      {{ application.equalityAndDiversitySurvey.otherProfessionalBackgroundDetails }}
                    </p>
                    <span v-else>{{ item | lookup }}</span>
                  </li>
                </ul>
              </dd>
            </div>

            <div
              v-if="isLegal"
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Current legal role
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                <ul class="govuk-list">
                  <li
                    v-for="item in application.equalityAndDiversitySurvey.currentLegalRole"
                    :key="item.name"
                  >
                    <p
                      v-if="item == 'other-fee-paid-judicial-office-holder'"
                      class="govuk-body govuk-!-margin-bottom-0"
                    >
                      <span class="govuk-caption-m">{{ item | lookup }}</span>
                      {{ application.equalityAndDiversitySurvey.otherCurrentFeePaidJudicialOfficeHolderDetails }}
                    </p>

                    <p
                      v-else-if="item == 'other-salaried-judicial-office-holder'"
                      class="govuk-body govuk-!-margin-bottom-0"
                    >
                      <span class="govuk-caption-m">{{ item | lookup }}</span>
                      {{ application.equalityAndDiversitySurvey.otherCurrentSalariedJudicialOfficeHolderDetails }}
                    </p>

                    <p
                      v-else-if="item == 'other-current-legal-role'"
                      class="govuk-body govuk-!-margin-bottom-0"
                    >
                      <span class="govuk-caption-m">{{ item | lookup }}</span>
                      {{ application.equalityAndDiversitySurvey.otherCurrentLegalRoleDetails }}
                    </p>
                    <span v-else>{{ item | lookup }}</span>
                  </li>
                </ul>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Do you hold, or have you ever held in the past, a fee-paid judicial role?
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.feePaidJudicialRole == 'other-fee-paid-judicial-office'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.feePaidJudicialRole | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherFeePaidJudicialRoleDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.feePaidJudicialRole | lookup | toYesNo }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Attended state or fee-paying school
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.stateOrFeeSchool | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Attended Oxbridge universities
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.oxbridgeUni | lookup | toYesNo }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                First generation to go to university
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.firstGenerationStudent | lookup | toYesNo }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Ethnic group
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-asian'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherEthnicGroupAsianDetails }}
                </p>
                <p
                  v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-white'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherEthnicGroupWhiteDetails }}
                </p>
                <p
                  v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-black'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherEthnicGroupBlackDetails }}
                </p>
                <p
                  v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-mixed'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherEthnicGroupMixedDetails }}
                </p>
                <p
                  v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-ethnic-group'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherEthnicGroupDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Gender
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.gender == 'other-gender'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.gender | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherGenderDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.gender | lookup }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Gender is the same as sex assigned at birth
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.changedGender | lookup | toYesNo }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Sexual orientation
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.sexualOrientation == 'other-sexual-orientation'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.sexualOrientation | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherSexualOrientationDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.sexualOrientation | lookup }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Disability
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.disability === true"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.disability | toYesNo }}</span>
                  {{ application.equalityAndDiversitySurvey.disabilityDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.disability | lookup | toYesNo }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Religion or faith
              </dt>
              <dd class="govuk-summary-list__value">
                <p
                  v-if="application.equalityAndDiversitySurvey.religionFaith == 'other-religion'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">{{ application.equalityAndDiversitySurvey.religionFaith | lookup }}</span>
                  {{ application.equalityAndDiversitySurvey.otherReligionDetails }}
                </p>
                <span v-else>{{ application.equalityAndDiversitySurvey.religionFaith | lookup }}</span>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Attended Outreach events
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.attendedOutreachEvents | lookup | toYesNo }}
              </dd>
            </div>

            <div
              v-if="isLegal"
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Participated in a Judicial Workshadowing Scheme
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.participatedInJudicialWorkshadowingScheme | lookup | toYesNo }}
              </dd>
            </div>

            <div
              v-if="isLegal"
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Participated in Pre-application judicial education
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.hasTakenPAJE | lookup | toYesNo }}
              </dd>
            </div>
          </dl>

          <div
            v-if="vacancy.locationQuestion"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Location preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'location-preferences'}"
            >
              Change
            </RouterLink>
            <dl class="govuk-summary-list">
              <dt class="govuk-summary-list__key">
                {{ vacancy.locationQuestion }}
              </dt>
              <dd
                v-if="vacancy.locationQuestionType == 'single-choice'"
                class="govuk-summary-list__value"
              >
                {{ application.locationPreferences }}
              </dd>
              <dd
                v-else
                class="govuk-summary-list__value"
              >
                <p
                  v-for="item in application.locationPreferences"
                  :key="item.name"
                  class="govuk-body"
                >
                  {{ item }}
                </p>
              </dd>
            </dl>
          </div>

          <div
            v-if="vacancy.jurisdictionQuestion"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Jurisdiction preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'jurisdiction-preferences'}"
            >
              Change
            </RouterLink>
            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  {{ vacancy.jurisdictionQuestion }}
                </dt>
                <dd
                  v-if="vacancy.jurisdictionQuestionType == 'single-choice'"
                  class="govuk-summary-list__value"
                >
                  {{ application.jurisdictionPreferences }}
                </dd>
                <dd
                  v-else
                  class="govuk-summary-list__value"
                >
                  <p
                    v-for="item in application.jurisdictionPreferences"
                    :key="item.name"
                    class="govuk-body"
                  >
                    {{ item }}
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="vacancy.welshRequirement">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Welsh posts
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'welsh-posts'}"
              >
                Change
              </RouterLink>
            </div>
            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Are you applying for a Welsh post?
                </dt>
                <dd
                  class="govuk-summary-list__value"
                >
                  {{ application.applyingForWelshPost | toYesNo }}
                </dd>
              </div>
              <div
                v-if="application.applyingForWelshPost"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Can you speak Welsh?
                </dt>
                <dd
                  class="govuk-summary-list__value"
                >
                  {{ application.canSpeakWelsh | toYesNo }}
                </dd>
              </div>
              <div
                v-if="application.applyingForWelshPost"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Can you read and write in Welsh?
                </dt>
                <dd
                  class="govuk-summary-list__value"
                >
                  <p
                    v-if="application.canReadAndWriteWelsh == false"
                  >
                    {{ application.canReadAndWriteWelsh | toYesNo }}
                  </p>
                  <p
                    v-if="application.canReadAndWriteWelsh"
                  >
                    {{ application.canReadAndWriteWelsh | lookup }}
                  </p>
                </dd>
              </div>
            </dl>            
          </div>

          <div
            v-if="application.additionalWorkingPreferences"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Additional Preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'additional-working-preferences'}"
            >
              Change
            </RouterLink>

            <dl
              v-for="(item, index) in application.additionalWorkingPreferences"
              :key="index"
              class="govuk-summary-list"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  {{ vacancy.additionalWorkingPreferences[index].question }} 
                  <span class="govuk-body govuk-!-font-size-19">
                    ({{ vacancy.additionalWorkingPreferences[index].questionType | lookup }})
                  </span>
                </dt>
                <dd 
                  v-if="vacancy.additionalWorkingPreferences[index].questionType === 'single-choice'"
                  class="govuk-summary-list__value"
                >
                  <ul class="govuk-list">
                    <li>{{ item.selection }}</li>
                  </ul>
                </dd>
                <dd 
                  v-if="vacancy.additionalWorkingPreferences[index].questionType === 'multiple-choice'"
                  class="govuk-summary-list__value"
                >
                  <ul class="govuk-list">
                    <li>
                      <span
                        v-for="(option, count) in vacancy.additionalWorkingPreferences[index].answers"
                        :key="count"
                      >
                        <strong
                          v-if="item.selection.includes(option.answer)"
                        > {{ option.answer }} </strong>
                        <span
                          v-else
                        >
                          {{ option.answer }}
                        </span>
                        <span
                          v-if="count+1!==vacancy.additionalWorkingPreferences[index].answers.length"
                        >,</span>
                      </span>
                    </li>
                  </ul>
                </dd>
                <dd 
                  v-if="vacancy.additionalWorkingPreferences[index].questionType === 'ranked-choice'"
                  class="govuk-summary-list__value"
                >
                  <ul class="govuk-list">
                    <li>
                      <span
                        v-for="(choice, count) in item.selection"
                        :key="count"
                      >
                        <strong>{{ count+1 }}.</strong> {{ choice }}
                      </span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="isLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Qualifications
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-qualifications'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              v-for="item in application.qualifications"
              :key="item.name"
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Qualification
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.type | lookup }}</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Location
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.location | lookup }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="item.date"
                class="govuk-summary-list__row"
              >
                <dt
                  v-if="item.type === 'barrister'"
                  class="govuk-summary-list__key"
                >
                  Date completed pupillage
                </dt>
                <dt
                  v-else
                  class="govuk-summary-list__key"
                >
                  Date qualified
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li> {{ item.date | formatDate }}</li>
                  </ul>
                </dd>
              </div>

              <div 
                v-if="item.qualificationNotComplete"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Completed pupillage
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>
                      No
                    </li>
                  </ul>
                </dd>
              </div>
              
              <div
                v-if="item.qualificationNotComplete && item.details"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Did not complete pupillage notes
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>
                      {{ item.details }}
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="showMemberships">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Memberships
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-memberships'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div
                v-if="showMembershipOption('chartered-association-of-building-engineers')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Chartered Association of Building Engineers
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.charteredAssociationBuildingEngineersDate | formatDate }}</li>
                    <li>{{ application.charteredAssociationBuildingEngineersNumber }}</li>
                    <li>{{ application.charteredAssociationBuildingEngineersInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('chartered-institute-of-building')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Chartered Association of Building Engineers
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.charteredInstituteBuildingDate | formatDate }}</li>
                    <li>{{ application.charteredInstituteBuildingNumber }}</li>
                    <li>{{ application.charteredInstituteBuildingInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('chartered-institute-of-environmental-health')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Chartered Institute of Environmental Health
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.charteredInstituteEnvironmentalHealthDate | formatDate }}</li>
                    <li>{{ application.charteredInstituteEnvironmentalHealthNumber }}</li>
                    <li>{{ application.charteredInstituteEnvironmentalHealthInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('general-medical-council')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  General Medical Council
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.generalMedicalCouncilDate | formatDate }}</li>
                    <li>{{ application.generalMedicalCouncilNumber }}</li>
                    <li>{{ application.generalMedicalCouncilInformation }}</li>
                  </ul>

                  <ul
                    v-if="application.generalMedicalCouncilConditional"
                    class="govuk-list"
                  >
                    <p class="govuk-hint">
                      Conditions
                    </p>
                    <li
                      v-if="application.generalMedicalCouncilConditionalStartDate
                        && application.generalMedicalCouncilConditionalEndDate"
                    >
                      {{ application.generalMedicalCouncilConditionalStartDate | formatDate }}
                      to {{ application.generalMedicalCouncilConditionalEndDate | formatDate }}
                    </li>
                    <li
                      v-if="application.generalMedicalCouncilConditionalStartDate
                        && !application.generalMedicalCouncilConditionalEndDate"
                    >
                      {{ application.generalMedicalCouncilConditionalStartDate | formatDate }} — current
                    </li>
                    <li>
                      {{ application.generalMedicalCouncilConditionalDetails }}
                    </li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('royal-college-of-psychiatrists')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Royal College of Psychiatrists
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.royalCollegeOfPsychiatristsDate | formatDate }}</li>
                    <li>{{ application.royalCollegeOfPsychiatristsNumber }}</li>
                    <li>{{ application.royalCollegeOfPsychiatristsInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('royal-institution-of-chartered-surveyors')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Royal Institution of Chartered Surveyors
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.royalInstitutionCharteredSurveyorsDate | formatDate }}</li>
                    <li>{{ application.royalInstitutionCharteredSurveyorsNumber }}</li>
                    <li>{{ application.royalInstitutionCharteredSurveyorsInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('royal-institute-of-british-architects')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Royal Institute of British Architects
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.royalInstituteBritishArchitectsDate | formatDate }}</li>
                    <li>{{ application.royalInstituteBritishArchitectsNumber }}</li>
                    <li>{{ application.royalInstituteBritishArchitectsInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-if="showMembershipOption('other')"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Other membership
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ application.otherProfessionalMembershipsDate | formatDate }}</li>
                    <li>{{ application.otherProfessionalMembershipsNumber }}</li>
                    <li>{{ application.otherProfessionalMembershipsInformation }}</li>
                  </ul>
                </dd>
              </div>

              <div
                v-for="(membership, key) in otherMemberships"
                :key="key"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  {{ membership.label }}
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ membership.date | formatDate }}</li>
                    <li>{{ membership.number }}</li>
                    <li>{{ membership.information }}</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="isNonLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Experience
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              v-for="item in application.experience"
              :key="item.name"
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Organisation or business
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.orgBusinessName }}</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Job title
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.jobTitle }}</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Date qualified
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul
                    v-if="item.startDate"
                    class="govuk-list"
                  >
                    <li v-if="item.endDate">
                      {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
                    </li>
                    <li v-else>
                      {{ item.startDate | formatDate }} — current
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="isLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Post-qualification experience
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'post-qualification-work-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              v-for="item in application.experience"
              :key="item.name"
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Job title
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.jobTitle }}</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Organisation or business
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>{{ item.orgBusinessName }}</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Dates worked
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul
                    v-if="item.startDate"
                    class="govuk-list"
                  >
                    <li v-if="item.endDate">
                      {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
                    </li>
                    <li v-else>
                      {{ item.startDate | formatDate }} — current
                    </li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Law-related tasks
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li
                      v-for="task in item.tasks"
                      :key="task.name"
                    >
                      <p
                        v-if="task == 'other'"
                        class="govuk-body govuk-!-margin-bottom-0"
                      >
                        <span class="govuk-caption-m">{{ task | lookup }}</span>
                        {{ item.otherTasks }}
                      </p>
                      <span v-else>{{ task | lookup }}</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="isLegal">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Judicial experience
              </h2>
              <RouterLink
                v-if="isDraftApplication"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'judicial-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Are you a fee-paid or salaried judge?
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.feePaidOrSalariedJudge | toYesNo }}
                </dd>
              </div>

              <div
                v-if="application.feePaidOrSalariedJudge === true"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Have you sat for at least 30 days?
                </dt>
                <dd class="govuk-summary-list__value">
                  <p class="govuk-body">
                    {{ application.feePaidOrSalariedSatForThirtyDays | toYesNo }}
                  </p>
                  <p
                    v-if="application.feePaidOrSalariedSittingDaysDetails"
                    class="govuk-body"
                  >
                    {{ application.feePaidOrSalariedSittingDaysDetails }}
                  </p>
                </dd>
              </div>

              <div
                v-if="application.feePaidOrSalariedSatForThirtyDays == false || application.feePaidOrSalariedJudge == false"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Have you declared an appointment or appointments in a quasi-judicial body in this application?
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.declaredAppointmentInQuasiJudicialBody | toYesNo }}
                </dd>
              </div>

              <div
                v-if="application.declaredAppointmentInQuasiJudicialBody === true"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Have you sat for at least 30 days in one or all of these appointments?
                </dt>
                <dd class="govuk-summary-list__value">
                  <p class="govuk-body">
                    {{ application.quasiJudicialSatForThirtyDays | toYesNo }}
                  </p>
                  <p
                    v-if="application.quasiJudicialSittingDaysDetails"
                    class="govuk-body"
                  >
                    {{ application.quasiJudicialSittingDaysDetails }}
                  </p>
                </dd>
              </div>

              <div
                v-if="application.declaredAppointmentInQuasiJudicialBody == false ||
                  application.quasiJudicialSatForThirtyDays == false"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  details of how you have acquired the necessary
                  skills for this role in some other significant way
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.skillsAquisitionDetails }}
                </dd>
              </div>
            </dl>
          </div>

          <div
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Gaps in employment
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'employment-gaps'}"
            >
              Change
            </RouterLink>
          </div>

          <dl
            v-for="item in application.employmentGaps"
            :key="item.name"
            class="govuk-summary-list govuk-!-margin-bottom-8"
          >
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Date of gap
              </dt>
              <dd class="govuk-summary-list__value">
                <ul
                  v-if="item.startDate"
                  class="govuk-list"
                >
                  <li v-if="item.endDate">
                    {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
                  </li>
                  <li v-else>
                    {{ item.startDate | formatDate }} — current
                  </li>
                </ul>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Details
              </dt>
              <dd class="govuk-summary-list__value">
                <ul class="govuk-list">
                  <li>{{ item.details }}</li>
                </ul>
              </dd>
            </div>

            <div
              v-if="isLegal"
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Law-related tasks
              </dt>
              <dd class="govuk-summary-list__value">
                <ul class="govuk-list">
                  <li
                    v-for="task in item.tasks"
                    :key="task.name"
                  >
                    <p
                      v-if="task == 'other'"
                      class="govuk-body govuk-!-margin-bottom-0"
                    >
                      <span class="govuk-caption-m">{{ task | lookup }}</span>
                      {{ item.otherTasks }}
                    </p>
                    <span v-else>{{ task | lookup }}</span>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Reasonable length of service
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'reasonable-length-of-service'}"
            >
              Change
            </RouterLink>
          </div>
          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Can work a resonable length of service
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.canGiveReasonableLOS | toYesNo }}
                <p v-if="application.canGiveReasonableLOS == false">
                  {{ application.cantGiveReasonableLOSDetails }}
                </p>
              </dd>
            </div>
          </dl>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Independent assessors
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'assessors-details'}"
            >
              Change
            </RouterLink>
          </div>

          <dl class="govuk-summary-list">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Full name
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.firstAssessorFullName }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Title or position
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.firstAssessorTitle }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Email
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.firstAssessorEmail }}
              </dd>
            </div>

            <hr class="govuk-section-break govuk-section-break--xl">

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Full name
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.secondAssessorFullName }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Title or position
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.secondAssessorTitle }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Email
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.secondAssessorEmail }}
              </dd>
            </div>
          </dl>

          <div
            v-if="application.selectionCriteriaAnswers"
            class="govuk-!-margin-top-9"
          >
            <h2 class="govuk-heading-l">
              Additional Selection Criteria
            </h2>

            <dl class="govuk-summary-list">
              <div
                v-for="(item, index) in application.selectionCriteriaAnswers"
                :key="index"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  {{ item.title }}
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="item.answer">
                    {{ item.answerDetails }}
                  </span>
                  <span v-else>I do not meet this requirement</span>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="showStatementOfSuitability"
            id="assessments-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Statement of suitability
            </h2>

            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'statement-of-suitability'}"
            >
              Change
            </RouterLink>

            <div
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Uploaded statement of suitability
              </dt>
              <dd class="govuk-summary-list__value">
                <span v-if="application.uploadedSuitabilityStatement">Your file has been received</span>
                <span v-else>Not yet received</span>
              </dd>
            </div>
          </div>

          <div
            v-if="showSelfAssessment"
            id="self-assessment-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Self assessment competencies
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'self-assessment-competencies'}"
            >
              Change
            </RouterLink>

            <dl class="govuk-summary-list">
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Uploaded finished self assessment
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="application.uploadedSelfAssessment">Your file has been received</span>
                  <span v-else>Not yet received</span>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="showCV"
            id="cv-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Curriculum vitae (CV)
            </h2>
            <RouterLink
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'cv'}"
            >
              Change
            </RouterLink>

            <dl class="govuk-summary-list">
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Uploaded CV
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="application.uploadedCV">Your file has been received</span>
                  <span v-else>Not yet received</span>
                </dd>
              </div>
            </dl>
          </div>
        </div><!-- END download-as-pdf-div -->

        <button
          v-if="isDraftApplication"
          :disabled="!canApply"
          class="govuk-button"
        >
          Send application
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import BackLink from '@/components/BackLink';
import jsPDF from 'jspdf';
import EventRenderer from '@/components/Page/EventRenderer';
import Countdown from '@/components/Page/Countdown';

export default {
  components: {
    BackLink,
    ErrorSummary,
    EventRenderer,
    Countdown,
  },
  data() {
    return {
      errors: [],
      canApply: false,
    };
  },
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
    vacancyCloseTime() {
      return this.$store.getters['vacancy/getCloseDate'];
    },
    application () {
      return this.$store.state.application.record;
    },
    isNonLegal () {
      return this.vacancy.typeOfExercise === 'non-legal' || this.vacancy.typeOfExercise === 'leadership-non-legal';
    },
    isLegal() {
      return this.vacancy.typeOfExercise === 'legal' || this.vacancy.typeOfExercise === 'leadership';
    },
    isLeadership () {
      return this.vacancy.typeOfExercise === 'leadership';
    },
    isSenior () {
      return this.vacancy.typeOfExercise == 'senior';
    },
    showMemberships() {
      return this.vacancy.memberships && this.vacancy.memberships.indexOf('none') === -1;
    },
    showStatementOfSuitability() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-competencies':
      case 'statement-of-suitability-with-skills-and-abilities':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
        return true;
      default:
        return false;
      }
    },
    showCV() {
      switch (this.vacancy.assessmentOptions) {
      case 'self-assessment-with-competencies-and-cv':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
        return true;
      default:
        return false;
      }
    },  
    showStatementOfEligibility() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-eligibility':
        return true;
      default:
        return false;
      }
    },
    showSelfAssessment() {
      switch (this.vacancy.assessmentOptions) {
      case 'self-assessment-with-competencies':
      case 'self-assessment-with-competencies-and-cv':
        return true;
      default:
        return false;
      }
    },
    isApplicationComplete() {
      let isComplete = false;
      if (this.application && this.application.progress) {
        isComplete = true;
        if (!this.application.progress.personalDetails) { isComplete = false; }
        if (!this.application.progress.characterInformation) { isComplete = false; }
        if (!this.application.progress.equalityAndDiversitySurvey) { isComplete = false; }
        if (!this.application.progress.assessorsDetails) { isComplete = false; }
        if (this.vacancy.isSPTWOffered) {
          if (!this.application.progress.partTimeWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.locationQuestion) {
          if (!this.application.progress.locationPreferences) { isComplete = false; }
        }
        if (this.vacancy.jurisdictionQuestion) {
          if (!this.application.progress.jurisdictionPreferences) { isComplete = false; }
        }
        if (this.vacancy.welshRequirement) {
          if (!this.application.progress.welshPosts) { isComplete = false; }
        }
        if (this.isLegal) {
          if (!this.application.progress.relevantQualifications) { isComplete = false; }
          if (!this.application.progress.postQualificationWorkExperience) { isComplete = false; }
          if (this.vacancy.previousJudicialExperienceApply) {
            if (!this.application.progress.judicialExperience) { isComplete = false; }
          }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (this.isNonLegal) {
          if (this.vacancy.memberships.length) {
            if (this.vacancy.memberships.indexOf('none') === -1) {
              if (!this.application.progress.relevantMemberships) { isComplete = false; }
            }            
          }
          if (!this.application.progress.relevantExperience) { isComplete = false; }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (!this.application.progress.reasonableLengthOfService) { isComplete = false; }
        if (this.showStatementOfSuitability && !this.application.progress.statementOfSuitability) { isComplete = false; }
        if (this.showCV && !this.application.progress.cv) { isComplete = false; }
        if (this.showStatementOfEligibility && !this.application.progress.statementOfEligibility) { isComplete = false; }
        if (this.showSelfAssessment && !this.application.progress.selfAssessmentCompetencies) { isComplete = false; }
      }
      return isComplete;
    },
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    otherMemberships() {
      // @NOTE this is a bit ugly as we can't just lookup label
      const selected = {};

      if (this.application.professionalMemberships) {
        this.application.professionalMemberships.forEach(membership => {
          if (this.application.memberships[membership]) {
            const otherMembership = this.vacancy.otherMemberships.find(m => m.value === membership);
            selected[membership] = {
              ...this.application.memberships[membership],
              label: otherMembership.label,
            };
          }
        });
      }

      return selected;
    },
  },
  mounted() {
    this.canApply = this.checkIfCanApply();

    if (this.$store.getters['vacancy/isOpen']()) {
      const self = this;
      setInterval(() => {
        self.canApply = self.checkIfCanApply();
      }, 60 * 1000);
    }
  },
  methods: {
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    showMembershipOption(ref) {
      const professionalMemberships = this.application.professionalMemberships;
      return professionalMemberships && professionalMemberships.indexOf(ref) >= 0;
    },
    async save() {
      this.errors = [];
      try {
        await this.$store.dispatch('application/submit');

        this.$router.push({ name: 'confirmation' });
      } catch (error) {
        this.errors.push({ message: 'Failed to submit application.' });
        this.scrollToTop();
      }
    },
    downloadAsPdf() {
      const pdf = new jsPDF();
      pdf.fromHTML(
        this.$refs['download-as-pdf-div'],
        15,
        15,
        {
          width: 170,
        }
      );
      pdf.save('judicial-appointments-application.pdf');
    },
    checkIfCanApply() {
      return this.isDraftApplication
        && this.$store.getters['vacancy/isOpen']()
        && this.isApplicationComplete;
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
