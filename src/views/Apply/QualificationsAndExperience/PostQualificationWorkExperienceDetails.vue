<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Career history - post qualification experience
        </h1>

        <div class="govuk-grid-row govuk-!-margin-left-0 govuk-!-margin-top-8">
          <h2 class="govuk-heading-m govuk-!-margin-top-8">
            <span>You have indicated that you have </span>
            <span>{{ totalJudicialDays }}</span>
            <span> sitting days in total.</span>
          </h2>

          <div class="custom-html govuk-hint">
            <span>As you have indicated you have less than </span>
            <span>{{ vacancy.pjeDays }}</span>
            <span> sitting days across all judicial and/or quasi-judicial appointments, please provide details of how you have acquired the necessary skills for this role in some other significant way.</span>
          </div>

          <TextareaInput
            v-if="totalJudicialDays < vacancy.pjeDays"
            id="experience-details"
            v-model="formData.experienceDetails"
            label="Details"
            :label-hidden="true"
            required
          />
        </div>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--post-qualification-work-experience--save-and-continue govuk-!-margin-top-8"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ApplyMixIn from '../ApplyMixIn';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import BackLink from '@/components/BackLink.vue';
import { getApplicationTotalJudicialDays } from '@/helpers/exerciseHelper';

export default {
  name: 'PostQualificationWorkExperienceDetails',
  components: {
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults =  {
      experience: null,
      employmentGaps: null,
      experienceDetails: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };

    return {
      formId: 'postQualificationWorkExperience',
      formData,
    };
  },
  computed: {
    totalJudicialDays() {
      return getApplicationTotalJudicialDays(this.formData);
    },
  },
};
</script>
