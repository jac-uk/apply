<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
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
            class="govuk-link info-link--independend-assessor--guidance-on-choosing-independent-assessor"
            href="https://judicialappointments.gov.uk/independent-assessments"
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
          v-model="formData.firstAssessorFullName"
          label="Full name"
          required
        />
        <TextField
          id="first-assessor-title"
          v-model="formData.firstAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="first-assessor-email"
          v-model="formData.firstAssessorEmail"
          label="Email"
          type="email"
          required
        />
        <TextField
          id="first-assessor-Phone"
          v-model="formData.firstAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <h2 class="govuk-heading-l">
          Second independent assessor
        </h2>

        <TextField
          id="second-assessor-full-name"
          v-model="formData.secondAssessorFullName"
          label="Full name"
          required
        />
        <TextField
          id="second-assessor-title"
          v-model="formData.secondAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="second-assessor-email"
          v-model="formData.secondAssessorEmail"
          label="Email"
          type="email"
          required
        />
        <TextField
          id="second-assessor-Phone"
          v-model="formData.secondAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--assessor-details--save-and-continue"
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
import ApplyMixIn from '../ApplyMixIn';
import TextField from '@/components/Form/TextField';
import BackLink from '@/components/BackLink';

export default {
  name: '',
  components: {
    ErrorSummary,
    TextField,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
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
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'assessorsDetails',
      formData: formData,
    };
  },
};
</script>
