<template>
  <fieldset class="govuk-fieldset  js-enabled">
    <div
      id="accordion-default"
      class="govuk-accordion"
      data-module="govuk-accordion"
    >
      <div
        :class="showDetails ? 'govuk-accordion__section govuk-accordion__section--expanded' : 'govuk-accordion__section'"
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
              Scenario details
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
              v-html="question"
            />
            <!-- eslint-enable -->
        </div>
      </div>
    </div>

    <TextareaInput
      v-for="(scenarioQuestion, index) in options"
      :id="`scenario-question-${index}`"
      :key="index"
      v-model="localValue[index]"
      :label="`${index + 1}. ${scenarioQuestion.answer}`"
      hint="Answer below:"
      rows="10"
      required
    />
  </fieldset>
</template>
<script>
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    TextareaInput,
  },
  props: {
    value: {
      type: Array,
      validator: (value) => (value instanceof Array || value === null || value === undefined),
      required: true,
      default: function () {
        return [];
      },
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
      showDetails: true,
    };
  },
  watch: {
    localValue(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    toggleAccordion() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>
