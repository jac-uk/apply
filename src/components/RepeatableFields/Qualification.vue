<template>
  <div>
    <RadioGroup
      :id="`qualification_type_${index}`"
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
      :id="`qualification_location_${index}`"
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

    <DateInput
      v-if="row.type !== 'barrister'"
      :id="qualificationDate"
      v-model="row.date"
      label="When did you qualify?"
      type="month"
    />

    <div
      v-if="row.type === 'barrister'"
    >
      <DateInput
        v-if="!row.qualificationNotComplete"
        :id="qualificationDate"
        v-model="row.date"
        label="When did you complete pupillage?"
        type="month"
      />   

      <Checkbox
        :id="`qualification_not_complete_${index}`"
        v-model="row.qualificationNotComplete"
        label="I did not complete pupillage"
      />

      <DateInput
        v-if="row.qualificationNotComplete && !row.notCalledToBar"
        :id="`called_to_bar_date_${index}`"
        v-model="row.calledToBardate"
        label="When were you called to the bar?"
        type="month"
      />

      <Checkbox
        v-if="row.qualificationNotComplete"
        :id="`called_to_bar_${index}`"
        v-model="row.notCalledToBar"
        label="I was not called to the bar"
      />

      <TextareaInput
        v-if="row.qualificationNotComplete"
        :id="`qualification_details_${index}`"
        v-model="row.details"
        hint="Please provide some additional information"
      />
    </div>

    <slot name="removeButton" />
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import Checkbox from '@/components/Form/Checkbox';
import RadioItem from '@/components/Form/RadioItem';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'Qualification',
  components: {
    RadioGroup,
    Checkbox,
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
    qualificationDate() {
      return `qualification_date_${this.index}`;
    },
  },
};
</script>
