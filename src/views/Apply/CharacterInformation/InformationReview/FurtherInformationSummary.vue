<template>
  <div>
    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">18.</span> Do you have any other issues that you think we should know about when considering your character?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            id="other-character-issues"
            :data="characterInformation.furtherInformationDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-further-information'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import InformationReviewRenderer from '@/components/Page/InformationReviewRenderer.vue';

export default {
  name: 'ProfessionalConductSummary',
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
