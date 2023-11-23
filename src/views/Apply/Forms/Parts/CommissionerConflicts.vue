<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Commissioner Conflicts
      </h1>
      <button
        class="govuk-button info-btn--candidate-availability--save-and-continue"
        @click="save()"
      >
        Save and continue
      </button>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import BackLink from '@/components/BackLink.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormCommissionerConflicts',
  components: {
    BackLink,
  },
  mixins: [CandidateFormsMixIn],
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.COMMISSIONER_CONFLICTS);
  },
};
</script>
