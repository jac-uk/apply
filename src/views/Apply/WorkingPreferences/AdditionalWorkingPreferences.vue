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
            v-if="isV1"
            :id="`additional-working-preference_${itemIndex}`"
            v-model="v1FormData[itemIndex]"
            :title="item.question"
            :answers="item.answers"
            :type="item.questionType"
          />
          <QuestionInput
            v-else
            :id="`additional-working-preference_${itemIndex}`"
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
import QuestionInput from '@/components/Form/QuestionInput.vue';
import BackLink from '@/components/BackLink.vue';
import { filteredPreferences, isAllRequiredFilled, tidyData, isVersion1 } from './workingPreferencesHelper';

export default {
  name: 'AdditionalWorkingPreferences',
  components: {
    ErrorSummary,
    SelectionInput,
    QuestionInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const formId = 'additionalWorkingPreferences';
    const preferences = this.$store.state.vacancy.record[formId];
    const defaults = {
      [formId]: preferences ? {} : null,
      progress: {},
    };
    const formData = { ...defaults, ...this.$store.getters['application/data'](defaults) };
    const v1FormData = [];  // in v1 values were stored within a `selection` property
    const isV1 = isVersion1(preferences);
    if (isV1) {
      if (formData[formId] && formData[formId].length) {
        formData[formId].forEach(item => {
          v1FormData.push(item.selection);
        });
      }
    }
    return {
      formId: formId,
      formData: formData,
      isV1: isV1,
      v1FormData: v1FormData,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.formData, this.formId);
    },
    formComplete() {
      if (this.isV1) {
        return this.v1FormData.length ===  this.filteredPreferences.length;
      } else {
        return isAllRequiredFilled(this.filteredPreferences, this.formData, this.formId);
      }
    },
  },
  methods: {
    tidyFormData(preference) {
      return tidyData(this.filteredPreferences, this.formData[this.formId], preference);
    },
    async save() {
      this.validate();
      if (this.isValid()) {
        this.formData.progress[this.formId] = true;
        if (this.isV1) { // The following override was used to store additional preferences in an array [ { selection: String | Array } ]
          this.formData[this.formId] = this.v1FormData.map(item => {
            return { selection: item };
          });
        }
        await this.$store.dispatch('application/save', this.formData);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
