<template>
  <div class="govuk-panel govuk-panel--confirmation background-blue text-left">
    <h1 class="govuk-panel__title">
      New application process
    </h1>
    <div class="govuk-panel__body">
      <p>If you've applied with JAC before, you'll notice that the process for this role is slightly different.</p>
      <p>You'll need to enter some personal details to create your new account profile, as well as professional information for your application.</p>
      <p>
        You can still 
        <RouterLink
          class="govuk-link text-white"
          data-module="govuk-button"
          :to="{ name: 'sign-in' }"
        >
          sign into your existing account
        </RouterLink>  
        to access anything you need for this application, but you cannot apply there.
      </p>
      <RouterLink
        class="govuk-button govuk-button--secondary"
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
