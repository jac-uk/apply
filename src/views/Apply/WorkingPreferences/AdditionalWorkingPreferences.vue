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
          :show-save-button="true"
          @save="save"
        />

        <div
          v-for="(additionalWorkingPreference, index) in vacancy.additionalWorkingPreferences"
          :key="index"
        >
          <div class="govuk-caption-xl">
            {{ additionalWorkingPreference.topic }}
          </div>
          <SelectionInput
            :id="`additional-working-preference-${index}`"
            v-model="localAdditionalPreferences[index]"
            :title="additionalWorkingPreference.question"
            :answers="additionalWorkingPreference.answers"
            :type="additionalWorkingPreference.questionType"
          />
        </div>

        <button
          :disabled="!localAdditionalPreferences.length || application.status != 'draft'"
          class="govuk-button info-btn--additional-work-experience--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import SelectionInput from '@/components/SelectionInput/SelectionInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    SelectionInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      additionalWorkingPreferences: [],
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    const localAdditionalPreferences = [];
    if (application.additionalWorkingPreferences && application.additionalWorkingPreferences.length) {
      application.additionalWorkingPreferences.forEach(item => {
        localAdditionalPreferences.push(item.selection);
      });
    }
    return {
      application: application,
      localAdditionalPreferences: localAdditionalPreferences,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.additionalWorkingPreferences = true;
        this.application.additionalWorkingPreferences = this.localAdditionalPreferences.map(item => {
          return { selection: item };
        });
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
