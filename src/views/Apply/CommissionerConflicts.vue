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

        <RadioGroup
          v-for="(commissioner , index) in formData.additionalInfo.commissionerConflicts"
          :id="`commissioner-name-${index}`"
          :key="index"
          v-model="commissioner.hasRelationship"
          required
          :label="commissioner.name"
        >
          <RadioItem
            label="Yes"
            :value="true"
          >
            <TextareaInput
              id="relationship"
              v-model="commissioner.detail"
              label="Please provide details of your relationship."
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            label="No"
            :value="false"
          />
        </RadioGroup>

        <div>
          <button
            class="govuk-button govuk-button--secondary"
            @click="setNoRelationships"
          >
            I do not have a pre-existing relationship with any of the commissioners
          </button>
        </div>

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
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'CommissionerConflicts',
  components: {
    BackLink,
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data() {
    const commissioners = this.$store.state.vacancy.record.commissioners;
    const defaults = {
      additionalInfo: {
        commissionerConflicts: commissioners.map((commissioner) => ({
          name: commissioner.name,
          hasRelationship: null,
          detail: '',
        })),
      },
      progress: {},
    };
    const formData = { ...defaults };
    const data = this.$store.getters['application/data'](defaults);
    if (data.additionalInfo.commissionerConflicts) {
      formData.additionalInfo.commissionerConflicts = data.additionalInfo.commissionerConflicts;
    }
    if (data.progress) {
      formData.progress = data.progress;
    }
    return {
      formId: 'commissionerConflicts',
      formData,
    };
  },
  methods: {
    isFormValid() {
      const commissionerConflicts = this.formData.additionalInfo.commissionerConflicts;
      const isValid = commissionerConflicts.every((commissioner) => {
        if (commissioner.hasRelationship && !commissioner.detail) {
          return false;
        }
        return commissioner.hasRelationship !== null;
      });
      if (!isValid) {
        this.errors.push({ id: 'error', message: 'Please provide details of your relationship' });
      }
      return isValid;
    },
    setNoRelationships(e) {
      e.preventDefault();
      this.formData.additionalInfo.commissionerConflicts.forEach((commissioner) => {
        commissioner.hasRelationship = false;
        commissioner.detail = '';
      });
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
