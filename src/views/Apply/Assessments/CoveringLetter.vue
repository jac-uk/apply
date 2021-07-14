<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-0">
          Covering Letter
        </h1>

        <span class="govuk-caption-xl govuk-!-margin-bottom-9">
          Please upload your covering letter
        </span>

        <ErrorSummary :errors="errors" />

        <FileUpload
          id="covering-letter-upload"
          ref="covering-letter"
          v-model="formData.uploadedCoveringLetter"
          name="covering-letter"
          :path="uploadPath"
          label="Upload Covering letter"
          required
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--covering-letter--save-and-continue"
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

export default {
  components: {
    ErrorSummary,
    BackLink,
    FileUpload,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      uploadedCoveringLetter: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'coveringLetter',
      formData: formData,
    };
  },
};
</script>
