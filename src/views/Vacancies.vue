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
            href="https://www.judicialappointments.gov.uk/vacancies/116"
            target="_blank"
          >Deputy District Judge (Civil)</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/114"
            target="_blank"
          >Fee-paid Judge of the First-tier Tribunal and Fee-paid Judge of the Employment Tribunal for England and Wales</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/135"
            target="_blank"
          >Senior Chair Health Service Products (Pricing, Cost Control and Information) Appeals Tribunal
Chair Health Service Products (Pricing, Cost Control and Information) Appeals Tribunal</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/138"
            target="_blank"
          >Deputy Judge of the Upper Tribunal, Immigration and Asylum Chamber</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/133"
            target="_blank"
          >Recorder 2019</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/140"
            target="_blank"
          >Fee-Paid (Specialist Information Rights) Member of the Upper Tribunal assigned to the Administrative Appeals Chamber and First-tier Tribunal General Regulatory Chamber (Information Rights) jurisdiction
</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/143"
            target="_blank"
          >Chair of the Valuation Tribunal for England</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/139"
            target="_blank"
          >Regional Employment Judge</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/177"
            target="_blank"
          >Senior Circuit Judge, Designated Civil Judge</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/183"
            target="_blank"
          >Chamber President of the First-tier Tribunal, Health, Education and Social Care Chamber</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/144"
            target="_blank"
          >s9(1) Authorisation to act as a High Court Judge</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/142"
            target="_blank"
          >Fee-paid Appointed Person, Appeal Tribunal, Trade Marks and Fee-paid Appointed Person, Appeal Tribunal, Registered and Unregistered Design
</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/146"
            target="_blank"
          >President of the Employment Tribunal (England and Wales)</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/180"
            target="_blank"
          >Salaried Principal Judge, First-tier Tribunal (Property Chamber), Land Registration</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/174"
            target="_blank"
          >Fee-paid Education Panel Members for the Special Educational Needs Tribunal for Wales (SENTW)</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/145"
            target="_blank"
          >District Judge</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/153"
            target="_blank"
          >Deputy Queens Bench Master</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/182"
            target="_blank"
          >Chancery Master</a>
        </span>
        <span
          style="color: #1d70b8; font-size: 24px"
          class="govuk-heading-m govuk-!-font-weight-bold"
        >
          <a
            style="font-size: 24px"
            class="govuk-link govuk-body"
            href="https://www.judicialappointments.gov.uk/vacancies/181"
            target="_blank"
          >Deputy Chancery Masters</a>
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
