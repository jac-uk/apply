<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">4.</span> Have you ever been disqualified from driving?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.drivingDisqualificationDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">5.</span> Were you convicted of any motoring offences in the past 4 years?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.recentDrivingConvictionDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import InformationReviewRenderer from '@/components/Page/InformationReviewRenderer';

export default {
  name: 'MotoringOffencesSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    characterInformation: {
      type: Object,
      required: true,
      default: new Object({}),
    },
    canEdit: {
      type: Boolean,
      required: true,
      default: true,
    },
    displayChangeLink: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

<style scoped>
  .widerColumn {
    width: 70%;
  }
</style>

