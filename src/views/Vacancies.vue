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
              :class="$route.name === 'vacancies' ? 'moj-side-navigation__item--active' : null"
            >
              <RouterLink
                class="govuk-link info-link--nav-vacancies--vacancies"
                :aria-current="$route.name === 'vacancies' ? 'active' : null"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--applications"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--qualifying-tests"
                :to="{ name: 'qualifying-tests' }"
              >
                Online tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="govuk-!-padding-top-4"
        :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }"
      >
        <Search
          placeholder="Search vacancies"
          @search="useSearch" 
        />

        <TabsList
          :tabs="tabs"
          :active-tab.sync="activeTab"
        >
          <div
            v-if="activeTab === 'open'"
            class="govuk-tabs__panel"
          >
            <p
              v-if="!openVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No open vacancies at the moment.
            </p>
            <p
              v-else-if="!filteredOpenVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No vacancies found.
            </p>
            <ul
              v-else
              class="govuk-list"
            >
              <li
                v-for="vacancy in filteredOpenVacancies"
                :key="vacancy.id"
                class="govuk-!-margin-top-4"
              >
                <div v-if="!vacancy.inviteOnly">
                  <RouterLink
                    v-if="vacancy.aboutTheRole && !isAdvertTypeListing(vacancy.advertType)"
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
                      {{ vacancy.applicationOpenDate | formatDate('datetime') }}
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
                      {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                    </span>
                  </p>
                  <p v-if="vacancy.immediateStart && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))">
                    <span class="govuk-body govuk-!-font-weight-bold">
                      Number of vacancies:
                    </span>
                    <span class="govuk-body">
                      {{ vacancy.immediateStart }}
                    </span>
                  </p>
                  <p v-if="vacancy.location && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))">
                    <span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> {{ vacancy.location }}</span>
                  </p>
                  <p v-if="vacancy.appointmentType == 'salaried' && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))">
                    <span class="govuk-body govuk-!-font-weight-bold">
                      Salary:
                    </span>
                    <span
                      v-if="vacancy.salaryGrouping"
                      class="govuk-body"
                    >
                      {{ vacancy.salaryGrouping | lookup }}
                    </span>
                    <span
                      v-if="vacancy.salary"
                      class="govuk-body"
                    >
                      {{ vacancy.salary | formatCurrency }}
                    </span>
                  </p>
                  <RouterLink
                    v-if="vacancy.aboutTheRole && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))"
                    class="govuk-button"
                    :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                  >
                    Vacancy details
                  </RouterLink>
                  <hr>
                </div>

                <div v-if="vacancy.welshPosts">
                  <div v-if="!vacancy.inviteOnly">
                    <p>
                      <span
                        class="govuk-body govuk-!-font-weight-bold"
                      >
                        <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                      </span>
                      <span
                        v-if="vacancy.applicationOpenDate"
                        class="govuk-body"
                      >
                        {{ vacancy.applicationOpenDate | formatDate('datetime') }}
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
                        <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad cau: </span>
                      </span>
                      <span
                        class="govuk-body"
                      >
                        {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                      </span>
                    </p>
                    <hr>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div
            v-if="activeTab === 'future'"
            class="govuk-tabs__panel"
          >
            <p
              v-if="!futureVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No future vacancies at the moment.
            </p>
            <p
              v-else-if="!filteredFutureVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No vacancies found.
            </p>
            <ul
              v-else
              class="govuk-list"
            >
              <li
                v-for="vacancy in filteredFutureVacancies"
                :key="vacancy.id"
                class="govuk-!-margin-top-4"
              >
                <RouterLink
                  v-if="vacancy.aboutTheRole && !isAdvertTypeListing(vacancy.advertType)"
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
                    {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                  </span>
                  <span
                    v-else
                    class="govuk-body"
                  >
                    {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                  </span>
                </p>
                <p
                  v-if="vacancy.subscriberAlertsUrl"
                  class="govuk-body govuk-!-margin-bottom-5"
                >
                  <a
                    class="govuk-link govuk-body"
                    :href="vacancy.subscriberAlertsUrl"
                    target="_blank"
                  >Sign up</a> for an alert about this exercise
                </p>
                <hr>

                <div v-if="vacancy.welshPosts">
                  <p>
                    <span
                      class="govuk-body govuk-!-font-weight-bold"
                    >
                      <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                    </span>
                    <span
                      v-if="vacancy.applicationOpenDate"
                      class="govuk-body"
                    >
                      {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                    </span>
                    <span
                      v-else
                      class="govuk-body"
                    >
                      {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                    </span>
                  </p>
                  <p
                    v-if="vacancy.subscriberAlertsUrl"
                    class="govuk-body govuk-!-margin-bottom-5"
                  >
                    <a
                      class="govuk-link govuk-body"
                      :href="vacancy.subscriberAlertsUrl"
                      target="_blank"
                    >Ymunwch</a> os ydych am gael rhybudd am y swyddi uchod
                  </p>
                  <hr>
                </div>
              </li>
            </ul>
          </div>

          <div
            v-if="activeTab === 'close'"
            class="govuk-tabs__panel"
          >
            <p
              v-if="!inProgressVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No closed vacancies at the moment.
            </p>
            <p
              v-else-if="!filteredInProgressVacancies.length"
              class="govuk-body govuk-!-margin-bottom-6"
            >
              No vacancies found.
            </p>
            <ul
              v-else
              class="govuk-list"
            >
              <li
                v-for="vacancy in filteredInProgressVacancies"
                :key="vacancy.id"
                class="govuk-!-margin-top-4"
              >
                <RouterLink
                  v-if="vacancy.aboutTheRole && !isAdvertTypeListing(vacancy.advertType)"
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
                    {{ vacancy.applicationOpenDate | formatDate('datetime') }}
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
                    {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                  </span>
                </p>
                <hr class="govuk-section-break govuk-section-break--visible">

                <div v-if="vacancy.welshPosts">
                  <p>
                    <span
                      class="govuk-body govuk-!-font-weight-bold"
                    >
                      <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                    </span>
                    <span
                      v-if="vacancy.applicationOpenDate"
                      class="govuk-body"
                    >
                      {{ vacancy.applicationOpenDate | formatDate('datetime') }}
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
                      <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad cau: </span>
                    </span>
                    <span
                      class="govuk-body"
                    >
                      {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                    </span>
                  </p>
                  <hr class="govuk-section-break govuk-section-break--visible">
                </div>
              </li>
            </ul>
          </div>
        </TabsList>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import TabsList from '@/components/Page/TabsList';
import { mapGetters } from 'vuex';
import { ADVERT_TYPES } from '@/helpers/constants';

export default {
  components: {
    Search,
    TabsList,
  },
  data() {
    return {
      activeTab: 'open',
      tabs: [
        {
          ref: 'open',
          title: 'Open for applications',
        },
        {
          ref: 'future',
          title: 'Future applications',
        },
        {
          ref: 'close',
          title: 'Close for applications',
        },
      ],
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters('vacancies', [
      'openVacancies',
      'inProgressVacancies',
      'futureVacancies',
    ]),
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    filteredOpenVacancies() {
      if (this.isEmptyString(this.searchTerm)) {
        return this.openVacancies;
      } else {
        return this.openVacancies.filter(vacancy => vacancy.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    },
    filteredInProgressVacancies() {
      if (this.isEmptyString(this.searchTerm)) {
        return this.inProgressVacancies;
      } else {
        return this.inProgressVacancies.filter(vacancy => vacancy.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    },
    filteredFutureVacancies() {
      if (this.isEmptyString(this.searchTerm)) {
        return this.futureVacancies;
      } else {
        return this.futureVacancies.filter(vacancy => vacancy.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    },
  },
  created() {
    this.$store.dispatch('vacancies/bind');
  },
  methods: {
    isAdvertTypeListing(value) {
      const returnValue = value && value === ADVERT_TYPES.LISTING;
      return returnValue;
    },
    isAdvertTypeBasic(type) {
      return type && type === ADVERT_TYPES.BASIC;
    },
    isAdvertTypeFull(type) {
      return type && type === ADVERT_TYPES.FULL;
    },
    isEmptyString(value) {
      return value && value.replace(/\s/g, '') === '';
    },
    useSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
};
</script>
