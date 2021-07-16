<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds govuk-!-margin-top-8">
      <div class="govuk-panel govuk-panel--confirmation">
        <h1 class="govuk-panel__title">
          Consent to character checks submitted
        </h1>
      </div>
      <h2 class="govuk-heading-m govuk-!-margin-top-6">
        What happens next
      </h2>
      <p class="govuk-body">
        This information will be used by the Commission to undertake character checks.
      </p>
      <p class="govuk-body">
        We may get in touch to ask for more information. In the meantime refer to the timeline, given in your exercise to understand the next steps ahead.
      </p>
      <p class="govuk-body">
        If your circumstances change after submitting this form that might impact your ability to meet the good character requirements please notify the
        <a
          :href="`mailto:${vacancy.exerciseMailbox}?subject=Re: ${vacancy.referenceNumber}`"
          class="govuk-link"
        >Selection Exercise Team</a>.
        You have a continuing duty, throughout the time that your application is being considered, to inform the Judicial Appointments Commission (JAC) of any matters that might affect the acceptability of your application when considered against this guidance. Disclosing all matters will allow for any mitigation to be taken into account.
      </p>
      <p class="govuk-body">
        Any personal data collected and processed is in accordance with the <a
          href="https://judicialappointments.gov.uk/data-protection-freedom-of-information-and-making-requests-for-your-data/"
          class="govuk-link"
          target="_blank"
        >JAC's privacy standards</a>.
      </p>
      <p class="govuk-body govuk-!-margin-top-6">
        <RouterLink
          :to="{ name: 'applications' }"
        >
          Return to your applications
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
};
</script>
