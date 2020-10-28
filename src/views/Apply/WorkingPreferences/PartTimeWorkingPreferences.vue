<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Part-time working preferences
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />
        
        <div v-if="vacancy.referenceNumber == 'JAC00006'">
          <p class="govuk-body-l">
            Part-time working is available for this role, it can only be
            accommodated by working full weeks and in block periods of at least six weeks.
          </p>
        </div>

        <div v-else>
          <p class="govuk-body-l">
            Part-time working is available for this role.
          </p>
        </div>

        <RadioGroup
          id="part-time-working-preferences"
          v-model="application.interestedInPartTime"
          required
          label="Are you interested in part-time working?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              v-if="vacancy.referenceNumber !== 'JAC00006'"
              id="part-time-working-preference-details"
              v-model="application.partTimeWorkingPreferencesDetails"
              label="With reference to the working patterns for this role, provide details of those you want to work."
              required
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--part-time-work-experience--save-and-continue"
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
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      interestedInPartTime: null,
      partTimeWorkingPreferencesDetails: null,
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
        this.application.progress.partTimeWorkingPreferences = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
