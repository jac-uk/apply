<template>
  <div>
    <h1 class="govuk-heading-xl govuk-!-margin-bottom-6">
      Open vacancies
    </h1>
    <ul class="govuk-list">
      <li
        v-for="vacancy in records"
        :key="vacancy.id"
      >
        <RouterLink
          class="govuk-link"
          :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
        >
          {{ vacancy.name }}
        </RouterLink>
      </li>
    </ul>        
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('vacancies', [
    'records',
  ]),
  created() {
    this.$store.dispatch('vacancies/bind');
  },
};
</script>

<style>

</style>
