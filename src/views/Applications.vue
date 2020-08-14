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
                class="govuk-link"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item moj-side-navigation__item--active">
              <RouterLink
                class="govuk-link"
                aria-current="page"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <!-- @TODO remove QT link ?-->
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'qualifying-tests-list' }"
              >
                Qualifying Tests
              </RouterLink>
            </li>
            <!-- @TODO remove QT link ?-->
            <!-- <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'personal-details' }"
              >
                Personal Details
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'diversity-information' }"
              >
                Diversity Information
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'character-information' }"
              >
                Character Information
              </RouterLink>
            </li> -->
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
                <RouterLink
                  v-if="application.status == 'draft'"
                  class="govuk-button moj-button-menu__item"
                  :to="{ name: 'task-list', params: { id: application.exerciseId } }"
                  role="button"
                  data-module="govuk-button"
                >
                  Continue with application
                </RouterLink>
                <RouterLink
                  v-else
                  class="govuk-button govuk-button--secondary moj-button-menu__item"
                  :to="{ name: 'review', params: { id: application.exerciseId } }"
                  role="button"
                  data-module="govuk-button"
                >
                  View sent application
                </RouterLink>

                <RouterLink
                  v-if="application.characterChecks && application.characterChecks.declaration === true"
                  class="govuk-button govuk-button--secondary moj-button-menu__item float-right"
                  :to="{ name: 'character-checks-review', params: { id: application.exerciseId } }"
                  role="button"
                  data-module="govuk-button"
                >
                  View good character checks consent
                </RouterLink>
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

export default {
  computed: {
    ...mapState('applications', [
      'records',
    ]),
  },
  created() {
    this.$store.dispatch('applications/bind');
  },
};
</script>
