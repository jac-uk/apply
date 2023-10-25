<template>
  <div
    v-if="warningObject"
    aria-labelledby="error-summary-title"
    role="alert"
    tabindex="-1"
    data-module="govuk-error-summary"
  >
  <div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">Warning</span>
        {{ warningObject.message }}
    </strong>
  </div>
  </div>
</template>

<script>
export default {
  name: 'WarningSummary',
  props: {
    warningObject: {
      type: Object,
      required: false,
    },
  },
};
</script>
