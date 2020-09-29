<template>
  <div class="page-container">
    <Countdown2
      :start-time="new Date()"	
      :duration="5"
      :warning="5"
      :alert="1"
    >
      <template 
        v-slot:left-slot
      >
        <a
          class="govuk-link countdown-link"
          href=""
          @click.prevent="btnPrevious"
        >
          <span>〈 </span>
          Previous Question
        </a>
      </template>
      <template
        v-slot:right-slot
      >
        <a
          class="govuk-link countdown-link"
          href=""
          @click.prevent="openExitModal"
        >
          Exit Test
        </a>
      </template>
    </Countdown2>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import Countdown2 from '@/components/QualifyingTest/Countdown2';

export default {
  components: {
    Countdown2,
  },
  name: 'App',
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
  // .govuk-grid-column-one-half {
    // width: 100%;
    // float: left;
  // }

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
