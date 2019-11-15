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
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('exercise/bind', id)
      .then((data) => {
        if(data === null) {
          this.redirectToErrorPage();
        } else {
          this.loaded = true;
          this.loadCandidateAndApplication();
        }
      }).catch((e) => {
        this.loadFailed = true;
        throw e;
      });
  },
  methods: {
    redirectToErrorPage() {
      this.$router.replace({ name: 'exercise-not-found' });
    },
    loadCandidateAndApplication () {
      this.$store.dispatch('candidate/bind', this.$store.state.auth.currentUser.uid);
    },
  },
};
</script>
