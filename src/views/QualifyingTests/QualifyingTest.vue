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
      <Countdown
        v-if="testInProgress && !isSupportingPage"
        :start-time="qualifyingTestResponse.statusLog.started"
        :end-time="qualifyingTestResponse.qualifyingTest.endDate"
        :duration="qualifyingTestResponse.duration.testDurationAdjusted"
        :server-time-offset="serverTimeOffset"
        :warning="5"
        :alert="1"
        @change="handleCountdown"
      >
        <template
          #left-slot
        >
          <span>
            <a
              v-if="showPrevious"
              id="previous-link"
              href=""
              :class="`govuk-link countdown-link info-btn--qualifying-tests--previous-question-${infoClass()}`"
              @click.prevent="btnPrevious"
            >
              ❮ Previous
            </a>
          </span>
        </template>
        <template
          #right-slot
        >
          <a
            :class="`govuk-link countdown-link info-btn--qualifying-tests--exit-test-${$route.params.qualifyingTestId}`"
            href=""
            @click.prevent="openExitModal"
          >
            Exit Test
          </a>
        </template>
      </Countdown>
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
          v-if="isSupportingPage || testInProgress"
          :key="$route.fullPath"
          :time-is-up="timerEnded"
          :auto-save="autoSave"
          :exit-test="exitTest"
        />
      </div>
    </template>
  </div>
</template>
<script>
import firebase from '@/firebase';
import LoadingMessage from '@/components/LoadingMessage';
import Modal from '@/components/Page/Modal';
import Countdown from '@/components/QualifyingTest/Countdown';

export default {
  name: 'QualifyingTest',
  components: {
    LoadingMessage,
    Modal,
    Countdown,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
      timerEnded: false,
      autoSave: false,
      exitTest: false,
      serverTimeOffset: 0,
      testInProgress: false,
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
    isSupportingPage() {
      return ['qualifying-test-information', 'qualifying-test-submitted'].indexOf(this.$route.name) >= 0;
    },
  },
  watch: {
    qualifyingTestResponse: async function (newVal) {
      if (newVal) {
        if (this.qualifyingTestResponse && this.qualifyingTestResponse.lastUpdated && this.qualifyingTestResponse.lastUpdatedClientTime) {
          this.serverTimeOffset = this.qualifyingTestResponse.lastUpdated.getTime() - this.qualifyingTestResponse.lastUpdatedClientTime.getTime();
          this.testInProgress = this.$store.getters['qualifyingTestResponse/testInProgress'];
        }
        if (this.testInProgress) {
          await this.$store.dispatch('connectionMonitor/start', `qualifyingTest/${this.qualifyingTestId}`);
        } else {
          this.$store.dispatch('connectionMonitor/stop');
        }
      }
    },
    '$route.params.qualifyingTestId'() {
      this.loadQualifyingTestResponse();
    },
  },
  async created() {
    await this.loadQualifyingTestResponse();
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponse/unbind');
  },
  methods: {
    async loadQualifyingTestResponse() {
      try {
        const qualifyingTestResponse = await this.$store.dispatch('qualifyingTestResponse/bind', this.$route.params.qualifyingTestId);
        if (qualifyingTestResponse === null) {
          return this.redirectToList();
        }
        if (!this.$store.getters['qualifyingTestResponse/isOpen']) {
          return this.redirectToList();
        }
        if (!(this.$store.getters['qualifyingTestResponse/timeLeft'] > 0)) {
          return this.redirectToList();
        }
        if (this.$store.getters['qualifyingTestResponse/isCompleted']) {
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
      switch (params.action) {
      case 'refresh':
        this.$store.dispatch('qualifyingTestResponse/save', {});
        break;
      case 'ended':
        this.autoSave = false;
        this.timerEnded = true;
        this.$store.dispatch('qualifyingTestResponse/outOfTime');
        this.openTimeElapsedModal();
        break;
      case 'autoSave':
        this.autoSave = true;
        break;
      case 'cleanAutoSave':
        this.autoSave = false;
        break;
      }
    },
    openTimeElapsedModal(){
      this.$refs.timeElapsedModalRef.openModal();
    },
    openExitModal(){
      const historyToSave = this.prepareSaveHistory({
        action: 'exit',
        txt: 'Exit Test',
        location: 'timer bar',
        question: this.$route.params.questionNumber - 1,
      });
      this.$store.dispatch('qualifyingTestResponse/save', historyToSave);
      this.$refs.exitModalRef.openModal();
    },
    btnModalConfirmed() {
      this.$router.push({ name: 'qualifying-test-submitted' });
    },
    btnClockChangedModalConfirmed() {
      this.$router.push({ name: 'qualifying-tests' });
    },
    btnExitModalConfirmed() {
      if (this.$route.params.questionNumber) {
        this.exitTest = true; // question view will exit test
      } else {
        const dataToSave = this.prepareSaveHistory({
          action: 'exit',
          txt: 'Exit Test',
          location: 'modal',
          question: null,
        });
        this.$store.dispatch('qualifyingTestResponse/save', dataToSave);
      }
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
    prepareSaveHistory(data) {
      const date = new Date();
      const objToSave = {
        history: firebase.firestore.FieldValue.arrayUnion({
          ...data,
          timestamp: firebase.firestore.Timestamp.fromDate(date),
        }),
      };
      return objToSave;
    },
  },
};
</script>

<style lang="scss" scoped>

  @mixin mobile-view {
    @media (max-width: 599px) { @content; }
  }

  #previous-link::after{
    content: 'Question';
  }

  @include mobile-view {
    #previous-link::after{
      content: '';
    }
  }

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
