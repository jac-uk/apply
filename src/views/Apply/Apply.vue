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
      let exercise = await this.$store.dispatch('exercise/bind', id);
      if (exercise === null) {
        this.redirectToErrorPage();
      } else {
        await this.$store.dispatch('candidate/bind');
        await this.$store.dispatch('application/bind');
        if (!this.$store.state.application.record) {
          await this.$store.dispatch('application/save', {
            progress: { started: true },
          });
        }
        this.loaded = true;
      }
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
  },
  methods: {
    redirectToErrorPage() {
      this.$router.replace({ name: 'exercise-not-found' });
    },
  },
};
</script>
