<template>
  <div>
    <h2 class="govuk-heading-m">
      Add details of any other relevant character issues, including dates.
    </h2>
    <DateInput
      :id="`other_issues_date_${index}`"
      v-model="row.date"
      label="Date"
    />
    <TextareaInput
      :id="`other_issues_details_${index}`"
      v-model="row.details"
      label="Details"
      rows="5"
    />
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'InvolvedInProfessionalMisconductDetails',
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
