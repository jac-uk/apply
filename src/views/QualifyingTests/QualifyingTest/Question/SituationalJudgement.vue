<template>
  <!-- [ Qualifying Test | Question | {{ $route.params.qualifyingTestId }} | #{{ $route.params.questionNumber }} ] -->
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h2 class="govuk-heading-l govuk-!-margin-bottom-0">
        [ Placeholder situational judgement test question title ]
      </h2>
      <span class="govuk-caption-m govuk-!-margin-bottom-3">
        Please select which of the options below are 'most appropriate' and 'least appropriate'. You can only choose one answer as most appropriate and one answer as least appropriate.
      </span>
      
      <RadioGroup
        id="share-data"
        v-model="answer"
        required
        label="[ Answer option placeholder ]"
      >
        <RadioItem
          :value="true"
          label="Most appropriate"
        />
        <RadioItem
          :value="false"
          label="Least appropriate"
        />
      </RadioGroup>

      <RadioGroup
        id="share-data"
        v-model="answer"
        required
        label="[ Answer option placeholder ]"
      >
        <RadioItem
          :value="true"
          label="Most appropriate"
        />
        <RadioItem
          :value="false"
          label="Least appropriate"
        />
      </RadioGroup>

      <RadioGroup
        id="share-data"
        v-model="answer"
        required
        label="[ Answer option placeholder ]"
      >
        <RadioItem
          :value="true"
          label="Most appropriate"
        />
        <RadioItem
          :value="false"
          label="Least appropriate"
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
};
</script>
