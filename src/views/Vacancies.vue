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
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <Search
              placeholder="Search vacancies"
              @search="useSearch" 
            />
          </div>
          <div class="govuk-grid-column-one-quarter">
            <button
              type="button"
              class="btn-filter govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="btnToggleSidePanel"
            >
              {{ showSidePanel ? "Hide filters" : "Show filters" }}
            </button>
            <Badge :number="numberOfFiltersApplied" />
          </div>
        </div>

        <SidePanel :show="showSidePanel">
          <template #header>
            <div class="govuk-grid-row govuk-!-padding-top-3 govuk-!-padding-bottom-3">
              <div class="govuk-grid-column-one-half">
                <div class="govuk-heading-l govuk-!-margin-bottom-0">
                  Filters
                </div>
              </div>
              <div class="govuk-grid-column-one-half text-right">
                <a
                  href
                  class="govuk-link"
                  @click.prevent="btnClearFilters"
                >
                  Clear all
                </a>
              </div>
            </div>
          </template>
          <template #default>
            <div class="govuk-!-padding-top-4 govuk-!-padding-bottom-4 govuk-!-padding-left-2 govuk-!-padding-right-2">
              <CheckboxGroup
                id="type-of-exercise"
                v-model="filter"
                label="Type of Exercise"
              >
                <CheckboxItem
                  v-for="(option, i) in typeOfExerciseOptions"
                  :key="i"
                  :value="option"
                  :label="option.toString() | lookup"
                />
              </CheckboxGroup>
            </div>
          </template>
          <template #footer>
            <button
              type="button"
              class="govuk-button govuk-!-margin-2"
              @click="btnUpdateFilters"
            >
              Apply
            </button>
            <button
              type="button"
              class="govuk-button govuk-!-margin-2 govuk-button--secondary"
              @click="btnCancelFilters"
            >
              Cancel
            </button>
          </template>
        </SidePanel>
        
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-full">
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
                  v-else-if="!filterVacancies(openVacancies).length"
                  class="govuk-body govuk-!-margin-bottom-6"
                >
                  No vacancies found.
                </p>
                <ul
                  v-else
                  class="govuk-list"
                >
                  <li
                    v-for="vacancy in filterVacancies(openVacancies)"
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

                      <p v-if="vacancy.typeOfExercise">
                        <span
                          class="govuk-body govuk-!-font-weight-bold"
                        >
                          <span class="govuk-body govuk-!-font-weight-bold"> Type: </span>
                        </span>
                        <span
                          class="govuk-body"
                        >
                          {{ vacancy.typeOfExercise | lookup }}
                        </span>
                      </p>
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
                  v-else-if="!filterVacancies(futureVacancies).length"
                  class="govuk-body govuk-!-margin-bottom-6"
                >
                  No vacancies found.
                </p>
                <ul
                  v-else
                  class="govuk-list"
                >
                  <li
                    v-for="vacancy in filterVacancies(futureVacancies)"
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

                    <p v-if="vacancy.typeOfExercise">
                      <span
                        class="govuk-body govuk-!-font-weight-bold"
                      >
                        <span class="govuk-body govuk-!-font-weight-bold"> Type: </span>
                      </span>
                      <span
                        class="govuk-body"
                      >
                        {{ vacancy.typeOfExercise | lookup }}
                      </span>
                    </p>
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
                  v-else-if="!filterVacancies(inProgressVacancies).length"
                  class="govuk-body govuk-!-margin-bottom-6"
                >
                  No vacancies found.
                </p>
                <ul
                  v-else
                  class="govuk-list"
                >
                  <li
                    v-for="vacancy in filterVacancies(inProgressVacancies)"
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

                    <p v-if="vacancy.typeOfExercise">
                      <span
                        class="govuk-body govuk-!-font-weight-bold"
                      >
                        <span class="govuk-body govuk-!-font-weight-bold"> Type: </span>
                      </span>
                      <span
                        class="govuk-body"
                      >
                        {{ vacancy.typeOfExercise | lookup }}
                      </span>
                    </p>
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
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import SidePanel from '@/components/SidePanel';
import Badge from '@/components/Badge';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import TabsList from '@/components/Page/TabsList';
import { mapGetters } from 'vuex';
import { ADVERT_TYPES } from '@/helpers/constants';

export default {
  components: {
    Search,
    SidePanel,
    Badge,
    CheckboxGroup,
    CheckboxItem,
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
      showSidePanel: false,
      typeOfExerciseOptions: ['legal', 'non-legal', 'leadership', 'leadership-non-legal'],
      filter: [],
      appliedFilter: [],
      numberOfFiltersApplied: 0,
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
    btnToggleSidePanel() {
      this.showSidePanel = !this.showSidePanel;
    },
    btnClearFilters() {
      this.appliedFilter = [];
      this.filter = [];
      this.numberOfFiltersApplied = 0;
      this.showSidePanel = false;
    },
    btnUpdateFilters() {
      this.appliedFilter = this.filter;
      if (this.appliedFilter.length) this.numberOfFiltersApplied = 1;
      this.showSidePanel = false;
    },
    btnCancelFilters() {
      this.filter = this.appliedFilter;
      this.showSidePanel = false;
    },
    filterVacancies(vacancies) {
      let result = vacancies || [];
      if (!result || !result.length) return [];

      if (!this.isEmptyString(this.searchTerm)) {
        result = result.filter(vacancy => vacancy.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.appliedFilter && this.appliedFilter.length) {
        result = result.filter(vacancy => vacancy.typeOfExercise && this.appliedFilter.includes(vacancy.typeOfExercise));
      }
      return result;
    },
    useSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
};
</script>
