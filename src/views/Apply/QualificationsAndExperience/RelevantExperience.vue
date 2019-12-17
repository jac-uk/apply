<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Relevant experience
        </h1>

        <RepeatableFields
          v-model="application.experience"
          :component="repeatableFields.NonLegalExperience"
        />

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RepeatableFields from '@/components/RepeatableFields';
import NonLegalExperience from '@/components/RepeatableFields/NonLegalExperience';
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
        NonLegalExperience,
      },
    };
  },
  methods: {
    async save() {
      this.application.progress.relevantExperience = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },

};
</script>
