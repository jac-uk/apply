<template>
  <div
    class="govuk-summary-list__row"
  >
    <dt :class="{ 'govuk-summary-list__key': !isHTMLValue }">
      <span v-if="config.topic">{{ config.topic }}<br></span>
      <CustomHTML
        :value="config.question"
      />
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
import { extractAnswers } from '@/helpers/workingPreferencesHelper.js';
import CustomHTML from '@/components/CustomHTML.vue';

export default {
  name: 'QuestionInputView',
  components: {
    CustomHTML,
  },
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
    isHTMLValue() {
      return this.config.question && this.config.question.trim().charAt(0) === '<';
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
