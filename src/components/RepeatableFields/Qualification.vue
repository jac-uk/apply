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
      v-if="row.type==='barrister'"
    >
      <DateInput
        :id="qualificationDate"
        :v-model="row.date"
        :value="row.date ? row.date : null"
        label="When did you complete pupillage?"
        type="month"
      />
      <CheckboxGroup
        :id="qualificationDate"
        v-model="row.completedPupillage"
      >
        <CheckboxItem
          :value="false"
          label="I did not complete pupillage"
        />
        <!-- @FIXME@ Date Input isnt cleared when completedPupillage is false -->
      </CheckboxGroup>
      <TextareaInput
        v-if="row.completedPupillage && row.completedPupillage[0] === false"
        :id="qualificationDate"
        v-model="row.details"
        label="Please provide some details"
        rows="2"
      />
    </div>
    <DateInput
      v-else
      :id="qualificationDate"
      v-model="row.date"
      label="When did you qualify?"
      type="month"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import RadioItem from '@/components/Form/RadioItem';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'Qualification',
  components: {
    RadioGroup,
    CheckboxGroup,
    CheckboxItem,
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
    qualificationDate() {
      return `qualification_date_${this.index}`;
    },
  },
};
</script>
