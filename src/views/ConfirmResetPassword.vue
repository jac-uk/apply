<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="gov-heading-xl">
            Reset Password
          </h1>

          <div
            v-if="resetSuccessful"
            class="govuk-panel govuk-panel--confirmation"
          >
            <h1 class="govuk-panel__title">
              Your password has been changed
            </h1>
            <h2 class="govuk-panel__body govuk-!-font-size-27 govuk-!-margin-top-7">
              You may now <RouterLink
                class="govuk-link"
                data-module="govuk-button"
                :to="{ name: 'sign-in' }"
              >
                sign in
              </RouterLink> with your new password.
            </h2>
          </div>
          <div v-if="!resetSuccessful && validResetCode">
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
            <button
              type="submit"
              class="govuk-button"
            >
              Confirm Password Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import Password from '../components/Form/Password';
import Form from '../components/Form/Form';

export default {
  name: 'ConfirmResetPassword',
  components: { Password },
  extends: Form,
  data() {
    return {
      minPasswordLength: 12,
      resetSuccessful: false,
      formData: {},
      errors: [],
      resetCode: null,
      validResetCode: false,
    };
  },
  mounted() {
    this.getResetCodeFromUrl();
    this.ensureValidActionCode();
  },
  methods: {
    async onSubmit() {
      await this.validate();
      if (this.isValid()) {
        try {
          await auth.confirmPasswordReset(this.resetCode, this.formData.password);
          this.resetSuccessful = true;
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
    },
    getResetCodeFromUrl() {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('oobCode')) {
        this.$router.push({ name: 'not-found' });
        return;
      }
      this.resetCode = params.get('oobCode');
    },
    ensureValidActionCode() {
      auth.checkActionCode(this.resetCode)
        .then(() => {
          this.validResetCode = true;
        })
        .catch(() => {
          this.$router.push({ name: 'not-found' });
        });
    },
  },
};
</script>

<style scoped>

</style>
