<template>
  <div class="govuk-grid-column-two-thirds">
    <Banner
      v-if="questionStartedOnPreviousTest"
      status="warning"
      message="You cannot amend your answer for this question as it was started on a previous test"
    />
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
  </div>
</template>
<script>
import firebase from '@/firebase';
import CriticalAnalysis from '@/views/QualifyingTests/QualifyingTest/Question/CriticalAnalysis';
import SituationalJudgement from '@/views/QualifyingTests/QualifyingTest/Question/SituationalJudgement';
import { QUALIFYING_TEST } from '@/helpers/constants';
import Banner from '@/components/Page/Banner';

export default {
  components: {
    CriticalAnalysis,
    SituationalJudgement,
    Banner,
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isComingFromReview = from.name === 'qualifying-test-review';
      return true;
    });
  },
  data() {
    const questionNumber = this.$route.params.questionNumber;
    const questionNumberIndex = questionNumber - 1;
    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();
    const question = qualifyingTestResponse.testQuestions.questions[questionNumberIndex];
    let responses = qualifyingTestResponse.responses;

    if (responses.length === 0) {
      responses = new Array(qualifyingTestResponse.testQuestions.questions.length)
        .fill()
        .map(()=> {
          return ({
            selection: qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT ? {} : null,
            started: null,
            completed: null,
          });
        });
    }

    return {
      qualifyingTestResponse,
      question,
      response: responses[questionNumberIndex],
      responses,
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
      const firstQuestionNotStarted = this.qualifyingTestResponse.testQuestions.questions.find((question, index) => !(this.qualifyingTestResponse.responses[index] && this.qualifyingTestResponse.responses[index].started));
      return firstQuestionNotStarted ? false : true;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    questionType() {
      return this.qualifyingTestResponse.qualifyingTest.type;
    },
    questionStartedOnPreviousTest() {
      if (this.response.started && this.response.completed) {
        if (this.response.started < this.qualifyingTestResponse.qualifyingTest.startDate) {
          return true;
        }
      }
      return false;
    },
    canSaveAndContinue() {
      if (this.questionStartedOnPreviousTest) {
        return false;
      }
      switch (this.qualifyingTestResponse.qualifyingTest.type) {
      case QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT:
        return this.response.selection.mostAppropriate >= 0 && this.response.selection.leastAppropriate >= 0;
      case QUALIFYING_TEST.TYPE.CRITICAL_ANALYSIS:
        return this.response.selection != null && this.response.selection >= 0;
      }
      return false;
    },
    nextPage() {
      if (this.isLastQuestion || this.hasStartedAllQuestions || this.isComingFromReview) {
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
        responses: this.responses,
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
        responses: this.responses,
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
      this.$router.push(this.nextPage);
    },
  },
};
</script>
