<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-!-margin-bottom-6">
        <!-- [ Qualifying Test | Submitted | {{ $route.params.qualifyingTestId }} ] -->
        <div>
          <div class="govuk-panel govuk-panel--confirmation">
            <h1 class="govuk-panel__title">
              Test Submitted
            </h1>
            <!-- <div class="govuk-panel__body">
              Your reference number<br><strong>??????????</strong>
            </div> -->
          </div>
        </div>
      </div>
      <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
        Next Steps
        <p class="govuk-body-m govuk-!-margin-top-0">
          You will be informed of the outcome of your situational judgement qualifying test by <strong>[ DATE ]</strong>
          if you don't hear anything by this date, you should contact us at email@jacplaceholder.co.uk
        </p>
      </div>
      <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
        You have another Qualifying Test to complete:
        <div class="govuk-inset-text">
          <a href="">
            Critical analysis qualifying test<br>
          </a>
          <strong class="red-text">
            to be completed by TI:ME, 00th Month YEAR
          </strong>
        </div>
      </div>
      <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
        Useful links
        <ul class="govuk-list">
          <li>
            <a
              class="govuk-link"
              href="#"
            >
              Back to qualifying test overview page
            </a>
          </li>
          <li>
            <a
              class="govuk-link"
              href="#"
            >
              email@jacplaceholder.co.uk
            </a>
          </li>
          <li>
            Contact number: 01234 567 891
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .govuk-inset-text {
    border-color: red;
  }
  .red-text {
    color: red;
  }
</style>
