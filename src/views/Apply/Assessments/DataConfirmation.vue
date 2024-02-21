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
          v-if="formData.progress.selfAssessmentCompetencies"
          class="govuk-link float-right"
          :to="{ name: 'self-assessment-competencies' }"
        >
          Re-upload document
        </RouterLink>

        <component
          :is="components.TextareaInput"
          v-for="(section, i) in selfAssessmentSections"
          id="suitability-statement-text"
          :key="i"
          :ref="`StatementInputRef${i}`"
          v-model="formData.uploadedSelfAssessmentContent[i]"
          :label="`${i + 1}. ${section.question}`"
          :word-limit="section.wordLimit"
          style="white-space: pre-line;"
        />

        <button
          :disabled="!canSave(formId) || errors.length > 0"
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
import { shallowRef } from 'vue';

export default {
  //I tried to leave this component open for refactor so
  //it can be used other download/upload/confirm pattern
  //input in the future - this philosophy quickly went out of the window
  name: 'DataConfirmation',
  components: {
    ErrorSummary,
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
      components: shallowRef({
        TextareaInput,
      }),
    };
  },
  computed: {
    selfAssessmentSections() {
      return this.vacancy.selfAssessmentWordLimits || [];
    },
  },
  created() {
    this.formData.uploadedSelfAssessmentContent = this.processArrayWithLimit(this.formData.uploadedSelfAssessmentContent, this.selfAssessmentSections.length);
  },
  methods: {
    processArrayWithLimit(stringsArray, limit) {
      // Filter out items that are empty strings, single spaces, "-", or a single bullet point
      const filteredArray = stringsArray.filter(item =>
        item !== ' ' && item !== '' && item.trim() !== '-' && item.trim() !== '•'
      );

      let slicedArray;

      if (Array.isArray(filteredArray)) {
        const LAST_INDEX = limit - 1;

        // Take the first `limit - 1` elements or all elements if smaller than the limit
        slicedArray = filteredArray.slice(0, Math.min(filteredArray.length, LAST_INDEX));

        // Take the remaining items starting from the `limit` position
        const remainingItems = filteredArray.slice(LAST_INDEX);

        // If there are remaining items, join them with a comma and space and add as a single element
        if (remainingItems.length > 0) {
          slicedArray.push(remainingItems.join(', '));
        }
      } else {
        slicedArray = [filteredArray];
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
