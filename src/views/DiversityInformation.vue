<template>
  <div>
    <RouterLink
      class="govuk-link"
      :to="{ name: 'vacancies' }"
    >
      Vacancies
    </RouterLink>

    <div class="govuk-grid-row">
      <!--SIDE NAV-->
      <div class="govuk-grid-column-one-quarter">
        <ul class="dwp-vertical-navigation">
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

      <div class="govuk-grid-column-three-quarters">
        <!--HEADER-->
        <h1 class="govuk-heading-xl">
          Diversity information
        </h1>

        <table class="govuk-table">
          <tr class="govuk-table__row">
            <th
              scope="row"
              class="govuk-table__header"
            >
              Disability
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
              Ethnicity
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
              Gender
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
              Religious beliefs
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
              Sexual orientation
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
              Social mobility
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

<style lang="scss" scoped>
/* Side nav */

.dwp-vertical-navigation {
    margin: 0 0 20px;
    padding: 0;
}

.dwp-vertical-navigation li {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 16px;

    @include govuk-media-query($from: tablet) {
        max-width: 200px;
    }
}

.dwp-vertical-navigation li a {
    padding: 10px;
    display: block;

    &:hover {
        color: govuk-colour("dark-blue");
    }
}

.dwp-vertical-navigation a[aria-current="page"] {
    color: govuk-colour("blue");
    font-weight: bold;
    text-decoration: none;
    border-left: 4px solid govuk-colour("blue");
    background-color: govuk-colour("light-grey");
}

.dwp-vertical-navigation {
    margin: 0;
    padding: 0;
    > li {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 1em;
        > a {
            padding: 0.625em;
            display: block;
            text-decoration: none;
        }
        > ul {
            display: none;
            > li {
                list-style: none;
                margin: 0;
                padding: 0;
                font-size: 1em;
                > a {
                    padding: 0.625em 0.625em 0.625em 1.25em;
                    display: block;
                    text-decoration: none;
                }
            }
        }
        &.on > a {
            color: #1d70b8;
            font-weight: bold;
            background-color: #f3f2f1;
        }
        &.open {
            border-left: 4px solid #1d70b8;
            > ul {
                display: block;
                padding-inline-start: 0;
                > li {
                    &.on {
                        background-color: #f3f2f1;
                        > a {
                            color: #1d70b8;
                            font-weight: bold;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
