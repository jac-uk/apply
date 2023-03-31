<template>
  <dl
    v-if="application.personalDetails"
    class="govuk-summary-list"
  >
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
      v-if="application.personalDetails.middleNames"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Middle name(s)
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.personalDetails.middleNames }}
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
      v-if="application.personalDetails.previousNames"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Previous known name(s)
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.personalDetails.previousNames }}
      </dd>
    </div>

    <div
      v-if="application.personalDetails.professionalName"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Professional name
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.personalDetails.professionalName }}
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
        data-welsh="reasonable-adjustments"
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
</template>

<script>
export default {
  name: 'PersonalDetails',
  props: {
    application: {
      type: Object,
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
