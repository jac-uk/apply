<template>
  <div class="govuk-grid-row govuk-!-margin-bottom-6">
    <div class="govuk-grid-column-two-thirds">
      <h1>
        Answer Overview
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
              v-for="(question, questionIndex) in qualifyingTestResponse.qualifyingTest.questions.questions"
              :key="questionIndex"
              class="moj-task-list__item"
            >
              <a
                class="moj-task-list__task-name"
                href="#"
              >
                {{ question.details }}
              </a>
              <strong class="govuk-tag moj-task-list__task-completed">
                [ STATUS ]
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
          v-for="(section, index) in qualifyingTestResponse.qualifyingTest.questions.questions"
          :key="index"
        >
          <h2 class="moj-task-list__section">
            {{ `Scenario ${index + 1}` }}
          </h2>
          <ul class="moj-task-list__items">
            <li
              v-for="(question, questionIndex) in section.options"
              :key="questionIndex"
              class="moj-task-list__item"
            >
              <a
                class="moj-task-list__task-name"
                href="#"
              >
                {{ question.answer }}
              </a>
              <strong class="govuk-tag moj-task-list__task-completed">
                [ STATUS ]
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

export default {
  components: {
    Modal,
  },
  data(){
    return {
      sections: [
        {
          title: 'Section one',
          questions: [
            'question?',
            'question?',
            'question?',
          ],
        },
        {
          title: 'Section two',
          questions: [
            'question?',
            'question?',
            'question?',
          ],
        },
      ],
    };
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    isScenario(){
      return this.qualifyingTestResponse.qualifyingTest.type === 'scenario' ? true : false;
    },
  },
  methods: {
    openModal(){
      this.$refs.modalRef.openModal();
    },
    modalConfirmed(){
      this.$router.push({ name: 'qualifying-test-submitted' });
    },
    modalClosed(){
      //pass
    },
  },
};
</script>

