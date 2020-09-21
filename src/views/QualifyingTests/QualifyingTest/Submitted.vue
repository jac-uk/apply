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
          v-if="qualifyingTestResponse.vacancy"
          class="govuk-link"
          :to="`/vacancy/${qualifyingTestResponse.vacancy.id}`"
        >
          vacancy timeline
        </router-link>
        <span v-else>vacancy timeline</span>.
        <br>
        You may now close this page, return to the 
        <router-link
          class="govuk-link"
          to="/"
        >
          homepage
        </router-link>
        or go back to
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
    <div
      v-else-if="qualifyingTestResponse.qualifyingTest.feedbackSurvey"
    >
      <Banner
        :link="qualifyingTestResponse.qualifyingTest.feedbackSurvey"
        message="Click here to fill out our technical feedback survey"
        status="information"
      />
    </div>
  </div>
</template>
<script>
import firebase from '@/firebase';
import Banner from '@/components/Page/Banner';
import { isToday, formatDate, helperTimeLeft } from '@/helpers/date';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    Banner,
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    qualifyingTestResponses() {
      return this.$store.state.qualifyingTestResponses.records;
    },
    upcomingTests(){
      return this.qualifyingTestResponses.filter((qt) => {
        if (this.isTimeOut(qt.status, qt.statusLog.completed, this.isTimeLeft(qt)), this.isOpen(qt) && this.sameVacancyID(qt) && this.notComplete(qt) && this.notThisTest(qt)) {
          return true;
        }
      });
    },
  },
  created() {
    this.$store.dispatch('qualifyingTestResponses/bind');
  },
  async mounted() {
    // complete the test if we're still within time
    if (this.$store.getters['qualifyingTestResponse/timeLeft'] && this.qualifyingTestResponse.statusLog.completed === null) {
      const data = {
        'statusLog.completed': firebase.firestore.FieldValue.serverTimestamp(),
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
    }
  },
  methods: {
    endTime(qualifyingTest){
      const time = formatDate(qualifyingTest.qualifyingTest.endDate, 'time');
      const day = formatDate(qualifyingTest.qualifyingTest.endDate);
      return isToday(qualifyingTest.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
    sameVacancyID(qt){
      if (qt.vacancy && this.$store.state.qualifyingTestResponse.record.vacancy) {
        return qt.vacancy.id === this.$store.state.qualifyingTestResponse.record.vacancy.id;
      } else {
        return false;
      }
    },
    notThisTest(qt){
      return qt.id !== this.$store.state.qualifyingTestResponse.record.id;
    },
    isOpen(qt){
      return qt.statusLog.started;
    },
    isTimeLeft(qt) {
      return helperTimeLeft(qt) > 0;
    },
    isTimeOut(testStatus, logCompleted, isTimeLeft) {
      const timeout = (status == QUALIFYING_TEST.STATUS.STARTED && logCompleted === null && !isTimeLeft);
      return timeout;
    },
    notComplete(qt){
      return !qt.statusLog.completed || !this.isTimeOut(qt.status, qt.statusLog.completed, this.isTimeLeft(qt));
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
