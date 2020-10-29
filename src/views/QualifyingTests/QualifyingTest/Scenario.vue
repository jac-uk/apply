<template>
  <div class="jac-scenario">
    <form
      ref="formRef"
      class="js-enabled"
      @submit.prevent="save"
    >
      <h1
        class="govuk-heading-l"
      >
        {{ qualifyingTestResponse.qualifyingTest.title }}
      </h1>
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-one-half govuk-grid-column-two-thirds-from-desktop govuk-!-margin-bottom-9">
          <!-- eslint-disable -->
          <p v-html="$options.filters.showHTMLBreaks(qualifyingTestResponse.testQuestions.introduction)" />
          <!-- eslint-enable -->
          <div
            class="govuk-character-count"
          >
            <TextareaInput
              id="scenario-question"
              v-model="response.text"
              :label="`${questionNumber}. ${question.question}`"
              :hint="$options.filters.showHTMLBreaks(question.hint) || 'Answer below:'"
              rows="10"
              required
            />
            <div class="govuk-body">
              <span>{{ wordsCounter }}</span>
              <span>/</span>
              <span>{{ question.wordLimit }}</span>
              <span> words</span>
              <div v-if="reachMaxWords">
                You have reached the limit of <strong>{{ question.wordLimit }}</strong> words for this answer. Please remove some words.
              </div>
            </div>
          </div>

          <div class="moj-button-menu">
            <div class="moj-button-menu__wrapper">
              <button
                :class="`moj-button-menu__item govuk-button govuk-button--secondary govuk-!-margin-right-2  info-btn--scenario--${infoClass()}--save-and-continue`"
                type="button"
                @click="skip"
              >
                Skip
              </button>
              <button
                :class="`moj-button-menu__item govuk-button info-btn--scenario--${infoClass()}--save-and-continue`"
                :disabled="reachMaxWords || isEmpty"
              >
                Save and continue
              </button>
            </div>
          </div>
        </div>

        <div class="govuk-grid-column-one-half govuk-grid-column-one-third-from-desktop">
          <div class="jac-scenario__additional">
            <dl ref="accordion">
              <span
                v-for="(document, index) of scenario.documents"
                :key="index"
              >
                <dt
                  :class="`govuk-heading-m ${index === 0 ? 'open' : 'close'}`"
                  @click.prevent="clickAdditional(index)"
                >
                  {{ document.title | showAlternative(`Additional Reading ${index}`) }}
                  <button>
                    <img
                      :src="icon(index)"
                    >
                  </button>
                </dt>
                <!-- eslint-disable -->
                <dd v-html="document.content" />
                <!-- eslint-enable -->
              </span>
            </dl>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@/firebase';
import TextareaInput from '@/components/Form/TextareaInput';
import { QUALIFYING_TEST } from '@/helpers/constants';
import plusIcon from '@/assets/plus.png';
import minusIcon from '@/assets/minus.png';

