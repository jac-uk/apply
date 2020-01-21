<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
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

        <SelectionInput
          id="jurisdiction-preferences"
          v-model="application.jurisdictionPreferences"
          :title="vacancy.jurisdictionQuestion"
          :answers="vacancy.jurisdictionQuestionAnswers"
          :type="vacancy.jurisdictionQuestionType"
        /> 

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
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
      jurisdictionPreferences: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
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
        this.application.progress.jurisdictionPreferences = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
