<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Curriculum vitae (CV)
        </h1>

        <ErrorSummary :errors="errors" />

        <FileUpload
          id="cv-upload"
          ref="cv"
          v-model="formData.uploadedCV"
          name="cv"
          :path="uploadPath"
          label="Upload CV"
          required
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--cv--save-and-continue"
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
import BackLink from '@/components/BackLink';
import FileUpload from '@/components/Form/FileUpload';
import { logEvent } from '@/helpers/logEvent';

export default {
  name: 'CV',
  components: {
    ErrorSummary,
    BackLink,
    FileUpload,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      uploadedCV: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'cv',
      formData: formData,
    };
  },
  methods: {
    logEventAfterSave() {
      logEvent('info', 'CV letter uploaded', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
  },
};
</script>
