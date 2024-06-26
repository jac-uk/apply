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
              :to="{ name: 'sign-in', query: { nextPage: nextPage } }"
            >
              sign in
            </RouterLink>
            if you already have an account.
          </p>

          <p class="govuk-body">
            Find out more about how we
            <a
              class="govuk-link"
              href="https://judicialappointments.gov.uk/data-protection-freedom-of-information-and-making-requests-for-your-data/"
              target="_blank"
            >
              process your data.
            </a>
          </p>

          <ErrorSummary :errors="errors" />
          <WarningSummary :warning-object="warningObject" />

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
            warn-cps-email-msg="Use of a CPS device causes multiple known issues with the JAC Digital Platform due to the device firewall settings - it is strongly recommended that applicants use a personal device to log on/submit an application."
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
            :is-new-pwd="true"
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
          />

          <button
            type="submit"
            class="govuk-button"
          >
            Create Account
          </button>
          <ChangeEmailMessage />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { serverTimestamp } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import WarningSummary from '@/components/Form/WarningSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import Password from '@/components/Form/Password.vue';
import DateInput from '@/components/Form/DateInput.vue';
import ChangeEmailMessage from '@/components/Page/ChangeEmailMessage.vue';

export default {
  name: 'SignUp',
  components: {
    ErrorSummary,
    WarningSummary,
    TextField,
    Password,
    DateInput,
    ChangeEmailMessage,
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
    nextPage() {
      return this.$route.query.nextPage;
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
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password).then((result)=>{
        this.createCandidate(result);
      })
        .catch((error) => {
          this.errors.push({ ref: 'email', message: error.message });
          this.scrollToTop();
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
        nationalInsuranceNumber: this.formData.nationalInsuranceNumber || null, // prevent undefined being saved
      };
      await this.$store.dispatch('auth/setCurrentUser', userCredential.user);
      await this.$store.dispatch('candidate/create', {
        created: serverTimestamp(),
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
