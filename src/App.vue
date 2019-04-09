<template>
  <div id="app" class="mb-5">
    <nav class="navbar navbar-expand-sm navbar-light bg-light mb-4" v-if="isLoggedIn">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">
          <img src="@/assets/jac-logo.svg" alt="Judicial Appointments Commission" width="197" height="66">
        </RouterLink>
        <div class="navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <RouterLink to="/apply" class="nav-link" active-class="active">Apply</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="logOut">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
import {auth} from '@/firebase';

export default {
  methods: {
    logOut() {
      auth().signOut();
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  watch: {
    isLoggedIn(loggedIn) {
      if (loggedIn === false) {
        this.$router.push('/login');
      }
    },
  },
}
</script>

<style lang="scss">
  // Required to include global main.scss styles
</style>
