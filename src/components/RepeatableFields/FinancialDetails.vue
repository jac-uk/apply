<template>
  <div class="govuk-!-margin-top-6">
    <div class="govuk-grid-row">
      <FinancialYear
        :id="`financialMatter_financialYear_${name}_${index}`"
        v-model="row.financialYear"
        :label="label1"
        :hint="hint1"
        required
      />
      <DateInput
        :id="`financialMatter_date_${name}_${index}`"
        v-model="row.date"
        :label="label2"
        required
      />
    </div>
    <div>
      <div class="govuk-grid-row govuk-!-margin-top-6">
        <TextareaInput
          :id="`financialMatter_details_${name}_${index}`"
          v-model="row.details"
          label="Details"
          :hint="hint2"
          rows="5"
          required
        />
      </div>
    </div>
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';
import FinancialYear from './CharacterInformation/FinancialYear';

export default {
  name: 'FinancialDetails',
  components: {
    FinancialYear,
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
    label1: {
      required: true,
      type: String,
      default: '',
    },
    label2: {
      required: true,
      type: String,
      default: '',
    },
    hint1: {
      required: false,
      type: String,
      default: '',
    },
    hint2: {
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
