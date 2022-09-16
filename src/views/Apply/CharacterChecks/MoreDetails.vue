<template>
  <form 
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Further information to disclose (optional)
      </h1>

      <ErrorSummary :errors="errors" />

      <TextareaInput
        id="further-info"
        v-model="application.characterChecks.furtherInformation"
        class="govuk-heading-m govuk-!-margin-bottom-2"
        rows="10"
        :maxlength="maxChars"
        hint="For example, changes in circumstances since you applied, misuse of social media or online networking sites, breaches of the Integrity Statement etc."
        aria-describedby="more-details-info more-details-hint"
      />
      <span
        id="more-details-info"
        aria-live="polite"
        class="govuk-hint govuk-character-count__message"
      >You have {{ charsRemaining }} characters remaining</span>

      <button
        class="govuk-button info-btn--more-details--save-and-continue"
      >
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: '',
  components: {
    BackLink,
    ErrorSummary,
    TextareaInput,
  },
  extends: Form,
  data() {
    const defaults = {
      characterChecks: {
        furtherInformation: null,
      },
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application,
    };
  },
  computed: {
    maxChars() {
      return 1000;
    },
    charsRemaining() {
      if (!this.application.characterChecks.furtherInformation) {
        return this.maxChars;
      }
      return this.maxChars - this.application.characterChecks.furtherInformation.length;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        await this.$store.dispatch('application/save', this.application);

        this.$router.push({ name: 'character-checks-review' });
      }
    },
  },
};
</script>
