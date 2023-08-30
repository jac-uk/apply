<template>
  <div>
    <h2 class="govuk-heading-m">
      Add details of late tax returns or fines, including dates.
    </h2>
    <DateInput
      :id="`endorsement_offence_date_${index}`"
      v-model="row.date"
      label="Date of penalty"
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
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'LateTaxReturnOrFinedDetails',
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
