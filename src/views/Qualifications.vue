<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Qualifications
        </h1>

        <RepeatableFields
          v-model="qualifications"
          :component="repeatableFields.Qualification"
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
import Qualification from '@/components/RepeatableFields/Qualification';

export default {
  components: {
    RepeatableFields,
  },
  data(){
    return {
      repeatableFields: {
        Qualification,
      },
      qualifications: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
