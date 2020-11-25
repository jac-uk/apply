<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Additional Information
        </h1>

        <ErrorSummary :errors="errors" />

        <CheckboxGroup
          id="additionalInfoGroup"
          v-model="application.additionalInfo.listedSources"
        >
          <p class="govuk-body-l">
            How did you hear about the vacancy?
          </p>

          <div class="govuk-body govuk-!-margin-bottom-5">
            Please tick whichever you feel is appropriate. You can tick more than one box.
          </div>

          <CheckboxItem
            value="jac-website"
            label="JAC Website"
          />
          <CheckboxItem
            value="professional-body-website-or-email"
            label="Professional body website or email (eg The Law Society)"
          />
          <CheckboxItem
            value="professional-body-magazine"
            label="Professional body magazine"
          />
          <CheckboxItem
            value="judicial-office-extranet"
            label="Judicial Office Extranet"
          />
          <CheckboxItem
            value="twitter"
            label="Twitter"
          />
          <CheckboxItem
            value="linked-in"
            label="LinkedIn"
          />
          <CheckboxItem
            value="word-of-mouth"
            label="Word of mouth"
          />
          <CheckboxItem
            value="prefer-not-to-say"
            label="I prefer not to answer this question"
          />
          <CheckboxItem
            value="other"
            label="Other form of communication (please specify)"
          >
            <TextareaInput
              id="otherSources"
              v-model="application.additionalInfo.otherSources"
              label="Other form of communication"
              rows="2"
              required
            />
          </CheckboxItem>
        </CheckboxGroup>

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--personal-details--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';
import CheckboxItem from '@/components/Form/CheckboxItem';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    BackLink,
    CheckboxGroup,
    CheckboxItem,
    ErrorSummary,
    TextareaInput,
  },
  extends: Form,
  data(){
    const defaults = {
      additionalInfo: {
        listedSources: null,
        otherSources: null,
      },
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  methods: {
    isFormValid() {
      const listedSources = this.application.additionalInfo.listedSources;
      if (!listedSources || listedSources.length === 0) {
        this.errors.push({ id: 'error', message: 'Please select at least one option' });
        return false;
      }
      if (!listedSources.includes('other')) {
        this.application.additionalInfo.otherSources = null;
      }
      return true;
    },
    async save() {
      this.validate();
      if (this.isValid() && this.isFormValid()) {
        this.application.progress.additionalInfo = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
