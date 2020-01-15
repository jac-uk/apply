<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form @submit.prevent="signUp">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Create an account
          </h1>

          <p class="govuk-body-l">
            Or
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'sign-in' }"
            >
              sign in
            </RouterLink>
            if you already have an account.
          </p>

          <p class="govuk-body">
            Find out more about how we
            <a
              class="govuk-link"
              href="https://www.judicialappointments.gov.uk/accessing-your-information"
              target="_blank"
            >
              process your data.
            </a>
          </p>

          <div
            v-if="errors.length > 0"
            class="govuk-error-summary"
            aria-labelledby="error-summary-title"
            role="alert"
            tabindex="-1"
            data-module="govuk-error-summary"
          >
            <h2
              id="error-summary-title"
              class="govuk-error-summary__title"
            >
              There is a problem
            </h2>
            <div class="govuk-error-summary__body">
              <ul class="govuk-list govuk-error-summary__list">
                <li
                  v-for="error in errors"
                  :key="error.ref"
                >
                  <a :href="`#${error.ref}`">{{ error.message }}</a>
                </li>
              </ul>
            </div>
          </div>

          <TextField
            id="fullName"
            v-model="formData.fullName"
            label="Full name"
            hint="You do not need to include any titles."
            type="text"
          />

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
          />

          <TextField
            id="password"
            v-model="formData.password"
            label="Password"
            type="password"
          />

          <DateInput
            id="date-of-birth"
            v-model="formData.dateOfBirth"
            label="Date of birth"
            hint="For example, 27 3 1964"
          />

          <TextField
            id="national-insurance-number"
            v-model="formData.nationalInsuranceNumber"
            label="National Insurance number"
            hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
          />

          <button class="govuk-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

export default {
  components: {
    TextField,
    DateInput,
  },
  data () {
    return {
      formData: {},
      errors: [], // @todo proper error handling
    };
  },
  computed: {
    exerciseId () {
      return this.$store.state.exercise.record && this.$store.state.exercise.record.id;
    },
  },
  methods: {
    signUp() {
      let isOk = true;
      this.errors = [];
      if (!this.formData.email) { isOk = false; }
      if (!this.formData.password) { isOk = false; }
      if (!this.formData.fullName) { isOk = false; }
      if (!this.formData.dateOfBirth) { isOk = false; }
      if (!this.formData.nationalInsuranceNumber) { isOk = false; }
      if (isOk) {
        auth().createUserWithEmailAndPassword(this.formData.email, this.formData.password)
          .then((userCredential) => {
            const candidate = {
              fullName: this.formData.fullName,
              email: this.formData.email,
              dateOfBirth: this.formData.dateOfBirth,
              nationalInsuranceNumber: this.formData.nationalInsuranceNumber,
            };
            this.$store.dispatch('auth/setCurrentUser', userCredential.user);
            this.$store.dispatch('candidate/save', candidate);
          })
          .catch((error) => {
            this.errors.push({ ref: 'email', message: error.message });
          });
      }
    },
  },
};
</script>

<style scoped>
  .login-container {
    max-width: 360px;
    margin: 0 auto;
  }
</style>
