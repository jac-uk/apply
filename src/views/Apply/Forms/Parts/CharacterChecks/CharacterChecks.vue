<template>
  <div class="govuk-grid-row">
    <LoadingMessage
      v-if="!loaded"
      :load-failed="loadFailed"
    />
    <RouterView v-else />
  </div>
</template>

<script>
import LoadingMessage from '@/components/LoadingMessage.vue';
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';

export default {
  name: 'CandidateFormCharacterChecks',
  components: {
    LoadingMessage,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  watch: {
    async vacancyId() {
      await this.load();
    },
  },
  async created() {
    this.setupPart(APPLICATION_FORM_PARTS.CHARACTER_CHECKS);
    if (this.vacancyId) {
      await this.load();
    }
  },
  methods: {
    async load() {
      try {
        const today = Date.now();
        const vacancy = await this.$store.dispatch('vacancy/bind', this.vacancyId);

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
