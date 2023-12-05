<template>
  <div class="govuk-grid-row">
    <CommissionerConflicts :custom-save="save" />
  </div>
</template>

<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import CommissionerConflicts from '@/views/Apply/CommissionerConflicts.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';

export default {
  name: 'CandidateFormCommissionerConflicts',
  components: {
    CommissionerConflicts,
  },
  mixins: [CandidateFormsMixIn],
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.COMMISSIONER_CONFLICTS);
  },
};
</script>
