<template>
  <div class="govuk-grid-row govuk-!-margin-bottom-6">
    <div class="govuk-grid-column-two-thirds">
      <h2>
        {{ qualifyingTestResponse.qualifyingTest.title }}
      </h2>

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

      <!-- <ol class="moj-task-list">
        <li
          v-for="(section, index) in qualifyingTestResponse.qualifyingTest.questions"
          :key="index"
        >
          <h2 class="moj-task-list__section">
            <span class="moj-task-list__section-number">
              {{ index + 1 }}.
            </span>
            {{ section.introduction }}
          </h2>
          <ul class="moj-task-list__items">
            <li
              v-for="(question, questionIndex) in section.questions"
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
      </ol> -->
      
      <button
        href="#"
        role="button"
        draggable="false"
        class="govuk-button govuk-button--start"
        data-module="govuk-button"
        style="background-color:#00703c;"
      >
        Start now
        <svg
          class="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M0 0h13l20 20-20 20H0l20-20z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>

export default {
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
};
</script>

