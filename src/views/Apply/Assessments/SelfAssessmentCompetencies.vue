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
