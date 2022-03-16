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
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
  },
  mounted() {
    const today = Date.now();

    if (this.$store.getters['vacancy/getOpenDate'] > today) {
      this.redirectToVacancyDetails();
    }
  },
  methods: {
    redirectToVacancyDetails() {
      this.$router.replace({
        name: 'vacancy-details',
        params: {
          id: this.vacancy.id,
        },
      });
    },
  },
};
</script>
