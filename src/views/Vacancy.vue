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
      let vacancy = await this.$store.dispatch('vacancy/bind', id);
      if (vacancy === null) {
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
      this.$router.replace({ name: 'vacancy-not-found' });
    },
  },
};
</script>
