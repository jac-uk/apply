<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Create an account - Step 1
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

          <!-- <TextField
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
          /> -->

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

          <ActionButton
            type="primary"
            :action="onSubmit"
          >
            Create Account
          </ActionButton>

          <ChangeEmailMessage />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import WarningSummary from '@/components/Form/WarningSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import Password from '@/components/Form/Password.vue';
import ChangeEmailMessage from '@/components/Page/ChangeEmailMessage.vue';
import { createCandidate } from '@/services/candidateService';
import { createAuthUser, sendEmailVerificationLink } from '@/services/authService';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';

export default {
  name: 'SignUpStep1',
  components: {
    ErrorSummary,
    WarningSummary,
    TextField,
    Password,
    ChangeEmailMessage,
    ActionButton,
  },
  extends: Form,
  data () {
    return {
      minPasswordLength: 12,

      // @TODO: REVERT
      formData: {},
      // formData: {
      //   // title: 'mr',
      //   // firstName: 'test',
      //   // lastName: 'tester',
      //   email: 'omar.jebari+17@gmail.com',
      //   // dateOfBirth: new Date('10/10/1988'),
      //   // nationalInsuranceNumber: 'NN810757D',
      //   password: 'PreciseMinds1234!',
      // },

      fullName: null,
    };
  },
  computed: {
    // exerciseId () {
    //   return this.$store.state.vacancy.record && this.$store.state.vacancy.record.id;
    // },
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
          return await this.signUp();
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
      try {
        // Create user with email and password
        const user = await createAuthUser(this.formData.email, this.formData.password);
        await this.$store.dispatch('auth/setCurrentUser', user);

        // Create the candidate
        await createCandidate({
          email: this.formData.email,
        });

        /* eslint-disable no-console */
        console.log('-- Signup USER:');
        console.log(user);
        /* eslint-enable no-console */

        // Send email verification
        await sendEmailVerificationLink();

        this.$router.push({ name: 'verify-email-request' });

      } catch (error) {

        /* eslint-disable no-console */
        console.log('ERROR:');
        console.log(error);
        /* eslint-enable no-console */

        const message = 'There was a problem with creating the user. Please try again or report the issue to Admin.';
        this.errors.push({ id: 'email', message: message });
        return false;
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
