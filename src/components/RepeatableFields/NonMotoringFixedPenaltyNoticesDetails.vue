<template>
  <div>
    <DateInput
      :id="`notice_date_${index}`"
      v-model="row.date"
      label="Date of offence"
    />
    <TextField
      :id="`notice_title_${index}`"
      v-model="row.title"
      label="Sentence, penalty or fine"
    />
    <TextareaInput
      :id="`notice_details_${index}`"
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
  name: 'NonMotoringFixedPenaltyNoticesDetails',
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
