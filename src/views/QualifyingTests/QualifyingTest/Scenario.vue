<template>
  <form
    ref="formRef"
    class="js-enabled"
    @submit.prevent="save"
  >
    <div
      id="accordion-default"
      class="govuk-accordion"
      data-module="govuk-accordion"
    >
      <div
        class="govuk-accordion__section"
        :class="{ 'govuk-accordion__section--expanded': showDetails }"
        @click="toggleAccordion"
      >
        <div class="govuk-accordion__section-header">
          <h2 class="govuk-accordion__section-heading">
            <button
              id="accordion-default-heading-1"
              type="button"
              aria-controls="accordion-default-content-1"
              class="govuk-accordion__section-button"
              :aria-expanded="showDetails"
            >
              Scenario {{ scenarioNumber }}
              <span
                class="govuk-accordion__icon"
                :aria-hidden="showDetails"
              />
            </button>
          </h2>
        </div>
        <div
          id="accordion-default-content-1"
          class="govuk-accordion__section-content"
          aria-labelledby="accordion-default-heading-1"
        >
          <!-- eslint-disable -->
          <div
            v-html="scenario.details"
          />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>

    <TextareaInput
      id="scenario-question"
      v-model="response.text"
      :label="`${questionNumber}. ${question}`"
      rows="10"
      required
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
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    TextareaInput,
  },
  data() {
    const scenarioNumber = this.$route.params.scenarioNumber;
    const questionNumber = this.$route.params.questionNumber;
    
    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();
    // TODO: scenario = this.qualifyingTestResponse.qualifyingTest.questions.questions[this.scenarioNumber - 1]
    const scenario = qualifyingTestResponse.qualifyingTest.questions.questions[scenarioNumber - 1];

    if (!scenario.responses) {
      scenario.responses = new Array(scenario.options.length).fill().map(() => ({
        text: null,
        started: null,
        completed: null,
      }));
    }

    const response = scenario.responses[questionNumber - 1];

    return {
      qualifyingTestResponse,
      scenario,
      response,
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
      return this.scenarioNumber === this.qualifyingTestResponse.qualifyingTest.questions.questions.length;
    },
    isLastQuestion() {
      return this.questionNumber === this.scenario.options.length;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    question() {
      return this.scenario.options[this.questionNumber - 1].answer;
    },
    nextPage() {
      if (this.isLastScenario && this.isLastQuestion) {
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
  },
  created() {
    this.response.started = Date.now();
  },
  methods: {
    toggleAccordion() {
      this.showDetails = !this.showDetails;
    },
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
