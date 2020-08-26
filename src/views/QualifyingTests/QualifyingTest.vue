<template>
  <div class="govuk-grid-row">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <Countdown
        v-if="timeLeft"
        :duration="timeLeft"
        :warning="14"
        :alert="1"
      />

      <RouterView :key="$route.fullPath" />
    </template>
  </div>
</template>
<script>
import LoadingMessage from '@/components/LoadingMessage';
import Countdown from '@/components/QualifyingTest/Countdown';

export default {
  components: {
    LoadingMessage,
    Countdown,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    timeLeft() {
      if (
        this.qualifyingTestResponse.statusLog.completed ||
        !this.qualifyingTestResponse.statusLog.started
      ) {
        return false;
      }
      const minute = 60 * 1000;

      const duration = this.qualifyingTestResponse.duration.testDurationAdjusted;
      const startTime = this.qualifyingTestResponse.statusLog.started;
      const endTime = new Date(startTime.getTime() + duration * minute);

      if (endTime < Date.now()) {
        return false;
      }

      return (endTime - Date.now()) / minute;
    },
  },
  mounted() {
    const id = this.$route.params.qualifyingTestId;
    this.$store.dispatch('qualifyingTestResponses/bind').then((data) => {
      if (data === null) {
        this.redirectToPage();
      }
    }).catch((e) => {
      this.loadFailed = true;
      throw e;
    });
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
    this.$store.dispatch('qualifyingTestResponses/unbind');
    this.$store.dispatch('qualifyingTestResponse/unbind');
  },
  methods: {
    redirectToPage() {
      this.$router.replace({ name: 'qualifying-tests' });
    },
  },
};
</script>
