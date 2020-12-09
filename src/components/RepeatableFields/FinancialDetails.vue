<template>
  <div class="govuk-!-margin-top-6">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-three-quarters">
        <FinancialYear
          :id="`financialMatter_financialYear_${index}`"
          v-model="row.financialYear"
          :label="label1"
          :hint="hint1"
          required
        />

        <DateInput
          :id="`financialMatter_date_${index}`"
          v-model="row.date"
          :label="label2"
          required
        />
      </div>
    </div>
    <div>
      <div class="govuk-grid-row govuk-!-margin-top-6">
        <div class="govuk-grid-column-three-quarters">
          <TextareaInput
            :id="`financialMatter_details_${index}`"
            v-model="row.details"
            label="Details"
            :hint="hint2"
            rows="5"
            required
          />
        </div>
        <div class="govuk-grid-column-one-quarters">
          <InfoIcon
            :url="url"
          />
        </div>
      </div>
    </div>
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';
import FinancialYear from './FinancialYear';
import InfoIcon from '@/components/ModalViews/InfoIcon';

export default {
  name: 'FinancialDetails',
  components: {
    InfoIcon,
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
  },
};
</script>
