<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Jurisdiction preferences
        </h1>

        <ErrorSummary
          :errors="errors"
        />

        <div v-if="filteredPreferences.length">
          <SelectionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`jurisdiction-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData[formId][item.id]"
            :title="item.question"
            :answers="getAnswers(item)"
            :config="item"
            :type="item.questionType"
            :label="item.question"
            :required="item.questionRequired"
            @update:model-value="tidyFormData(item)"
          />
        </div>

        <SelectionInput
          v-else
          id="jurisdiction-preferences"
          v-model="formData.jurisdictionPreferences"
          :title="vacancy.jurisdictionQuestion"
          :answers="vacancy.jurisdictionQuestionAnswers"
          :type="vacancy.jurisdictionQuestionType"
        />        

        <button
          :disabled="!canSave(formId) || !formComplete"
          class="govuk-button info-btn--jurisditional-pref--save-and-continue"
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
import BackLink from '@/components/BackLink.vue';
import { filteredPreferences, tidyData } from './workingPreferencesHelper';

export default {
  name: 'JurisdictionPreferences',
  components: {
    ErrorSummary,
    SelectionInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const formId = 'jurisdictionPreferences';
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
    formComplete() {
      if (this.filteredPreferences.length) {
        return this.filteredPreferences.length === Object.keys(this.formData[this.formId]).length;
      } else {
        return this.formData[this.formId] ? true : false;
      }
    },
  },
  methods: {
    getAnswers(config) {
      if (config.answerSource === 'jurisdictions') {
        return this.vacancy.jurisdiction.map(item => ({ answer: item, id: item }));
      } else {
        return config.answers;
      }
    },
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.formId], preference);
    },
  },
};
</script>
