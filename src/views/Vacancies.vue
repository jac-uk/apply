<template>
  <div>
    <div class="govuk-grid-row">
      <div
        v-if="isSignedIn"
        class="govuk-grid-column-one-quarter"
      >
        <nav
          class="moj-side-navigation"
          aria-label="Side navigation"
        >
          <ul class="moj-side-navigation__list">
            <li
              class="moj-side-navigation__item"
              :class="this.$route.name === 'vacancies' ? 'moj-side-navigation__item--active' : null"
            >
              <RouterLink
                class="govuk-link"
                :aria-current="this.$route.name === 'vacancies' ? 'active' : null"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'qualifying-tests' }"
              >
                Qualifying Tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="govuk-!-padding-top-4"
        :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }"
      >
        <div class="openApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6 govuk-!-margin-top-6">
            Open for applications
          </h1>

          <p
            v-if="!openVacancies.length"
            class="govuk-body govuk-!-margin-bottom-6"
          >
            No open vacancies at the moment.
          </p>

          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="vacancy in openVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <div v-if="!vacancy.inviteOnly">
                <RouterLink
                  v-if="vacancy.aboutTheRole"
                  class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  {{ vacancy.name }}
                </RouterLink>

                <a
                  v-else-if="vacancy.externalLink"
                  class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
                  :href="vacancy.externalLink"
                  target="_blank"
                >
                  {{ vacancy.name }}
                </a>

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
                    <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                  </span>
                  <span
                    v-if="vacancy.applicationOpenDate"
                    class="govuk-body"
                  >
                    {{ vacancy.applicationOpenDate | formatDate }} - 13:00
                  </span>
                  <span
                    v-else
                    class="govuk-body"
                  >
                    {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                  </span>
                </p>
                <p v-if="vacancy.applicationCloseDate">
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
                  </span>
                  <span
                    class="govuk-body"
                  >
                    {{ vacancy.applicationCloseDate | formatDate }} - 13:00
                  </span>
                </p>
                <p v-if="vacancy.roleSummary">
                  {{ vacancy.roleSummary }}
                </p>
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
              </div>
            </li>
          </ul>
        </div>

        <div class="futureApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6 govuk-!-margin-top-6">
            Future applications
          </h1>

          <p
            v-if="!futureVacancies.length"
            class="govuk-body govuk-!-margin-bottom-6"
          >
            No future vacancies at the moment.
          </p>

          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="vacancy in futureVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <span class="govuk-heading-m govuk-!-font-weight-bold">{{ vacancy.name }}</span>
              <p>
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                </span>
                <span
                  v-if="vacancy.applicationOpenDate"
                  class="govuk-body"
                >
                  {{ vacancy.applicationOpenDate | formatDate }} - 13:00
                </span>
                <span
                  v-else
                  class="govuk-body"
                >
                  {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                </span>
              </p>
              <p v-if="vacancy.roleSummary">
                {{ vacancy.roleSummary }}
              </p>
              <p>
                <RouterLink
                  v-if="vacancy.aboutTheRole"
                  class="govuk-link govuk-body"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  Find out more
                </RouterLink>

                <a
                  v-if="vacancy.externalLink"
                  class="govuk-link govuk-body"
                  :href="vacancy.externalLink"
                  target="_blank"
                >Find out more</a>
              </p>
              <hr>
            </li>
          </ul>
        </div>

        <div class="inProgressApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6">
            Closed for applications
          </h1>

          <ul class="govuk-list">
            <li
              v-for="vacancy in inProgressVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <span class="govuk-heading-m govuk-!-font-weight-bold">{{ vacancy.name }}</span>
              <p>
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                </span>
                <span
                  v-if="vacancy.applicationOpenDate"
                  class="govuk-body"
                >
                  {{ vacancy.applicationOpenDate | formatDate }} - 13:00
                </span>
                <span
                  v-else
                  class="govuk-body"
                >
                  {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                </span>
              </p>
              <p v-if="vacancy.applicationCloseDate">
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
                </span>
                <span
                  class="govuk-body"
                >
                  {{ vacancy.applicationCloseDate | formatDate }} - 13:00
                </span>
              </p>
              <p v-if="vacancy.roleSummary">
                {{ vacancy.roleSummary }}
              </p>
              <p>
                <RouterLink
                  v-if="vacancy.aboutTheRole"
                  class="govuk-link govuk-body"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  Find out more
                </RouterLink>

                <a
                  v-if="vacancy.externalLink"
                  class="govuk-link govuk-body"
                  :href="vacancy.externalLink"
                  target="_blank"
                >Find out more</a>
              </p>
              <hr class="govuk-section-break govuk-section-break--visible">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('vacancies', [
      'openVacancies',
      'inProgressVacancies',
      'futureVacancies',
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
        const openDate = this.$store.getters['vacancy/getOpenDate'];
        if (openDate) {
          const today = new Date();
          return openDate > today;
        }
        return true;
      }
      return false;
    },
  },
};
</script>
