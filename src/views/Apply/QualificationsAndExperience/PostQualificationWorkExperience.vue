<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Post-qualification experience
        </h1>

        <RepeatableFields
          v-model="application.experience"
          :component="repeatableFields.Experience"
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
import Experience from '@/components/RepeatableFields/Experience';

export default {
  components: {
    RepeatableFields,
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
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },

};
</script>
