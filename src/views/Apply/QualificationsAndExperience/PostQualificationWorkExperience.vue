<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Post-qualification experience
        </h1>

        <p class="govuk-body-l">
          Provide details of your career to date including any judicial appointments or quasi-judicial appointments
        </p>

        <RepeatableFields
          v-model="formData.experience"
          :component="repeatableFields.Experience"
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button  info-btn--post-qualification-work-experience--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields';
import Experience from '@/components/RepeatableFields/Experience';
import BackLink from '@/components/BackLink';

export default {
  components: {
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
      formId: 'postQualificationWorkExperience',
      formData: formData,
      repeatableFields: {
        Experience,
      },
    };
  },
};
</script>
