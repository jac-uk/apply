<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <span class="govuk-caption-xl govuk-!-padding-bottom-5 display-block">
          092 Registrar of Criminal Appeals, Master of the Crown Office and Queen’s Coroner &amp;
          Attorney
        </span>

        <h1 class="govuk-heading-xl">
          Personal details
        </h1>

        <TextField
          id="fullName"
          v-model="fullName"
          label="Full name"
        />

        <TextField
          id="email"
          v-model="email"
          label="Email"
          type="email"
        />

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField';

export default {
  components: {
    TextField,
  },
  data(){
    return {
      fullName: null,
      email: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
