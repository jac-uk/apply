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

          <p class="govuk-body-l">
            We'll email you a link to reset your password.
          </p>

          <ErrorSummary :errors="errors" />

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
      </form>
    </div>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';

export default {
  components: {
    ErrorSummary,
    TextField,
  },
  data () {
    return {
      formData: {},
      errors: [],
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
            this.$router.push({ name: 'sign-in' });
          })
          .catch((error) => {
            // TODO: if user doesn't exist, message user and prompt to create account
            this.errors.push({ id: 'email', message: error.message });
          });
      }
    },
  },
};
</script>
