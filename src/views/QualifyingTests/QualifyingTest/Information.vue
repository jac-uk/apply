<template>
  <div class="govuk-grid-column-two-thirds">
    <div class="govuk-!-margin-bottom-6">
      <h1 class="govuk-heading-l">
        {{ qualifyingTestResponse.qualifyingTest.title }}
      </h1>

      <ErrorSummary :errors="errors" />

      <h2 class="govuk-heading-m">
        Important information
      </h2>

      <ul class="govuk-list govuk-list--bullet">
        <li>
          This test contains <b>{{ numberOfQuestions }}.</b>
        </li>
        <li>
          You have <b>{{ qualifyingTestResponse.duration.testDurationAdjusted }} minutes</b> to complete this test.
          <span v-if="extraTime"> This includes <b>{{ extraTimeAmount }} minutes</b> of reasonable adjustment time.</span>
        </li>
        <li>
          You must submit your test by <b>{{ endTime }}</b>.
        </li>
        <li>
          Make sure you've got a stable internet connection before you start.
        </li>
        <li>
          Your answers will be saved as you go through the test, but you can still edit them at the end before you submit your test.
        </li>
        <li>
          If you run out of time, we will submit whatever answers you have completed up until that point.
        </li>
      </ul>

      <template v-if="additionalInstructions.length">
        <h2 class="govuk-heading-m">
          Additional instructions
        </h2>

        <ul class="govuk-list govuk-list--bullet">
          <li
            v-for="(instruction, index) in additionalInstructions"
            :key="index"
          >
            {{ instruction.text }}
          </li>
        </ul>
      </template>
    </div>

    <form
      ref="formRef"
      @submit.prevent="onSubmit"
    >
      <Warning
        v-if="expired"
        message="This Qualifying Test has ended. Please contact the selection exercise team."
      />

      <div v-else>
        <fieldset
          v-if="!started"
          class="govuk-fieldset"
        >
          <Checkbox
            id="confirm-checkbox"
            ref="confirm-checkbox"
            v-model="confirmationChecked"
            name="confirm-checkbox"
            required
            :messages="{'required': 'Please confirm you agree'}"
          >
            <b>I confirm I will keep this test confidential and not share scenarios or questions at any point during or after the selection exercise.</b>
          </Checkbox>
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
    </form>
  </div>
</template>
<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import Checkbox from '@/components/Form/Checkbox';
import Warning from '@/components/Warning';
import { isToday, isDateInFuture, formatDate } from '@/helpers/date';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    ErrorSummary,
    Checkbox,
    Warning,
  },
  extends: Form,
  data() {
    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();

    return {
      confirmationChecked: false,
      qualifyingTestResponse,
    };
  },
  computed: {
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
      const questionLength = this.qualifyingTestResponse.testQuestions.questions.length;
      const plural = questionLength > 1 ? 's' : '';
      if (this.qualifyingTestResponse.qualifyingTest.type === 'scenario') {
        return `${questionLength} scenario${plural}, with several questions per scenario`;
      } else {
        return `${questionLength} question${plural}`;
      }
    },
    additionalInstructions() {
      return this.qualifyingTestResponse.qualifyingTest.additionalInstructions;
    },
    started(){
      return this.qualifyingTestResponse.statusLog.started != null;
    },
    expired(){
      return !isDateInFuture(this.qualifyingTestResponse.qualifyingTest.endDate);
    },
    nextPage() {
      if (this.qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SCENARIO) {
        return {
          name: 'qualifying-test-scenario',
          params: {
            scenarioNumber: 1,
            questionNumber: 1,
          },
        };
      }
      return {
        name: 'qualifying-test-question',
        params: {
          questionNumber: 1,
        },
      };
    },
  },
  methods: {
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    redirectToErrorPage() {
      this.$router.replace({ name: 'qualifying-test-not-found' });
    },
    async onSubmit() {
      this.validate();
      if (this.isValid()) {
        try {
          if (!this.started && !this.confirmationChecked) {
            throw new Error('You must agree to keep this test confidential.');
          }
          this.qualifyingTestResponse.status = QUALIFYING_TEST.STATUS.STARTED;
          this.qualifyingTestResponse.statusLog.started = new Date();

          await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

          this.$router.push(this.nextPage);
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
    },
  },
};
</script>
