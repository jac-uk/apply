<template>
  <div>
    <RouterView />
  </div>
</template>
<script>
export default {
  name: 'CandidateFormIndex',
  async created() {
    const formId = this.$route.params.formId;
    await this.$store.dispatch('candidateForm/bind', formId);
    await this.$store.dispatch('candidateFormResponse/bind', formId);
    await this.$store.dispatch('vacancy/bind', this.$store.state.candidateForm.record.exercise.id);
    await this.$store.dispatch('application/bind', this.$store.state.candidateFormResponse.record.applicationId);
  },
};
</script>
