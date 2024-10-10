<template>
  <div class="govuk-!-margin-top-6">
    <div>
      <div class="govuk-grid-row govuk-!-margin-top-6">
        <TextareaInput
          :id="`financialMatter_details_${name}_${index}`"
          v-model="row.details"
          label="Details"
          :hint="hint"
          rows="5"
          required
        />
      </div>
    </div>
    <slot name="removeButton" />
  </div>
</template>

<script>
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'FinancialDetails',
  components: {
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
    hint: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'financial-details',
    },
  },
};
</script>
