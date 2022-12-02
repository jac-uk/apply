<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <div class="govuk-panel govuk-panel--confirmation jac-purple">
        <h1 class="govuk-panel__title">
          Application sent
        </h1>
        <h2 class="govuk-panel__body govuk-!-font-size-27 govuk-!-margin-top-7">
          Your reference number is:
          <p class="govuk-!-font-weight-bold govuk-!-margin-top-3">
            {{ application.referenceNumber }}
          </p>
        </h2>
      </div>

      <!-- <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-0">
        We've sent a confirmation email to:
      </p>
      <p class="govuk-body govuk-!-font-weight-bold">
        {{ application.personalDetails.email }}
      </p> -->

      <div v-if="hasApplicationProcess">
        <h2 class="govuk-heading-m">
          What happens next?
        </h2>
        <p class="govuk-body">
          We have received your submission for this stage of the application process.
        </p>
        <p class="govuk-body">
          Please refer to the
          <RouterLink
            class="govuk-link"
            :to="{ name: 'vacancy-details', params: { id: vacancy.id} }"
          >
            exercise information page
          </RouterLink>
          for details of the exercise timeline.
        </p>
        <p class="govuk-body">
          Should you need to contact the selection team, details of the exercise mailbox can be found on the
          <RouterLink
            class="govuk-link"
            :to="{ name: 'vacancy-details', params: { id: vacancy.id} }"
          >
            information page
          </RouterLink>
        </p>
      </div>
      <div v-else>
        <h2 class="govuk-heading-m">
          What happens next?
        </h2>
        <!-- <p class="govuk-body">
          We'll now decide if you should be shortlisted for this role.
        </p>
        <p class="govuk-body">
          We'll email you in {{ vacancy.shortlistingOutcomeDate | formatDate('month') }} to let you know either way.
        </p> -->
        <p class="govuk-body">
          Thank you for your application.
          We will be in touch in due course.
          Please refer to the website for details of this selection exercise and dates of the next stage in the process.
        </p>
      </div>

      <p class="govuk-body">
        You can view your application and apply for other vacancies from your
        <RouterLink
          class="govuk-link"
          :to="{ name: 'applications' }"
        >
          dashboard.
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { hasApplicationProcess } from '@/helpers/exerciseHelper';
export default {
  name: 'ConfirmationView',
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
    application () {
      return this.$store.state.application.record;
    },
    hasApplicationProcess() {
      return hasApplicationProcess(this.vacancy);
    },
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
