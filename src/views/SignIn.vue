<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <div class="text-center">
        <img
          src="@/assets/jac-logo.svg"
          alt="Judicial Appointments Commission"
          width="197"
          height="66"
        >
      </div>
      <p class="govuk-hint govuk-body govuk-!-margin-bottom-7">
        Enter your email address
      </p>
      <FirebaseUI @signInSuccess="loginRedirect" />
      {{ exerciseId }}
    </div>
  </div>
</template>

<script>
import FirebaseUI from '@/components/FirebaseUI';

export default {
  components: {
    FirebaseUI,
  } ,
  computed: {
    exerciseId () {
      return this.$store.state.exercise.record && this.$store.state.exercise.record.id;
    },
  },
  methods: {
    loginRedirect(authResult) {
      this.$store.dispatch('auth/setCurrentUser', authResult.user);
      if (this.exerciseId) {
        console.log('login successful, go to exercise', this.exerciseId);
        this.$router.go(`/apply/${this.exerciseId}`);
      } else {
        console.log('login successful, go to vacancies list');
        this.$router.go('/vacancies');
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
