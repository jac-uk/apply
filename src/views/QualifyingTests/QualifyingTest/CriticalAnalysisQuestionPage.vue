<template>
  <!-- [ Qualifying Test | Question | {{ $route.params.qualifyingTestId }} | #{{ $route.params.questionNumber }} ] -->
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <RadioGroup
        id="criticalAnalysisRadio"
        v-model="selection"
        :label="question.title"
        hint="Choose 1 option."
      >
        <RadioItem
          v-for="(answer, index) in question.answers"
          :key="index"
          :value="answer"
          :label="answer"
        />
      </RadioGroup>
      <div class="govuk-!-margin-bottom-4">
        <button
          class="govuk-button govuk-button--secondary govuk-!-margin-right-1"
          data-module="govuk-button"
        >
          Skip
        </button>
        <button
          class="govuk-button"
          style="background-color:#00703c;"
          data-module="govuk-button"
        >
          Save and continue
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

export default {
  components: {
    RadioGroup,
    RadioItem,
  },
  data(){
    return {
      selection: null,
      question: {
        title: 'Which oneWhich oneWhich oneWhich oneWhich oneWhich one?',
        answers: ['Answer1','Answer2','Answer3','Answer4'],
      },
    };
  },
};
</script>
