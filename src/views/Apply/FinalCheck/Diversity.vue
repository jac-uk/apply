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
        {{ $filters.toYesNo(application.equalityAndDiversitySurvey.shareData) }}
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
              <span class="govuk-caption-m">{{ $filters.lookup(item) }}</span>
              {{ application.equalityAndDiversitySurvey.otherProfessionalBackgroundDetails }}
            </p>
            <span v-else>{{ $filters.lookup(item) }}</span>
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
              <span class="govuk-caption-m">{{ $filters.lookup(item) }}</span>
              {{ application.equalityAndDiversitySurvey.otherCurrentFeePaidJudicialOfficeHolderDetails }}
            </p>

            <p
              v-else-if="item == 'other-salaried-judicial-office-holder'"
              class="govuk-body govuk-!-margin-bottom-0"
            >
              <span class="govuk-caption-m">{{ $filters.lookup(item) }}</span>
              {{ application.equalityAndDiversitySurvey.otherCurrentSalariedJudicialOfficeHolderDetails }}
            </p>

            <p
              v-else-if="item == 'other-current-legal-role'"
              class="govuk-body govuk-!-margin-bottom-0"
            >
              <span class="govuk-caption-m">{{ $filters.lookup(item) }}</span>
              {{ application.equalityAndDiversitySurvey.otherCurrentLegalRoleDetails }}
            </p>
            <span v-else>{{ $filters.lookup(item) }}</span>
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
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.feePaidJudicialRole) }}</span>
          {{ application.equalityAndDiversitySurvey.otherFeePaidJudicialRoleDetails }}
        </p>
        <span v-else>{{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.feePaidJudicialRole)) }}</span>
      </dd>
    </div>

    <template v-if="applicationOpenDatePost01042023">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Occupation of main household earner
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.lookup(application.equalityAndDiversitySurvey.occupationOfChildhoodEarner) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Type of school attended
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.lookup(application.equalityAndDiversitySurvey.stateOrFeeSchool16) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Either parent attended university to gain a degree
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.parentsAttendedUniversity)) }}
        </dd>
      </div>
    </template>

    <template v-else>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Attended state or fee-paying school
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.lookup(application.equalityAndDiversitySurvey.stateOrFeeSchool) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Attended Oxbridge universities
        </dt>
        <dd
          class="govuk-summary-list__value"
          data-welsh="oxbridge-universities"
        >
          {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.oxbridgeUni)) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          First generation to go to university
        </dt>
        <dd
          class="govuk-summary-list__value"
          data-welsh="first-generation-student"
        >
          {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.firstGenerationStudent)) }}
        </dd>
      </div>
    </template>

    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        What is your ethnic group?
      </dt>
      <dd class="govuk-summary-list__value">
        <p
          v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-asian'"
          class="govuk-body govuk-!-margin-bottom-0"
        >
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
          {{ application.equalityAndDiversitySurvey.otherEthnicGroupAsianDetails }}
        </p>
        <p
          v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-white'"
          class="govuk-body govuk-!-margin-bottom-0"
        >
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
          {{ application.equalityAndDiversitySurvey.otherEthnicGroupWhiteDetails }}
        </p>
        <p
          v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-black'"
          class="govuk-body govuk-!-margin-bottom-0"
        >
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
          {{ application.equalityAndDiversitySurvey.otherEthnicGroupBlackDetails }}
        </p>
        <p
          v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-mixed'"
          class="govuk-body govuk-!-margin-bottom-0"
        >
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
          {{ application.equalityAndDiversitySurvey.otherEthnicGroupMixedDetails }}
        </p>
        <p
          v-if="application.equalityAndDiversitySurvey.ethnicGroup == 'other-ethnic-group'"
          class="govuk-body govuk-!-margin-bottom-0"
        >
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
          {{ application.equalityAndDiversitySurvey.otherEthnicGroupDetails }}
        </p>
        <span v-else>{{ $filters.lookup(application.equalityAndDiversitySurvey.ethnicGroup) }}</span>
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
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.gender) }}</span>
          {{ application.equalityAndDiversitySurvey.otherGenderDetails }}
        </p>
        <span v-else>{{ $filters.lookup(application.equalityAndDiversitySurvey.gender) }}</span>
      </dd>
    </div>

    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Is the gender you identify with the same as your sex registered at birth?
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="changed-gender"
      >
        {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.changedGender)) }}
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
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.sexualOrientation) }}</span>
          {{ application.equalityAndDiversitySurvey.otherSexualOrientationDetails }}
        </p>
        <span v-else>{{ $filters.lookup(application.equalityAndDiversitySurvey.sexualOrientation) }}</span>
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
          <span
            class="govuk-caption-m"
            data-welsh="disability"
          >
            {{ $filters.toYesNo(application.equalityAndDiversitySurvey.disability) }}
          </span>
          {{ application.equalityAndDiversitySurvey.disabilityDetails }}
        </p>
        <span
          v-else
          data-welsh="disability"
        >
          {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.disability)) }}
        </span>
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
          <span class="govuk-caption-m">{{ $filters.lookup(application.equalityAndDiversitySurvey.religionFaith) }}</span>
          {{ application.equalityAndDiversitySurvey.otherReligionDetails }}
        </p>
        <span v-else>{{ $filters.lookup(application.equalityAndDiversitySurvey.religionFaith) }}</span>
      </dd>
    </div>

    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Attended Outreach events
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="atttended-outreach-events"
      >
        {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.attendedOutreachEvents)) }}
      </dd>
    </div>

    <div
      v-if="isLegal"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Participated in a Judicial Workshadowing Scheme
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="participated-in-judicial-workshadowing-scheme"
      >
        {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.participatedInJudicialWorkshadowingScheme)) }}
      </dd>
    </div>

    <div
      v-if="isLegal"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Participated in Pre-application judicial education
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="has-taken-paje"
      >
        {{ $filters.toYesNo($filters.lookup(application.equalityAndDiversitySurvey.hasTakenPAJE)) }}
      </dd>
    </div>
  </dl>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Diversity',
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
  computed: {
    ...mapGetters('vacancy', [
      'getOpenDate',
      'ref',
    ]),
    applicationOpenDatePost01042023() {
      const usesPre01042023Questions = ['JAC00130', 'JAC00123', 'JAC00164'].includes(this.ref);
      if (usesPre01042023Questions) {
        return false;
      }
      return this.getOpenDate > new Date('2023-04-01');
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
