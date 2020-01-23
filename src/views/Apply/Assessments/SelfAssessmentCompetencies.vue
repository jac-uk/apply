<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Self-assessment competencies
        </h1>

        <p class="govuk-body-l">
          Download the template on this page to complete your self-assessment
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

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload finished self assessment
          </h2>
          <input
            id="self-assessment-file"
            class="govuk-file-upload"
            type="file"
            @change="fileSelected"
          >
        </div>

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
import BackLink from '@/components/BackLink';
import DownloadLink from '@/components/DownloadLink';
import uploadMixin from '@/mixins/uploadMixin';

export default {
  components: {
    BackLink,
    DownloadLink,
  },
  mixins: [uploadMixin],
  data(){
    const defaults = {};
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
      files: {},
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
    vacancy() {
      return this.$store.state.vacancy.record;
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
      // loop through this.files and upload them
      const files = Object.values(this.files);
      for (const file of files) {
        await this.upload(file);
      }

      this.application.progress.selfAssessmentCompetencies = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
