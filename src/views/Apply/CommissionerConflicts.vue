<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Commissioner conflicts
        </h1>

        <ErrorSummary :errors="errors" />

        <p class="govuk-body-l">
          The Judicial Appointments Commission (JAC) is currently comprised of Commissioners. Members come from a wide background to ensure the Commission has a breadth of knowledge, expertise and independence.
        </p>
        <p class="govuk-body-l">
          Are you related to, or known to any of the JAC Commissioners? If you are in any doubt then please select 'Yes' in the list below:
        </p>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--personal-details--save-and-continue"
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
import ApplyMixIn from './ApplyMixIn';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'CommissionerConflicts',
  components: {
    BackLink,
    ErrorSummary,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      commissionerConflicts: {},
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'commissionerConflicts',
      formData: formData,
    };
  },
  methods: {
    isFormValid() {
      return true;
    },
    async save() {
      this.validate();
      if (this.isValid() && this.isFormValid()) {
        this.formData.progress[this.formId] = true;
        await this.$store.dispatch('application/save', this.formData);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
