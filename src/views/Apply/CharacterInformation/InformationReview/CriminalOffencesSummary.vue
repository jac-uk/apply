<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          1. Have you ever been cautioned for a criminal offence?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.criminalCautionDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-criminal-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          2. Have you ever been convicted for a criminal offence?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.criminalConvictionDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-criminal-offences'}"
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
  name: 'CriminalOffencesSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    application: {
      type: Object,
      required: true,
      default: new Object(),
    },
    canEdit: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

