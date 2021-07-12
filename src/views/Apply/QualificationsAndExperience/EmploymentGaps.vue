<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Gaps in employment
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <p class="govuk-body-l">
          Add dates and details of any gaps in employment you may have
        </p>
        
        <RepeatableFields
          v-model="formData.employmentGaps"
          required
          :component="isLegal ? repeatableFields.EmploymentGaps : repeatableFields.NonLegalEmploymentGaps"
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--employment-gaps--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields';
import EmploymentGaps from '@/components/RepeatableFields/EmploymentGaps';
import NonLegalEmploymentGaps from '@/components/RepeatableFields/NonLegalEmploymentGaps';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RepeatableFields,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults =  {
      employmentGaps: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'employmentGaps',
      formData: formData,
      repeatableFields: {
        NonLegalEmploymentGaps,
        EmploymentGaps,
      },
    };
  },
};
</script>
