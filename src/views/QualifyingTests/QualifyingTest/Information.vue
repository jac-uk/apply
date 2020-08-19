<template>
  <!-- [ Qualifying Test | Information Page | {{ $route.params.qualifyingTestId }} ] -->
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-!-margin-bottom-6">
        <h1 class="govuk-heading-l govuk-!-margin-bottom-1">
          009 Judge of the First-tier Tribunal Legal member Situational Judgement Test
        </h1>
        <div>
          Important information 
        </div>
        <ul>
          <li>
            this test contains [ AMMOUNT ] questions
          </li>
          <li>
            You have [ TIME ] minuites to complete this test, this includes [ EXTRA-TIME ] of reasonable adjustment time.
          </li>
          <li>
            You must submit your test by 21:00, [ DATE ]
          </li>
          <li>
            Make sure you've got a stable internet connection before you start
          </li>
          <li>
            Your answers will be saved as you go through the test, but you can still edit them at the end before you submit your test
          </li>
          <li>
            If you run out of time, we will submit whatever answers you have completed up until that point
          </li>
        </ul>
      </div>
      <Checkbox label="I confirm that i will keep this test condifential and not share scenarios or questions at any point during or after the selection exercise" />
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
};
</script>
