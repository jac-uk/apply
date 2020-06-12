<template>
  <div>
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-personal-information' }"
    >
      Back
    </RouterLink>
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
      <h1 class="govuk-fieldset__heading govuk-!-margin-bottom-4">
        Professional details (TBC)
      </h1>
    </legend>
    <div class="govuk-inset-text govuk-!-margin-top-0">
      You stated on your application that you had been a {{ 'job.title' }} since {{ 'job.startDate' }} (TBC).
    </div>
    <TextField
      id="barMembershipNum"
      type="number"
      label="What is your bar membership number? (TBC)"
      hint=""
      required
    />
    <RadioGroup
      id="has-been-magistrate"
      v-model="hasBeenMagistrate"
      label="Have you been a magistrate? (TBC)"
      hint=""
    >
      <RadioItem
        :value="true"
        label="Yes"
      >
        <div class="govuk-form-group">
          <DateInput
            label="From date (TBC)"
            hint="For example, 12 11 2007 (TBC)"
          />
          <DateInput
            label="Until date (TBC)"
            hint="For example, 11 6 2020. Leave blank if this is your present role (TBC)."
          />
          <TextField
            label="Location (TBC)"
          />
        </div>
      </RadioItem>
      <RadioItem
        :value="false"
        label="No"
      />
    </RadioGroup>
  </div>
</template>
<script>
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

export default {
  components: {
    RadioItem,
    RadioGroup,
    TextField,
    DateInput,
  },
  data(){
    return {
      hasBeenMagistrate: '',
    };
  },
};
    
</script>
