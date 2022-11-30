<template>
  <div class="govuk-radios">
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="govuk-radios__item"
    >
      <input
        :id="`${id}-answer-${index}`"
        v-model="selected"
        :name="`${id}-answer-${index}`"
        :value="answer.answer"
        type="radio"
        class="govuk-radios__input"
      >
      <label
        :for="`${id}-answer-${index}`"
        class="govuk-label govuk-radios__label"
      >
        {{ answer.answer }}
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingleChoice',
  props: {
    id: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};

</script>
