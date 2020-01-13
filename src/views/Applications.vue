<template>
  <div>
    <div class="govuk-grid-row">
      <!--SIDE NAV-->
      <div class="govuk-grid-column-one-quarter">
        <ul class="dwp-vertical-navigation">
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'vacancies' }"
            >
              Vacancies
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              aria-current="page"
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

      <div class="govuk-grid-column-three-quarters">
        <!--HEADER-->
        <h1 class="govuk-heading-xl">
          Applications
        </h1>

        <!--GREY PANEL-->
        <h2 class="govuk-heading-m">
          Current applications
        </h2>
        <div class="govuk-panel--s govuk-panel--grey">
          <div
            v-for="application in records"
            :key="application.id"
          >
            <p class="govuk-body-l govuk-!-margin-bottom-0">
              <span v-if="application.exerciseName || application.exerciseRef">{{ application.exerciseRef }} {{ application.exerciseName }}</span>
              <span v-else>{{ application.exerciseId }}</span>
            </p>
            <p class="govuk-body">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'task-list', params: { id: application.exerciseId } }"
              >
                Continue with application
              </RouterLink>
            </p>
          </div>
        </div>
        <br><br>

        <!-- <h2 class="govuk-heading-m">
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

      <!--END MAIN WRAPPER-->
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
