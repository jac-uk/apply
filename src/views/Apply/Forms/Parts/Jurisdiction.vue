<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Location & Jurisdiction
      </h1>
      <button
        class="govuk-button info-btn--candidate-availability--save-and-continue"
        @click="save('jurisdiction')"
      >
        Save and continue
      </button>
    </div>
  </div>
</template>
<script>
import BackLink from '@/components/BackLink.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormJurisdiction',
  mixins: [CandidateFormsMixIn],
  components: {
    BackLink,
  },
};
</script>
