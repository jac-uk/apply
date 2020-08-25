<template>
  <div class="govuk-grid-row">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <RouterView
      v-else
      :key="$route.fullPath"
    />
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
    const id = this.$route.params.qualifyingTestId;
    this.$store.dispatch('qualifyingTestResponse/bind', id)
      .then((data) => {
        if (data === null) {
          this.redirectToPage();
        }
        else {
          this.loaded = true;
        }
      }).catch((e) => {
        this.loadFailed = true;
        throw e;
      });
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponse/unbind');
  },
  methods: {
    redirectToPage() {
      this.$router.replace({ name: 'qualifying-tests' });
    },
  },
};
</script>
