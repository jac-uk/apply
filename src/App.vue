<template>
  <div
    id="app"
    class="mb-5"
  >
    <nav
      v-if="isSignedIn"
      class="navbar navbar-expand-sm navbar-light bg-light mb-4"
    >
      <div class="container">
        <RouterLink
          to="/"
          class="navbar-brand"
        >
          <img
            src="@/assets/jac-logo.svg"
            alt="Judicial Appointments Commission"
            width="197"
            height="66"
          >
        </RouterLink>
        <div class="navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <RouterLink
                to="/apply"
                class="nav-link"
                active-class="active"
              >
                Apply
              </RouterLink>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                @click.prevent="signOut"
              >Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/firebase';

export default {
  computed: {
    ...mapGetters([
      'isSignedIn',
    ]),
  },
  watch: {
    isSignedIn(signedIn) {
      if (signedIn === false) {
        this.$router.push({ name: 'sign-in' });
      }
    },
  },
  methods: {
    signOut() {
      auth().signOut();
    },
  },
};
</script>

<style lang="scss">
  // Required to include global main.scss styles
</style>
