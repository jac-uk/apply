<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">

        <h1 class="govuk-heading-xl">
          Qualifications
        </h1>

        <RepeatableFields
          v-model="qualifications"
          :component="repeatableFields.Qualifications"
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
import Qualifications from '@/components/RepeatableFields/Qualifications';

export default {
  components: {
    RepeatableFields,
  },
  data(){
    return {
      repeatableFields: {
        Qualifications,
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
