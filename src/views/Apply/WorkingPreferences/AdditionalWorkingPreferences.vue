<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Additional working preferences
        </h1>

        <ErrorSummary
          :errors="errors"
        />

        <div
          v-for="(item, itemIndex) in filteredPreferences"
          :key="itemIndex"
        >
          <div class="govuk-caption-xl">
            {{ item.topic }}
          </div>
          <SelectionInput
            :id="getSelectionInputId(item, itemIndex)"
            v-model="formData[formId][item.id]"
            :title="item.question"
            :answers="item.answers"
            :config="item"
            :type="item.questionType"
            :required="item.questionRequired"
            @update:model-value="tidyFormData(item)"
          />
        </div>

        <button
          :disabled="!canSave(formId) || !formComplete"
          class="govuk-button info-btn--additional-work-experience--save-and-continue"
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
import { getDataWelshId } from '@/helpers/language';
import { filteredPreferences, tidyData } from './workingPreferencesHelper';

export default {
  name: 'AdditionalWorkingPreferences',
  components: {
    ErrorSummary,
    SelectionInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const formId = 'additionalWorkingPreferences';
    const defaults = {
      [formId]: this.$store.state.vacancy.record[formId] ? {} : null,
      progress: {},
    };
    const formData = { ...defaults, ...this.$store.getters['application/data'](defaults) };
    return {
      formId: formId,
      formData: formData,
    };
    // The following was used as additional preferences were stored in an array [ { selection: String | Array } ]
    // Have left it here as we may need to address backwards compatibility OR migration (unless we time the release of this code between exercises)
    // Note: localAdditionalPreferences was used for the selectionInput v-model instead of formData
    // const localAdditionalPreferences = {};
    // if (formData[formId] && formData[formId].length) {
    //   formData[formId].forEach(item => {
    //     localAdditionalPreferences.push(item.selection);
    //   });
    // }
    // return {
    //   formId: formId,
    //   formData: formData,
    //   localAdditionalPreferences: localAdditionalPreferences,
    // };
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
    getSelectionInputId(additionalWorkingPreference, index) { // TODO do we need this?
      return `additional-working-preference-${getDataWelshId(additionalWorkingPreference.topic)}-${index}`;
    },
    // The following override was used to store additional preferences in an array [ { selection: String | Array } ]
    // Have left it here as we may need to address backwards compatibility OR migration (unless we time the release of this code between exercises)
    // async save() {
    //   this.validate();
    //   if (this.isValid()) {
    //     this.formData.progress[this.formId] = true;
    //     this.formData.additionalWorkingPreferences = this.localAdditionalPreferences.map(item => {
    //       return { selection: item };
    //     });
    //     await this.$store.dispatch('application/save', this.formData);
    //     this.$router.push({ name: 'task-list' });
    //   }
    // },
  },
};
</script>
