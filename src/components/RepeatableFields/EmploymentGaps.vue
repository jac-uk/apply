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
    if (this.row) {
      hasRowData = Object.values(this.row).some((val) => {
        if (val instanceof Date) {
          return true;
        } else if (val instanceof Array) {
          return val.length;
        } else {
          return !!val;
        }
      });
    }
    return {
      hasEnteredData: hasRowData,
    };
  },
  watch: {
    row: {
      handler: function() {
        if (this.row) {
          this.hasEnteredData = Object.values(this.row).some((val) => {
            if (val instanceof Date) {
              return true;
            } else if (val instanceof Array) {
              return val.length;
            } else {
              return !!val;
            }
          });
        }
      },
      deep: true,
    },
  },
};
</script>
