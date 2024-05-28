<template>
  <div v-if="application && application.additionalInfo">
    <dl
      v-if="application.additionalInfo.commissionerConflicts && application.additionalInfo.commissionerConflicts.length"
      class="govuk-summary-list govuk-!-margin-bottom-8"
    >
      <div
        v-for="(commissionerConflict, index) in application.additionalInfo.commissionerConflicts"
        :key="index"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          {{ commissionerConflict.name }}
        </dt>
        <dd class="govuk-summary-list__value">
          <div v-if="commissionerConflict.hasRelationship === null">
            No information provided
          </div>
          <div v-else>
            {{ commissionerConflict.hasRelationship ? 'Yes' : 'No' }}
          </div>
          <div v-if="commissionerConflict.hasRelationship">
            {{ commissionerConflict.details }}
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'CandidateFormViewCommissionerConflicts',
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