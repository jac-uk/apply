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
          :show-save-button="true"
          @save="save"
        />

        <div v-if="filteredPreferences.length">
          <SelectionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`jurisdiction-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData.jurisdictionPreferences[item.question]"
            :title="item.question"
            :answers="getAnswers(item)"
            :config="item"
            :type="item.questionType"
            :label="item.question"
            required
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
          :disabled="!canSave(formId) || !!!formData.jurisdictionPreferences"
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
import { filteredPreferences } from './workingPreferencesHelper';

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
    const defaults = {
      jurisdictionPreferences: {},
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'jurisdictionPreferences',
      formData: formData,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy.jurisdictionPreferences, this.formData);
    },
  },
  methods: {
    getAnswers(config) {
      if (config.answerSource === 'jurisdictions') {
        return this.vacancy.jurisdiction.map(item => ({ answer: item }));
      } else {
        return config.answers;
      }
    },
    async save() {
      this.validate();
      if (this.isValid() && this.formId) {
        const saveData = {};
        saveData[`progress.${this.formId}`] = true;
        saveData[this.formId] = {};
        this.filteredPreferences.forEach(item => saveData[this.formId][item.question] = this.formData[this.formId][item.question]);
        await this.$store.dispatch('application/save', saveData);
        this.logEventAfterSave();
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
