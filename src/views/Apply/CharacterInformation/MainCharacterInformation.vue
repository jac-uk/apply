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
  name: 'MainCharacterInformation',
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
      let vacancy = this.$store.state.vacancy.record;
      if (!vacancy || vacancy.id !== this.vacancyId) {
        vacancy = await this.$store.dispatch('vacancy/bind', this.vacancyId);
      }
      if (vacancy === null) {
        this.redirectToErrorPage();
      } else if (this.$store.getters['vacancy/getOpenDate'] > today) {
        this.redirectToVacancyDetails();
      } else {
        await this.$store.dispatch('candidate/bind');
        await this.$store.dispatch('application/bind');
        if (!this.$store.state.application.record) {
          this.redirectToVacancyDetails();
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
      this.$router.replace({ name: 'exercise-not-found' });
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
