<template>
  <template v-if="vacancy.locationPreferences">
    <dl
      v-for="(item, index) in vacancy.locationPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionRenderer
        section="locationPreferences"
        :application="application"
        :exercise="vacancy"
        :index="index"
        :review="true"
      />
    </dl>
  </template>
  <dl
    v-else
    class="govuk-summary-list"
  >
    <dt class="govuk-summary-list__key">
      {{ vacancy.locationQuestion }}
    </dt>
    <dd
      v-if="vacancy.locationQuestionType == 'single-choice'"
      class="govuk-summary-list__value"
    >
      {{ application.locationPreferences }}
    </dd>
    <dd
      v-else
      class="govuk-summary-list__value"
    >
      <p
        v-for="(item, index) in application.locationPreferences"
        :key="item.name"
        class="govuk-body"
      >
        <strong>
          {{ index + 1 }}
        </strong>
        {{ item }}
      </p>
    </dd>
  </dl>
</template>

<script>
import QuestionRenderer from '@jac-uk/jac-kit/draftComponents/Page/QuestionRenderer.vue';

export default {
  name: 'LocationPreferences',
  components: {
    QuestionRenderer,
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
      type: Object,
      required: true,
    },
  },
  methods: {
    sortRankedSelection(dataset) {
      return Object.fromEntries(Object.entries(dataset).sort((a, b) => a[1] - b[1]));
    },
    sortEqualRankedSelection(dataset) {
      const groups = {};
      Object.entries(dataset).forEach(([answer, rank]) => {
        if (!groups[rank]) {
          groups[rank] = [];
        }
        groups[rank].push(answer);
      });
      return Object.entries(groups).map(([rank, answers]) => ({ rank, answers }));
    },
    findGroupByAnswer(dataset, targetAnswer) {
      for (const question of dataset) {

        if (question.answers.some(answerObj => answerObj.answer === targetAnswer)) {
          return question.group;
        }
      }
      return null; // Return null if the answer is not found in any group
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
  .change-link {
    float: right;
  }
</style>
