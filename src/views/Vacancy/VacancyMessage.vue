<template>
  <div class="govuk-panel govuk-panel--confirmation background-blue text-left">
    <h1 class="govuk-panel__title">
      New application process
    </h1>
    <div class="govuk-panel__body">
      <p>If you've applied with the JAC before, you'll notice that the process for this role is slightly different.</p>
      <p>You'll need to enter some personal details to create your new account profile, as well as professional information for your application.</p>
      <p>
        You can still 
        <a 
          class="info-link--vacancy-message--sign-in-to-your-existing-account"
          href="https://www.judicialappointments.gov.uk/user"
          target="_blank"
        >sign in to your existing account</a>
        to access anything you need for this application, but you cannot apply there.
      </p>
      <RouterLink
        class="govuk-button govuk-button--secondary info-link--vacancy-message--continue"
        data-module="govuk-button"
        :to="{ name: 'eligibility' }"
      >
        Continue
      </RouterLink>   
    </div>
  </div>
</template>

<style scoped>
.text-white {
  color: white;
}
</style>
