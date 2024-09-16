<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Reset your password
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
            We will email you a link to reset your password.
          </p>

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
            required
          />

          <ActionButton
            :disabled="!formData.email"
            type="primary"
            :action="submit"
          >
            Reset password
          </ActionButton>

          <div v-if="!isEnabled">
            Your email is disabled.
          </div>

          <ChangeEmailMessage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField.vue';
import ChangeEmailMessage from '@/components/Page/ChangeEmailMessage.vue';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';
import { httpsCallable } from '@firebase/functions';
import { functions } from '@/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { RECAPTCHA_ACTIONS } from '@/helpers/constants';

export default {
  name: 'ResetPassword',
  components: {
    TextField,
    ChangeEmailMessage,
    ActionButton,
  },
  data () {
    return {
      formData: {},
      isEnabled: true,
      resetSent: false,
    };
  },
  computed: {
    nextPage() {
      return this.$route.query.nextPage;
    },
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

      return true;
    },
    async checkEnabledUserByEmail(email) {
      try {
        const res = await httpsCallable(functions, 'checkEnabledUserByEmail')({ email });
        return res.data;
      } catch (error) {
        return false;
      }
    },
    async resetPassword() {
      if (this.formData.email) {
        let returnUrl = location.origin + this.$router.resolve({ name: 'sign-in' }).fullPath;
        if (this.nextPage) {
          returnUrl += `?nextPage=${this.nextPage}`;
        }
        this.errors = [];
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.formData.email, {
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
