<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Self assessment competencies
        </h1>

        <ErrorSummary :errors="errors" />

        <p class="govuk-body-l">
          Download the template on this page to complete your self assessment
          competency statements. It details the specific skills and experience
          you'll need to demonstrate for this role.
        </p>

        <p class="govuk-body-l">
          Come back to this page to upload your finished statements.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download self assessment template
          </h2>
          <DownloadLink
            :file-name="vacancy.uploadedCandidateAssessmentFormTemplate"
            :exercise-id="vacancy.id"
            :title="downloadNameGenerator"
          />
        </div>

        <FileUpload 
          id="self-assessment-upload"
          ref="self-assessment"
          v-model="application.uploadedSelfAssessment"
          name="self-assessment"
          :path="uploadPath"
          label="Upload finished self assessment"
          required
        />

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
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
import DownloadLink from '@/components/DownloadLink';
import FileUpload from '@/components/Form/FileUpload';

export default {
  components: {
    ErrorSummary,
    BackLink,
    DownloadLink,
    FileUpload,
  },
  extends: Form,
  data(){
    const defaults = {
      uploadedSelfAssessment: null,
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
    downloadNameGenerator() {
      let outcome = null;
      if (
        this.vacancy.assessmentOptions == 'self-assessment-with-competencies' ||
        this.vacancy.assessmentOptions == 'self-assessment-with-competencies-and-cv'
      ) {
        let fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
        if(fileName) {
          outcome = 'self-assessment-with-competencies.' + fileName.split('.').pop();
        }
      }
      return outcome;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        const isUploaded = await this.$refs['self-assessment'].upload();
        if (!isUploaded) {
          return false;
        }
        this.application.progress.selfAssessmentCompetencies = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
