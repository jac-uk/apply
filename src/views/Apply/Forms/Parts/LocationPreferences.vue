<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Location Preferences
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

        <SelectionInput
          v-if="vacancy.locationQuestion"
          id="location-preferences"
          v-model="formData.locationPreferences"
          :title="vacancy.locationQuestion"
          :answers="vacancy.locationQuestionAnswers"
          :type="vacancy.locationQuestionType"
          :messages="{ required: `Please enter a value for ${vacancy.locationQuestion}` }"
          required
        />

        <div v-else-if="filteredPreferences.length">
          <QuestionInput
            v-for="(item, itemIndex) in filteredPreferences"
            :id="`location-preferences_${itemIndex}`"
            :key="itemIndex"
            v-model="formData[part][item.id]"
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
          class="govuk-button info-btn--location-preferences--save-and-continue"
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
import QuestionInput from '@/components/Form/QuestionInput.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import { filteredPreferences, tidyData } from '@/helpers/workingPreferencesHelper.js';

export default {
  name: 'CandidateFormLocationPreferences',
  components: {
    SelectionInput,
    QuestionInput,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const part = APPLICATION_FORM_PARTS.LOCATION_PREFERENCES;
    const application = this.$store.getters['application/data']();
    const formData = {
      [part]: application[part],
    };
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
    this.setupPart(APPLICATION_FORM_PARTS.LOCATION_PREFERENCES);
  },
  methods: {
    async save(){
      this.validate();
      if (this.isValid()) {
        const saveData = {
          locationPreferences: this.formData.locationPreferences,
        };
        await this.$store.dispatch('application/save', saveData);
        await this.savePart(true);
      }
    },
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.part], preference);
    },
  },
};
</script>
