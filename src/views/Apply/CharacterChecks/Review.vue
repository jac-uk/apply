<template>
  <div class="govuk-grid-column-full">
    <BackLink />

    <h1 class="govuk-heading-xl">
      Check your answers
    </h1>

    <div class="govuk-!-margin-top-9">
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Personal details
      </h2>
      <RouterLink
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-personal-information'}"
      >
        Change
      </RouterLink>
    </div>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Title
        </dt>
        <dd class="govuk-summary-list__value">
          <template
            v-if="application.personalDetails.title === 'other'"
          >
            {{ application.personalDetails.otherTitleDetails }}
          </template>
          <template v-else>
            {{ application.personalDetails.title }}
          </template>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
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
          Place of birth
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.personalDetails.placeOfBirth }}
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
          Address
        </dt>
        <dd
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
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Have you lived at this address for more than 5 years?
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ application.personalDetails.address.currentMoreThan5Years | toYesNo }}
        </dd>
      </div>

      <div
        v-if="!application.personalDetails.address.currentMoreThan5Years"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Previous addresses
        </dt>
        <dd
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
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          National Insurance number
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ application.personalDetails.nationalInsuranceNumber }}
        </dd>
      </div>
    </dl>

    <div class="govuk-!-margin-top-9">
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Professional bodies
      </h2>
      <RouterLink
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-professional-bodies'}"
      >
        Change
      </RouterLink>
    </div>

    <dl class="govuk-summary-list">
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
          <p class="govuk-body">
            {{ qualification.date | formatDate }}
          </p>
          <p class="govuk-body">
            {{ qualification.membershipNumber }}
          </p>
        </dd>
      </div>
    </dl>

    <div
      v-if="hasHMRCCheck"
      class="govuk-!-margin-top-9"
    >
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        HMRC Check
      </h2>
      <RouterLink
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-HMRC'}"
      >
        Change
      </RouterLink>
    </div>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Do you have a VAT registration number?
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ application.personalDetails.hasVATNumbers | toYesNo }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
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

    <div class="govuk-!-margin-top-9">
      <h2
        class="govuk-heading-l"
        style="display:inline-block;"
      >
        Further information to disclose
      </h2>
      <RouterLink
        class="govuk-link govuk-body-m change-link"
        style="display:inline-block;"
        :to="{name: 'character-checks-more-details'}"
      >
        Change
      </RouterLink>
    </div>

    <dl class="govuk-summary-list">
      <div
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Details
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ application.characterChecks.furtherInformation }}
        </dd>
      </div>
    </dl>

    <button
      class="govuk-button"
      @click="next"
    >
      Continue
    </button>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';

export default {
  components: {
    BackLink,
  },

  computed: {
    application() {
      return this.$store.getters['application/data']();
    },
    hasHMRCCheck() {
      const vacancy = this.$store.state.vacancy.record;
      return vacancy.characterChecks && vacancy.characterChecks.HMRC;
    },
  },
  methods: {
    next () {
      this.$router.push({ name: 'character-checks-declaration' });
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
