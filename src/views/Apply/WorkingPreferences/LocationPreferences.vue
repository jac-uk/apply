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
          :show-save-button="true"
          @save="save"
        />

        <div v-if="filteredPreferences.length">
          <SelectionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`location-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData.locationPreferences[item.question]"
            :title="item.question"
            :answers="item.answers"
            :config="item"
            :type="item.questionType"
            :label="item.question"
            required
          />
        </div>

        <SelectionInput
          v-else
          id="location-preferences"
          v-model="formData.locationPreferences"
          :title="vacancy.locationQuestion"
          :answers="vacancy.locationQuestionAnswers"
          :type="vacancy.locationQuestionType"
        />

        <button
          :disabled="!canSave(formId) || !!!formData.locationPreferences"
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
import BackLink from '@/components/BackLink.vue';
import { filteredPreferences } from './workingPreferencesHelper';

export default {
  name: 'LocationPreferences',
  components: {
    ErrorSummary,
    SelectionInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      locationPreferences: {},
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'locationPreferences',
      formData: formData,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy.locationPreferences, this.formData);
    },
  },
  methods: {
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
