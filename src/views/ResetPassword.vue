<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="submit"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Forgotten password
          </h1>

          <div
            v-if="resetSent"
            class="govuk-panel govuk-panel--confirmation"
          >
            <h1 class="govuk-panel__title">
              Please check your email
            </h1>
            <h2 class="govuk-panel__body govuk-!-font-size-27 govuk-!-margin-top-7">
              If an account exists for <b>{{ formData.email }}</b>, we have now sent you a password reset link. <br>
              Please check your junk or spam folders before contacting the JAC directly, if you don't receive this email.
            </h2>
          </div>

          <div
            v-if="!resetSent"
          >
            <p class="govuk-body-l">
              We'll email you a link to reset your password.
            </p>

            <TextField
              id="email"
              v-model="formData.email"
              label="Email address"
              type="email"
              required
            />

            <button
              class="govuk-button"
              :disabled="!formData.email"
            >
              Send the link
            </button>

            <div v-if="!isEnabled">
              Your email is disabled.
            </div>

            <ChangeEmailMessage />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField.vue';
import ChangeEmailMessage from '@/components/Page/ChangeEmailMessage.vue';
import { auth, functions } from '@/firebase';
import { RECAPTCHA_ACTIONS } from '@/helpers/constants';

export default {
  name: 'ResetPassword',
  components: {
    TextField,
    ChangeEmailMessage,
  },
  data () {
    return {
      formData: {},
      isEnabled: true,
      resetSent: false,
    };
  },
  methods: {
    async submit() {
      if (!this.formData.email) return;
      const token = await this.$recaptcha(RECAPTCHA_ACTIONS.LOGIN.action);
      const isVerified = await this.$store.dispatch('auth/verifyRecaptcha', {
        token,
        score: RECAPTCHA_ACTIONS.LOGIN.score,
      });
      if (!isVerified) return;

      this.isEnabled = await this.checkEnabledUserByEmail(this.formData.email);
      if (this.isEnabled) {
        this.resetPassword();
      }
    },
    async checkEnabledUserByEmail(email) {
      try {
        const res = await functions.httpsCallable('checkEnabledUserByEmail')({ email });
        return res.data;
      } catch (error) {
        return false;
      }
    },
    async resetPassword() {
      if (this.formData.email) {
        const returnUrl = location.origin + this.$router.resolve({ name: 'sign-in' }).fullPath;
        this.errors = [];
        auth.sendPasswordResetEmail(this.formData.email, {
          url: returnUrl,
        })
          .then(() => {
            this.resetSent = true;
          })
          .catch(() => {
            // Handled in the same way as success to prevent account enumeration attacks
            this.resetSent = true;
          });
      }
    },
  },
};
</script>
