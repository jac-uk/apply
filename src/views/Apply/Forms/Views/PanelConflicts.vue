<template>
  <dl
    class="govuk-summary-list govuk-!-margin-bottom-8"
  >
    <div
      v-for="(panelConflict, index) in localData.panelConflicts"
      :key="index"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        {{ panelConflict.name }}
      </dt>
      <dd class="govuk-summary-list__value">
        <div v-if="panelConflict.hasRelationship === null">
          No information provided
        </div>
        <div v-else>
          {{ panelConflict.hasRelationship ? 'Yes' : 'No' }}
        </div>
        <div v-if="panelConflict.hasRelationship">
          {{ panelConflict.details }}
        </div>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  name: 'CandidateFormViewPanelConflicts',
  props: {
    application: {
      type: Object,
      required: false,
      default: () => {},
    },
    localData: {
      type: Object,
      required: false,
      default: () => {},
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
</style>