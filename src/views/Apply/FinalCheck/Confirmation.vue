<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation jac-purple">
        <h1 class="govuk-panel__title">
          Application sent
        </h1>
        <h2 class="govuk-panel__body govuk-!-font-size-27 govuk-!-margin-top-7">
          Your reference number is:
          <p class="govuk-!-font-weight-bold govuk-!-margin-top-3">
            {{ application.referenceNumber }}
          </p>
          <!-- <p class="govuk-!-font-weight-bold govuk-!-margin-top-0">
            {{ vacancy.referenceNumber }} {{ vacancy.name }}
          </p> -->
        </h2>
      </div>

      <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-0">
        We've sent a confirmation email to:
      </p>
      <p class="govuk-body govuk-!-font-weight-bold">
        {{ application.personalDetails.email }}
      </p>

      <h2 class="govuk-heading-m">
        What happens next?
      </h2>
      <p class="govuk-body">
        We'll now decide if you should be shortlisted for this role.
      </p>
      <p class="govuk-body">
        We'll email you in {{ vacancy.shortlistingOutcomeDate | formatDate('month') }} to let you know either way.
      </p>
      <p class="govuk-body">
        You can view your application and apply for other vacancies from your 
        <RouterLink
          class="govuk-link"
          :to="{ name: 'applications' }"
        >
          dashboard.
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
    application () {
      return this.$store.state.application.record;
    },
  },
};
</script>

<style scoped>

.jac-purple {
  background-color: #753880;
}

.govuk-panel {
  text-align: left;
}

</style>
