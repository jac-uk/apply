<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Roles
        </h1>

        <ErrorSummary :errors="errors" />

        <CheckboxGroup
          id="roles"
          v-model="formData.roles"
        >
          <p class="govuk-body-l">
            Select the role(s) you wish to apply for
          </p>

          <div class="govuk-body govuk-!-margin-bottom-5">
            Please tick whichever you feel is appropriate. You can tick more than one box.
          </div>

          <CheckboxItem
            v-for="(role, roleIndex) in vacancy.roles"
            :key="roleIndex"
            :value="roleIndex"
            :label="role"
          />
        </CheckboxGroup>

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
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from './ApplyMixIn';
import BackLink from '@/components/BackLink';
import CheckboxItem from '@/components/Form/CheckboxItem';
import CheckboxGroup from '@/components/Form/CheckboxGroup';

export default {
  components: {
    BackLink,
    CheckboxGroup,
    CheckboxItem,
    ErrorSummary,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'roles',
      formData: formData,
    };
  },
  methods: {
    isFormValid() {
      const listedSources = this.formData.roles;
      if (!listedSources || listedSources.length === 0) {
        this.errors.push({ id: 'error', message: 'Please select at least one option' });
        return false;
      }
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
