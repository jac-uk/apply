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
      In order to be appointed to a role, you must satisfy good character requirements. Refer to the <a
        href="https://www.judicialappointments.gov.uk/good-character"
        class="govuk-link"
        target="_blank"
      >Good Character Guidance</a> to understand the requirements and your responsibilities.
    </p>
    <p class="govuk-body">
      The following pages will present some of the details from your last submitted application. Please check your details are correct and complete the remaining sections of this form.
    </p>
    <p class="govuk-body">
      If your circumstances change after completing this form that might impact your ability to meet the good character requirements please notify the <a
        href="#"
        class="govuk-link"
      >Selection Exercise Team</a>. You have a continuing duty, throughout the time that your application is being considered, to inform the Judicial Appointments Commission (JAC) of any matters that might affect the acceptability of your application when considered against this guidance.
    </p>
    <div class="govuk-warning-text">
      <span
        class="govuk-warning-text__icon"
        aria-hidden="true"
      >!</span>
      <strong class="govuk-warning-text__text"><span class="govuk-warning-text__assistive">Warning</span>Failure to declare any matters that come to light from the Commission's checks may prejudice the outcome of your application. Disclosing all matters will allow for any mitigation to be taken into account.</strong>
    </div>
    <p class="govuk-body">
      Any personal data collected and processed is in accordance with the <a
        href="https://www.judicialappointments.gov.uk/accessing-your-information"
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
      <li>VAT registration number(s) (if applicable) - all partnership, company and sole trader VAT registered number(s) that you have a personal responsibility for, whether they relate to the practice of law or not will be required</li>
    </ul>

    <button
      class="govuk-button"
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
  methods: {
    next () {
      this.$router.push({ name: 'character-checks-personal-information' });
    },
  },
};
</script>
