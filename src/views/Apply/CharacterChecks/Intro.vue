<template>
  <div class="govuk-grid-column-two-thirds">
    <BackLink />

    <h1 class="govuk-heading-xl">
      Consent to character checks
    </h1>

    <p class="govuk-body">
      You must grant consent for the Commission to undertake character checks before you can be considered for an appointment.
    </p>
    <p class="govuk-body">
      These checks may be undertaken with HMRC, ACRO Criminal Records Office and the relevant professional bodies.
    </p>
    <p class="govuk-body">
      Please check your details are correct and complete the remaining sections of this form.
    </p>
    <p class="govuk-body">
      Any personal data collected and processed is in accordance with the <a
        href="https://judicialappointments.gov.uk/data-protection-freedom-of-information-and-making-requests-for-your-data/"
        class="govuk-link"
        target="_blank"
      >JAC's privacy standards</a>.
    </p>
    <p class="govuk-body">
      Before you begin, have the following ready to fill this form in quickly and accurately.
    </p>
    <ul class="govuk-list govuk-list--bullet">
      <li>National Insurance number</li>
      <li>Professional body membership number(s) (if applicable)</li>
      <li>VAT registration number(s) (if applicable) - all partnership, company and sole trader VAT registered number(s) that have been personally allocated to you, whether they relate to the practice of law or not.</li>
    </ul>

    <button
      class="govuk-button govuk-!-margin-top-3"
      @click="next"
    >
      Continue
    </button>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';

export default {
  components: {
    BackLink,
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    next () {
      this.$router.push({ name: 'character-checks-personal-information' });
    },
  },
};
</script>
