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
          <!-- <li>
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
          </li> -->
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
              v-if="showSignUp(vacancy)"
              class="govuk-body govuk-!-margin-bottom-7"
            >
              <a
                class="govuk-link govuk-body"
                :href="vacancy.subscriberAlertsUrl"
                target="_blank"
              >Sign up</a> for an alert about this exercise
            </p>
            <hr>
          </li>
        </ul>
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
          Future applications
        </h1>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/181%20%26amp%3B%20182"
            target="_blank"
          >Chancery Master and Deputy Chancery Masters</a>
        </span>
        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/156"
            target="_blank"
          >Fee-paid Disability Qualified Tribunal Member of the First-tier Tribunal Social Entitlement Chamber</a>
        </span>
        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/152"
            target="_blank"
          >Fee-Paid Specialist Member of the Upper Tribunal assigned to the Administrative Appeals Chamber (Disclosure and Barring jurisdiction) and First-Tier Health, Education and Social Care Chamber (Care Standards jurisdiction)</a>
        </span>
        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/159"
            target="_blank"
          >Fee Paid Lay Members First-tier Tribunal Health, Education and Social Care (HESC) and Mental Health Review Tribunal for Wales (MHRT)</a>
        </span>
        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/155"
            target="_blank"
          >Circuit Judge 2020</a>
        </span>
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
          Exercises in progress
        </h1>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/184"
            target="_blank"
          >Senior Circuit Judge of the Employment Appeal Tribunal</a>
        </span>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/147"
            target="_blank"
          >Judge Advocate General</a>
        </span>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/151"
            target="_blank"
          >Deputy Chairman of the Agricultural Land Tribunal for Wales</a>
        </span>
        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/148"
            target="_blank"
          >Fee-paid Medical Members, First-tier Tribunal, Social Entitlement Chamber (Social Security and Child Support)</a>
        </span>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/150"
            target="_blank"
          >Fee-paid Medical Members First-tier Tribunal, Health, Education and Social Care Chamber (Mental Health)</a>
        </span>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/149"
            target="_blank"
          >High Court Judge</a>
        </span>

        <span
          style="color: #1d70b8;"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/176"
            target="_blank"
          >Senior Circuit Judge, Resident Judge</a>
        </span>
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
  methods: {
    showSignUp(vacancy) {
      if (vacancy.subscriberAlertsUrl) {
        if (vacancy.applicationOpenDate) {
          const today = new Date();
          return vacancy.applicationOpenDate > today;
        }
        return true;
      }
      return false;
    },
  },
};
</script>
