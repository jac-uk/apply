<template>
  <div>
    <DateInput
      :id="`other_issues_date_${index}`"
      v-model="row.date"
      label="Date of offence"
    />
    <TextField
      :id="`other_issues_title_${index}`"
      v-model="row.title"
      label="Findings or actions"
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
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'InvolvedInProfessionalMisconductDetails',
  components: {
    DateInput,
    TextField,
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
