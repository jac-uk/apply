<template>
  <div>
    <h1 class="govuk-heading-xl">
      It looks like you're eligible
    </h1>

    <p class="govuk-body-m">
      Based on your answers, it looks like you can apply for this role.
    </p>
    <RouterLink
      class="govuk-button info-link--eligibility-pass--continue"
      data-module="govuk-button"
      :to="applyLink"
    >
      Continue
    </RouterLink>
  </div>
</template>

<script>

export default {
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    applyLink() {
      return this.isSignedIn ? `/apply/${this.vacancy.id}` : { name: 'sign-in' };
    },
  },
};

</script>
