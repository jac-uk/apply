<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Location preferences
        </h1>

        <ErrorSummary
          :errors="errors"
        />

        <SelectionInput
          v-if="vacancy.locationQuestion"
          id="location-preferences"
          v-model="formData.locationPreferences"
          :title="vacancy.locationQuestion"
          :answers="vacancy.locationQuestionAnswers"
          :type="vacancy.locationQuestionType"
        />

        <div v-else-if="filteredPreferences.length">
          <QuestionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`location-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData[formId][item.id]"
            :title="item.question"
            :answers="item.answers"
            :config="item"
            :type="item.questionType"
            :label="item.question"
            :required="item.questionRequired"
            @update:model-value="tidyFormData(item)"
          />
        </div>

        <button
          :disabled="disabledSave"
          class="govuk-button info-btn--location-pref--save-and-continue"
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
import SelectionInput from '@/components/SelectionInput/SelectionInput.vue';
import QuestionInput from '@/components/Form/QuestionInput.vue';
import BackLink from '@/components/BackLink.vue';
import { isAllRequiredFilled, filteredPreferences, tidyData } from '@/helpers/workingPreferencesHelper.js';

export default {
  name: 'LocationPreferences',
  components: {
    ErrorSummary,
    SelectionInput,
    QuestionInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const formId = 'locationPreferences';
    const defaults = {
      [formId]: this.$store.state.vacancy.record[formId] ? {} : null,
      progress: {},
    };
    const formData = { ...defaults, ...this.$store.getters['application/data'](defaults) };
    return {
      formId: formId,
      formData: formData,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.formData, this.formId);
    },
    isV1() {
      return !!this.vacancy.locationQuestion;
    },
    formComplete() {
      return isAllRequiredFilled(this.filteredPreferences, this.formData, this.formId);
    },
    disabledSave() {
      // if v1 all location preference is optional
      if (this.isV1) {
        return false;
      } else {
        // if v2 it should validate mandatory questions
        return (!this.canSave(this.formId) || !this.formComplete);
      }
    },
  },
  methods: {
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.formId], preference);
    },
  },
};
</script>
