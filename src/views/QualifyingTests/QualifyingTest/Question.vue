<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <component
      :is="questionType"
      v-model="response.selection"
      :question="`${questionNumber}. ${question.details}`"
      :options="question.options"
    />

    <div class="moj-button-menu">
      <div class="moj-button-menu__wrapper">
        <button
          class="moj-button-menu__item govuk-button govuk-button--secondary govuk-!-margin-right-2"
          type="button"
          @click="skip"
        >
          Skip
        </button>
        <button 
          class="moj-button-menu__item govuk-button"
          :disabled="!canSaveAndContinue"
        >
          Save and continue
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import firebase from '@/firebase';
import CriticalAnalysis from '@/views/QualifyingTests/QualifyingTest/Question/CriticalAnalysis';
import SituationalJudgement from '@/views/QualifyingTests/QualifyingTest/Question/SituationalJudgement';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    CriticalAnalysis,
    SituationalJudgement,
  },
  data() {
    const questionNumber = this.$route.params.questionNumber;

    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();

    const question = qualifyingTestResponse.testQuestions.questions[questionNumber - 1];

    if (!question.response) {
      question.response = {
        selection: qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT ? {} : null,
        started: null,
        completed: null,
      };
    }

    return {
      qualifyingTestResponse,
      question,
      response: question.response,
      showDetails: true,
    };
  },
  computed: {
    questionNumber() {
      return parseInt(this.$route.params.questionNumber);
    },
    isLastQuestion() {
      return this.questionNumber === this.qualifyingTestResponse.testQuestions.questions.length;
    },
    hasStartedAllQuestions() {
      const firstQuestionNotStarted = this.qualifyingTestResponse.testQuestions.questions.find(question => !(question.response && question.response.started));
      return firstQuestionNotStarted ? false : true;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    questionType() {
      return this.qualifyingTestResponse.qualifyingTest.type;
    },
    canSaveAndContinue() {
      switch (this.qualifyingTestResponse.qualifyingTest.type) {
      case QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT:
        return this.response.selection.mostAppropriate >= 0 && this.response.selection.leastAppropriate >= 0;
      case QUALIFYING_TEST.TYPE.CRITICAL_ANALYSIS:
        return this.response.selection != null && this.response.selection >= 0;
      }
      return false;
    },
    nextPage() {
      if (this.isLastQuestion || this.hasStartedAllQuestions) {
        return {
          name: 'qualifying-test-review',
        };
      }

      return {
        name: 'qualifying-test-question',
        params: {
          questionNumber: this.questionNumber + 1,
        },
      };
    },
  },
  async created() {
    if (this.qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SCENARIO) {
      return this.$router.replace({ name: 'qualifying-tests' });
    }
    if (!this.response.started) {
      this.response.started = firebase.firestore.Timestamp.fromDate(new Date());
      const data = {
        testQuestions: this.qualifyingTestResponse.testQuestions,
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
    }
  },
  methods: {
    async skip() {
      this.$router.push(this.nextPage);
    },
    async save() {
      this.response.completed = firebase.firestore.Timestamp.fromDate(new Date());
      const data = {
        testQuestions: this.qualifyingTestResponse.testQuestions,
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
      this.$router.push(this.nextPage);
    },
  },
};
</script>
