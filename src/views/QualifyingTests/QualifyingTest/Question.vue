<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <component
      :is="questionType"
      v-model="question.response.selection"
      :question="question.details"
      :options="question.options"
    />

    <button class="govuk-button">
      Save and continue
    </button>
  </form>
</template>
<script>
import CriticalAnalysis from '@/views/QualifyingTests/QualifyingTest/Question/CriticalAnalysis';
import SituationalJudgement from '@/views/QualifyingTests/QualifyingTest/Question/SituationalJudgement';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    CriticalAnalysis,
    SituationalJudgement,
  },
  computed: {
    questionNumber() {
      return parseInt(this.$route.params.questionNumber);
    },
    isLastQuestion() {
      return this.questionNumber === this.qualifyingTestResponse.qualifyingTest.questions.questions.length;
    },
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    questionType() {
      return this.qualifyingTestResponse.qualifyingTest.type;
    },
    question() {
      //const questions = this.qualifyingTestResponse.testQuestions;
      const questions = this.qualifyingTestResponse.qualifyingTest.questions.questions;

      return questions[this.questionNumber - 1];
    },
  },
  created() {
    if (!this.question.response) {
      let selection = null;
      if (this.questionType === QUALIFYING_TEST.TYPE.SCENARIO) {
        selection = new Array(this.question.options.length);
      }
      this.question.response = {
        selection,
        started: Date.now(),
        completed: null,
      };
    }
  },
  methods: {
    async save() {
      this.question.response.completed = Date.now();
      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      let target = {
        name: 'qualifying-test-question',
        params: {
          questionNumber: this.questionNumber + 1,
        },
      };
      if (this.isLastQuestion) {
        target = {
          name: 'qualifying-test-review',
        };
      }
      this.$router.push(target);
    },
  },
};
</script>
