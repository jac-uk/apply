<template>
  <div>
    <LoadingMessage
      v-if="!loaded"
      :load-failed="loadFailed"
    />
    <RouterView v-else />
  </div>
</template>

<script>
import LoadingMessage from '@/components/LoadingMessage.vue';
import { updateLangToTextNode } from '@/helpers/language';
import { getIPAddress, getBrowserInfo } from '@/helpers/browser';

export default {
  name: 'Apply',
  components: {
    LoadingMessage,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  computed: {
    vacancyId() {
      return this.$route.params.id;
    },
    application() {
      return this.$store.state.application.record;
    },
    language() {
      return this.$store.state.application.language;
    },
  },
  async mounted() {
    try {
      const today = Date.now();
      const vacancy = await this.$store.dispatch('vacancy/bind', this.vacancyId);
      let userInvitation = null;
      let invitations = this.$store.state.invitations && this.$store.state.invitations.records;

      if (vacancy && vacancy.inviteOnly) {
        if (!invitations.length) {
          invitations = await this.$store.dispatch('invitations/bind');
        }
        userInvitation = invitations ? invitations.find((invite) => invite.vacancy.id === this.vacancyId) : null;
      }

      if (vacancy === null) {
        this.redirectToErrorPage();
      } else if (this.$store.getters['vacancy/getOpenDate'] > today) {
        this.redirectToVacancyDetails();
      } else {
        await this.$store.dispatch('candidate/bind');
        await this.$store.dispatch('application/bind');

        if (!this.$store.state.application.record) {
          if (vacancy.inviteOnly) {
            if (userInvitation) {
              await this.$store.dispatch('invitations/acceptInvitation', userInvitation.id);
            }
            else {
              this.redirectToErrorPage();
            }
          }
    
          const data = {
            status: 'draft',
            progress: { started: true },
          };

          if (this.language) {
            data['_language'] = this.language;
          }

          // get browser info
          const browserInfo = getBrowserInfo();
          data.client = {
            ip: await getIPAddress(),
            ...browserInfo,
          };

          const personalDetails = this.$store.getters['candidate/personalDetails']();
          if (personalDetails) {
            data.personalDetails = {
              fullName: personalDetails.fullName ? personalDetails.fullName : null,
              email: personalDetails.email ? personalDetails.email : null,
            };
          }
          await this.$store.dispatch('application/save', data);
        }
        await this.$store.dispatch('applications/bind');

        // check current language
        if (this.application && this.application['_language'] !== this.language) {
          await this.$store.dispatch('application/setLanguage', this.application['_language']);
        }
        this.loaded = true;
      }
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
  },
  updated: async function() {
    setTimeout(() => {
      updateLangToTextNode(document.querySelector('#main-content'), this.language);
    }, 100);
  },
  methods: {
    redirectToErrorPage() {
      this.$router.replace({ name: 'not-found' });
    },
    redirectToVacancyDetails() {
      this.$router.replace({
        name: 'vacancy-details',
        params: {
          id: this.vacancyId,
        },
      });
    },
  },
};
</script>
