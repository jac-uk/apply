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
        <button class="moj-button-menu__item govuk-button">
          Save and continue
        </button>
      </div>
    </div>
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
  data() {
    const questionNumber = this.$route.params.questionNumber;

    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();

    const question = qualifyingTestResponse.testQuestions.questions[questionNumber - 1];

    if (!question.response) {
      question.response = {
        selection: null,
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

    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    questionType() {
      return this.qualifyingTestResponse.qualifyingTest.type;
    },

    nextPage() {
      if (this.isLastQuestion) {
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
  created() {
    if (this.qualifyingTestResponse.qualifyingTest.type !== QUALIFYING_TEST.TYPE.SCENARIO) {
      return this.$router.replace({ name: 'qualifying-tests' });
    }

    this.response.started = Date.now();
  },
  methods: {
    async skip() {
      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      this.$router.push(this.nextPage);
    },
    async save() {
      this.response.completed = Date.now();

      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      this.$router.push(this.nextPage);
    },
  },
};
</script>
