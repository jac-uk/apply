<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Personal details
        </h1>

        <p class="govuk-body-l">
          We'll use this information to confirm your identity if you contact us.
        </p>

        <TextField
          id="fullName"
          v-model="candidate.fullName"
          label="Full name"
          hint="You do not need to include any titles."
        />

        <TextField
          id="email"
          v-model="candidate.email"
          label="Email address"
          type="email"
        />

        <DateInput
          id="date-of-birth"
          v-model="candidate.dateOfBirth"
          label="Date of birth"
          hint="For example, 27 3 1964"
        />

        <TextField
          id="national-insurance-number"
          v-model="candidate.nationalInsuranceNumber"
          label="National Insurance number"
          hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
          class="govuk-!-width-one-half"
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
import DateInput from '@/components/Form/DateInput';

export default {
  components: {
    TextField,
    DateInput,
  },
  data(){
    const candidate = this.$store.getters['candidate/data']();
    return {
      candidate: {
        fullName: candidate && candidate.fullName || null,
        email: candidate && candidate.email || null,
        dateOfBirth: candidate && candidate.dateOfBirth || null,
        nationalInsuranceNumber: candidate && candidate.nationalInsuranceNumber || null,
      },
    };
  },
  methods: {
    async save() {
      await this.$store.dispatch('candidate/save', this.candidate);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
