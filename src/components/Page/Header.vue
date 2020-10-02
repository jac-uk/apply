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
              class="govuk-button govuk-!-margin-right-1"
              data-module="govuk-button"
              @click="signOut"
            >
              Sign Out
            </button>
            <button
              v-else
              :disabled="isSignInPage"
              class="govuk-button govuk-!-margin-right-1"
              data-module="govuk-button"
              @click="signIn"
            >
              Sign In
            </button>
            <button
              :disabled="isVacanciesPage"
              class="govuk-button"
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
          
          <!-- <div class="govuk-grid-column-one-third organisation__margin-bottom">
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
          </div> -->
        </div>
      </div>
    </header>
    <div
      class="govuk-phase-banner govuk-!-margin-bottom-4 print-none govuk-width-container"
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
  </div>
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
  .govuk-header {
      // background-color: #753880 !important;
      background-color: #fafafa !important;
      border-bottom: 1px solid #b1b4b6 !important;
      // padding: 1.25em 0.625em 0 0.625em;
      // margin: 0 !important;
      // width: 99%;
      overflow: hidden;
      // max-width: $max-width !important;
    .govuk-header__container{
      border-bottom: 0 !important;
    }
    img {
      // filter: brightness(0) saturate(1) invert(1);
    }
  };
  .moj-button-menu{
    // width:37px;
  }
  @media screen and (min-width: 1200px) {
    .moj-button-menu {
      // width:375px;
    }
  }
</style>
