<template>
  <div
    v-if="!item.allowLinkedQuestions || (!!item.linkedQuestion && !!item.linkedAnswer && isLinkedByAnswer)"
  >
    <dt
      class="govuk-summary-list__key"
    >
      {{ item.question }}
      <span
        class="govuk-hint"
      >
        {{ $filters.lookup(item.questionType) }}
        {{ item.groupAnswers ? ' - Grouped Answers' : '' }}
        {{ item.minimumAnswerMode === 'some' ? ` - ${item.minimumAnswerQuantity} Answer minimum` : '' }}
        {{ item.allowEqualRanking ? ' - Allow Equal Rank' : '' }}
        {{ item.allowLinkedQuestions ? ' - has linked Questions' : '' }}
      </span>
    </dt>
    <dd
      v-if="vacancy[section][index].questionType == 'multiple-choice' && (typeof application[section][item.question] === 'object')"
      class="govuk-summary-list__value"
    >
      <p
        v-for="(answer) in application[section][item.question]"
        :key="answer"
        class="govuk-body"
      >
        <strong>
          {{ item.groupAnswers ? findGroupByAnswer(item.answers, answer) + ' - ' : '' }}
        </strong>
        {{ answer }}
      </p>
    </dd>
    <template v-if="vacancy[section][index].questionType == 'ranked-choice' && (typeof application[section][item.question] === 'object')">
      <dd
        v-if="!item.allowEqualRanking"
        class="govuk-summary-list__value"
      >
        <p
          v-for="(answerIndex, answer) in sortRankedSelection(application[section][item.question])"
          :key="answer"
          class="govuk-body"
        >
          <strong>
            {{ answerIndex }}:
          </strong>
          <span>
            {{ item.groupAnswers ? findGroupByAnswer(item.answers, answer) + ' - ' : '' }}
          </span>
          {{ answer }}
        </p>
      </dd>
      <dd
        v-else-if="item.allowEqualRanking"
        class="govuk-summary-list__value"
      >
        <p
          v-for="(sortedAnswers) in sortEqualRankedSelection(application[section][item.question])"
          :key="sortedAnswers.rank"
          class="govuk-body"
        >
          <strong>
            {{ sortedAnswers.rank }}:
          </strong>
          <span
            v-for="(answer, sortedAnswerIndex) in sortedAnswers.answers"
            :key="answer"
          >
            {{ `${answer}${(sortedAnswerIndex + 1 < sortedAnswers.answers.length) ? ', ' : ''}` }}
          </span>
        </p>
      </dd>
    </template>
    <dd
      v-else-if="vacancy[section][index].questionType == 'single-choice' && (typeof application[section][item.question] === 'string')"
      class="govuk-summary-list__value"
    >
      {{ application[section][item.question] }}
    </dd>
  </div>
</template>

<script>
export default {
  name: 'LocationPreferences',
  props: {
    section: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLinkedByAnswer() {
      const linkedQuestion = this.vacancy[this.section].find(question => question.question === this.item.linkedQuestion);
      if (linkedQuestion && linkedQuestion.question) {
        const linkedAnswer = this.application[this.section][linkedQuestion.question];
        return linkedAnswer === this.item.linkedAnswer;
      } else {
        return false;
      }
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
