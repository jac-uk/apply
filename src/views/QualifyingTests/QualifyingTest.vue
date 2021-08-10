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
        v-if="testInProgress && !isInformationPage"
        :start-time="qualifyingTestResponse.statusLog.started"
        :end-time="qualifyingTestResponse.qualifyingTest.endDate"
        :duration="qualifyingTestResponse.duration.testDurationAdjusted"
        :server-time-offset="serverTimeOffset"
        :warning="5"
        :alert="1"
        @change="handleCountdown"
      >
        <template
          v-slot:left-slot
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
          :key="$route.fullPath"
          :time-is-up="timerEnded"
          :auto-save="autoSave"
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
      return this.qualifyingTestResponse.statusLog.completed === null ||
        this.qualifyingTestResponse.statusLog.completed === undefined;
    },
    isNotReset() {
      return this.qualifyingTestResponse.statusLog.reset === null ||
        this.qualifyingTestResponse.statusLog.reset === undefined;
    },
    isInformationPage() {
      return this.$route.name === 'qualifying-test-information';
    },
    serverTimeOffset() {
      return this.$store.state.session.serverTimeOffset;
    },
  },
  watch: {
    qualifyingTestResponse: async function (newVal) {
      if (newVal) {
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
    autoSave: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.autoSave) { // here we use autoSave event to refresh session.serverTimeOffset
          this.$store.dispatch('session/load');
        }
      }
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
        const notReset = this.isNotReset;

        if ((noTimeLeft) || (isCompleted && notReset)) {
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
    btnExitModalConfirmed() {
      const historyToSave = this.prepareSaveHistory({
        action: 'exit',
        txt: `Exit Test question ${this.$route.params.questionNumber}`,
        location: 'modal',
        question: this.$route.params.questionNumber - 1,
      });
      this.$store.dispatch('qualifyingTestResponse/save', historyToSave);
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
      const timeNow = firebase.firestore.FieldValue.serverTimestamp(); 
      const date = new Date();
      const objToSave = {
        history: firebase.firestore.FieldValue.arrayUnion({
          ...data, 
          timestamp: firebase.firestore.Timestamp.fromDate(date),
          utcOffset: date.getTimezoneOffset(),
        }),
        lastUpdated: timeNow,
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