export default {
  components: {
    TextareaInput,
  },
  props: {
    timeIsUp: {
      type: Boolean,
      default: false,
    },
    autoSave: {
      type: Boolean,
      default: false,
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isComingFromReview = from.name === 'qualifying-test-review';
      return true;
    });
  },
  data() {
    const scenarioNumber = this.$route.params.scenarioNumber;
    const questionNumber = this.$route.params.questionNumber;
    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();
    const scenario = qualifyingTestResponse.testQuestions.questions[scenarioNumber - 1];
    let responses = qualifyingTestResponse.responses; // New data model with responses on the root

    if (responses.length === 0) {
      responses = new Array(qualifyingTestResponse.testQuestions.questions.length)
        .fill()
        .map((item, id)=> {
          const newItem = new Array(qualifyingTestResponse.testQuestions.questions[id].options.length)
            .fill()
            .map(() => (
              {
                text: null,
                started: null,
                completed: null,
              }
            ));
          return ({ 'responsesForScenario': newItem });
        });
    }

    const response = responses[scenarioNumber - 1].responsesForScenario[questionNumber - 1];

    return {
      qualifyingTestResponse,
      scenario,
      response,
      responses,
      showDetails: true,
    };
  },
  computed: {
    scenarioNumber() {
      return parseInt(this.$route.params.scenarioNumber);
    },
    questionNumber() {
      return parseInt(this.$route.params.questionNumber);
    },
    isLastScenario() {
      return this.scenarioNumber === this.qualifyingTestResponse.testQuestions.questions.length;
    },
    isLastQuestion() {
      return this.questionNumber === this.scenario.options.length;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    question() {
      return this.scenario.options[this.questionNumber - 1];
    },
    nextPage() {
      if ((this.isLastScenario && this.isLastQuestion) || this.isComingFromReview) {
        return {
          name: 'qualifying-test-review',
        };
      }

      return {
        name: 'qualifying-test-scenario',
        params: {
          scenarioNumber: this.isLastQuestion ? this.scenarioNumber + 1 : this.scenarioNumber,
          questionNumber: this.isLastQuestion ? 1 : this.questionNumber + 1,
        },
      };
    },
    wordsCounter() {
      let content = this.response.text;
      if (content === '' || content === null) {
        return 0;
      }
      content = content.trim().split(/[\s]+/);
      const words = content.length;
      return words;
    },
    reachMaxWords () {
      const maxWords = this.question.wordLimit;
      const reachedMaxWords = this.wordsCounter > maxWords;
      return reachedMaxWords;
    },
    isEmpty () {
      return !this.response.text || this.response.text.trim().length === 0;
    },
  },
  watch: {
    timeIsUp: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.timeIsUp) { // time is up therefore save form, if there are unsaved changes
          this.saveResponse(false);
        }
      }
    },
    autoSave: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.autoSave) { // autoSave therefore save form, if there are unsaved changes
          this.saveResponse(false);
        }
      }
    },
  },
  async created() {
    if (this.qualifyingTestResponse.qualifyingTest.type !== QUALIFYING_TEST.TYPE.SCENARIO) {
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
    toggleAccordion() {
      this.showDetails = !this.showDetails;
    },
    async skip() {
      this.$router.push(this.nextPage);
    },
    async save() {
      await this.saveResponse(true);
      this.$router.push(this.nextPage);
    },
    async saveResponse(markAsCompleted) {
      // TODO only save if there are un-saved changes
      if (markAsCompleted) {
        this.response.completed = firebase.firestore.Timestamp.fromDate(new Date());
      }
      // testQuestions: this.qualifyingTestResponse.testQuestions,
      const data = {
        responses: this.responses,
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
    },
    clickAdditional(index) {
      const elList = this.$refs.accordion.querySelectorAll('dt');
      elList.forEach((item, i) => {
        const image = item.querySelectorAll('button img')[0];
        if (index === i) {
          if (item.classList.contains('open')) {
            item.classList.remove('open');
            item.classList.add('close');
            image.src = plusIcon;
          } else {
            item.classList.remove('close');
            item.classList.add('open');
            image.src = minusIcon;
          }
        } else {
          item.classList.remove('open');
          item.classList.add('close');
          image.src = plusIcon;
        }
      });
    },
    icon(index) {
      if (index === 0) {
        return minusIcon;
      } else {
        return plusIcon;
      }
    },
    infoClass() {
      const params = this.$route.params;
      const hyphenated = `${params.qualifyingTestId}-${params.scenarioNumber}-${params.questionNumber}`;
      return hyphenated;
    },
  },
};
</script>

<style lang="css" scoped>

.jac-scenario__additional {
  border: 1px solid silver;
}

.jac-scenario__additional dl {
  padding: 0;
  margin: 0;
}

.jac-scenario__additional dt {
  padding: 15px 40px 10px 20px;
  margin: 0;
  border-bottom: 1px solid silver;
  color: #1d70b8;
  position: relative;
  cursor: pointer;
}

.jac-scenario__additional dt.open + dd {
  display: block;
}

.jac-scenario__additional dt.close + dd {
  display: none;
}

.jac-scenario__additional dt button {
  padding: 0;
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
}

.jac-scenario__additional dt button img {
  width: 50%;
}

.jac-scenario__additional dd {
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid silver;

  height: 56vh;
  overflow-y: scroll;
}

</style>
