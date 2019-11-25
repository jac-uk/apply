<template>
  <div>
    <div class="govuk-breadcrumbs">
      <ol class="govuk-breadcrumbs__list">
        <li class="govuk-breadcrumbs__list-item">
          <RouterLink
            class="govuk-breadcrumbs__link"
            :to="{ name: 'vacancies' }"
          >
            Home
          </RouterLink>
        </li>
        <li 
          class="govuk-breadcrumbs__list-item"
          aria-current="page"
        >
          Vacancies
        </li>
      </ol>
    </div>
    <div>
      {{ vacancy }}
    </div>
    <RouterLink
      class="govuk-button"
      data-module="govuk-button"
      :to="{ name: 'vacancy-message' }"
    >
      Apply
    </RouterLink>
  </div>
</template>

<script>
export default {
  computed: {
    vacancy () {
      return this.$store.state.exercise.record;
    },
  },
};
</script>
