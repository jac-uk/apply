<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <span class="govuk-caption-xl govuk-!-padding-bottom-5 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>
      
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GDPR',
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
  },
};
</script>
