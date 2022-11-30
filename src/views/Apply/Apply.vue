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
import LoadingMessage from '@/components/LoadingMessage';

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
          await this.$store.dispatch('application/save', {
            status: 'draft',
            progress: { started: true },
          });
        }
        await this.$store.dispatch('applications/bind');
        this.loaded = true;
      }
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
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
