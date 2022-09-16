<template>
  <div class="govuk-grid-column-full">
    <BackLink />

    <h1 class="govuk-heading-xl">
      <template
        v-if="canEdit"
      >
        Check your answers
      </template>
      <template v-else>
        Review sent answers
      </template>
    </h1>

    <div class="govuk-!-margin-top-9">
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Personal details
      </h2>
      <RouterLink
        v-if="canEdit"
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-personal-information'}"
      >
        Change
      </RouterLink>
    </div>

    <dl class="govuk-summary-list">
      <div
        v-if="application.personalDetails.title"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Title
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.title }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.firstName && application.personalDetails.lastName"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          First name
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.firstName }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.firstName && application.personalDetails.lastName"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Last name
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.lastName }}
        </dd>
      </div>

      <div
        v-if="!application.personalDetails.firstName && !application.personalDetails.lastName"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Full Name
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.fullName }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.otherNames"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Other names
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.otherNames }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.suffix"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Suffix
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.suffix }}
        </dd>
      </div>

      <div
        v-if="application.equalityAndDiversitySurvey"
        class="govuk-summary-list__row"
      >
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

      <div
        v-if="application.personalDetails.dateOfBirth"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Date of birth
        </dt>
        <dd class="govuk-summary-list__value">
          <p v-if="application.personalDetails.dateOfBirth">
            {{ application.personalDetails.dateOfBirth | formatDate }}
          </p>
        </dd>
      </div>

      <div
        v-if="application.personalDetails.placeOfBirth"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Place of birth
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.placeOfBirth }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.nationalInsuranceNumber"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          National Insurance Number
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.nationalInsuranceNumber }}
        </dd>
      </div>

      <div
        v-if="application.personalDetails.citizenship"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Citizenship
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.citizenship | lookup }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Address
        </dt>
        <dd
          v-if="application.personalDetails.address && application.personalDetails.address.current"
          class="govuk-summary-list__value"
        >
          {{ application.personalDetails.address.current.street }}
          <br>
          <span v-if="application.personalDetails.address.current.street2">
            {{ application.personalDetails.address.current.street2 }}
            <br>
          </span>
          {{ application.personalDetails.address.current.town }}
          <br>
          <span v-if="application.personalDetails.address.current.county">
            {{ application.personalDetails.address.current.county }}
            <br>
          </span>
          {{ application.personalDetails.address.current.postcode }}
        </dd>
        <dd
          v-else
          class="govuk-summary-list__value"
        >
          No information provided
        </dd>
      </div>

      <div
        v-if="application.personalDetails.address && application.personalDetails.address.currentMoreThan5Years"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Have you lived at this address for more than 5 years?
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ application.personalDetails.address.currentMoreThan5Years | toYesNo }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Previous addresses
        </dt>
        <dd
          v-if="application.personalDetails.address && application.personalDetails.address.previous"
          class="govuk-summary-list__value"
        >
          <ol
            class="govuk-list"
          >
            <li
              v-for="(address, index) in application.personalDetails.address.previous"
              :key="index"
            >
              <p class="govuk-body">
                {{ address.startDate | formatDate }} - {{ address.endDate | formatDate }}
              </p>
              <p class="govuk-body">
                {{ address.street }}
                <br>
                <span v-if="address.street2">
                  {{ address.street2 }}
                  <br>
                </span>
                {{ address.town }}
                <br>
                <span v-if="address.county">
                  {{ address.county }}
                  <br>
                </span>
                {{ address.postcode }}
              </p>
            </li>
          </ol>
        </dd>
        <dd
          v-else
          class="govuk-summary-list__value"
        >
          No information provided
        </dd>
      </div>
    </dl>

    <div class="govuk-!-margin-top-9">
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Professional details
      </h2>
      <RouterLink
        v-if="canEdit"
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-professional-details'}"
      >
        Change
      </RouterLink>
    </div>

    <div>
      <dl
        v-if="application.qualifications"
        class="govuk-summary-list"
      >
        <div
          v-for="(qualification, index) in application.qualifications"
          :key="index"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            {{ qualification.type | lookup }}
          </dt>
          <dd
            class="govuk-summary-list__value"
          >
            <p
              v-if="qualification.date"
              class="govuk-body"
            >
              {{ qualification.date | formatDate }}
            </p>
            <p
              v-if="qualification.calledToBarDate"
              class="govuk-body"
            >
              {{ qualification.calledToBarDate | formatDate }}
            </p>
            <p class="govuk-body">
              {{ qualification.membershipNumber }}
            </p>
          </dd>
        </div>
      </dl>

      <dl
        v-if="application.magistrate === true || application.magistrate === false"
        class="govuk-summary-list"
      >
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Have you been a magistrate?
          </dt>
          <dd
            class="govuk-summary-list__value"
          >
            <p class="govuk-body">
              {{ application.magistrate | toYesNo }}
            </p>
            <p
              v-if="application.magistrateStartDate"
              class="govuk-body"
            >
              {{ application.magistrateStartDate | formatDate }} - {{ getDate(application.magistrateEndDate) || 'present' }}
            </p>
            <p
              v-if="application.magistrateLocation"
              class="govuk-body"
            >
              {{ application.magistrateLocation }}
            </p>
          </dd>
        </div>
      </dl>
      <div
        v-else
        class="govuk-body"
      >
        No information provided
      </div>
    </div>

    <div
      v-if="hasHMRCCheck"
    >
      <div class="govuk-!-margin-top-9">
        <h2
          class="govuk-heading-l"
          style="display:inline-block;"
        >
          HMRC Check
        </h2>
        <RouterLink
          v-if="canEdit"
          class="govuk-link govuk-body-m change-link"
          style="display:inline-block;"
          :to="{name: 'character-checks-HMRC'}"
        >
          Change
        </RouterLink>
      </div>

      <dl class="govuk-summary-list">
        <div
          v-if="application.personalDetails.hasVATNumbers"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            Do you have a VAT registration number?
          </dt>
          <dd
            class="govuk-summary-list__value"
          >
            {{ application.personalDetails.hasVATNumbers | toYesNo }}
          </dd>
        </div>
        <div
          v-else
          class="govuk-body"
        >
          No information provided
        </div>

        <div
          v-if="application.personalDetails.VATNumbers"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            VAT numbers
          </dt>
          <dd
            class="govuk-summary-list__value"
          >
            <p
              v-for="(item, index) in application.personalDetails.VATNumbers"
              :key="index"
              class="govuk-body"
            >
              {{ item.VATNumber }}
            </p>
          </dd>
        </div>
      </dl>
    </div>

    <div v-if="application.professionalMemberships && application.professionalMemberships.length">
      <OtherProfessionalBodiesReview
        :application="application"
        :vacancy="vacancy"
        :can-edit="canEdit"
      />
    </div>

    <div
      v-if="application.characterChecks.consent"
      class="govuk-!-margin-top-9"
    >
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Consent
      </h2>
      <RouterLink
        v-if="canEdit"
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-consent'}"
      >
        Change
      </RouterLink>

      <dl class="govuk-summary-list">
        <div
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            I understand and consent to character checks being undertaken
          </dt>
          <dd
            class="govuk-summary-list__value"
          >
            {{ application.characterChecks.consent | toYesNo }}
          </dd>
        </div>
      </dl>
    </div>

    <button
      v-if="canEdit"
      class="govuk-button"
      @click="next"
    >
      Continue
    </button>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';
import OtherProfessionalBodiesReview from './OtherProfessionalBodiesReview';
import { formatDate } from '@jac-uk/jac-kit/filters/filters';

export default {
  name: '',
  components: {
    BackLink,
    OtherProfessionalBodiesReview,
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    application() {
      return this.$store.state.application.record;
    },
    hasHMRCCheck() {
      const vacancy = this.$store.state.vacancy.record;
      return vacancy.characterChecks && vacancy.characterChecks.HMRC;
    },
    canEdit() {
      return !(this.application.characterChecks && this.application.characterChecks.consent
        && this.application.characterChecks.status === 'completed');
    },
  },
  methods: {
    next () {
      this.$router.push({ name: 'character-checks-consent' });
    },
    getDate(value) {
      return formatDate(value);
    },
  },
};
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
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
