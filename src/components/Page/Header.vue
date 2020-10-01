<template>
  <header class="govuk-header">
    <div class="govuk-header__container govuk-!-margin-bottom-1  govuk-!-padding-top-3 govuk-!-padding-bottom-3 govuk-width-container">
      <div
        class="header-background clearfix"
        style="display: flex;"
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
          <div 
            v-if="isSignedIn"
            class="moj-button-menu float-right"
          >
            <button
              ref="dropDownRef"
              class="govuk-button drop-down-button moj-button-menu__toggle-button govuk-button--secondary moj-button-menu__toggle-button--secondary govuk-!-margin-bottom-0"
              type="button"
              aria-haspopup="true"
              :aria-expanded="dropDownExpanded.toString()"
              @click="toggleExpand"
            >
              Account
            </button>
            <div
              class="moj-button-menu__wrapper float-left"
              role="menu"
            >
              <button
                class="drop-down-button govuk-!-margin-right-1"
                style="pointer-events: none; word-break: break-word;"
              >
                Signed in as {{ userName }}
              </button>
              <button
                class="govuk-button govuk-button--secondary drop-down-button govuk-!-margin-right-1"
                @click="signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div v-else>
            <button
              :disabled="isSignInPage"
              class="govuk-button govuk-button--secondary float-right"
              @click="signIn"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- <button
  :disabled="isVacanciesPage"
  class="govuk-button"
  @click="gotoVacancies"
>
  Vacancies
</button> -->
</template>
<script>
import { auth } from '@/firebase';
export default {
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
<style lang="scss" scoped>
  header {
    background-color: #753880 !important;
    border-bottom: none !important;
    // padding: 1.25em 0.625em 0 0.625em;
    // margin: 0 !important;
    // width: 99%;
    // overflow: hidden;
    // max-width: 100vw !important;
  };
  .govuk-header__container{
    border-bottom: 0 !important;
  }
  img {
    filter: brightness(0) saturate(1) invert(1);
  }
  .moj-button-menu{
    width:37px;
  }
  @media screen and (min-width: 1200px) {
      .moj-button-menu {
        width:375px;
      }
  }
</style>
