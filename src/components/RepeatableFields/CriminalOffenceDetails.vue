<template>
  <div class="govuk-!-margin-top-6">
    <TextField
      :id="`offence_title_${index}`"
      v-model="row.title"
      :label="label"
    />
    <DateInput
      :id="`offence_date_${index}`"
      v-model="row.date"
      label="Date of offence"
    />
    <TextareaInput
      :id="`offence_details_${index}`"
      v-model="row.details"
      label="Details"
      :hint="hint"
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
  name: 'CriminalOffenceDetails',
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
    label: {
      required: true,
      type: String,
      default: '',
    },
    hint: {
      required: false,
      type: String,
      default: '',
    },
  },
};
</script>
