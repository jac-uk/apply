<template>
  <template v-if="vacancy.jurisdictionPreferences">
    <dl
      v-for="(item, index) in vacancy.jurisdictionPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionRenderer
        section="jurisdictionPreferences"
        :application="application"
        :vacancy="vacancy"
        :index="index"
      />
    </dl>
  </template>
  <dl
    v-else
    class="govuk-summary-list"
  >
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        {{ vacancy.jurisdictionQuestion }}
      </dt>
      <dd
        v-if="vacancy.jurisdictionQuestionType == 'single-choice'"
        class="govuk-summary-list__value"
      >
        {{ application.jurisdictionPreferences }}
      </dd>
      <dd
        v-else
        class="govuk-summary-list__value"
      >
        <p
          v-for="item in application.jurisdictionPreferences"
          :key="item.name"
          class="govuk-body"
        >
          {{ item }}
        </p>
      </dd>
    </div>
  </dl>
</template>

<script>
import QuestionRenderer from '@/components/Page/QuestionRenderer.vue';

export default {
  name: 'JurisdictionPreferences',
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
