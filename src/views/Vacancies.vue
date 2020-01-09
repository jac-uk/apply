<template>
  <div>
    <div class="govuk-grid-row">
      <div
        v-if="isSignedIn"
        class="govuk-grid-column-one-quarter"
      >
        <ul class="dwp-vertical-navigation">
          <li>
            <RouterLink
              class="govuk-link"
              aria-current="page"
              :to="{ name: 'vacancies' }"
            >
              Vacancies
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'applications' }"
            >
              Applications
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'personal-details' }"
            >
              Personal Details
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'diversity-information' }"
            >
              Diversity Information
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'character-information' }"
            >
              Character Information
            </RouterLink>
          </li>
        </ul>
      </div>

      <div :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }">
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
              v-if="vacancy.aboutTheRole"
              class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
              :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
            >
              {{ vacancy.name }}
            </RouterLink>

            <span 
              v-else
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ vacancy.name }}
            </span>

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
              <span
                v-else
                class="govuk-body"
              >
                {{ vacancy.estimatedLaunchDate | dateFormatter('month') }}
              </span>
            </p>
            <p v-if="vacancy.applicationCloseDate">
              <span
                class="govuk-body govuk-!-font-weight-bold"
              >
                Closing Date:
              </span>
              <span
                class="govuk-body"
              >
                {{ vacancy.applicationCloseDate | dateFormatter }} - 13:00
              </span>
            </p>
            <p>{{ vacancy.roleSummary }}</p>
            <p
              v-if="vacancy.subscriberAlertsUrl"
              class="govuk-body govuk-!-margin-bottom-7"
            >
              <a
                class="govuk-link govuk-body"
                :href="vacancy.subscriberAlertsUrl"
                target="_blank"
              >
                Sign up
              </a>
              for an alert about this exercise
            </p>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  filters: {
    dateFormatter (date, type) {
      switch (type) {
      case 'month':
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getUTCFullYear()}`;
      default:
        return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
      }
    },
  },
  computed: {
    ...mapState('vacancies', [
      'records',
    ]),
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  created() {
    this.$store.dispatch('vacancies/bind');
  },
};
</script>
