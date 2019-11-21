<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Independent assessors
        </h1>

        <p class="govuk-body-l">
          Sometimes called 'referees', your independent assessors will give us
          their opinion on your suitability for this role.
        </p>

        <p class="govuk-body-l">
          We'll only contact them if you pass the first round of shortlisting.
        </p>

        <p class="govuk-body-l">
          You should read the
          <a
            class="govuk-link"
            href="https://www.judicialappointments.gov.uk/references-guidance-candidates"
            target="_blank"
          >
            guidance on choosing independent assessors
          </a>
          before making your nominations.
        </p>

        <h2 class="govuk-heading-l">
          First independent assessor
        </h2>

        <TextField
          id="first-assessor-full-name"
          v-model="application.firstAssessorFullName"
          label="Full name"
        />
        <TextField
          id="first-assessor-email"
          v-model="application.firstAssessorEmail"
          label="Email"
          type="email"
        />
        <TextField
          id="first-assessor-Phone"
          v-model="application.firstAssessorPhone"
          label="Phone"
          type="tel"
        />

        <h2 class="govuk-heading-l">
          Second independent assessor
        </h2>

        <TextField
          id="second-assessor-full-name"
          v-model="application.secondAssessorFullName"
          label="Full name"
        />
        <TextField
          id="second-assessor-email"
          v-model="application.secondAssessorEmail"
          label="Email"
          type="email"
        />
        <TextField
          id="second-assessor-Phone"
          v-model="application.secondAssessorPhone"
          label="Phone"
          type="tel"
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
    const defaults = {
      firstAssessorFullName: null,
      firstAssessorEmail: null,
      firstAssessorPhone: null,
      secondAssessorFullName: null,
      secondAssessorEmail: null,
      secondAssessorPhone: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
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
