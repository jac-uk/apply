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
              aria-current="page"
              :to="{ name: 'character-information' }"
            >
              Character Information
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="govuk-grid-column-three-quarters">
        <!--HEADER-->
        <h1 class="govuk-heading-xl">
          Character information
        </h1>

        <table class="govuk-table">
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Motoring offences
            </th>
            <td class="govuk-table__cell">
              <a href="name">Change</a>
            </td>
          </tr>
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Criminal offences
            </th>
            <td class="govuk-table__cell">
              <a href="name">Change</a>
            </td>
          </tr>
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Financial considerations
            </th>
            <td class="govuk-table__cell">
              <a href="name">Change</a>
            </td>
          </tr>
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Professional considerations
            </th>
            <td class="govuk-table__cell">
              <a href="name">Change</a>
            </td>
          </tr>
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Other character considerations
            </th>
            <td class="govuk-table__cell">
              <a href="name">Change</a>
            </td>
          </tr>
        </table>

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
