<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Confirm your {{ $filters.lookup(statementType) }}
        </h1>

        <ErrorSummary :errors="errors" />

        <RouterLink
          v-if="formData.progress.selfAssessmentCompetencies"
          class="govuk-link float-right"
          :to="{ name: 'self-assessment-competencies' }"
        >
          Re-upload document
        </RouterLink>

        <TextareaInput
          v-for="(wordLimit,i) in wordLimits"
          id="suitability-statement-text"
          :key="i"
          ref="statementInputRef"
          v-model="formData.uploadedSelfAssessmentContent[i]"
          :label="`Statement content section ${i + 1}`"
          :word-limit="wordLimit[i]"
        />

        <button
          :disabled="!canSave(formId) || overWordLimit"
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
import ApplyMixIn from '../ApplyMixIn';
import { logEvent } from '@/helpers/logEvent';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  name: 'DataConfirmation',
  components: {
    ErrorSummary,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data() {
    const defaults = {
      uploadedSelfAssessmentContent: {},
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'selfAssessmentCompetencies',
      formData: formData,
      statementType: 'statement-of-suitability-with-competencies',
    };
  },
  computed: {
    wordLimits() {
      return this.vacancy.selfAssessmentWordLimits.map(section => section.wordLimit);
    },
    selfAssessmentSections() {
      return this.wordLimits.length;
    },
    overWordLimit() {
      return this.formData.uploadedSelfAssessmentContent.length > this.wordLimit;
    },
  },
  created() {
    this.formData.uploadedSelfAssessmentContent = this.processArrayWithLimit(this.formData.uploadedSelfAssessmentContent, this.selfAssessmentSections);
  },
  methods: {
    processArrayWithLimit(stringsArray, limit) {
      const LAST_INDEX = limit - 1;

      // Take the first `limit - 1` elements or all elements if smaller than the limit
      const slicedArray = stringsArray.slice(0, Math.min(stringsArray.length, LAST_INDEX));

      // Take the remaining items starting from the `limit` position
      const remainingItems = stringsArray.slice(LAST_INDEX);

      // If there are remaining items, join them with a comma and space and add as a single element
      if (remainingItems.length > 0) {
        slicedArray.push(remainingItems.join(', '));
      }

      return slicedArray;
    },
    logEventAfterSave() {
      logEvent('info', 'Statement of suitability confirmed', {
        applicationId: this.applicationId,
        candidateName: this.application.personalDetails.fullName,
        exerciseRef: this.application.exerciseRef,
      });
    },
  },
};
</script>
