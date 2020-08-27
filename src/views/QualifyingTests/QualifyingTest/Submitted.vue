<template>
  <div>
    <div class="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
      <h1 class="govuk-panel__title">
        Test Submitted
      </h1>
      Your test has been submitted and is now complete.
    </div>

    <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
      Next Steps

      <p class="govuk-body-m govuk-!-margin-top-0">
        You will be informed of the outcome of your qualifying test, as indicated on the 
        <router-link 
          class="govuk-link"
          :to="`/vacancy/${qualifyingTestResponse.vacancy.id}`"
        >
          vacancy timeline
        </router-link>.
        <br>
        You may now close this page or return to the 
        <router-link
          class="govuk-link"
          to="/"
        >
          homepage
        </router-link>
        or back to
        <router-link
          class="govuk-link"
          :to="{ name: 'qualifying-tests' }"
        >
          your qualifying tests.
        </router-link>
      </p>
    </div>

    <!-- TODO: this should be a component -->
    <div
      v-if="upcomingTests.length"
      class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6"
    >
      <p class="govuk-body">
        You have another Qualifying Test to complete:
      </p>

      <div class="govuk-inset-text">
        <ul class="govuk-list">
          <li
            v-for="upcomingTest in upcomingTests"
            :key="upcomingTest.id"
          >
            <RouterLink
              :to="{ path: `/qualifying-tests/${upcomingTest.id}/information` }"
            >
              {{ upcomingTest.qualifyingTest.title }}<br>
            </RouterLink>
            <strong class="red-text">
              by {{ endTime(upcomingTest) }}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { isToday, formatDate } from '@/helpers/date';

export default {
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    qualifyingTestResponses() {
      return this.$store.state.qualifyingTestResponses.records;
    },
    upcomingTests(){
      return this.qualifyingTestResponses.filter(qt => !qt.statusLog.completed);
    },
  },
  async mounted() {
    if (this.qualifyingTestResponse.statusLog.completed === null){
      this.qualifyingTestResponse.statusLog.completed = new Date();
      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);
    }
  },
  methods: {
    endTime(qualifyingTest){
      const time = formatDate(qualifyingTest.qualifyingTest.endDate, 'time');
      const day = formatDate(qualifyingTest.qualifyingTest.endDate);
      return isToday(qualifyingTest.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
  },
};
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
  .govuk-inset-text {
    border-color: red;
  }
  .red-text {
    color: red;
  }
</style>
