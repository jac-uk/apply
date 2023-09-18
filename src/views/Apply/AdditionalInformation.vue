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
          v-model="formData.additionalInfo.listedSources"
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
            value="judging-your-future-newsletter"
            label="Judging Your Future Newsletter"
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
              v-model="formData.additionalInfo.otherSources"
              label="Other form of communication"
              rows="2"
              required
            />
          </CheckboxItem>
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
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from './ApplyMixIn';
import BackLink from '@/components/BackLink.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import { transformOnSelection } from '@/helpers/array';

export default {
  name: 'AdditionalInformation',
  components: {
    BackLink,
    CheckboxGroup,
    CheckboxItem,
    ErrorSummary,
    TextareaInput,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      additionalInfo: {
        listedSources: null,
        otherSources: null,
      },
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'additionalInfo',
      formData: formData,
    };
  },
  watch: {
    'formData.additionalInfo.listedSources'(newValue, oldValue) {
      this.formData.additionalInfo.listedSources = transformOnSelection(newValue, oldValue, 'prefer-not-to-say');
    },
  },
  methods: {
    isFormValid() {
      const listedSources = this.formData.additionalInfo.listedSources;
      if (!listedSources || listedSources.length === 0) {
        this.errors.push({ id: 'error', message: 'Please select at least one option' });
        return false;
      }
      if (!listedSources.includes('other')) {
        this.formData.additionalInfo.otherSources = null;
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
