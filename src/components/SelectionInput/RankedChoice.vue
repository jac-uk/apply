<template>
  <div>
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="govuk-grid-row govuk-!-margin-left-2"
    >
      <div
        class="govuk-checkboxes__item govuk-grid-column-one-third govuk-!-margin-bottom-0"
      >
        <input
          :id="`${id}-answer-${index}`"
          v-model="selected"
          :name="`${id}-answer-${index}`"
          :value="answer.answer"
          type="checkbox"
          class="govuk-checkboxes__input"
          @change="update"
        >
        <label
          :for="`${id}-answer-${index}`"
          class="govuk-label govuk-checkboxes__label"
        >
          {{ answer.answer }}
        </label>
      </div>
      <div
        v-if="selected.indexOf(answer.answer) >= 0"
        class="govuk-grid-column-one-third"
      >
        <div class="govuk-heading-l govuk-!-margin-bottom-0">
          {{ selected.indexOf(answer.answer) + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RankedChoice',
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
      default: function () {
        return new Array();
      },
    },
  },
  data() {
    return {
      selected: [],
      ranking: {},
    };
  },
  mounted() {
    if (this.value) {
      this.selected = this.value;
      for (let i = 0, len = this.value.length; i < len; ++i) {
        this.ranking[this.value[i]] = i + 1;
      }
    }
  },
  methods: {
    update() {
      this.$emit('input', this.selected);
    },
  },
};

</script>
