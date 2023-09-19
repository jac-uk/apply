<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Confirm your {{ $filters.lookup(statementType) }}
        </h1>

        <ErrorSummary :errors="errors" />

        <TextareaInput
          id="suitability-statement-text"
          v-model="formData.uploadedSelfAssessmentContent"
          todo:
          change
          var
          name
          label="Statement content"
          :word-limit="wordLimit"
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--statement-of-suitability--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ApplyMixIn from '../ApplyMixIn';
import { logEvent } from '@/helpers/logEvent';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  name: 'DataConfirmation',
  components: {
    ErrorSummary,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data() {
    const defaults = {
      uploadedSelfAssessmentContent: {},
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'selfAssessmentCompetencies',
      formData: formData,
      statementType: 'statement-of-suitability-with-competencies',
    };
  },
  computed: {
    wordLimit() {
      return this.vacancy.selfAssessmentWordLimit;
    },
  },
  methods: {
    logEventAfterSave() {
      logEvent('info', 'Statement of suitability confirmed', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
  },
};
</script>
