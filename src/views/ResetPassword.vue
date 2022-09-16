<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="resetPassword"
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
            />

            <button class="govuk-button">
              Send the link
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';

export default {
  name: 'ResetPassword',
  components: {
    TextField,
  },
  data () {
    return {
      formData: {},
      resetSent: false,
    };
  },
  methods: {
    resetPassword() {
      const returnUrl = location.origin + this.$router.resolve({ name: 'sign-in' }).route.fullPath;

      if (this.formData.email) {
        this.errors = [];
        auth().sendPasswordResetEmail(this.formData.email, {
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
