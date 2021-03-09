<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
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

          <ErrorSummary :errors="errors" />

          <TextField
            id="firstName"
            v-model="formData.firstName"
            label="First name"
            required
          />

          <TextField
            id="lastName"
            v-model="formData.lastName"
            label="Last name"
            required
          />

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
            required
          />

          <Password
            id="password"
            v-model="formData.password"
            label="Password"
            hint="For security reasons it should be 8 or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *)."
            type="new-password"
            :min-length="8"
            required
          />

          <DateInput
            id="date-of-birth"
            v-model="formData.dateOfBirth"
            label="Date of birth"
            hint="For example, 27 3 1964."
            required
          />

          <TextField
            id="national-insurance-number"
            v-model="formData.nationalInsuranceNumber"
            label="National Insurance number"
            hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
            required
          />

          <button
            type="submit"
            class="govuk-button"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '@firebase/app';
import { auth } from '@/firebase';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import Password from '@/components/Form/Password';
import DateInput from '@/components/Form/DateInput';

export default {
  components: {
    ErrorSummary,
    TextField,
    Password,
    DateInput,
  },
  extends: Form,
  data () {
    return {
      formData: {},
    };
  },
  computed: {
    exerciseId () {
      return this.$store.state.vacancy.record && this.$store.state.vacancy.record.id;
    },
  },
  methods: {
    // @TODO: this should be handled by form
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    async onSubmit() {
      this.validate();
      if (this.isValid()) {
        try {
          await this.signUp();
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
    },
    async signUp() {
      const userCredential = await auth().createUserWithEmailAndPassword(this.formData.email, this.formData.password);

      if (userCredential) {
        const candidate = await this.createCandidate(userCredential);

        if (candidate) {
          if (this.$store.getters['vacancy/id']) {
            this.$router.push({ name: 'apply', params: { id: `${this.$store.getters['vacancy/id']}` } });
          } else {
            this.$router.push({ name: 'applications' });
          }
        }
      }
    },
    async createCandidate(userCredential) {
      await this.$store.dispatch('auth/setCurrentUser', userCredential.user);
      await this.$store.dispatch('candidate/create', {
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
      const personalDetails = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        dateOfBirth: this.formData.dateOfBirth,
        nationalInsuranceNumber: this.formData.nationalInsuranceNumber,
      };
      await this.$store.dispatch('candidate/savePersonalDetails', personalDetails);
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
