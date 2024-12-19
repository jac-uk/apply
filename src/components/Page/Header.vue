<template>
  <div>
    <header class="govuk-header govuk-!-padding-2">
      <div class="govuk-header__container govuk-!-margin-bottom-1 govuk-width-container">
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
              class="govuk-button govuk-!-margin-right-1 info-btn--header--sign-out"
              data-module="govuk-button"
              @click="signOut"
            >
              Sign Out
            </button>
            <button
              v-else
              :disabled="isSignInPage"
              class="govuk-button govuk-!-margin-right-1 info-btn--header--sign-in"
              data-module="govuk-button"
              @click="signIn"
            >
              Sign In
            </button>
            <button
              :disabled="isVacanciesPage"
              class="govuk-button  info-btn--header--vacancies"
              data-module="govuk-button"
              @click="gotoVacancies"
            >
              Vacancies
            </button>
            <br>
            <span
              v-if="isSignedIn"
              class="app-c-topic-list__item"
              style="color:black;"
            >
              <b>You are now signed in as {{ userName }}</b>
            </span>
          </div>
        </div>
      </div>
    </header>
    <div
      class="govuk-phase-banner govuk-!-margin-bottom-4 print-none govuk-width-container"
    >
      <p class="govuk-phase-banner__content">
        <span class="govuk-phase-banner__text">
          This is a new service – your <a
            style="font-size: 16px"
            class="govuk-link govuk-body info-link--header--feedback"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdS7FDTzrwokQwiRriCzA45q2eiZT5xUX1dl9WfkJUYZAKiBQ/viewform"
            target="_blank"
          >feedback</a> will help us improve it.
        </span>
      </p>
    </div>
  </div>
</template>
<script>
//import { auth } from '@/firebase';
import { logoutUser } from '@/services/authService.js';
export default {
  name: 'Header',
  data(){
    return {
      dropDownExpanded: false,
    };
  },
  computed: {
    isSignInPage() {
      return this.$route.name === 'sign-in';
    },
    isVacanciesPage() {
      return this.$route.name === 'vacancies';
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    userName() {
      return this.$store.state.auth.currentUser.displayName ? this.$store.state.auth.currentUser.displayName : this.$store.state.auth.currentUser.email;
    },
  },
  methods: {
    toggleExpand(){
      this.dropDownExpanded = !this.dropDownExpanded;
    },
    signIn() {
      let nextPage = this.$route.path;
      // if the user is on the sign-up or reset-password page, redirect them to the vacancies page after sign-in
      if (['/sign-up-step1', '/reset-password'].includes(this.$route.path)) {
        nextPage = '/vacancies';
      }
      this.$router.push({ name: 'sign-in', query: { nextPage: nextPage } });
    },
    async signOut() {
      //auth.signOut();
      await logoutUser();
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
  .govuk-header {
      background-color: #fafafa !important;
      border-bottom: 1px solid #b1b4b6 !important;
      overflow: hidden;
    .govuk-header__container{
      border-bottom: 0 !important;
    }
  };
</style>
