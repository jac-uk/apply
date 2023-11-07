<template>
  <div
    v-if="showWarning"
    class="govuk-warning-summary"
    aria-labelledby="warning-summary-title"
    role="alert"
    tabindex="-1"
    data-module="govuk-warning-summary"
  >
    <div class="govuk-warning-text">
      <span
        class="govuk-warning-text__icon"
        aria-hidden="true"
      >!</span>
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
      default: null,
    },
  },
  computed: {
    showWarning() {
      return (this.warningObject !== null && this.warningObject.hasOwnProperty('message') && this.warningObject.message);
    },
  },
};
</script>
<style scoped>
.govuk-warning-summary {
  border: 5px solid black;
  margin-bottom: 50px;
  padding: 20px;
}
.govuk-warning-text {
  margin-bottom: 0;
}
</style>
