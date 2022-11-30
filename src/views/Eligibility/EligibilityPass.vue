<template>
  <div>
    <h1 class="govuk-heading-xl">
      It looks like you meet the nationality requirement
    </h1>

    <p class="govuk-body-m">
      Based on your answer, it looks like you meet the nationality requirement for the role,
      but there may be other eligibility requirements. Please check the information
      page for each exercise carefully to consider if you meet any additional requirements.
    </p>
    <RouterLink
      class="govuk-button info-link--eligibility-pass--continue"
      data-module="govuk-button"
      :to="ContinueLink"
    >
      Continue
    </RouterLink>
  </div>
</template>

<script>

export default {
  name: 'EligibilityPass',
  computed: {
    ContinueLink() {
      return { name: 'GDPR' };
    },
  },
};

</script>
