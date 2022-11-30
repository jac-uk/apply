<template>
  <div class="govuk-grid-column-two-thirds">
    <Banner
      v-if="previousTestQuestion"
      status="warning"
    >
      <template>
        You cannot amend your answer for this question as it was started on a previous test
      </template>
    </Banner>

    <form
      ref="formRef"
      @submit.prevent="save(true, {})"
    >
      <component
        :is="questionType"
        v-model="response.selection"
        :question="`${questionNumber}. ${question.details}`"
        :options="question.options"
        @answered="questionAnswered"
      />

      <p
        v-if="!canSaveAndContinue && isSituationalJudgment"
        class="govuk-hint"
      >
        Please select one option 'Most appropriate' and one 'Least appropriate' before clicking on 'Save and continue'.
      </p>

      <div class="moj-button-menu">
        <div class="moj-button-menu__wrapper">
          <button
            :class="`moj-button-menu__item govuk-button govuk-button--secondary govuk-!-margin-right-2 info-btn--question-${$route.params.questionNumber}-${$route.params.qualifyingTestId}-skip`"
            type="button"
            @click="skip"
          >
            Skip
          </button>
          <button
            :class="`moj-button-menu__item govuk-button info-btn--question-${$route.params.questionNumber}-${$route.params.qualifyingTestId}-save-and-continue`"
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
  name: 'Question',
  components: {
    CriticalAnalysis,
    SituationalJudgement,
    Banner,
  },
  props: {
    autoSave: {
      type: Boolean,
      default: false,
    },
    exitTest: {
      type: Boolean,
      default: false,
    },
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
      previousTestQuestion: false,
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
    isSituationalJudgment() {
      return this.questionType === QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT;
    },
    canSaveAndContinue() {
      if (this.previousTestQuestion) {
        return false;
      }
      switch (this.qualifyingTestResponse.qualifyingTest.type) {
      case QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT:
        // eslint-disable-next-line no-case-declarations
        const haveMost = this.response.selection.mostAppropriate !== null && this.response.selection.mostAppropriate !== undefined;
        // eslint-disable-next-line no-case-declarations
        const haveLeast = this.response.selection.leastAppropriate !== null && this.response.selection.leastAppropriate !== undefined;
        return haveMost && haveLeast;
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
  watch: {
    exitTest: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.exitTest) { // exitTest therefore update history and session
          this.saveHistoryAndSession({
            action: 'exit',
            txt: `Exit Test question ${this.questionNumber}`,
            location: 'modal',
            question: this.questionNumber - 1,
          });
        }
      }
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
    if (this.qualifyingTestResponse._unlockPreviousAnswers !== true) {
      this.questionStartedOnPreviousTest();
    }
    this.questionSessionStart = firebase.firestore.Timestamp.now();
  },
  methods: {
    async skip() {
      this.saveHistoryAndSession({ action: 'skip', txt: 'Skip' }, true);
      this.$router.push(this.nextPage);
    },
    async save(isCompleted, history) {
      let data = {};
      if (isCompleted) {
        const historyToSave = this.prepareSaveHistory({ action: 'save', txt: 'Save and continue' });
        const sessionToSave = this.prepareSaveQuestionSession();
        this.response.completed = firebase.firestore.Timestamp.fromDate(new Date());
        data = {
          ...historyToSave,
          ...sessionToSave,
          responses: this.responses,
        };
      } else {
        const historyToSave = this.prepareSaveHistory(history);
        data = {
          ...historyToSave,
          responses: this.responses,
        };
      }
      await this.$store.dispatch('qualifyingTestResponse/save', data);
      if (isCompleted) {
        this.$router.push(this.nextPage);
      }
    },
    questionAnswered(val) {
      this.save(false, { action: 'changed', answer: { value: val.value, type: val.type } });
    },
    questionStartedOnPreviousTest() {
      if (this.response.started && this.response.completed) {
        if (this.response.started < this.qualifyingTestResponse.qualifyingTest.startDate) {
          this.previousTestQuestion = true;
        }
      }
    },
    async saveHistoryAndSession(data) {
      const historyToSave = this.prepareSaveHistory(data);
      const sessionToSave = this.prepareSaveQuestionSession();
      const objToSave = {
        ...historyToSave,
        ...sessionToSave,
      };
      await this.$store.dispatch('qualifyingTestResponse/save', objToSave);
    },
    prepareSaveHistory(data) {
      const date = new Date();
      const objToSave = {
        history: firebase.firestore.FieldValue.arrayUnion({
          ...data,
          timestamp: firebase.firestore.Timestamp.fromDate(date),
          location: `question ${this.questionNumber}`,
          question: this.questionNumber - 1,
        }),
      };
      return objToSave;
    },
    prepareSaveQuestionSession() {
      const date = new Date();
      const objToSave = {
        questionSession: firebase.firestore.FieldValue.arrayUnion({
          start: this.questionSessionStart,
          end: firebase.firestore.Timestamp.fromDate(date),
          question: this.questionNumber - 1,
          timestamp: firebase.firestore.Timestamp.fromDate(date),
        }),
      };
      return objToSave;
    },
  },
};
</script>
