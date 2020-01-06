<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Gaps in employment
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <p class="govuk-body-l">
          Add dates and details of any gaps in employment you may have
        </p>

        <RepeatableFields
          v-model="application.employmentGaps"
          required
          :component="repeatableFields.EmploymentGaps"
        />

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import RepeatableFields from '@/components/RepeatableFields';
import EmploymentGaps from '@/components/RepeatableFields/EmploymentGaps';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RepeatableFields,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults =  {
      employmentGaps: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
      repeatableFields: {
        EmploymentGaps,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.employmentGaps = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },

};
</script>
