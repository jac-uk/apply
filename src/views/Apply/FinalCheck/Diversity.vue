<template>
  <dl
    v-if="application.equalityAndDiversitySurvey"
    class="govuk-summary-list"
  >
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
        What is your ethnic group?
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
        What is your sex?
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
        Is the gender you identify with the same as your sex registered at birth?
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
        What is your religion?
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
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
    isLegal: {
      type: Boolean,
      required: true,
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
