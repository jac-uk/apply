<template>
  <div class="qt_page">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <!-- <Countdown
        v-if="timeLeft"
        :duration="timeLeft"
        :warning="5"
        :alert="1"
      /> -->
      <Countdown2
        v-if="showCountdown"
        :start-time="qualifyingTestResponse.statusLog.started"
        :duration="qualifyingTestResponse.duration.testDurationAdjusted"
        :warning="5"
        :alert="1"
        @change="handleCountdown"
      />

      <Modal 
        ref="modalRef"
        title="Time has expired"
        button-text="I understand"
        :cancelable="false"
        message="Your time to complete this test has expired, we will submit the answers you have completed so far."
        @confirmed="btnModalConfirmed"
      />

      <RouterView :key="$route.fullPath" />
    </template>
  </div>
</template>
<script>
import LoadingMessage from '@/components/LoadingMessage';
import Modal from '@/components/Page/Modal';
import Countdown2 from '@/components/QualifyingTest/Countdown2';

export default {
  components: {
    LoadingMessage,
    Modal,
    Countdown2,
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
    showCountdown() {
      return this.qualifyingTestResponse.statusLog && this.qualifyingTestResponse.statusLog.started && !this.qualifyingTestResponse.statusLog.completed;
    },
  },
  async mounted() {
    try {
      const qualifyingTestResponse = await this.$store.dispatch('qualifyingTestResponse/bind', this.$route.params.qualifyingTestId);
      if (qualifyingTestResponse === null) {
        return this.redirectToList();
      }

      const isQTOpen = this.$store.getters['qualifyingTestResponse/isOpen'];

      if (!isQTOpen) {
        return this.redirectToList();
      }

      this.loaded = true;
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponses/unbind');
    this.$store.dispatch('qualifyingTestResponse/unbind');
  },
  methods: {
    redirectToList() {
      this.$router.replace({ name: 'qualifying-tests' });
    },
    handleCountdown(params) {
      if (params.action === 'ended') {
        this.openModal();
      }
    },
    openModal(){
      this.$refs.modalRef.openModal();
    },
    btnModalConfirmed() {
      this.$router.push({ name: 'qualifying-test-submitted' });
    },
  },
};
</script>
<style scoped>
.qt_page{
  padding-top: 25px;
}
</style>
