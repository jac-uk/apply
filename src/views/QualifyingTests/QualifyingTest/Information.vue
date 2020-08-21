<template>
  <LoadingMessage
    v-if="!loaded"
    :load-failed="loadFailed"
  />
  <div
    v-else
    class="govuk-grid-row"
  >
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-!-margin-bottom-6">
        <h1 class="govuk-heading-l govuk-!-margin-bottom-1">
          {{ qualifyingTestResponse.qualifyingTest.title }}
        </h1>
        <h2>
          Important information 
        </h2>
        <ul>
          <li>
            This test contains <b> {{ numberOfQuestions }} </b>
          </li>
          <li>
            You have <b> {{ qualifyingTestResponse.duration.testDurationAdjusted }} minutes </b> to complete this test. 
            <span v-if="extraTime"> This includes <b> {{ extraTimeAmount }} minutes </b> of reasonable adjustment time.</span>
          </li>
          <li>
            You must submit your test by <b> {{ endTime }} </b>
          </li>
          <li>
            Make sure you've got a stable internet connection before you start
          </li>
          <li>
            Your answers will be saved as you go through the test, but you can still edit them at the end before you submit your test
          </li>
          <li>
            If you run out of time, we will submit whatever answers you have completed up until that point
          </li>
        </ul>
      </div>
      <Checkbox
        id="confirm-checkbox"
        label="I confirm that i will keep this test confidential and not share scenarios or questions at any point during or after the selection exercise"
      />
      <button
        href="#"
        role="button"
        draggable="false"
        class="govuk-button govuk-button--start"
        data-module="govuk-button"
        style="background-color:#00703c;"
      >
        Start now
        <svg
          class="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M0 0h13l20 20-20 20H0l20-20z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import LoadingMessage from '@/components/LoadingMessage';
import Checkbox from '@/components/Form/Checkbox';
import { isToday, formatDate } from '@/helpers/date';

export default {
  components: {
    Checkbox,
    LoadingMessage,
  },
  data(){
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    endTime(){
      const time = formatDate(this.qualifyingTestResponse.qualifyingTest.endDate, 'time');
      const day = formatDate(this.qualifyingTestResponse.qualifyingTest.endDate);
      return isToday(this.qualifyingTestResponse.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
    extraTime(){
      return this.qualifyingTestResponse.duration.reasonableAdjustment != 0;
    },
    extraTimeAmount(){
      return this.qualifyingTestResponse.duration.testDurationAdjusted - this.qualifyingTestResponse.duration.testDuration;
    },
    numberOfQuestions(){
      const questionLength = this.qualifyingTestResponse.qualifyingTest.questions.questions.length;
      const plural = questionLength > 1 ? 's' : '';
      if (this.qualifyingTestResponse.qualifyingTest.type === 'scenario') {
        return `${questionLength} scenario${plural}, with several questions per scenario`;
      } else {
        return `${questionLength} question${plural}`;
      }
    },
  },
  async mounted() {
    const id = this.$route.params.qualifyingTestId;
    try {
      const qualifyingTestResponse = await this.$store.dispatch('qualifyingTestResponse/bind', id);
      if (qualifyingTestResponse === null) {
        this.redirectToErrorPage();
      } else {
        this.loaded = true;
      }
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
  },
  methods: {
    redirectToErrorPage() {
      this.$router.replace({ name: 'qualifying-test-not-found' });
    },
  },
};
</script>
