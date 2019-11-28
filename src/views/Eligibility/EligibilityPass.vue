<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <span class="govuk-caption-xl govuk-!-padding-bottom-5 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>

      <h1 class="govuk-heading-xl">
        It looks like you're eligible
      </h1>

      <p class="govuk-body-m">
        Based on your answers, it looks like you can apply for this role.
      </p>
      <RouterLink
        class="govuk-button"
        data-module="govuk-button"
        :to="applyLink"
      >
        Continue
      </RouterLink>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    vacancy() {
      return this.$store.state.exercise.record;
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
