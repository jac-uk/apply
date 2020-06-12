<template>
  <div>
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-intro' }"
    >
      Back
    </RouterLink>
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
      <h1 class="govuk-fieldset__heading govuk-!-margin-bottom-4">
        Personal information (TBC)
      </h1>
    </legend>

    <RadioGroup
      id="has-been-magistrate"
      v-model="title"
      label="Title"
      hint=""
    >
      <RadioItem
        value="Mr"
        label="Mr"
      />
      <RadioItem
        value="Mrs"
        label="Mrs"
      />
      <RadioItem
        value="Miss"
        label="Miss"
      />
      <RadioItem
        value="Ms"
        label="Ms"
      />
      <RadioItem
        value="Other"
        label="Other"
      >
        <TextField
          label="Title"
          hint=""
        />
      </RadioItem>
    </RadioGroup>
    <TextField
      label="Full name"
      hint=""
    />
    <TextField
      label="Other names (optional)"
      hint=""
    />
    <TextField
      label="Suffix (optional)"
      hint=""
    />
    <RadioGroup
      id="gender"
      v-model="gender"
      label="Gender"
      hint=""
    >
      <RadioItem 
        label="Female"
        value="female"
      />
      <RadioItem 
        label="Male"
        value="male"
      />
      <RadioItem 
        label="Gender neutral"
        value="gender-neutral"
      />
      <RadioItem 
        label="Other"
        value="other"
      >
        <TextField 
          label="Gender"
        />
      </RadioItem>
      or
      <RadioItem 
        label="Prefer not to say"
        value="preferNotToSay"
      />
    </RadioGroup>
    <DateInput 
      label="Date of Birth"
      hint="for example, 27 3 1964"
    />
    <TextField 
      label="Place of Birth"
    />
    <TextField 
      label="Citizenship"
      hint="A Criminal Records Office ACRO checks are required for UK nationals and other citizenships."
    />
    <label
      class="govuk-label govuk-label--m"
      for="cf-address"
    >Home address</label>
    <TextField 
      hint="Address line 1"
    />
    <TextField 
      hint="Address line 2 (optional)"
    />
    <TextField 
      hint="Town or city"
    />
    <TextField 
      hint="County"
    />
    <TextField 
      hint="Postcode"
    />
    <RadioGroup
      label="Have you lived at this address for more than 5 years?"
      hint="If you've lived anywhere else in the UK within the past 5 years you need to answer no and enter details."
    >
      <RadioItem 
        label="Yes"
        :value="true"
      />
      <RadioItem 
        label="No"
        :value="false"
      >
      <!-- @NOTE address input must be inserted here see prototype page ('https://jac-apply-prototype.herokuapp.com/current/submit-consent-form/personal-information) -->
        <!-- @todo Address Input repeatable component? -->
      </RadioItem>
    </RadioGroup>
    <TextField 
      label="National insurance number"
      hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
    />
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
