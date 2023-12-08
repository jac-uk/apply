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
          id="location-preferences"
          v-model="formData.locationPreferences"
          :title="vacancy.locationQuestion"
          :answers="vacancy.locationQuestionAnswers"
          :type="vacancy.locationQuestionType"
          :messages="{ required: `Please enter a value for ${vacancy.locationQuestion}` }"
          required
        />

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
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import BackLink from '@/components/BackLink.vue';
import SelectionInput from '@/components/SelectionInput/SelectionInput.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormLocationPreferences',
  components: {
    ErrorSummary,
    BackLink,
    SelectionInput,
  },
  extends: Form,
  mixins: [CandidateFormsMixIn],
  data() {
    const application = this.$store.getters['application/data']();
    const formData = {
      locationPreferences: application.locationPreferences,
    };
    return {
      formData,
    };
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
  },  
};
</script>
