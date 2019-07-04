<template>
  <main class="mt-3">
    <Banner class="text-center" />
    <div class="login-container">
      <div class="text-center mb-3 mt-5">
        <img src="@/assets/jac-logo.svg" alt="Judicial Appointments Commission" width="197" height="66">
      </div>
      <p>
        To apply for this role, you’ll need to create an account with your email address and a password. We’ll send you
        a link to verify your email address.
      </p>
      <p>
        If you’ve already registered, sign in to return to your application.
      </p>
      <FirebaseUI @signInSuccess="loginRedirect" />
    </div>
  </main>
</template>

<script>
  import FirebaseUI from '@/components/FirebaseUI';
  import Banner from '@/components/Banner';

  export default {
    components: {
      FirebaseUI,
      Banner,
    },
    methods: {
      loginRedirect(authResult) {
        this.$store.dispatch('setCurrentUser', authResult.user);
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .login-container {
    max-width: 360px;
    margin: 0 auto;
  }
</style>
