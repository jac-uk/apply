<template>
  <div>
    <h1 class="govuk-heading-xl">
      You might not meet the nationality requirement
    </h1>

    <p class="govuk-body">
      Based on your answer, it looks like you do not meet the nationality requirement for the
      role. You can continue to apply, but it might be unlikely that you will be offered a position.
    </p>

    <RouterLink
      class="govuk-button info-link--eligibility-fail--back-to-jac-homepage"
      data-module="govuk-button"
      :to="'/'"
    >
      Back to JAC homepage
    </RouterLink>
  </div>
</template>

<script>

export default {
  computed: {
    vacancy () {
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
