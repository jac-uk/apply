<template>
  <div>
    <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
      Applications
    </h1>
    <ul class="govuk-list">
      <li
        v-for="application in records"
        :key="application.id"
        class="govuk-!-margin-top-7"
      >
        <span 
          v-if="application.exerciseName && application.exerciseRef"
          class="govuk-caption-l"
        >{{ application.exerciseRef }}<br></span>
        <RouterLink
          class="govuk-link govuk-heading-m govuk-!-font-weight-bold govuk-!-margin-bottom-0"
          :to="{ name: 'task-list', params: { id: application.exerciseId } }"
        >
          <span v-if="application.exerciseName">{{ application.exerciseName }}</span>
          <span v-else-if="application.exerciseRef">{{ application.exerciseRef }}</span>
          <span v-else>{{ application.exerciseId }}</span>
        </RouterLink>
        Status: {{ application.status }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('applications', [
      'records',
    ]),
  },
  created() {
    this.$store.dispatch('applications/bind');
  },
};
</script>

<style>

</style>
