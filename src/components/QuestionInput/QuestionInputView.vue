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
      /**
       * TODO: this could be moved to a helper module
       * @returns [ { answer: String, group: String, rank: Number } ]
      */
      const sortedAnswers = [];
      if (this.config.groupAnswers) {
        this.config.answers.forEach(group => {
          group.answers.forEach(answer => {
            switch (this.config.questionType) {
            case 'single-choice':
              if (answer.id === this.data) {
                sortedAnswers.push({ answer: answer.answer, group: group.group });
              }
              break;
            case 'multiple-choice':
              if (this.data.indexOf(answer.id) >= 0) {
                sortedAnswers.push({ answer: answer.answer, group: group.group });
              }
              break;
            case 'ranked-choice':
              if (Object.keys(this.data).indexOf(answer.id) >= 0) {
                sortedAnswers.push({ answer: answer.answer, group: group.group, rank: this.data[answer.id] });
              }
              break;
            }
          });
        });
      } else {
        if (this.config.answerSource) {
          if (!this.answerSources) return sortedAnswers;
          const answerSource = this.answerSources[this.config.answerSource];
          if (!answerSource) return sortedAnswers;
          switch (this.config.questionType) {
          case 'single-choice':
            sortedAnswers.push({ answer: this.$filters.lookup(this.data) });
            break;
          case 'multiple-choice':
            answerSource.forEach(answer => {
              if (this.data.indexOf(answer) >= 0) {
                sortedAnswers.push({ answer: this.$filters.lookup(answer) });
              }
            });
            break;
          case 'ranked-choice':
            answerSource.forEach(answer => {
              if (Object.keys(this.data).indexOf(answer) >= 0) {
                sortedAnswers.push({ answer: this.$filters.lookup(answer), rank: this.data[answer] });
              }
            });
            break;
          }
        } else {
          this.config.answers.forEach(answer => {
            switch (this.config.questionType) {
            case 'single-choice':
              if (answer.id === this.data) {
                sortedAnswers.push({ answer: answer.answer });
              }
              break;
            case 'multiple-choice':
              if (this.data.indexOf(answer.id) >= 0) {
                sortedAnswers.push({ answer: answer.answer });
              }
              break;
            case 'ranked-choice':
              if (Object.keys(this.data).indexOf(answer.id) >= 0) {
                sortedAnswers.push({ answer: answer.answer, rank: this.data[answer.id] });
              }
              break;
            }          
          });
        }
      }
      return this.config.questionType === 'ranked-choice' ? sortedAnswers.sort((a, b) => a.rank - b.rank) : sortedAnswers;
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
