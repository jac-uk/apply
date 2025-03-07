<template>
  <div class="page-container">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <Header v-if="!fullPageMode" />

      <main
        id="main-content"
        class="govuk-width-container"
        role="main"
      >
        <div
          :class="fullPageMode ? 'govuk-!-margin-0' : 'govuk-main-wrapper govuk-main-wrapper--auto-spacing govuk-!-padding-top-0'"
        >
          <div
            v-if="validInvitations.length && !fullPageMode"
          >
            <Banner
              v-for="invite in validInvitations"
              :key="invite.id"
              status="information"
            >
              <span>
                You've been invited to apply for
                <RouterLink
                  :to="{ name: 'vacancy-details', params: { id: invite.vacancyId } }"
                >
                  {{ invite.name }}
                </RouterLink>
              </span>
            </Banner>
          </div>
          <Breadcrumb />

          <div
            v-if="$route.meta.isMultilanguage && enableApplyInWelsh"
            style="display: flex; justify-content: flex-end; gap: 10px;"
          >
            <button
              v-if="language === LANGUAGES.WELSH"
              class="govuk-button govuk-button--success"
              @click="setLanguage(LANGUAGES.ENGLISH)"
            >
              {{ $filters.lookup(LANGUAGES.ENGLISH) }}
            </button>
            <button
              v-else-if="language === LANGUAGES.ENGLISH"
              class="govuk-button govuk-button--success"
              @click="setLanguage(LANGUAGES.WELSH)"
            >
              {{ $filters.lookup(LANGUAGES.WELSH) }}
            </button>
          </div>

          <RouterView />
        </div>
      </main>

      <BackToTop />
      <Footer
        v-if="!fullPageMode"
      />
    </template>
  </div>
</template>

<script>
import Header from '@/components/Page/Header.vue';
import Footer from '@/components/Page/Footer.vue';
import Banner from '@/components/Page/Banner.vue';
import LoadingMessage from '@/components/LoadingMessage.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import BackToTop from '@/components/BackToTop.vue';
import { updateLangToTextNode } from '@/helpers/language';
import { LANGUAGES } from '@/helpers/constants';
import { getTimeLeft } from '@/services/activityService';
export default {
  name: 'App',
  components: {
    LoadingMessage,
    Header,
    Footer,
    Banner,
    Breadcrumb,
    BackToTop,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
      LANGUAGES,
      timeLeft: getTimeLeft(),
    };
  },
  computed: {
    language() {
      return this.$store.state.application.language;
    },
    fullPageMode() {
      return this.$route.meta.fullPageMode;
    },
    invitations() {
      return this.$store.state.invitations.records;
    },
    vacancies() {
      return this.$store.getters['vacancies/openVacancies'];
    },
    enableApplyInWelsh() {
      return this.$store.getters['vacancy/enableApplyInWelsh'];
    },
    validInvitations() {
      const result = [];
      if (this.invitations.length && this.vacancies.length) {
        this.invitations.forEach(invite => {
          if (['created', 'invited'].includes(invite.status)) {
            if (this.vacancies.some(vac => vac.id === invite.vacancy.id)) {
              const validInvite = {
                name: this.vacancies.find(vacancy => vacancy.id === invite.vacancy.id).name,
                vacancyId: invite.vacancy.id,
              };
              result.push(validInvite);
            }
          }
        });
      }
      return result;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    activityTimeoutSeconds() {
      return this.$store.getters['settings/getActivityTimeoutSeconds'];
    },
  },
  watch: {
    isSignedIn: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$store.dispatch('invitations/bind');
        } else {
          this.$store.dispatch('invitations/unbind');
        }
      },
    },
    invitations: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val && val.length) {
          this.$store.dispatch('vacancies/bind', { vacancyIds: this.invitations.map(invite => invite.vacancy.id) });
        }
      },
    },
  },
  async mounted() {
    this.loaded = true;
    // Start interval to update the time left every second
    this.intervalId = setInterval(this.updateTimerDisplay, 1000);
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  },
  updated: async function() {
    if (this.$route.meta.isMultilanguage) {
      setTimeout(() => {
        updateLangToTextNode(document.querySelector('#main-content'), this.language);
      }, 10);
    }
  },
  methods: {
    setLanguage(lang) {
      this.$store.dispatch('application/setLanguage', lang);
      updateLangToTextNode(document.querySelector('#main-content'), lang);
    },

    updateTimerDisplay() {
      this.timeLeft = getTimeLeft();
    },
  },
};
</script>

<style lang="scss" scoped>

  .page-container {
    position: relative;
    min-height: 100%;
    overflow: hidden;
  }
</style>
