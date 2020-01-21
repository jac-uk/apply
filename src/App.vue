<template>
  <div class="govuk-width-container">
    <div class="govuk-main-wrapper">
      <header class="header">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <!-- HEADER SECTION -->
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-two-thirds organisation__margin-bottom">
                <div class="gem-c-organisation-logo brand--ministry-of-justice">
                  <img
                    src="@/assets/jac-logo.svg"
                    alt="Judicial Appointments Commission"
                    width="197"
                    height="66"
                    style="text-align: center"
                  >
                </div>
              </div>

              <div class="govuk-grid-column-one-third organisation__margin-bottom">
                <ol class="app-c-topic-list app-c-topic-list--small brand--ministry-of-justice ">
                  <li class="app-c-topic-list__item nostyle">
                    <RouterLink
                      class="govuk-link app-c-topic-list__link app-c-topic-list__link--no-underline brand__color"
                      :to="{ name: 'vacancies' }"
                    >
                      Vacancies
                    </RouterLink>
                  </li>
                  <li class="app-c-topic-list__item nostyle">
                    <button
                      v-if="isSignedIn"
                      class="govuk-button govuk-!-margin-bottom-0"
                      @click="signOut"
                    >
                      Sign Out
                    </button>
                    <button
                      v-else
                      :disabled="isSignInPage"
                      class="govuk-button"
                      @click="signIn"
                    >
                      Sign In
                    </button>
                  </li>
                  <li
                    v-if="isSignedIn"
                    class="app-c-topic-list__item nostyle"
                  >
                    <b>You are now signed in as {{ userName }}</b>
                  </li>
                </ol>
              </div>
            </div>
            <!-- HEADER SECTION -->
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
                This is a new service – your <a
                  style="font-size: 16px"
                  class="govuk-link govuk-body"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSexm0qgMV0tOQTFP4QUSegOOX89VeYhWwuofV---JZTOEXGIQ/viewform"
                  target="_blank"
                >feedback</a> will help us improve it.
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
    isSignInPage() {
      return this.$route.name === 'sign-in';
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
  },
};
</script>

<style lang="scss">
// @import 'https://assets.publishing.service.gov.uk/static/govuk-template-c0b8ba8b1652aacad298d74f24752260187f538b50c40c2484f7f333cbc3cf2b.css';
// @import 'https://assets.publishing.service.gov.uk/static/fonts-e9ec5a5f82e5c2a17927ce356e5a054cb28025ec1547ec5d00f5c98d2ec5e481.css';
// @import 'https://assets.publishing.service.gov.uk/static/core-layout-535eb07d05bcae550061481a9cbefad8c4807bf8da32da77312cf8ef2ab616c0.css';
// @import 'https://assets.publishing.service.gov.uk/collections/application-1da0069f0ad5c09cfd287444f877560d89793e621ff13c1ababf63cc4eaceb8e.css';
  // Required to include global main.scss styles
  li.nostyle {
      list-style-type: none;
  }
  .govuk-grid-column-one-half {
    width: 100%;
    float: left;
}
  .header {
    background-color: #fafafa;
    padding: 1.25em 0.625em 0 0.625em;
  };

  .govuk-main-wrapper {
    padding-top: 0px;
  }
</style>
