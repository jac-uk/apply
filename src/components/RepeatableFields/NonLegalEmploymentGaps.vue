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
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'EmploymentGaps',
  components: {
    DateInput,
    TextareaInput,
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
