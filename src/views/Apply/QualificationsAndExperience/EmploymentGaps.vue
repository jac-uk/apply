<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="checkAndSave"
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
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields.vue';
import EmploymentGaps from '@/components/RepeatableFields/EmploymentGaps.vue';
import NonLegalEmploymentGaps from '@/components/RepeatableFields/NonLegalEmploymentGaps.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'EmploymentGaps',
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
  methods: {
    checkAndSave() {
      if (this.formData.employmentGaps.length){
        const hasEnteredData = Object.values(this.formData.employmentGaps[0]).some((val) => {
          if (val instanceof Date) {
            return true;
          } else if (val instanceof Array) {
            return val.length;
          } else {
            return !!val;
          }
        });
        if (!hasEnteredData) {
          this.formData.employmentGaps = [];
        }
      } 
      this.save();
    },
  },
};
</script>
