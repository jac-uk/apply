<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Post-qualification experience
        </h1>

        <RepeatableFields
          v-model="experience"
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
    return {
      repeatableFields: {
        Experience,
      },
      experience: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
