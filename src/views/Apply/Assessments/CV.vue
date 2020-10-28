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
          v-model="application.uploadedCV"
          name="cv"
          :path="uploadPath"
          label="Upload CV"
          required
        />

        <button
          :disabled="application.status != 'draft'"
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
import BackLink from '@/components/BackLink';
import FileUpload from '@/components/Form/FileUpload';

export default {
  components: {
    ErrorSummary,
    BackLink,
    FileUpload,
  },
  extends: Form,
  data(){
    const defaults = {
      uploadedCV: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    uploadPath() {
      return `/exercise/${this.vacancy.id}/user/${this.userId}`;
    },
  },
  methods: {
    async save() {
      this.validate();

      if (this.isValid()) {
        this.application.progress.cv = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
