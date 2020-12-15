<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Character declaration
      </h1>

      <p class="govuk-body-l">
        You must tell us about any character issues that could affect your
        suitability for this role. Read the
        <a
          class="govuk-link info-link--character-information--character-guidance"
          href="https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#continuing-duty-to-disclose"
          target="_blank"
        >
          character guidance</a>
        for detailed information.
      </p>

      <p class="govuk-body-l">
        In order to be appointed to a role, you must satisfy good character requirements.
        Refer to the Good Character Guidance to understand the requirements and your responsibilities.
      </p>

      <p class="govuk-body-l">
        The following pages may present some of the details from your last submitted application.
      </p>

      <p class="govuk-body-l">
        Please check your details are correct and complete the remaining sections of this form.
      </p>

      <p class="govuk-body-l">
        If your circumstances change after completing this form, this might impact your ability to meet
        the good character requirements. Please notify the Selection Exercise Team if this happens.
      </p>

      <p class="govuk-body-l">
        You have a continuing duty, throughout the time that your application is being considered,
        to inform the Judicial Appointments Commission (JAC) of any matters that might affect the
        acceptability of your application when considered against this guidance.
      </p>

      <p class="govuk-body-l govuk-!-font-weight-bold">
        Warning: Failure to declare any matters that come to light from the Commission's check
        may prejudice the outcome of your application.
      </p>

      <StartButton
        class="govuk-button--success"
        @click="start"
      />
    </div>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';
import StartButton from '@/components/Page/StartButton';

export default {
  name: 'CharacterInformationDeclaration',
  components: {
    BackLink,
    StartButton,
  },
  computed: {
    application() {
      return this.$store.getters['application/data']();
    },
  },
  methods: {
    start() {
      if (this.application.progress.characterInformation === true) {
        this.$router.push({ name: 'character-information-review' });
      } else {
        this.$router.push({ name: 'character-information-criminal-offences' });
      }
    },
  },
};
</script>

