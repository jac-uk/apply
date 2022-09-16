<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Reasonable length of service
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <p class="govuk-body-l">
          Can you work for at least {{ lengthOfService }} years before reaching the retirement age of {{ retirementAge }}?
        </p>

        <RadioGroup
          id="can-give-reasonable-los"
          v-model="formData.canGiveReasonableLOS"
          required
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          >
            <TextareaInput
              id="cant-give-reasonable-los-details"
              v-model="formData.cantGiveReasonableLOSDetails"
              label="You can set out here why you think you should still be considered for this role.
              The JAC will consider it when assessing your eligibility for this role."
            />
          </RadioItem>
        </RadioGroup>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--reasonable-length-of-service--continue"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  name: '',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults =  {
      canGiveReasonableLOS: null,
      cantGiveReasonableLOSDetails: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'reasonableLengthOfService',
      formData: formData,
    };
  },
  computed: {
    lengthOfService() {
      if (this.vacancy.reasonableLengthService === 'other') {
        return this.vacancy.otherLOS;
      } else {
        return this.vacancy.reasonableLengthService;
      }
    },
    retirementAge() {
      if (this.vacancy.retirementAge === 'other') {
        return this.vacancy.otherRetirement;
      } else {
        return this.vacancy.retirementAge;
      }
    },
  },
};
</script>
