<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Email Verification
        </h1>
        <LoadingMessage :load-failed="false" />
        <p class="govuk-body govuk-!-margin-top-2">
          Email verification was successful. Redirecting ...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingMessage from '@/components/LoadingMessage.vue';

export default {
  name: 'VerifyEmail',
  components: { LoadingMessage },
  data() {
    return {
      email: '',
      verificationSuccess: false,
      error: '',
      auth: null,
    };
  },
  created() {

    console.log('============ VerifyEmail (created called) =============');

    let routeName;
    if (this.$store.getters['auth/isSignedIn']) {
      if (!this.$store.getters['candidate/requiredFieldsComplete']()) {
        // Redirect to complete registration
        routeName = 'sign-up-step2';
      }
      else {
        // Redirect to vacancies (home page)
        routeName = 'vacancies';
      }
    }
    else {
      // Redirect to sign in page
      routeName = 'sign-in';
    }

    console.log(`-- redirecting to: ${routeName}`);

    // Redirect after 2 seconds
    setTimeout(() => {
      this.$router.replace({ name: routeName });
    }, 2000);
  },
};
</script>
