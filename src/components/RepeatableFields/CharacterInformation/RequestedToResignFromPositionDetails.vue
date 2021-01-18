<template>
  <div class="govuk-!-margin-top-6">
    <DateInput
      :id="`offence_date_$name_${index}`"
      v-model="row.date"
      :label="label"
      required
    />
    <TextareaInput
      :id="`offence_details_$name_${index}`"
      v-model="row.details"
      label="Details"
      :hint="hint"
      rows="5"
      required
    />
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'RequestedToResignFromPositionDetails',
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
    name: {
      required: false,
      type: String,
      default: 'requested-to-resign',
    },
  },
};
</script>
