<template>
  <div>
    <DateInput
      :id="`start_date_${index}`"
      v-model="row.startDate"
      label="Start date"
      type="month"
      :required="hasEnteredData"
    />
    <DateInput
      :id="`end_date_${index}`"
      v-model="row.endDate"
      label="End date"
      type="month"
    />
    <TextareaInput
      :id="`details_${index}`"
      v-model="row.details"
      label="Details"
      rows="2"
      :required="hasEnteredData"
    />
    <LawRelatedTasks
      :id="`tasks_${index}`"
      :tasks.sync="row.tasks"
      :other-tasks.sync="row.otherTasks"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import LawRelatedTasks from '@/components/Page/LawRelatedTasks';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'EmploymentGaps',
  components: {
    DateInput,
    TextareaInput,
    LawRelatedTasks,
  },
  props: {
    row: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    let hasRowData;
    Object.keys(this.row).forEach((key) => {
      hasRowData = !!this.row[key];
    });
    if (!hasRowData) {
      hasRowData = !!(this.row.otherTasks || this.row.tasks.length);
    }
    return {
      hasEnteredData: hasRowData,
    };
  },
  watch: {
    row: {
      handler: function() {
        let result;
        Object.keys(this.row).forEach((key) => {
          result = !!this.row[key];
        });
        if (!result) {
          result = !!(this.row.otherTasks || this.row.tasks.length);
        }
        this.hasEnteredData = result;
      },
      deep: true,
    },
  },
};
</script>
