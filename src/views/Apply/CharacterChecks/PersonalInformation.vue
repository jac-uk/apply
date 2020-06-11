<template>
  <div>
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-intro' }"
    >
      Back
    </RouterLink>

    <div class="govuk-!-margin-top-8">
      <h1 class="govuk-heading-xl">
        Personal information
      </h1>
    </div>
    <RadioGroup>
      <RadioItem />
    </RadioGroup>
    <DateInput />
    <TextField />
  </div>
</template>
<script>
import { RadioItem } from '@/components/Form/RadioItem';
import { RadioGroup } from '@/components/Form/RadioGroup';
import { DateInput } from '@/components/Form/DateInput';
import { TextField } from '@/components/Form/TextField';

export default {
  components: {
    RadioItem,
    RadioGroup,
    DateInput,
    TextField,
  },
};
    
</script>
