<template>
  <div>
    <DateInput
      :id="`endorsement_offence_date_${index}`"
      v-model="row.date"
      label="Date of offence"
    />
    <TextField
      :id="`endorsement_offence_title_${index}`"
      v-model="row.title"
      label="Endorsements and/or penalty points"
    />
    <TextareaInput
      :id="`endorsement_offence_details_${index}`"
      v-model="row.details"
      label="Details"
      rows="5"
    />
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput.vue';
import TextField from '@/components/Form/TextField.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'EndorsementsOrMotoringFixedPenaltiesDetails',
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
