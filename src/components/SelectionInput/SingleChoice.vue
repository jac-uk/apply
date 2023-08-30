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
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
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
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    selected: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};

</script>
