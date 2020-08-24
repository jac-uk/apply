<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-!-margin-bottom-6">
        <div>
          <div class="govuk-panel govuk-panel--confirmation">
            <h1 class="govuk-panel__title">
              Test Submitted
            </h1>
            Your test has been submitted and is now complete.
          </div>
        </div>
      </div>
      <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
        Next Steps
        <p class="govuk-body-m govuk-!-margin-top-0">
          You will be informed of the outcome of your qualifying test, as indicated on the <router-link :to="`/vacancy/${qualifyingTestResponse.vacancy.id}`">
            vacancy timeline
          </router-link>.
          <br>
          You may now close this page. 
        </p>
      </div>
      <!-- TODO: this should be a component --> 
      <div
        v-if="upcomingTest != false"
        class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6"
      >
        You have another Qualifying Test to complete:
        <div class="govuk-inset-text">
          <a href="">
            {{ upcomingTest.qualifyingTest.title }}<br>
          </a>
          <strong class="red-text">
            by {{ endTime(upcomingTest) }}
          </strong>
        </div>
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
    upcomingTest(){
      for (const qt of this.qualifyingTestResponses){
        if (qt.statusLog.completed === null){
          return qt;
        }
      }
      return false;
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
<style>
  .govuk-inset-text {
    border-color: red;
  }
  .red-text {
    color: red;
  }
</style>
