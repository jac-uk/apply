<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of suitability
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
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

        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

        <p class="govuk-body-l">
          Below is a blank template for the statement of suitability.
          <br>
          Please save this document, fill it in, re-upload it to this page, check the content and submit.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download Statement Of Suitability template
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

        <input
          id="upload"
          ref="file"
          type="file"
          accept=".docx"
          class="govuk-file-upload govuk-!-margin-bottom-2"
          required
          @change="handleFileUpload"
        >
        <br>

        <TextareaInput
          id="suitability-statement-text"
          v-model="parsedContent"
          label="Suitability content"
          :disabled="!parsedContent.length"
        />

        <button
          :disabled="!canSave(formId) && !parsedContent.length"
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
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';
import DownloadLink from '@/components/DownloadLink';
import { logEvent } from '@/helpers/logEvent';
import CustomHTML from '@/components/CustomHTML';
import mammoth from 'mammoth';

export default {
  name: 'StatementOfSuitability',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
    DownloadLink,
    CustomHTML,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      selectionCriteriaAnswers: [],
      uploadedSuitabilityStatement: null,
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
      formId: 'statementOfSuitability',
      formData: formData,
      parsedContent: '',
    };
  },
  computed: {
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
      const fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
      if (fileName) {
        outcome = `${outcome  }.${  fileName.split('.').pop()}`;
      }
      return outcome;
    },
  },
  methods: {
    logEventAfterSave() {
      logEvent('info', 'Statement of suitability uploaded', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onerror = (error) => {
          // Handle file read error
          console.error('Error occurred while reading the file:', error);
        };

        reader.onload = () => {
          try {
            this.parseDocument(reader.result);
          } catch (error) {
            // Handle document parsing error
            console.error('Error occurred while parsing the document:', error);
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error('No file selected.');
      }
    }
    ,
    parseDocument(fileData) {
      const options = {
        arrayBuffer: fileData,
      };

      mammoth.extractRawText(options)
        .then((result) => {
          this.parsedContent = result.value;
        })
        .catch((error) => {
          console.error('Error occurred while parsing the document:', error);
        });
    },
  },
};
</script>
