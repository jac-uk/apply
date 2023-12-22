<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation jac-purple">
        <h1 class="govuk-panel__title">
          Success
        </h1>
        <h2 class="govuk-panel__body govuk-!-margin-top-7">
          Thank you for completing the {{ $filters.lookup(formType) }}
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormConfirmation',
  mixins: [CandidateFormsMixIn],
};
</script>

<style scoped>

.jac-purple {
  background-color: #753880;
}

.govuk-panel {
  text-align: left;
}

</style>
