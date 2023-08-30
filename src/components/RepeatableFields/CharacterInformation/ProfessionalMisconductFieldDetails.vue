<template>
  <div class="govuk-!-margin-top-6">
    <DateMonthYearInput
      :id="`offence_date_${index}`"
      v-model="row.date"
      label="Date"
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
import DateMonthYearInput from '@/components/Form/DateMonthYearInput.vue';
import DateInput from '@/components/Form/DateInput.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import RadioItem from '@/components/Form/RadioItem.vue';

export default {
  name: 'ProfessionalMisconductFieldDetails',
  components: {
    DateMonthYearInput,
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
