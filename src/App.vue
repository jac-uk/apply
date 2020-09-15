<template>
  <div class="page-container">
    <header
      v-if="!fullPageMode"
      class="govuk-width-container header"
    >
      <div
        class="header-background clearfix"
      >
        <div class="govuk-grid-column-two-thirds organisation__margin-bottom">
          <div class="gem-c-organisation-logo brand--ministry-of-justice">
            <a href="https://judicialappointments.gov.uk/">
              <img
                src="@/assets/jac-logo.svg"
                alt="Judicial Appointments Commission"
                width="197"
                height="66"
                style="text-align: center"
              >
            </a>
          </div>
        </div>
        <div class="govuk-grid-column-one-third organisation__margin-bottom">
          <button
            v-if="isSignedIn"
            class="govuk-button govuk-!-margin-right-1"
            @click="signOut"
          >
            Sign Out
          </button>
          <button
            v-else
            :disabled="isSignInPage"
            class="govuk-button govuk-!-margin-right-1"
            @click="signIn"
          >
            Sign In
          </button>
          <button
            :disabled="isVacanciesPage"
            class="govuk-button"
            @click="gotoVacancies"
          >
            Vacancies
          </button>
          <br>
          <span
            v-if="isSignedIn"
            class="app-c-topic-list__item nostyle"
          >
            <b>You are now signed in as {{ userName }}</b>
          </span>
        </div>
      </div>
      <div
        class="govuk-phase-banner govuk-!-margin-bottom-4 print-none"
      >
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">
            alpha
          </strong>
          <span class="govuk-phase-banner__text">
            This is a new service – your <a
              style="font-size: 16px"
              class="govuk-link govuk-body"
              href="https://docs.google.com/forms/d/e/1FAIpQLSexm0qgMV0tOQTFP4QUSegOOX89VeYhWwuofV---JZTOEXGIQ/viewform"
              target="_blank"
            >feedback</a> will help us improve it.
          </span>
        </p>
      </div>
    </header>

    <main
      id="main-content"
      class="govuk-width-container govuk-main-wrapper govuk-main-wrapper--auto-spacing"
      role="main"
    >
      <RouterView />
    </main>

    <footer
      v-if="!fullPageMode"
      class="govuk-footer"
      role="contentinfo"
    >
      <div class="govuk-width-container">
        <div class="govuk-footer__meta">
          <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 class="govuk-visually-hidden">
              Support links
            </h2>
            <svg
              aria-hidden="true"
              focusable="false"
              class="govuk-footer__licence-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 483.2 195.7"
              height="17"
              width="41"
            >
              <path
                fill="currentColor"
                d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
              />
            </svg>
            <span class="govuk-footer__licence-description">All content is available under the 
              <a
                class="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
              , except where otherwise stated</span>
          </div>
        </div>
      </div>
    </footer>
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
    isSignInPage() {
      return this.$route.name === 'sign-in';
    },
    isVacanciesPage() {
      return this.$route.name === 'vacancies';
    },
    fullPageMode() {
      return this.$route.meta.fullPageMode;
    },
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
    gotoVacancies() {
      this.$router.push({ name: 'vacancies' });
    },
  },
};
</script>

<style lang="scss">
  .govuk-grid-column-one-half {
    width: 100%;
    float: left;
  }

  .header {
    background-color: #fafafa;
    padding: 1.25em 0.625em 0 0.625em;
  };

  .govuk-footer {
    display: flow-root;
    width: 100%;
  };

  .govuk-main-wrapper {
    padding: 0px;
  }

  .page-container {
    position: relative;
    min-height: 100vh;
  }
</style>
