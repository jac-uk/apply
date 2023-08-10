<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Confrim your {{ statementType }}
        </h1>

        <ErrorSummary :errors="errors" />

        <TextareaInput
          id="suitability-statement-text"
          v-model="parsedContent"
          label="Suitability content"
          :disabled="!parsedContent.length"
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
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';
import { logEvent } from '@/helpers/logEvent';

export default {
  name: 'StatementOfSuitability',
  components: {
    ErrorSummary,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    return {
      statementType: 'Statement Of Suitability',
    };
  },
  computed: {
  },
  methods: {
    logEventAfterSave() {
      logEvent('info', 'Statement of suitability uploaded', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
  },
};
</script>
