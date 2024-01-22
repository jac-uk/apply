<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Relevant experience
        </h1>

        <p
          v-if="isJAC00187"
          class="govuk-body-l"
        >
          Please detail your career history in reverse chronological order.
        </p>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <RepeatableFields
          v-model="formData.experience"
          :component="repeatableFields.NonLegalExperience"
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--relevant-experience--save-and-continue"
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
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields.vue';
import NonLegalExperience from '@/components/RepeatableFields/NonLegalExperience.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'RelevantExperience',
  components: {
    ErrorSummary,
    RepeatableFields,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults =  {
      experience: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'relevantExperience',
      formData: formData,
      repeatableFields: {
        NonLegalExperience,
      },
    };
  },
};
</script>
