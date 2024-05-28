<template>
  <dl
    class="govuk-summary-list govuk-!-margin-bottom-8"
  >
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        {{ $filters.toYesNo(application.personalDetails.reasonableAdjustments) }}
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="reasonable-adjustments"
      >
        <span
          v-if="application.personalDetails.reasonableAdjustments"
        >
          {{ application.personalDetails.reasonableAdjustmentsDetails }}
        </span>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  name: 'CandidateFormViewReasonableAdjustments',
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