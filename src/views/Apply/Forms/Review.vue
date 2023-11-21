<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Review
      </h1>
    </div>
  </div>
</template>
<script>
import BackLink from '@/components/BackLink.vue';
export default {
  name: 'CandidateFormReview',
  components: {
    BackLink,
  },
};
</script>
