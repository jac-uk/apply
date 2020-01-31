<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of suitability
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in application.selectionCriteriaAnswers"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <p class="govuk-body">
              {{ item.text }}
            </p>

            <RadioGroup
              :id="`meet_requirements_${index}`"
              v-model="item.answer"
              label="Do you meet this requirement?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextareaInput
                  :id="`meet_requirements_details${index}`"
                  v-model="item.answerDetails"
                  label="In 250 words, tell us how."
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
        </div>

        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

        <p class="govuk-body-l">
          Below is a blank template for the statement of suitability. Please save this document, fill it in,
          then re-upload it to this page.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download Statement Of Suitability template
          </h2>
          <DownloadLink
            :file-name="vacancy.uploadedCandidateAssessmentFormTemplate"
            :exercise-id="vacancy.id"
            :title="downloadNameGenerator"
          />
        </div>

        <FileUpload 
          id="suitability-statement-file"
          ref="suitability-statement"
          v-model="application.uploadedSuitabilityStatement"
          name="suitability-statement"
          :path="uploadPath"
          label="Upload Statement of Suitability"
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
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import FileUpload from '@/components/Form/FileUpload';
import BackLink from '@/components/BackLink';
import DownloadLink from '@/components/DownloadLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    FileUpload,
    BackLink,
    DownloadLink,
  },
  extends: Form,
  data(){
    const defaults = {
      selectionCriteriaAnswers: [],
      uploadedSuitabilityStatement: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    if (application.selectionCriteriaAnswers.length === 0) {
      const vacancy = this.$store.state.vacancy.record;
      if (vacancy && vacancy.aSCApply && vacancy.selectionCriteria) {
        for (let i = 0, len = vacancy.selectionCriteria.length; i < len; ++i) {
          application.selectionCriteriaAnswers.push({
            title: vacancy.selectionCriteria[i].title,
            text: vacancy.selectionCriteria[i].text,
            answer: null,
            answerDetails: null,
          });
        }
      }
    }
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
      if (this.vacancy.assessmentOptions == 'statement-of-suitability-with-competencies') {
        outcome = 'statement-of-suitability-with-competencies';
      } else if (
        this.vacancy.assessmentOptions == 'statement-of-suitability-with-skills-and-abilities' ||
        this.vacancy.assessmentOptions == 'statement-of-suitability-with-skills-and-abilities-and-cv'
      ) {
        outcome = 'statement-of-suitability-with-skills-and-abilities';
      }
      let fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
      if (fileName) {
        outcome = outcome + '.' + fileName.split('.').pop();
      }
      return outcome;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        const isUploaded = await this.$refs['suitability-statement'].upload();
        if (!isUploaded) {
          return false;
        }
        this.application.progress.statementOfSuitability = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
