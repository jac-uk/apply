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
      let invitations = this.$store.state.invitations.records;

      if (vacancy.inviteOnly) {
        if (!invitations.length) {
          invitations = await this.$store.dispatch('invitations/bind');
        }
        userInvitation = invitations ? invitations.find((invite) => invite.vacancy.id === this.vacancyId) : null;
      }
      
      if (vacancy === null) {
        this.redirectToErrorPage();
      } else if (this.$store.getters['vacancy/getOpenDate'] > today) {
        console.log('aplly / 1');
        this.redirectToVacancyDetails();
      } else {
        console.log('aplly / 2');
        await this.$store.dispatch('candidate/bind');
        await this.$store.dispatch('application/bind');

        if (!this.$store.state.application.record) {
          console.log('aplly / 3');
          if (vacancy.inviteOnly) {
            if (userInvitation) {
              console.log('aplly / 4');
              await this.$store.dispatch('invitations/acceptInvitation', userInvitation.id);
            }
            else {
              console.log('aplly / 5');
              this.redirectToErrorPage();
            }
          }
          console.log('aplly / 6');
          await this.$store.dispatch('application/save', {
            status: 'draft',
            progress: { started: true },
          });
          console.log('aplly / 7');
        }
        console.log('aplly / 8');
        await this.$store.dispatch('applications/bind');
        console.log('aplly / 9');
        this.loaded = true;
      }
    } catch (e) {
      this.loadFailed = true;
      console.log('load failed');
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
