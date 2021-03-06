<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Self assessment competencies
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in formData.selectionCriteriaAnswers"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <!-- eslint-disable -->
            <div 
              class="govuk-body" 
              v-html="item.text"
            />
            <!-- eslint-enable -->

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

          <ul
            v-if="vacancy.downloads"
            class="govuk-list"
          >
            <li
              v-for="file in vacancy.downloads.candidateAssessementForms"
              :key="file.file"
            >
              <DownloadLink
                :file-name="file.file"
                :exercise-id="vacancy.id"
                :title="file.title"
              />
            </li>
          </ul>

          <DownloadLink
            v-else
            :file-name="vacancy.uploadedCandidateAssessmentFormTemplate"
            :exercise-id="vacancy.id"
            :title="downloadNameGenerator"
          />
        </div>

        <FileUpload
          id="self-assessment-upload"
          ref="self-assessment"
          v-model="formData.uploadedSelfAssessment"
          name="self-assessment"
          :path="uploadPath"
          label="Upload finished self assessment"
          required
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--self-assessment-competencies--save-and-continue"
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
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import DownloadLink from '@/components/DownloadLink';
import FileUpload from '@/components/Form/FileUpload';

export default {
  components: {
    ErrorSummary,
    BackLink,
    DownloadLink,
    RadioItem,
    RadioGroup,
    TextareaInput,
    FileUpload,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      uploadedSelfAssessment: null,
      selectionCriteriaAnswers: [],
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    if (formData.selectionCriteriaAnswers.length === 0) {
      const vacancy = this.$store.state.vacancy.record;
      if (vacancy && vacancy.aSCApply && vacancy.selectionCriteria) {
        for (let i = 0, len = vacancy.selectionCriteria.length; i < len; ++i) {
          formData.selectionCriteriaAnswers.push({
            title: vacancy.selectionCriteria[i].title,
            text: vacancy.selectionCriteria[i].text,
            answer: null,
            answerDetails: null,
          });
        }
      }
    }
    return {
      formId: 'selfAssessmentCompetencies',
      formData: formData,
    };
  },
  computed: {
    downloadNameGenerator() {
      let outcome = null;
      if (
        this.vacancy.assessmentOptions == 'self-assessment-with-competencies' ||
        this.vacancy.assessmentOptions == 'self-assessment-with-competencies-and-cv'
      ) {
        const fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
        if (fileName) {
          outcome = `self-assessment-with-competencies.${  fileName.split('.').pop()}`;
        }
      }
      return outcome;
    },
  },
};
</script>
