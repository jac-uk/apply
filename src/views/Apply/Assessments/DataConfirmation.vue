<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          {{ $filters.lookup(statementType) }}
        </h1>

        <p class="govuk-body-l">
          Please review your submission below, addressing any word limit issues identified.
        </p>

        <ErrorSummary :errors="errors" />

        <RouterLink
          v-if="formData.progress[statementType]"
          class="govuk-link float-right"
          :to="{ name: 'self-assessment-competencies' }"
        >
          Re-upload document
        </RouterLink>

        <TextareaInput
          v-for="(wordLimit, i) in wordLimits"
          id="suitability-statement-text"
          :key="i"
          :ref="`StatementInputRef${i}`"
          v-model="formData.uploadedSelfAssessmentContent[i]"
          :label="`Statement content section ${i + 1}`"
          :word-limit="wordLimit"
        />

        <button
          :disabled="!canSave(formId) || (errors.length > 0)"
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
  //I tried to leave this component open for refactor so
  //it can be used other download/upload/confirm pattern
  //input in the future - this philosophy quickly went out of the window
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
