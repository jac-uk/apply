<template>
  <div class="govuk-!-margin-top-6">
    <DateInput
      :id="`offence_date_${index}`"
      v-model="row.date"
      label="Date of offence"
      required
    />
    <div class="govuk-grid-row govuk-!-margin-left-0">
      <RadioGroup
        :id="`investigation_ongoing_${name}_${index}`"
        v-model="row.investigations"
        required
        label="Is the investigation ongoing?"
        @input="handleRadioGroupChange"
      >
        <RadioItem
          :value="true"
          label="Yes"
        >
          <DateInput
            :id="`investigation_conclusion_date_${index}`"
            v-model="row.investigationConclusionDate"
            label="When is it likely to be concluded?"
            required
          />
        </RadioItem>
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>
    </div>
    <TextareaInput
      :id="`offence_details_${index}`"
      v-model="row.details"
      class="govuk-!-margin-top-6"
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
import RadioGroup from '@/components/Form/RadioGroup';
import TextareaInput from '@/components/Form/TextareaInput';
import RadioItem from '@/components/Form/RadioItem';

export default {
  name: 'ProfessionalMisconductFieldDetails',
  components: {
    DateInput,
    TextareaInput,
    RadioGroup,
    RadioItem,
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
      default: 'investigations',
    },
  },
  methods: {
    handleRadioGroupChange(value) {
      if (!value) {
        this.row.investigationConclusionDate = null;
      }
    },
  },
};
</script>
