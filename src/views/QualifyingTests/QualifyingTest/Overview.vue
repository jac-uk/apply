<template>
  <!-- [ Qualifying Test | Overview | {{ $route.params.qualifyingTestId }} ] -->
  <div class="govuk-grid-row govuk-!-margin-bottom-6">
    <div class="govuk-grid-column-two-thirds">
      <h2
        class="govuk-heading-l"
      >
        [ QT Overview Placeholder Title ]
      </h2>

      <ol class="moj-task-list">
        <li
          v-for="(section, index) in sections"
          :key="index"
        >
          <h2 class="moj-task-list__section">
            <span class="moj-task-list__section-number">
              {{ index + 1 }}.
            </span>
            {{ section.title }}
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
                {{ question }}
              </a>
              <strong class="govuk-tag moj-task-list__task-completed">
                [ STATUS ]
              </strong>
            </li>
          </ul>
        </li>
      </ol>
      
      <Checkbox> 
        <span class="govuk-heading-m govuk-!-margin-bottom-2">
          I confirm that i will keep this test confidential and not share scenarios or questions at any point during or after the selection exercise
        </span>
      </Checkbox>
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
import Checkbox from '@/components/Form/Checkbox';

export default {
  components: {
    Checkbox,
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
};
</script>

