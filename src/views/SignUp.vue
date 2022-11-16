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
            id="title"
            v-model="formData.title"
            label="Title"
            type="text"
            required
          />

          <TextField
            id="firstName"
            v-model="formData.firstName"
            label="First name"
            type="text"
            required
          />

          <TextField
            id="lastName"
            v-model="formData.lastName"
            label="Last name"
            type="text"
            required
          />

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
            :pattern="{
              match: /^((?!@judicialappointments.gov.uk\s*$).)*$/,
              message: 'You cannot sign up as a candidate using a @judicialappointments.gov.uk email address',
            }"
            required
          />

          <Password
            id="password"
            v-model="formData.password"
            label="Password"
            :hint="`For security reasons it should be ${minPasswordLength} or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *).`"
            type="new-password"
            :min-length="minPasswordLength"
            required
          />

          <DateInput
            id="date-of-birth"
            v-model="formData.dateOfBirth"
            :min-date="new Date('1/01/1900')"
            :max-date="new Date()"
            label="Date of birth"
            hint="For example, 27 3 1964."
            required
          />

          <TextField
            id="national-insurance-number"
            v-model="formData.nationalInsuranceNumber"
            label="National Insurance number"
            hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
            type="nino"
            required
          />

          <button
            type="submit"
            class="govuk-button"
          >
            Create Account
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
      minPasswordLength: 12,
      formData: {},
      fullName: null,
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
      await this.validate();
      if (this.isValid()) {
        try {
          await this.signUp();
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
      else {
        this.scrollToTop();
      }
    },
    async signUp() {
      await auth()
        .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
        .then((result)=>{
          const candidate = this.createCandidate(result);
          if (candidate) {
            if (this.$store.getters['vacancy/id']) {
              this.$router.push({ name: 'task-list', params: { id: `${this.$store.getters['vacancy/id']}` } });
            } else {
              this.$router.push({ name: 'applications' });
            }
          }
        })
        .catch((error) => {
          this.errors.push({ ref: 'email', message: error.message });
        });
    },
    makeFullName() {
      this.fullName = `${this.formData.firstName} ${this.formData.lastName}`;
    },
    async createCandidate(userCredential) {
      this.makeFullName();
      const personalDetails = {
        title: this.formData.title,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        fullName: this.fullName,
        email: this.formData.email,
        dateOfBirth: this.formData.dateOfBirth,
        nationalInsuranceNumber: this.formData.nationalInsuranceNumber,
      };
      await this.$store.dispatch('auth/setCurrentUser', userCredential.user);
      await this.$store.dispatch('candidate/create', {
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
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
