<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Jurisdiction Preferences
      </h1>
      <p class="govuk-body-m govuk-!-margin-top-0">
        Please update this section to take into account any changes since you submitted your application
      </p>

      <form
        ref="formRef"
        @submit.prevent="save"
      >
        <ErrorSummary
          :errors="errors"
        />

        <div v-if="filteredPreferences.length">
          <SelectionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`jurisdiction-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData[part][item.id]"
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
          :messages="{ required: `Please enter a value for ${vacancy.jurisdictionQuestion}` }"
          required
        />

        <button
          class="govuk-button info-btn--jurisdiction-preferences--save-and-continue"
        >
          Save and continue
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import SelectionInput from '@/components/SelectionInput/SelectionInput.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import { filteredPreferences, tidyData } from '../../WorkingPreferences/workingPreferencesHelper';

export default {
  name: 'CandidateFormJurisdictionPreferences',
  components: {
    SelectionInput,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const part = APPLICATION_FORM_PARTS.JURISDICTION_PREFERENCES;
    const defaults = {
      [part]: this.$store.state.vacancy.record[part] ? {} : null,
    };
    const formData = { ...defaults, ...this.$store.getters['application/data'](defaults) };
    return {
      formData,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.formData, this.part);
    },
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.JURISDICTION_PREFERENCES);
  },
  methods: {
    async save(){
      this.validate();
      if (this.isValid()) {
        const saveData = {
          jurisdictionPreferences: this.formData.jurisdictionPreferences,
        };
        await this.$store.dispatch('application/save', saveData);
        await this.savePart(true);
      }
    },
    getAnswers(config) {
      if (config.answerSource === 'jurisdictions') {
        return this.vacancy.jurisdiction.map(item => ({ answer: item, id: item }));
      } else {
        return config.answers;
      }
    },
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.part], preference);
    },
  },
};
</script>
