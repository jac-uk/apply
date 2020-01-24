<template>
  <div>
    <DateInput
      :id="`start_date_${index}`"
      v-model="row.startDate"
      label="Start date"
      type="month"
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
};
</script>
