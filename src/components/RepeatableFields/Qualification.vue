<template>
  <div>
    <RadioGroup
      :id="qualificationType"
      v-model="row.type"
      label="What are you qualified as?"
      hint="Choose 1 option."
    >
      <RadioItem
        value="advocate-scotland"
        label="Advocate - Scotland"
      />
      <RadioItem
        value="barrister"
        label="Barrister"
      />
      <RadioItem
        value="CILEx"
        label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
      />
      <RadioItem
        value="solicitor"
        label="Solicitor"
      />
    </RadioGroup>

    <RadioGroup
      :id="qualificationLocation"
      v-model="row.location"
      label="Where are you qualified?"
      hint="Choose 1 option."
    >
      <RadioItem
        value="england-wales"
        label="England and Wales"
      />
      <RadioItem
        value="northern-ireland"
        label="Northern Ireland"
      />
      <RadioItem
        value="scotland"
        label="Scotland"
      />
    </RadioGroup>

    <div
      v-if="row.type === 'barrister'"
    >
      <DateInput
        :id="calledToTheBarDate"
        v-model="row.calledToTheBarDate"
        label="When were you called to the Bar?"
        type="month"
        required
      />

      <RadioGroup
        :id="qualificationNotComplete"
        v-model="row.qualificationNotComplete"
        label="Have you completed pupillage?"
        required
      >
        <RadioItem
          :value="false"
          label="Yes"
        />
        <RadioItem
          :value="true"
          label="No"
        />
      </RadioGroup>

      <DateInput
        v-if="row.qualificationNotComplete === false"
        :id="qualificationDate"
        v-model="row.date"
        label="When did you complete pupillage?"
        type="month"
        required
      />
      <div v-else-if="row.qualificationNotComplete === true">
        <RadioGroup
          :id="qualificationNotCompleteReason"
          v-model="row.qualificationNotCompleteReason"
          label="Why you were exempt from pupillage (we may ask for a copy of your exemption or practicing certificate)?"
          required
        >
          <RadioItem
            value="Qualified solicitor, qualified lawyer from another jurisdiction, or a legal academic transferred to the Bar"
            label="Qualified solicitor, qualified lawyer from another jurisdiction, or a legal academic transferred to the Bar"
          />
          <RadioItem
            value="Called to the Bar prior to 1 January 2002"
            label="Called to the Bar prior to 1 January 2002"
          />
          <RadioItem
            value="Other"
            label="Other - Please detail why you were exempt from undertaking pupillage by the Bar Standards Board"
          />
        </RadioGroup>

        <TextareaInput
          v-if="row.qualificationNotCompleteReason === 'Other'"
          :id="details"
          v-model="row.details"
          hint="Please provide details how you satisfy the ‘judicial-appointment eligibility condition’, set out in section 50 of the Tribunals, Courts and Enforcement Act 2007"
          required
        />
      </div>
    </div>
    
    <div v-else>
      <DateInput
        :id="qualificationDate"
        v-model="row.date"
        label="When did you qualify?"
        type="month"
      />
    </div>

    <slot name="removeButton" />
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'Qualification',
  components: {
    RadioGroup,
    RadioItem,
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
  computed: {
    qualificationType() {
      return `qualification_type_${this.index}`;
    },
    qualificationLocation() {
      return `qualification_location_${this.index}`;
    },
    calledToTheBarDate() {
      return `qualification_calledToTheBar_date_${this.index}`;
    },
    qualificationDate() {
      return `qualification_date_${this.index}`;
    },
    details() {
      return `qualification_details_${this.index}`;
    },
    qualificationNotComplete() {
      return `qualification_qualificationNotComplete_${this.index}`;
    },
    qualificationNotCompleteReason() {
      return `qualification_not_complete_reason_${this.index}`;
    },
  },
};
</script>
