<template>
  <div class="qt_page">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <Countdown2
        v-if="testInProgress"
        :start-time="qualifyingTestResponse.statusLog.started"	
        :duration="qualifyingTestResponse.duration.testDurationAdjusted"
        :warning="5"
        :alert="5"
        @change="handleCountdown"
      >
        <template 
          v-slot:left-slot
        >
          〈
          <a
            v-if="showPrevious"
            class="govuk-link countdown-link"
            href=""
            @click.prevent="btnPrevious"
          >
            Previous Question
          </a>
        </template>
        <template
          v-slot:right-slot
        >
          <a
            class="govuk-link countdown-link"
            href=""
            @click.prevent="openExitModal"
          >
            Exit Test
          </a>
        </template>
      </Countdown2>
      <Modal 
        ref="timeElapsedModalRef"
        title="Time has expired"
        button-text="I understand"
        :cancelable="false"
        message="Your time to complete this test has expired, we will submit the answers you have completed so far."
        @confirmed="btnModalConfirmed"
      />

      <Modal 
        ref="exitModalRef"
        title="Are you sure?"
        button-text="Exit test"
        :cancelable="true"
        message="Are you sure you want to exit this test? The timer will continue ticking down even if you do?"
        @confirmed="btnExitModalConfirmed"
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
    showPrevious() {
      return this.$route.params.questionNumber > 1;
    },
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    qualifyingTestId() {
      return this.qualifyingTestResponse.qualifyingTest.id;
    },
    testInProgress() {
      return this.$store.getters['qualifyingTestResponse/testInProgress'];
    },
  },
  watch: {
    qualifyingTestResponse: function (newVal) {
      if (newVal) {
        if (this.testInProgress) {
          this.$store.dispatch('connectionMonitor/start', `qualifyingTest/${this.qualifyingTestId}`);
        } else {
          this.$store.dispatch('connectionMonitor/stop');
        }
      }
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
    btnPrevious() {
      this.$router.replace({ params: { questionNumber: this.$route.params.questionNumber - 1 } });
    },
    redirectToList() {
      this.$router.replace({ name: 'qualifying-tests' });
    },
    handleCountdown(params) {
      if (params.action === 'ended') {
        this.openTimeElapsedModal();
      }
    },
    openTimeElapsedModal(){
      this.$refs.timeElapsedModalRef.openModal();
    },
    openExitModal(){
      this.$refs.exitModalRef.openModal();
    },
    btnModalConfirmed() {
      this.$router.push({ name: 'qualifying-test-submitted' });
    },
    btnExitModalConfirmed() {
      this.$router.push({ name: 'qualifying-tests' });
    },
  },
};
</script>
<style>
  .countdown-links{
    color: white !important;
  }
  .qt_page{
    padding-top: 25px;
  }
</style>
