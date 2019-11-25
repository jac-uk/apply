<template>
  <div class="govuk-panel govuk-panel--confirmation background-blue text-left">
    <h1 class="govuk-panel__title">
      New application process
    </h1>
    <div class="govuk-panel__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <p>Pellentesque elit eget gravida cum sociis natoque penatibus et magnis. </p>
      <p>Fermentum posuere urna nec tincidunt praesent semper feugiat.</p>  
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
