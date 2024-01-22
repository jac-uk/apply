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

        <SelectionInput
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
export default {
  name: 'CandidateFormJurisdictionPreferences',
  components: {
    SelectionInput,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const application = this.$store.getters['application/data']();
    const formData = {
      jurisdictionPreferences: application.jurisdictionPreferences,
    };
    return {
      formData,
    };
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
  },  
};
</script>
