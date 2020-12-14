<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          3. Have you received a fixed penalty notice in the last 4 years?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.fixedPenaltyDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-fixed-penalty-notices'}"
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
  name: 'FixedPenaltiesSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    application: {
      type: Object,
      required: false,
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
