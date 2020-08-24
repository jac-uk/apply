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
      <form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
        <div v-if="!expired">      
          <fieldset
            class="govuk-fieldset"
          >
            <Checkbox
              id="confirm-checkbox"
              name="confirm-checkbox"
              ref="confirm-checkbox"
              v-model="confirmationChecked"
              label="I confirm I will keep this test confidential and not share scenarios or questions at any point during or after the selection exercise"
              required
              :messages="{'required': 'Please confirm you agree'}"
            />
          </fieldset>
          <!-- @TODO: this should be a component --> 
          <button
            class="govuk-button govuk-button--success"
          >
            <b v-if="!started">Start now</b>
            <b v-else>Continue</b>
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
        <Warning
          v-else
          message="This Qualifying Test has ended. Please contact the selection exercise team."
        />
      </form>
    </div>
  </div>
</template>
<script>
import LoadingMessage from '@/components/LoadingMessage';
import Checkbox from '@/components/Form/Checkbox';
import Form from '@/components/Form/Form';
import Warning from '@/components/Warning';
import { isToday, isDateInFuture, formatDate } from '@/helpers/date';

export default {
  components: {
    Checkbox,
    LoadingMessage,
    Warning,
  },
  extends: Form,
  data(){
    return {
      loaded: false,
      loadFailed: false,
      confirmationChecked: false,
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
    started(){
      return this.qualifyingTestResponse.started != null;
    },
    expired(){
      return !isDateInFuture(this.qualifyingTestResponse.qualifyingTest.endDate);
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
    async onSubmit() {
      this.validate();
      if (this.isValid()) {
        try {
          this.qualifyingTestResponse.started = new Date();
          await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);
          this.$router.push({ name: 'qualifying-test-review' });
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
    },
  },
};
</script>
