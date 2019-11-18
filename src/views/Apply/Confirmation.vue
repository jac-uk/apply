<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation jac-purple">
        <h1 class="govuk-panel__title">
          Application sent
        </h1>
        <h2 class="govuk-panel__body govuk-!-font-size-27 govuk-!-margin-top-7">
          You've applied for:
          <p class="govuk-!-font-weight-bold govuk-!-margin-top-0">
            153 Deputy Queens Bench Master
          </p>
        </h2>
      </div>

      <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-0">
        We've sent a confirmation email to:
      </p>
      <p class="govuk-body govuk-!-font-weight-bold">
        {{ email }}
      </p>

      <h2 class="govuk-heading-m">
        What happens next?
      </h2>
      <p class="govuk-body">
        We'll now decide if you should be shortlisted for this role.
      </p>
      <p class="govuk-body">
        We'll email you in early January 2020 to let you know either way.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: 'test@Email.com',
    };
  },
};
</script>

<style scoped>

.jac-purple {
  background-color: #753880;
}

.govuk-panel {
  text-align: left;
}

</style>
