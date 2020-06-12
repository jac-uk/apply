<template>
  <div>
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-professional-details' }"
    >
      Back
    </RouterLink>

    <div class="govuk-!-margin-top-8">
      <h1 class="govuk-heading-xl">
        HMRC
      </h1>
      <span
        id="vat-hint"
        class="govuk-hint govuk-!-margin-bottom-2"
      />
    </div>
    <RadioGroup
      id="has-Vat-Reg-Num"
      v-model="hasVATNum"
      label="Do you have a VAT registration number?"
      hint="All partnership, company and sole trader VAT registered number(s) that you have a personal responsibility for, whether they relate to the practice of law or not, will be required."
    >
      <RadioItem
        :value="true"
        label="Yes"
      >
        <TextField
          id="vatRegNumber"
          type="number"
          label="VAT registration number"
          hint="For example, ‘123456789’."
          required
        />
        <button
          class="govuk-button govuk-button--secondary govuk-!-margin-top-7"
          data-module="govuk-button"
          formaction="#"
        >
          Add another VAT registration number
        </button>
      </RadioItem>
      <RadioItem
        :value="false"
        label="No"
      />
      <RadioItem
        :value="null"
        label="Not Applicable"
      />
    </RadioGroup>
    <button
      class="govuk-button govuk-!-margin-top-4"
      data-module="govuk-button"
    >
      Save and continue
    </button>
    <div />
  </div>
</template>
<script>
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextField from '@/components/Form/TextField';

export default {
  components: {
    RadioItem,
    RadioGroup,
    TextField,
  },
  data(){
    return {
      hasVATNum: '',
    };
  },
};
    
</script>
