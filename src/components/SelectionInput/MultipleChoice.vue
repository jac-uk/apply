<template>
  <div class="govuk-checkboxes">
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="govuk-checkboxes__item"
    >
      <input
        :id="`${id}-answer-${index}`"
        v-model="selected"
        :name="`${id}-answer-${index}`"
        :value="answer.answer"
        type="checkbox"
        class="govuk-checkboxes__input"
      >
      <label
        :for="`${id}-answer-${index}`"
        class="govuk-label govuk-checkboxes__label"
      >
        {{ answer.answer }}
      </label>
    </div>
  </div>
</template>

<script>

export default {
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
      type: Array,
      default: new Array(),
    },
  },
  computed: {
    selected: {
      get() {
        return this.value ? this.value : [];
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};

</script>
