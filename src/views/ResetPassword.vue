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
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';

export default {
  components: {
    TextField,
  },
  data () {
    return {
      formData: {},
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
            // Handled in the same way as success to prevent account enumeration attacks 
            pass;
          });
      }
    },
  },
};
</script>
