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

        <div v-if="filteredPreferences.length">
          <SelectionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`location-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData[formId][item.question]"
            :title="item.question"
            :answers="item.answers"
            :config="item"
            :type="item.questionType"
            :label="item.question"
            required
            @update:model-value="tidyFormData(item)"
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
          :disabled="!canSave(formId) || !formComplete"
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
import { filteredPreferences, tidyData } from './workingPreferencesHelper';

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
      return filteredPreferences(this.vacancy[this.formId], this.formData[this.formId]);
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
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.formId], preference);
    },
  },
};
</script>
