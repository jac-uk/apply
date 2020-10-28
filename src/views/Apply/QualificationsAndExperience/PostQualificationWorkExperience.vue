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
          v-model="application.experience"
          :component="repeatableFields.Experience"
        />

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button  info-btn--post-qualification-work-experience--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RepeatableFields from '@/components/RepeatableFields';
import Experience from '@/components/RepeatableFields/Experience';
import BackLink from '@/components/BackLink';

export default {
  components: {
    RepeatableFields,
    BackLink,
  },
  data(){
    const defaults =  {
      experience: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,

      repeatableFields: {
        Experience,
      },
    };
  },
  methods: {
    async save() {
      this.application.progress.postQualificationWorkExperience = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },

};
</script>
