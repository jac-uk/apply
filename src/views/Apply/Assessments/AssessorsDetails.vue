<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Independent assessors
        </h1>

        <ErrorSummary :errors="errors" />

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
          required
        />
        <TextField
          id="first-assessor-title"
          v-model="application.firstAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="first-assessor-email"
          v-model="application.firstAssessorEmail"
          label="Email"
          type="email"
          required
        />
        <TextField
          id="first-assessor-Phone"
          v-model="application.firstAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <h2 class="govuk-heading-l">
          Second independent assessor
        </h2>

        <TextField
          id="second-assessor-full-name"
          v-model="application.secondAssessorFullName"
          label="Full name"
          required
        />
        <TextField
          id="second-assessor-title"
          v-model="application.secondAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="second-assessor-email"
          v-model="application.secondAssessorEmail"
          label="Email"
          type="email"
          required
        />
        <TextField
          id="second-assessor-Phone"
          v-model="application.secondAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    TextField,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      firstAssessorFullName: null,
      firstAssessorTitle: null,
      firstAssessorEmail: null,
      firstAssessorPhone: null,
      secondAssessorFullName: null,
      secondAssessorTitle: null,
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
      this.validate();
      if (this.isValid()) {
        this.application.progress.assessorsDetails = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
