<template>
  <dl
    class="govuk-summary-list govuk-!-margin-bottom-8"
  >
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        {{ $filters.toYesNo(localData.reasonableAdjustments) }}
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="reasonable-adjustments"
      >
        <span
          v-if="localData.reasonableAdjustments"
        >
          {{ localData.reasonableAdjustmentsDetails }}
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
