<template>
  <div>
    <LoadingMessage
      v-if="loaded === false"
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
  async mounted() {
    const id = this.$route.params.id;
    try {
      const vacancy = await this.$store.dispatch('vacancy/bind', id);
      let userInvitation = null;

      if (vacancy.inviteOnly) {
        const invitations = await this.$store.dispatch('invitations/bind');
        userInvitation = invitations ? invitations.find((invite) => invite.vacancy.id === id) : null;
        if (userInvitation) {
          await this.$store.dispatch('invitations/acceptInvitation', userInvitation.id);
        }
      }
      if (vacancy === null || (vacancy.inviteOnly && !userInvitation)) {
        this.redirectToErrorPage();
      } else {
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
  },
};
</script>
