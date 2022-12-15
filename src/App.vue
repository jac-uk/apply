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
            v-if="$route.meta.isMultilanguage && isWelshPosts"
            style="display: flex; justify-content: flex-end; gap: 10px;"
          >
            <button
              class="govuk-button govuk-button--secondary"
              :class="{ 'govuk-button--success': language === LANGUAGES.ENGLISH }"
              @click="setLanguage(LANGUAGES.ENGLISH)"
            >
              {{ LANGUAGES.ENGLISH | lookup }}
            </button>
            <button
              class="govuk-button govuk-button--secondary"
              :class="{ 'govuk-button--success': language === LANGUAGES.WELSH }"
              @click="setLanguage(LANGUAGES.WELSH)"
            >
              {{ LANGUAGES.WELSH | lookup }}
            </button>
          </div>

          <RouterView />
        </div>
      </main>

      <Footer
        v-if="!fullPageMode"
      />
    </template>
  </div>
</template>

<script>
import Header from '@/components/Page/Header';
import Footer from '@/components/Page/Footer';
import Banner from '@/components/Page/Banner';
import LoadingMessage from '@/components/LoadingMessage';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { updateLangToTextNode } from '@/helpers/language';
import { LANGUAGES } from '@/helpers/constants';

export default {
  name: 'App',
  components: {
    LoadingMessage,
    Header,
    Footer,
    Banner,
    Breadcrumb,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
      LANGUAGES,
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
    isWelshPosts() {
      return this.$store.getters['vacancy/isWelshPosts'];
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
          // if (this.$store.state.vacancies.records.length) {
          this.$store.dispatch('vacancies/bind', { vacancyIds: this.invitations.map(invite => invite.vacancy.id) });
          // }
        }
      },
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('session/load');
      this.loaded = true;
    } catch {
      this.loadFailed = true;
    }
  },
  updated: async function() {
    if (this.$route.meta.isMultilanguage) {
      setTimeout(() => {
        updateLangToTextNode(document.querySelector('#main-content'), this.language);
      }, 0);
    }
  },
  methods: {
    setLanguage(lang) {
      this.$store.dispatch('application/setLanguage', lang);
      updateLangToTextNode(document.querySelector('#main-content'), lang);
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
