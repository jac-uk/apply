<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Email Verification Request
        </h1>
        <p class="govuk-body">
          Please go to your inbox (or spam folder) where you should find an email from us to verify your email address.
          You should click on the link in the email to complete email verification.
        </p>

        <div
          class="govuk-notification-banner"
          role="region"
          aria-labelledby="govuk-notification-banner-title"
          data-module="govuk-notification-banner"
        >
          <div class="govuk-notification-banner__header">
            <h2
              id="govuk-notification-banner-title"
              class="govuk-notification-banner__title"
            >
              Important
            </h2>
          </div>
          <div class="govuk-notification-banner__content">
            Click the <strong>refresh</strong> button below once you have verified your email. If the link has expired then click the <strong>resend</strong> link below to get a new link sent to you.
          </div>
        </div>
        <button
          type="button"
          class="govuk-button"
          data-module="govuk-button"
          @click="refresh()"
        >
          Refresh
        </button>
        <ActionButton
          type="primary"
          class="govuk-button govuk-!-margin-left-2"
          :action="resend"
        >
          Resend
        </ActionButton>

        <div
          v-if="showEmailVerificationError && errorMessage"
          class="govuk-error-summary__body"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthUser, sendEmailVerificationLink } from '@/services/authService';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';
export default {
  name: 'VerifyEmailRequest',
  components: { ActionButton },
  data() {
    return {
      showEmailVerificationError: false,
    };
  },
  computed: {
    isEmailVerified() {
      return this.$store.getters['auth/isEmailVerified'];
    },
  },
  methods: {
    async resend() {
      this.showEmailVerificationError = false;
      try {
        // Send email verification
        return await sendEmailVerificationLink();
      } catch (e) {

        console.log('ERROR:');
        console.log(e);

        if (e.code === 'auth/too-many-requests') {
          this.errorMessage = 'Too many email verification requests. Please try again later.';
          this.showEmailVerificationError = true;
        }
      }
    },
    /**
     * The user does not automatically refresh when the email verification link is clicked so
     * user needs to manually refresh
     */
    async refresh() {

      this.showEmailVerificationError = false;

      const user = await getAuthUser();
      if (user) {
        await user.reload();
        await this.$store.dispatch('auth/setCurrentUser', user);
      }

      console.log('user:');
      console.log(user);

      if (this.isEmailVerified) {
        this.$router.push({ name: 'vacancies' });
      }
      else {
        this.errorMessage = 'The email verification process failed, possibly because the link expired (after 3 days).<br>Please click the resend button above to get a new link sent to you.';
        this.showEmailVerificationError = true;
      }
    },
  },
};
</script>
