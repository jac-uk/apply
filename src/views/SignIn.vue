<template>
  <main class="mt-3">
    <div class="login-container">
      <div class="text-center mb-3 mt-5">
        <img
          src="@/assets/jac-logo.svg"
          alt="Judicial Appointments Commission"
          width="197"
          height="66"
        >
      </div>
      <FirebaseUI @signInSuccess="loginRedirect" />
    </div>
  </main>
</template>

<script>
export default {
  components: {
    FirebaseUI: () => import('@/components/core/FirebaseUI'),
  },
  methods: {
    loginRedirect(authResult) {
      this.$store.dispatch('setCurrentUser', authResult.user);
      this.$router.push('/');
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
