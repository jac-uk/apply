<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <RadioGroup
      :id="`qualification_type_${index}`"
      v-model="row.type"
      label="What are you qualified as?"
      hint="Choose 1 option."
      class="govuk-!-margin-top-4"
      required
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
      :id="`qualification_date_${index}`"
      v-model="row.date"
      label="When did you qualify?"
      type="month"
      required
    />

    <div
      v-if="row.type === 'barrister'"
    >
      <RadioGroup
        :id="`qualification_not_complete_${index}`"
        v-model="row.qualificationNotComplete"
        label="Have you completed pupillage?"
        required
      >
        <!-- These feilds have to be Boolean'd this way due
        to the double negative in the datamodel [qualificationNotComplete] -->
        <RadioItem
          :value="false"
          label="Yes"
        >
          <DateInput
            :id="`qualification_date_${index}`"
            v-model="row.date"
            label="When did you complete pupillage?"
            type="month"
            required
          />
        </RadioItem>

        <RadioItem
          :value="true"
          label="No"
        />
      </RadioGroup>

      <RadioGroup
        v-if="row.qualificationNotComplete"
        :id="`called_to_bar_${index}`"
        v-model="row.notCalledToBar"
        label="Have you been called to the bar?"
        required
      >
        <!-- These feilds have to be Boolean'd this way due
        to the double negative in the datamodel [notCalledToBar] -->
        <RadioItem
          :value="false"
          label="Yes"
        >
          <DateInput
            :id="`called_to_bar_date_${index}`"
            v-model="row.calledToBarDate"
            label="When were you called to the bar?"
            type="month"
            required
          />
        </RadioItem>

        <RadioItem
          :value="true"
          label="No"
        />
      </RadioGroup>

      <TextareaInput
        v-if="row.qualificationNotComplete && row.notCalledToBar === true"
        :id="`qualification_details_${index}`"
        v-model="row.details"
        label="Please provide some additional information"
        required
      />
    </div>

    <slot name="removeButton" />
  </form>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';
import Form from '@/components/Form/Form';

export default {
  name: 'Qualification',
  components: {
    RadioGroup,
    RadioItem,
    DateInput,
    TextareaInput,
  },
  extends: Form,
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
