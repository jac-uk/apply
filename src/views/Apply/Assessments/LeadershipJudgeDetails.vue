<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Leadership Judge details
        </h1>

        <ErrorSummary :errors="errors" />

        <p class="govuk-body-l">
          Please read the
          <RouterLink
            class="govuk-link"
            :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
            target="_blank"
          >
            <span>Information Page</span>
          </RouterLink>
          for this exercise before completing this section. The Leadership Judge statement of suitability will contribute to your overall assessment alongside the evidence you have provided in your statement of suitability and written work. It should provide evidence that you can demonstrate the skills relevant to the Skills and Abilities for this role. No other references are sought for section 9(1) authorisation, only a statement of suitability from your Leadership Judge.<br>
          <br>
          Do not nominate the Lead Judge, the Master of the Rolls, a Head of Division, the Statutory Consultees or the Appropriate Authorities whose names can be found in the
          <RouterLink
            class="govuk-link"
            :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
            target="_blank"
          >
            <span>Information Page</span>
          </RouterLink>
          for this exercise.
        </p>

        <TextField
          id="full-name"
          v-model="formData.leadershipJudgeDetails.fullName"
          label="Full name"
          required
        />
        <TextField
          id="title"
          v-model="formData.leadershipJudgeDetails.title"
          label="Title or position"
          required
        />
        <TextField
          id="email"
          v-model="formData.leadershipJudgeDetails.email"
          label="Email"
          type="email"
          required
        />
        <TextField
          id="phone"
          v-model="formData.leadershipJudgeDetails.phone"
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
  name: 'LeadershipJudgeDetails',
  components: {
    ErrorSummary,
    TextField,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      leadershipJudgeDetails: {
        email: null,
        fullName: null,
        phone: null,
        title: null,
      },
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'leadershipJudgeDetails',
      formData: formData,
    };
  },
};
</script>
