<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-quarter">
        <nav
          class="moj-side-navigation"
          aria-label="Side navigation"
        >
          <ul class="moj-side-navigation__list">
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-applications--vacancies"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item moj-side-navigation__item--active">
              <RouterLink
                class="govuk-link info-link--nav-applications--applications"
                aria-current="page"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-applications--qualifying-tests"
                :to="{ name: 'qualifying-tests' }"
              >
                Qualifying Tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="govuk-grid-column-three-quarters govuk-!-padding-top-4">
        <h1 class="govuk-heading-xl">
          Current applications
        </h1>

        <ul class="govuk-list">
          <li
            v-for="application in records"
            :key="application.id"
            class="govuk-!-margin-bottom-6"
          >
            <p class="govuk-body-l govuk-!-margin-bottom-0">
              <template v-if="application.exerciseName || application.exerciseRef">
                <b>{{ application.exerciseRef }}</b> {{ application.exerciseName }}
              </template>
              <template v-else>
                {{ application.exerciseId }}
              </template>
            </p>

            <div class="moj-button-menu">
              <div class="moj-button-menu__wrapper">
                <div
                  v-if="!vacancyExists(application.exerciseId)"
                  class="govuk-body govuk-!-margin-top-3 govuk-!-margin-bottom-0"
                >
                  Data is temporarily unavailable.
                </div>
                <div v-else>
                  <RouterLink
                    v-if="canContinueWithApplication(application)"
                    :class="`govuk-button moj-button-menu__item info-link--applications--continue-with-application-${application.exerciseId}`"
                    :to="{ name: 'task-list', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    Continue with application
                  </RouterLink>
                  <RouterLink
                    v-else
                    :class="`govuk-button govuk-button--secondary moj-button-menu__item  info-link--applications--view-sent-application-${application.exerciseId}`"
                    :to="{ name: 'review', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    <span v-if="application.status == 'draft'">View draft application</span>
                    <span v-else>View sent application</span>
                  </RouterLink>
                  <RouterLink
                    :class="`govuk-button govuk-button--secondary moj-button-menu__item info-link--applications--view-advert-${application.exerciseId}`"
                    role="button"
                    data-module="govuk-button"
                    :to="{ name: 'vacancy-details', params: { id: application.exerciseId } }"
                  >
                    View advert
                  </RouterLink>
                  <RouterLink
                    v-if="application.characterChecks && application.characterChecks.declaration === true"
                    :class="`govuk-button govuk-button--secondary moj-button-menu__item float-right  info-link--applications--view-good-character-checks-consent-${application.exerciseId}`"
                    :to="{ name: 'character-checks-review', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    View good character checks consent
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <hr class="govuk-section-break govuk-section-break--xl">

        <!--
         <h2 class="govuk-heading-m">
          Previous applications
        </h2>
        <table class="govuk-table">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">
              <a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
                Circuit judge</a>
            </td>
            <td class="govuk-table__cell">
              Closed 17 February 2018
            </td>
            <td class="govuk-table__cell">
              Selected
            </td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">
              <a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
                Recorder</a>
            </td>
            <td class="govuk-table__cell">
              Closed 12 April 2017
            </td>
            <td class="govuk-table__cell">
              Not selected
            </td>
          </tr>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';
import isVacancyOpen from '@/helpers/isVacancyOpen';
import { isMoreInformationNeeded } from '@/helpers/exerciseHelper';

export default {
  computed: {
    ...mapState('applications', ['records']),
    allVacancies() {
      return this.$store.getters['vacancies/allVacancies'];
    },
  },
  created() {
    this.$store.dispatch('applications/bind');
    this.$store.dispatch('vacancies/bind');
  },
  methods: {
    vacancyExists(exerciseId) {
      if (!this.allVacancies) {
        return false;
      }
      return this.allVacancies.find(vacancy => vacancy.id === exerciseId) !== undefined;
    },
    canContinueWithApplication(application) {
      if (!application) return false;
      const vacancy = this.$store.getters['vacancies/getVacancy'](application.exerciseId);
      if (!vacancy) return false;
      switch (application.status) {
      case 'draft':
        return isVacancyOpen(vacancy.applicationOpenDate, vacancy.applicationCloseDate, application.dateExtension);
      case 'applied':
        // check whether extra info is needed
        return isMoreInformationNeeded(vacancy, application);
      default:
        return false;
      }
    },

  },
};
</script>
