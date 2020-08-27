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

          <ul class="moj-task-list__items">
            <li
              v-for="(question, questionIndex) in questions"
              :key="questionIndex"
              class="moj-task-list__item"
            >
              <RouterLink
              :to="{ name: `qualifying-test-question`, params: { questionNumber: questionIndex + 1 } }"
              class="moj-task-list__task-name"
            >
                Question {{ questionIndex + 1 }}
              </RouterLink>
              <strong
                v-if="question.response.completed"
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
              class="moj-task-list__item"
            >
              <RouterLink
                :to="{ name: `qualifying-test-scenario`, params: { scenarioNumber: index + 1, questionNumber: questionIndex + 1 } }"
                class="moj-task-list__task-name"
              >
                Question {{ questionIndex + 1 }}
              </RouterLink>

              <strong
                v-if="scenario.responses[questionIndex].completed"
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
    isScenario(){
      return this.qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SCENARIO;
    },
  },
  methods: {
    openModal(){
      this.$refs.modalRef.openModal();
    },
    async modalConfirmed(){
      this.qualifyingTestResponse.status = QUALIFYING_TEST.STATUS.COMPLETED;
      this.qualifyingTestResponse.statusLog.completed = new Date();

      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      this.$router.push({ name: 'qualifying-test-submitted' });
    },
    modalClosed(){
      //pass
    },
  },
};
</script>

