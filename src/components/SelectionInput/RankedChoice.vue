<template>
  <!-- <table class="govuk-table"> -->
  <table>
    <tbody class="govuk-table__body">
      <tr 
        v-for="(answer, i) in answers"
        :key="i"
        class="govuk-table__row"
      >
        <th
          class="govuk-table__cell govuk-!-padding-top-0"
        >
          <div class="govuk-checkboxes__item">
            <input
              v-model="selected"
              :name="`${id}-answer-${i}`"
              :value="answer.answer"
              type="checkbox"
              class="govuk-checkboxes__input"
              @change="update"
            >
            <label
              class="govuk-label govuk-checkboxes__label"
              :for="`${id}-answer-${i}`"
            >
              {{ answer.answer }}  
            </label>
          </div>
        </th>
        <td class="govuk-table__cell">
          <label
            class="govuk-label govuk-checkboxes__label"
          >
            {{ selected.some(item => item === answer.answer) ? selected.findIndex(item => item === answer.answer) + 1 : '' }} 
          </label>
        </td>
      </tr>
    </tbody>
  </table>   
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
