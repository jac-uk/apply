<template>
  <div
    class="govuk-summary-list__row"
  >
    <dt class="govuk-summary-list__key">
      <span v-if="config.topic">{{ config.topic }}<br></span>
      {{ config.question }}
    </dt>
    <dd
      class="govuk-summary-list__value"
    >
      <p
        v-for="item in answerData"
        :key="item"
        class="govuk-body"
      >
        <strong v-if="item.rank">
          {{ item.rank }}:
        </strong>
        <strong v-if="item.group">
          {{ item.group }} -
        </strong>
        {{ item.answer }}
      </p>
    </dd>
  </div>
</template>

<script>
import { extractAnswers } from '../../views/Apply/WorkingPreferences/workingPreferencesHelper.js';

export default {
  name: 'QuestionInputView',
  props: {
    config: {
      type: Object,
      required: true,
    },
    data: {
      type: [String, Array, Object],
      required: true,
    },
    answerSources: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    answerData() {
      return extractAnswers(this.config, this.data, this.answerSources, this.$filters);
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
</style>
