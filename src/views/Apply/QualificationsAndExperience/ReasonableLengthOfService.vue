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
          v-model="application.canGiveReasonableLOS"
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
              v-model="application.cantGiveReasonableLOSDetails"
              label="You can set out here why you think you should still be considered for this role.
              The JAC will consider it when assessing your eligibility for this role."
            />
          </RadioItem>
        </RadioGroup>

        <button class="govuk-button info-btn--reasonable-length-of-service--continue">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults =  {
      canGiveReasonableLOS: null,
      cantGiveReasonableLOSDetails: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
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
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.reasonableLengthOfService = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },

};
</script>
