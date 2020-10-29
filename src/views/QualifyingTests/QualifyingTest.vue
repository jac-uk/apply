<template>
  <div
    class="qt_page"
    style="word-break:break-word;"
  >
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <Countdown2
        v-if="testInProgress && !isInformationPage"
        :start-time="qualifyingTestResponse.statusLog.started"
        :end-time="qualifyingTestResponse.qualifyingTest.endDate"
        :duration="qualifyingTestResponse.duration.testDurationAdjusted"
        :warning="5"
        :alert="1"
        :mobile-view="isMobile"
        @change="handleCountdown"
      >
        <template
          v-slot:left-slot
        >
          <span
            v-if="showPrevious"
          >
            <a
              href=""
              :class="`govuk-link countdown-link info-btn--qualifying-tests--previous-question-${infoClass()}`"
              @click.prevent="btnPrevious"
            >
              ❮ {{ isMobile ? 'Previous' : 'Previous Question' }}
            </a>
          </span>
        </template>
        <template
          v-slot:right-slot
        >
          <a
            :class="`govuk-link countdown-link info-btn--qualifying-tests--exit-test-${$route.params.qualifyingTestId}`"
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
      <div
        class="govuk-!-margin-left-5 govuk-!-margin-right-5"
      >
        <RouterView
          :key="$route.fullPath"
          :time-is-up="timerEnded"
          :auto-save="autoSave"
        />
      </div>
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
      timerEnded: false,
      autoSave: false,
    };
  },
  computed: {
    isMobile() {  // TODO really this should be a CSS-only solution
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    },
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
      const result = this.qualifyingTestResponse
        && this.qualifyingTestResponse.statusLog
        && this.qualifyingTestResponse.statusLog.started
        && this.$store.getters['qualifyingTestResponse/testInProgress'];
      return result;
    },
    isTimeLeft() {
      const amountTimeLeft = this.$store.getters['qualifyingTestResponse/timeLeft'];
      return amountTimeLeft > 0;
    },
    isNotCompleted() {
      return this.qualifyingTestResponse.statusLog.completed === null || this.qualifyingTestResponse.statusLog.completed === undefined;
    },
    isInformationPage() {
      return this.$route.name === 'qualifying-test-information';
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
    '$route.params.qualifyingTestId'() {
      this.loadQualifyingTestResponse();
    },
  },
  async mounted() {
    await this.loadQualifyingTestResponse();
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponses/unbind');
    this.$store.dispatch('qualifyingTestResponse/unbind');
  },
  methods: {
    async loadQualifyingTestResponse() {
      try {
        const qualifyingTestResponse = await this.$store.dispatch('qualifyingTestResponse/bind', this.$route.params.qualifyingTestId);
        if (qualifyingTestResponse === null) {
          return this.redirectToList();
        }

        const isQTOpen = this.$store.getters['qualifyingTestResponse/isOpen'];

        if (!isQTOpen) {
          return this.redirectToList();
        }

        // isCompleted > redirect
        // noTimeLeft > redirect
        const noTimeLeft = !this.isTimeLeft;
        const isCompleted = !this.isNotCompleted;

        if (noTimeLeft || isCompleted) {
          return this.redirectToList();
        }

        this.loaded = true;
      } catch (e) {
        this.loadFailed = true;
        throw e;
      }
    },
    btnPrevious() {
      this.$router.replace({ params: { questionNumber: this.$route.params.questionNumber - 1 } });
    },
    redirectToList() {
      this.$router.replace({ name: 'qualifying-tests' });
    },
    handleCountdown(params) {
      if (params.action === 'ended') {
        this.timerEnded = true;
        this.$store.dispatch('qualifyingTestResponse/outOfTime');
        this.openTimeElapsedModal();
      }
      this.autoSave = false;
      if (params.action === 'autoSave') {
        this.autoSave = true;
      }
      if (params.action === 'cleanAutoSave') {
        this.autoSave = false;
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
      this.timerEnded = true;
      this.$nextTick(() => {  // ensures change is picked up before we leave this route
        this.$router.push({ name: 'qualifying-tests' });
      });
    },
    infoClass() {
      const params = this.$route.params;
      const hyphenated = `${params.qualifyingTestId}--scenario-${params.scenarioNumber}--from-${params.questionNumber}-to-${params.questionNumber - 1}`;
      return hyphenated;
    },
  },
};
</script>

<style lang="scss" scoped>

  .govuk-width-container{
    width: 100%;
    padding-top: 0 !important;
  }

  .countdown-link {
    color: white !important;
  }

  .qt_page {
    padding-top: 60px;
  }

</style>
