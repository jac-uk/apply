<template>
  <div class="govuk-grid-row govuk-!-margin-bottom-6">
    <div class="govuk-grid-column-two-thirds">
      <h1>
        Review your answers
      </h1>

      <ol
        v-if="!isScenario"
        class="moj-task-list"
      >
        <li>
          <h2 class="moj-task-list__section">
            Questions
          </h2>

          <ul class="moj-task-list__items govuk-!-padding-left-0">
            <li
              v-for="(question, questionIndex) in questions"
              :key="questionIndex"
              class="moj-task-list__item display-flex"
              @click="saveHistory({ action: 'review', question: questionIndex, txt: question.details });"
            >
              <span class="truncated-container moj-task-list__task-name">
                <span class="truncated">
                  <span>{{ questionIndex + 1 }}. </span>
                  <RouterLink :to="{ name: `qualifying-test-question`, params: { questionNumber: questionIndex + 1 } }">
                    {{ question.details }}
                  </RouterLink>
                </span>
              </span>

              <strong
                v-if="!responses[questionIndex]"
                class="govuk-tag govuk-tag--grey"
              >
                Not started
              </strong>
              <strong
                v-else-if="responses[questionIndex].completed"
                class="govuk-tag moj-task-list__task-completed"
              >
                Completed
              </strong>
              <strong
                v-else
                class="govuk-tag govuk-tag--grey"
              >
                Skipped
              </strong>
            </li>
          </ul>
        </li>
      </ol>

      <ol
        v-if="isScenario"
        class="moj-task-list"
      >
        <li
          v-for="(scenario, index) in questions"
          :key="index"
        >
          <h2 class="moj-task-list__section">
            {{ `Scenario ${index + 1}` }}
          </h2>

          <ul class="moj-task-list__items">
            <li
              v-for="(question, questionIndex) in scenario.options"
              :key="questionIndex"
              class="moj-task-list__item display-flex"
              @click="saveHistory({ action: 'review', question: questionIndex, scenario: index, txt: question.question });"
            >
              <RouterLink
                :to="{ name: `qualifying-test-scenario`, params: { scenarioNumber: index + 1, questionNumber: questionIndex + 1 } }"
                class="moj-task-list__task-name truncated-container"
              >
                <span class="truncated">
                  {{ question.question }}
                </span>
              </RouterLink>

              <strong
                v-if="!(responses[index] && responses[index].responsesForScenario[questionIndex])"
                class="govuk-tag govuk-tag--grey"
              >
                Not started
              </strong>
              <strong
                v-else-if="responses[index].responsesForScenario[questionIndex].completed"
                class="govuk-tag moj-task-list__task-completed"
              >
                Completed
              </strong>
              <strong
                v-else
                class="govuk-tag govuk-tag--grey"
              >
                Skipped
              </strong>
            </li>
          </ul>
        </li>
      </ol>

      <button
        class="govuk-button govuk-button--success"
        @click="openModal"
      >
        Submit answers
      </button>

      <Modal
        ref="modalRef"
        button-text="Submit answers"
        :cancelable="true"
        :message="'Are you sure you want to submit your answers? This will end the test.'"
        @confirmed="modalConfirmed"
        @closed="modalClosed"
      />
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase';
import Modal from '@/components/Page/Modal';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      qualifyingTestResponse: this.$store.getters['qualifyingTestResponse/data'](),
    };
  },
  computed: {
    questions() {
      return this.qualifyingTestResponse.testQuestions.questions;
    },
    responses() {
      return this.qualifyingTestResponse.responses;
    },
    isScenario(){
      return this.qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SCENARIO;
    },
  },
  methods: {
    openModal(){
      this.saveHistory({ action: 'submit', txt: 'Submit answers' });
      this.$refs.modalRef.openModal();
    },
    async modalConfirmed(){
      const data = {
        status: QUALIFYING_TEST.STATUS.COMPLETED,
        'statusLog.completed': firebase.firestore.FieldValue.serverTimestamp(),
      };
      await this.$store.dispatch('qualifyingTestResponse/save', data);
      await this.$store.dispatch('connectionMonitor/stop');
      this.saveHistory({ action: 'modal', txt: 'Submit answers' });
      this.$router.push({ name: 'qualifying-test-submitted' });
    },
    modalClosed(){
      this.saveHistory({ action: 'modal', txt: 'Cancel' });
    },
    async saveHistory(data) {
      const objToSave = this.prepareSaveHistory({
        ...data,
        location: 'review answers',
      });
      await this.$store.dispatch('qualifyingTestResponse/save', objToSave);
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
<style scoped>
  .truncated{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  .truncated-container{
    width: auto;
    overflow: hidden;
    display: grid;
    flex-grow: 1;
  }
  .govuk-tag {
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
  }
  .display-flex{
    display: flex;
  }
</style>
