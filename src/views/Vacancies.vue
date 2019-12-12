<template>
  <div>
    <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
      Applications
    </h1>
    <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
      Open vacancies
    </h1>
    <ul class="govuk-list">
      <!-- <li

        class="govuk-!-margin-top-7"
      >
        <a
          class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
          href="https://www.judicialappointments.gov.uk/vacancies/151"
        >
          Deputy Chairman of the Agricultural Land Tribunal for Wales
        </a>

        <p>
          <span
            class="govuk-body govuk-!-font-weight-bold"
          >
            Launch Date:
          </span>
          <span
            class="govuk-body"
          >
            28 October 2019 - 13:00
          </span>
        </p>
        <p>
          <span
            class="govuk-body govuk-!-font-weight-bold"
          >
            Closing Date:
          </span>
          <span
            class="govuk-body"
          >
            28 November 2019 - 13:00
          </span>
        </p>
        <p> Insert a Summary about the role - This advert is on Jars</p>

        <p class="govuk-body govuk-!-margin-bottom-7">
          <a
            class="govuk-link govuk-body"
            href="#"
          >
            Sign up
          </a>
          for an alert about this exercise
        </p>
        <hr>
      </li> -->

      <li
        v-for="vacancy in records"
        :key="vacancy.id"
        class="govuk-!-margin-top-7"
      >
        <RouterLink
          class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
          :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
        >
          {{ vacancy.name }}
        </RouterLink>

        <p>
          <span
            class="govuk-body govuk-!-font-weight-bold"
          >
            Launch Date:
          </span>
          <span
            v-if="vacancy.applicationOpenDate"
            class="govuk-body"
          >
            {{ vacancy.applicationOpenDate | dateFormatter }} - 13:00
          </span>
        </p>
        <p>
          <span
            class="govuk-body govuk-!-font-weight-bold"
          >
            Closing Date:
          </span>
          <span
            v-if="vacancy.applicationCloseDate"
            class="govuk-body"
          >
            {{ vacancy.applicationCloseDate | dateFormatter }} - 13:00
          </span>
        </p>
        <p> Insert a Summary about the role</p>

        <p class="govuk-body govuk-!-margin-bottom-7">
          <RouterLink
            class="govuk-link govuk-body"
            :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
          >
            Sign up
          </RouterLink>
          for an alert about this exercise
        </p>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  filters: {
    dateFormatter (date) {
      return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    },
  },
  computed: {
    ...mapState('vacancies', [
      'records',
    ]),
  },
  created() {
    this.$store.dispatch('vacancies/bind');
  },
};
</script>

<style>

</style>
