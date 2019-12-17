<template>
<div>
  <RouterLink class="govuk-link" :to="{ name: 'vacancies' }">
    Vacancies
  </RouterLink>

  <div class="govuk-grid-row">
    <!--SIDE NAV-->
    <div class="govuk-grid-column-one-quarter">
      <ul class="dwp-vertical-navigation">
        <li>
          <a aria-current="page" href="Applications?current=Applications">
            Applications
          </a>
        </li>
        <li>
          <a href="PersonalDetails?current=PersonalDetails">
            Personal details
          </a>
        </li>
        <li>
          <a href="DiversityInformation?current=DiversityInformation">
            Diversity information
          </a>
        </li>
        <li>
          <a href="CharacterInformation?current=tab-CharacterInformation">
            Character information
          </a>
        </li>
      </ul>
    </div>

    <div class="govuk-grid-column-three-quarters">

      <!--HEADER-->
      <h1 class="govuk-heading-xl">Applications</h1>

      <ul class="govuk-list">
        <li v-for="application in records" :key="application.id" class="govuk-!-margin-top-7">
          <span v-if="application.exerciseName && application.exerciseRef" class="govuk-caption-l">{{ application.exerciseRef }}<br></span>
          <RouterLink class="govuk-link govuk-heading-m govuk-!-font-weight-bold govuk-!-margin-bottom-0" :to="{ name: 'task-list', params: { id: application.exerciseId } }">
            <span v-if="application.exerciseName">{{ application.exerciseName }}</span>
            <span v-else-if="application.exerciseRef">{{ application.exerciseRef }}</span>
            <span v-else>{{ application.exerciseId }}</span>
          </RouterLink>
          Status: {{ application.status }}
        </li>
      </ul>

      <!--GREY PANEL-->
      <h2 class="govuk-heading-m">Current applications</h2>
      <div class="govuk-panel--s govuk-panel--grey">
        <p class="govuk-body-l">114 Judge of the First-tier Tribunal for England and
          Wales</p>
        <p class="govuk-body"><a href="#">Continue with
            application</a></p>
      </div>
      <br><br>

      <h2 class="govuk-heading-m">Previous applications</h2>
      <!--TABLE-->
      <table class="govuk-table">
        <tr class="govuk-table__row">
          <td class="govuk-table__cell"><a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
              Circuit judge</a></td>
          <td class="govuk-table__cell">Closed 17 February 2018</td>
          <td class="govuk-table__cell">Selected</td>
        </tr>
        <tr class="govuk-table__row">
          <td class="govuk-table__cell"><a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
              Recorder</a></td>
          <td class="govuk-table__cell">Closed 12 April 2017</td>
          <td class="govuk-table__cell">Not selected</td>
        </tr>
        </tbody>
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
