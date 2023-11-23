<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Confirmation
      </h1>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import BackLink from '@/components/BackLink.vue';
export default {
  name: 'CandidateFormConfirmation',
  components: {
    BackLink,
  },
  mixins: [CandidateFormsMixIn],
};
</script>
