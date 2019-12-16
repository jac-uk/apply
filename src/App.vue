<template>
  <div class="govuk-width-container">
    <div class="govuk-main-wrapper">
      <a
        href="#main-content"
        class="govuk-skip-link"
      >Skip to main content</a>
      <header class="header">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <div class="text-left">
              <img
                src="@/assets/jac-logo.svg"
                alt="Judicial Appointments Commission"
                width="197"
                height="66"
                style="text-align: center"
              >
            </div>
          </div>
          <div
            v-if="this.$route.name !== 'sign-in'"
            class="govuk-grid-column-one-half text-right"
          >
            <button
              v-if="isSignedIn"
              class="govuk-button govuk-!-margin-bottom-0"
              @click="signOut"
            >
              Sign Out
            </button>
            <button
              v-else
              class="govuk-button"
              @click="signIn"
            >
              Sign In
            </button>
            <p
              v-if="isSignedIn"
              class="govuk-!-margin-bottom-0"
            >
              <b>You are now signed in as {{ userName }}</b>
            </p>
          </div>
        </div>
      </header>
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <div class="govuk-phase-banner">
            <p class="govuk-phase-banner__content">
              <strong class="govuk-tag govuk-phase-banner__content__tag">
                alpha
              </strong>
              <span class="govuk-phase-banner__text">
                This is a new service – your feedback will help us improve it.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <main id="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    userName() {
      return this.$store.state.auth.currentUser.displayName ? this.$store.state.auth.currentUser.displayName : this.$store.state.auth.currentUser.email;
    },    
  },
  methods: {
    signIn() {
      this.$router.push({ name: 'sign-in' });
    },
    signOut() {
      auth().signOut();
      if (this.$route.name != 'vacancies') {
        this.$router.push({ name: 'vacancies' });
      }
    },
  },
};
</script>

<style lang="scss">
  // Required to include global main.scss styles
  .header {
    background-color: #fafafa;
    padding: 1.25em 0.625em 0 0.625em;
  }

  .govuk-main-wrapper {
    padding-top: 0px;
  }
</style>
