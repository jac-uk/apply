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
        @change="update($event, answer.answer)"
      >
        <option
          v-for="score in selected.length"
          :key="score"
          :value="score"
        >
          {{ score }}
        </option>
      </select>      
    </div>
    selected:{{ selected }}
    <br>
    ranking: {{ ranking }}
    <br>
    <!-- selectable: {{ selectable }} -->
    <br>
    <!-- answers: {{ answers }} -->
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
  updated() {
    // console.log(this.ranking);
  },
  methods: {
    update(event, answer) {
      const sortRanking = {};
      // if (this.selected.length) {
      //   // if (this.selected.length < Object.keys(this.ranking).length) {
      if (this.selected.length > 1) {
        this.selected.forEach((selection, i) => {
          sortRanking[selection] = i + 1;
        });
      } else { 
        this.ranking = {
          [`${this.selected[0]}`]: 1,
        };
        // choice swap
        const targetValue = parseInt(event.target.value);
        console.log(targetValue);
        if (targetValue) {
          
          const indexOfDuplicate = Object.values(sortRanking).findIndex((element) => element === targetValue);
          const duplicateItem = Object.keys(sortRanking)[indexOfDuplicate];

          sortRanking[duplicateItem] = sortRanking[answer];
          sortRanking[answer] = targetValue;

          this.ranking = sortRanking;
          const rankedOrder = [];

          for (const [item, rank] of Object.entries(this.ranking)) {
            // console.log(item, rank);
            rankedOrder[parseInt(rank) - 1] = item;
          }

          this.selected = rankedOrder;

          this.$emit('input', this.selected);
        }
      }
    },
    // update() {
    //   const rankedSelection = [];
    //   const cleanedRanking = {};

    //   if (this.selected.length > 1) {
      
    //     this.selected.forEach((selection) => {
      
    //       if (!this.ranking[selection]) { 
    //         this.ranking[selection] = this.selected.length; 
    //       }

    //       rankedSelection.push({ answer: selection, rank: this.ranking[selection] });
    //       cleanedRanking[selection] = this.ranking[selection];
    //     });

    //     this.ranking = cleanedRanking;
    //     this.selected = rankedSelection.sort(( item1, item2 ) => {
    //       if (item1.rank < item2.rank) {
    //         return -1;
    //       } else if (item1.rank > item2.rank) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     }).map((item) => {
    //       return item.answer;
    //     });
    //   }

    //   this.$emit('input', this.selected);
    // },
  },  
};

</script>
