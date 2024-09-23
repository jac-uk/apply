<template>
  <span class="govuk-body-s govuk-!-margin-bottom-0">
    To edit this field, please visit your <RouterLink
      class="govuk-link"
      :to="{ name: 'profile' }"
    >
      candidate profile
    </RouterLink>
  </span>
</template>

<script>
export default {
  name: 'CandidateProfileLink',
};
</script>
