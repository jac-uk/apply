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
        @change="update"
      >
      <label
        :for="`${id}-answer-${index}`"
        class="govuk-label govuk-checkboxes__label"
      >
        {{ answer.answer }}
      </label>
      <select 
        v-if="selected.indexOf(answer.answer) >= 0"
        v-model="ranking[answer.answer]"
        class="govuk-select"
        @change="update"
      >
        <option
          v-for="score in answers.length"
          :key="score"
          :value="score"
        >
          {{ score }}
        </option>
      </select>      
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
    modelValue: {
      type: Array,
      default: function () { 
        return new Array(); 
      },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selected: [],
      ranking: {},
    };
  },
  mounted() {
    if (this.modelValue) {
      this.selected = this.modelValue;
      for (let i = 0, len = this.modelValue.length; i < len; ++i) {
        this.ranking[this.modelValue[i]] = i + 1;
      }
    }
  },
  methods: {
    update() {
      const rankedSelection = [];
      const cleanedRanking = {};
      for (let i = 0, len = this.selected.length; i < len; ++i) {
        if (!this.ranking[this.selected[i]]) { this.ranking[this.selected[i]] = this.selected.length; }
        rankedSelection.push({ answer: this.selected[i], rank: this.ranking[this.selected[i]] });
        cleanedRanking[this.selected[i]] = this.ranking[this.selected[i]];
      }
      this.ranking = cleanedRanking;
      this.selected = rankedSelection.sort(( item1, item2 ) => {
        if (item1.rank < item2.rank) {
          return -1;
        } else if (item1.rank > item2.rank) {
          return 1;
        } else {
          return 0;
        }
      }).map((item) => {
        return item.answer;
      });
      this.$emit('update:modelValue', this.selected);
    },
  },  
};

</script>
