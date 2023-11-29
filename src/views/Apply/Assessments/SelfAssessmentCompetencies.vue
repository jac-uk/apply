<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
    >
      <!-- @submit.prevent="triggerExtraction" -->
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Self assessment competencies
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="formData && vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in vacancy.selectionCriteria"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <CustomHTML
              :value="item.text"
              class="govuk-body"
            />

            <RadioGroup
              :id="`meet_requirements_${index}`"
              v-model="formData.selectionCriteriaAnswers[index].answer"
              label="Do you meet this requirement?"
              :required="vacancy.id === '8GjaA3U51onRf2p1Z2bT'"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextareaInput
                  :id="`meet_requirements_details${index}`"
                  v-model="formData.selectionCriteriaAnswers[index].answerDetails"
                  :word-limit="item.wordLimit || 250"
                  :hint="`in ${item.wordLimit || 250} words tell us how.`"
                  :label="item.title"
                  label-hidden
                  required
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
          Before completing your self-assessment, please refer to
          <a
            class="govuk-link"
            href="https://judicialappointments.gov.uk/completing-your-self-assessment/"
            target="_blank"
          >
            the helpful guidance on the JAC website
          </a>.
        </p>

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
              v-for="(file, index) in vacancy.downloads.candidateAssessementForms"
              :key="file.file"
            >
              <DownloadLink
                :ref="`download-link-${index}`"
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
        <ActionButton
          :disabled="!canSave(formId)"
          class="info-btn--statement-of-suitability--save-and-continue"
          button-type="primary"
          :action="triggerExtraction"
        >
          Save and continue
        </ActionButton>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import BackLink from '@/components/BackLink.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import DownloadLink from '@/components/DownloadLink.vue';
import FileUpload from '@/components/Form/FileUpload.vue';
import { logEvent } from '@/helpers/logEvent';
import CustomHTML from '@/components/CustomHTML.vue';
import { functions } from '@/firebase';
import ActionButton from '@/components/Form/ActionButton';
import { ASSESSMENT_METHOD } from '@/helpers/constants';

export default {
  name: 'SelfAssessmentCompetencies',
  components: {
    ErrorSummary,
    BackLink,
    DownloadLink,
    RadioItem,
    RadioGroup,
    TextareaInput,
    FileUpload,
    CustomHTML,
    ActionButton,
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
          formData.selectionCriteriaAnswers[i] = {
            title: vacancy.selectionCriteria[i].title,
            text: vacancy.selectionCriteria[i].text,
            answer: null,
            answerDetails: null,
          };
        }
      }
    }
    return {
      formId: 'selfAssessmentCompetencies',
      formData: formData,
    };
  },
  computed: {
    templatePath() {
      return `exercise/${this.vacancy.id}/${this.vacancy.downloads.candidateAssessementForms[0].file}`;
    },
    documentPath() {
      const path = `${this.uploadPath}/${this.formData.uploadedSelfAssessment}`;
      return path.substring(1);
    },
    downloadNameGenerator() {
      let outcome = null;
      if (this.vacancy.assessmentMethods && this.vacancy.assessmentMethods[ASSESSMENT_METHOD.SELF_ASSESSMENT_WITH_COMPETENCIES]) {
        const fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
        if (fileName) {
          outcome = `self-assessment-with-competencies.${  fileName.split('.').pop()}`;
        }
      }
      return outcome;
    },
  },
  methods: {
    async triggerExtraction() {
      try {
        const response = await functions.httpsCallable('extractDocumentContent')({ templatePath: this.templatePath, documentPath: this.documentPath });
        await this.$store.dispatch('application/save', {
          uploadedSelfAssessmentContent: response.data.result,
          uploadedSelfAssessment: this.formData.uploadedSelfAssessment,
        });
        this.$router.push({ name: 'data-confirmation' });
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error occurred during extraction:', error);
        return false; // Return false to indicate an error
      }
    },
    logEventAfterSave() {
      logEvent('info', 'Self-assessment & competencies uploaded', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
  },
};
</script>
