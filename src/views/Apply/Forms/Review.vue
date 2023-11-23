<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Review
      </h1>

      <p class="govuk-body">
        [ review screen here: Plan is we will iterate through relevant candidateForm.parts and call the corresponding view components ]
      </p>

      <button
        class="govuk-button info-btn--task-list--review-application"
        :disabled="!isFormComplete"
        @click="submitForm"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import BackLink from '@/components/BackLink.vue';
export default {
  name: 'CandidateFormReview',
  components: {
    BackLink,
  },
  mixins: [CandidateFormsMixIn],
};
</script>
