<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <span class="govuk-caption-xl govuk-!-padding-bottom-5 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>

      <h1 class="govuk-heading-xl">
        You might not be eligible
      </h1>

      <p class="govuk-body-m">
        Based on your answers, it looks like you do not meet
        all the eligibility requirements for this role.
      </p>

      <p class="govuk-body">
        You can continue to apply, but it might be unlikely that you'll be offered a position.
      </p>

      <RouterLink
        class="govuk-button"
        data-module="govuk-button"
        :to="'/'"
      >
        Back to JAC homepage
      </RouterLink>          

      <p class="govuk-body-m">
        <RouterLink
          class="govuk-link"
          data-module="govuk-button"
          :to="applyLink"
        >
          Continue to apply
        </RouterLink>          
      </p>
    </div>
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
