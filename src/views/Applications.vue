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
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'profile' }"
              >
                Your profile
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
                  <div v-if="canContinueWithApplication(application)">
                    <div
                      v-if="hasCompletedMoreInformation(application)"
                      class="govuk-body-s govuk-!-margin-top-0 govuk-!-margin-bottom-1"
                    >
                      Your application is complete and <strong>has been received</strong>. However you can continue to make changes until 13:00 on {{ $filters.formatDate(informationDeadline(application)) }}.
                    </div>
                  </div>
                  <RouterLink
                    v-if="canContinueWithApplication(application)"
                    :class="`govuk-button moj-button-menu__item info-link--applications--continue-with-application-${application.exerciseId}`"
                    :to="{ name: 'task-list', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    <span v-if="hasCompletedMoreInformation(application)">Amend application</span>
                    <span v-else>Continue with application</span>
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
                    v-if="application.characterChecks && application.characterChecks.status === 'requested'"
                    :class="`govuk-button govuk-button--secondary moj-button-menu__item float-right  info-link--applications--view-good-character-checks-consent-${application.exerciseId}`"
                    :to="{ name: 'character-checks-intro', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    Complete character checks consent form
                  </RouterLink>
                  <RouterLink
                    v-if="application.characterChecks && application.characterChecks.status === 'completed'"
                    :class="`govuk-button govuk-button--secondary moj-button-menu__item float-right  info-link--applications--view-good-character-checks-consent-${application.exerciseId}`"
                    :to="{ name: 'character-checks-review', params: { id: application.exerciseId } }"
                    role="button"
                    data-module="govuk-button"
                  >
                    View sent character checks consent form
                  </RouterLink>

                  <!-- @TODO:
                      - change class on buttons below
                      - add dynamic form id to links
                  -->

                  <template v-if="getRoute(application.exerciseId)">
                    <RouterLink
                      :class="`govuk-button govuk-button--secondary moj-button-menu__item info-link--applications--view-good-character-checks-consent-${application.exerciseId}`"
                      :to="getRoute(application.exerciseId)"
                      role="button"
                      data-module="govuk-button"
                    >
                      View candidate availability task
                    </RouterLink>

                    <RouterLink
                      :class="`govuk-button govuk-button--secondary moj-button-menu__item float-right  info-link--applications--view-good-character-checks-consent-${application.exerciseId}`"
                      :to="{ name: 'candidate-form-review', params: { id: application.exerciseId, formId: 123 } }"
                      role="button"
                      data-module="govuk-button"
                    >
                      Review
                    </RouterLink>
                  </template>

                </div>
              </div>
            </div>
          </li>
        </ul>

        <hr class="govuk-section-break govuk-section-break--xl">
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';
import isVacancyOpen from '@/helpers/isVacancyOpen';
import { isMoreInformationNeeded, isApplicationComplete, informationDeadline } from '@/helpers/exerciseHelper';

export default {
  name: 'Applications',
  computed: {
    ...mapState('applications', ['records']),
    allVacancies() {
      return this.$store.getters['vacancies/allVacancies'];
    },
    candidateForms() {
      //return this.$store.state.candidateForms.records;

      return [
        {
          exercise: { id: '1qef6rsaSLvvsZHrJuw7' },
          task: 'candidateAvailability',
          createdAt: null,
          lastUpdated: null,
          openDate: '2023-11-16',
          closeDate: '2024-12-31',
          candidateIds: ['TmA0uGoFH9WzZqLuxJAvd6Q79i72', '123'],
          parts: [
            'candidateAvailability',
            'panellistConflicts',
            'commissionerConflicts',
            'characterChecks',
            'reasonableAdjustments',
            'jurisdiction',
            'welshPosts',
          ],
          panellists: [
            { id: 'hgZO2QEZ6pUJgF6CDxOp', fullName: 'Albert Brown' },
            { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
          ]
        },
        {
          //exercise: { id: 'B9NM1PGDaYBJxdZhhKcF' },
          exercise: { id: '4TZAoQDjKPHJil0wdyOq' },
          task: 'candidateAvailability',
          createdAt: null,
          lastUpdated: null,
          openDate: '2023-11-16',
          closeDate: '2024-12-31',
          candidateIds: ['123'],
          parts: [
            'candidateAvailability',
            'panellistConflicts',
            'commissionerConflicts',
            'characterChecks',
          ],
          panellists: [
            { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
          ]
        },
      ];
    },
    routesByExerciseId() {
      const obj = {};
      for (let i=0; i<this.candidateForms.length; ++i) {
        const record = this.candidateForms[i];
        const firstPart = record.parts[0];
        const exerciseId = record.exercise.id;

        // @TODO: Use the candidateForm id in the route below!

        const route = { name: `candidate-form-tasks-${firstPart}`, params: { id: exerciseId, formId: 123 } };
        obj[exerciseId] = route;
      }
      return obj;
    },
  },
  created() {
    this.$store.dispatch('applications/bind');
    this.$store.dispatch('vacancies/bind');

    // @TODO: Put back!
    //this.$store.dispatch('candidateForms/bind');
  },
  unmounted() {
    this.$store.dispatch('applications/unbind');
  },
  methods: {
    getRoute(vacancyId) {
      return (vacancyId in this.routesByExerciseId) ? this.routesByExerciseId[vacancyId] : '';
    },
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
        return isMoreInformationNeeded(vacancy, application);
      default:
        return false;
      }
    },
    hasCompletedMoreInformation(application) {
      if (!application) return false;
      const vacancy = this.$store.getters['vacancies/getVacancy'](application.exerciseId);
      if (!vacancy) return false;
      if (isMoreInformationNeeded(vacancy, application)) {
        if (isApplicationComplete(vacancy, application)) {
          return true;
        }
      }
      return false;
    },
    informationDeadline(application) {
      if (!application) return false;
      const vacancy = this.$store.getters['vacancies/getVacancy'](application.exerciseId);
      if (!vacancy) return false;
      if (isMoreInformationNeeded(vacancy, application)) {
        return informationDeadline(vacancy);
      }
    },
  },
};
</script>
