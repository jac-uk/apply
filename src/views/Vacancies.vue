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
            <li
              v-if="isEmailVerified"
              class="moj-side-navigation__item"
            >
              <RouterLink
                class="govuk-link"
                :to="{ name: 'profile' }"
              >
                Your profile
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
          </ul>
        </nav>
      </div>

      <div
        class="govuk-!-padding-top-4"
        :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }"
      >
        <h3 class="govuk-heading-l">
          Vacancies
        </h3>

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
              class="btn-filter govuk-button govuk-button--secondary"
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
                  :label="$filters.lookup(option.toString())"
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
              v-model:active-tab="activeTab"
              :tabs="tabs"
            >
              <div
                class="govuk-tabs__panel"
              >
                <p
                  v-if="!vacancies.length"
                  class="govuk-body govuk-!-margin-bottom-6"
                >
                  No vacancies at the moment.
                </p>
                <p
                  v-else-if="!filterVacancies.length"
                  class="govuk-body govuk-!-margin-bottom-6"
                >
                  No vacancies found.
                </p>
                <ul
                  v-else
                  class="govuk-list"
                >
                  <li
                    v-for="(vacancy, index) in filterVacancies"
                    :key="vacancy.id"
                    :style="{ 'margin-top': index !== 0 ? '30px' : '0' }"
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

                    <div
                      v-if="vacancy.location && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))"
                      style="display: flex; align-items: flex-start; margin-top: 10px;"
                    >
                      <img
                        src="@/assets/location.svg"
                        alt="Location"
                        width="18"
                        height="18"
                      >
                      <span
                        class="govuk-body"
                        style="margin: 0 0 0 4px;"
                      >
                        {{ vacancy.location }}
                      </span>
                    </div>

                    <div
                      v-if="
                        vacancy.typeOfExercise
                          || (vacancy.appointmentType == 'salaried' && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType)))
                          || (vacancy.immediateStart && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType)))
                      "
                      style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;"
                    >
                      <div
                        v-if="vacancy.typeOfExercise"
                        class="tag"
                      >
                        <span
                          class="govuk-!-font-weight-bold tag-text"
                        >
                          TYPE: {{ $filters.lookup(vacancy.typeOfExercise) }}
                        </span>
                      </div>

                      <div
                        v-if="(isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))"
                        class="tag"
                      >
                        <template v-if="vacancy.appointmentType == 'salaried'">
                          <span class="govuk-!-font-weight-bold tag-text">
                            SALARY:&nbsp;
                          </span>
                          <span
                            v-if="vacancy.salaryGrouping"
                            class="govuk-!-font-weight-bold tag-text"
                          >
                            {{ $filters.lookup(vacancy.salaryGrouping) }}
                          </span>
                          <span
                            v-if="vacancy.salary"
                            class="govuk-!-font-weight-bold tag-text"
                          >
                            {{ $filters.formatCurrency(vacancy.salary) }}
                          </span>
                        </template>
                        <template v-else-if="vacancy.appointmentType == 'fee-paid'">
                          <span class="govuk-!-font-weight-bold tag-text">
                            FEE PAID:&nbsp;
                          </span>
                          <span
                            v-if="vacancy.feePaidFee"
                            class="govuk-!-font-weight-bold tag-text"
                          >
                            {{ $filters.formatCurrency(vacancy.feePaidFee) }}
                          </span>
                        </template>
                      </div>

                      <div
                        v-if="vacancy.immediateStart && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))"
                        class="tag"
                      >
                        <span class="govuk-!-font-weight-bold tag-text">
                          VACANCIES: {{ vacancy.immediateStart }}
                        </span>
                      </div>
                    </div>

                    <CustomHTML
                      v-if="vacancy.roleSummary"
                      :value="vacancy.roleSummary"
                      style="margin-top: 20px;"
                    />

                    <div style="margin-top: 20px;">
                      <p style="margin: 0; line-height: 28px;">
                        <span class="govuk-body govuk-!-font-weight-bold">
                          Launch Date:
                        </span>
                        <span
                          v-if="vacancy.applicationOpenDate"
                          class="govuk-body"
                        >
                          {{ $filters.formatDate(vacancy.applicationOpenDate, 'datetime-without-second') }}
                        </span>
                        <span
                          v-else
                          class="govuk-body"
                        >
                          {{ $filters.formatEstimatedDate(vacancy.estimatedLaunchDate) }}
                        </span>
                      </p>
                      <p
                        v-if="vacancy.applicationCloseDate"
                        style="margin: 0; line-height: 28px;"
                      >
                        <span class="govuk-body govuk-!-font-weight-bold">
                          Closing Date:
                        </span>
                        <span class="govuk-body">
                          {{ $filters.formatDate(vacancy.applicationCloseDate, 'datetime-without-second') }}
                        </span>
                      </p>
                    </div>

                    <p
                      v-if="activeTab === 'future' && vacancy.subscriberAlertsUrl"
                      class="govuk-body govuk-!-margin-top-4"
                    >
                      <a
                        class="govuk-link govuk-body"
                        :href="vacancy.subscriberAlertsUrl"
                        target="_blank"
                      >Sign up</a> for an alert about this exercise
                    </p>

                    <div
                      v-if="vacancy.welshPosts"
                      class="govuk-!-margin-top-4"
                    >
                      <hr style="height: 0.5px; border: 0; background: #b1b4b6; margin: 0;">

                      <!-- @TODO: Replace this section once the location is being specified in welsh in the admin section -->
                      <template v-if="vacancy.referenceNumber === 'JAC00192'">
                        <div
                          v-if="vacancy.location && (isAdvertTypeBasic(vacancy.advertType) || isAdvertTypeFull(vacancy.advertType))"
                          style="display: flex; align-items: flex-start; margin-top: 10px;"
                        >
                          <img
                            src="@/assets/location.svg"
                            alt="Location"
                            width="18"
                            height="18"
                          >
                          <span
                            class="govuk-body"
                            style="margin: 0 0 0 4px;"
                          >
                            <!-- {{ vacancy.location }} -->
                            Cynhelir gwrandawiadau tribiwnlys ar draws pob rhanbarth yng Nghymru, ac mae’n rhaid i ymgeiswyr fod ar gael i ymgymryd â swydd y Llywydd neu’r Dirprwy Lywydd ar fusnes y Tribiwnlys, gan deithio’n annibynnol ledled Cymru a gallu aros dros nos lle bo angen. Fodd bynnag, gellir gwneud cyfran fawr o waith y Llywydd a’r Dirprwy Lywydd o bell.
                          </span>
                        </div>
                      </template>

                      <CustomHTML
                        v-if="vacancy.roleSummaryWelsh"
                        :value="vacancy.roleSummaryWelsh"
                        style="margin-top: 20px;"
                      />
                      <div style="margin-top: 20px;">
                        <p style="margin: 0; line-height: 28px;">
                          <span class="govuk-body govuk-!-font-weight-bold">
                            Dyddiad lansio:
                          </span>
                          <span
                            v-if="vacancy.applicationOpenDate"
                            class="govuk-body"
                          >
                            {{ $filters.formatDate(vacancy.applicationOpenDate, 'datetime') }}
                          </span>
                          <span
                            v-else
                            class="govuk-body"
                          >
                            {{ $filters.formatEstimatedDate(vacancy.estimatedLaunchDate) }}
                          </span>
                        </p>
                        <p
                          v-if="vacancy.applicationCloseDate"
                          style="margin: 0; line-height: 28px;"
                        >
                          <span class="govuk-body govuk-!-font-weight-bold">
                            Dyddiad cau:
                          </span>
                          <span class="govuk-body">
                            {{ $filters.formatDate(vacancy.applicationCloseDate, 'datetime') }}
                          </span>
                        </p>
                        <p
                          v-if="activeTab === 'future' && vacancy.subscriberAlertsUrl"
                          class="govuk-body govuk-!-margin-top-4"
                          style="margin: 0;"
                        >
                          <a
                            class="govuk-link govuk-body"
                            :href="vacancy.subscriberAlertsUrl"
                            target="_blank"
                          >Ymunwch</a> os ydych am gael rhybudd am y swyddi uchod
                        </p>
                      </div>
                    </div>

                    <RouterLink
                      v-if="vacancy.aboutTheRole && !isAdvertTypeListing(vacancy.advertType)"
                      class="govuk-button"
                      style="margin: 30px 0;"
                      :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                    >
                      Vacancy details
                    </RouterLink>

                    <hr style="height: 1px; border: 0; background: #b1b4b6;">
                  </li>
                </ul>
              </div>
            </TabsList>

            <div
              v-if="!isSignedIn"
              style="margin: 64px 0 44px 0;"
            >
              <a
                rel="noopener noreferrer"
                class="govuk-link govuk-body-l"
                style="display: inline-block;"
                href="https://judicialappointments.gov.uk/sign-up-for-judging-your-future-newsletter/"
                target="_blank"
              >
                Sign up
              </a>
              <span class="govuk-body-l">
                for our monthly e-newsletter and keep updated about open and forthcoming exercises.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import SidePanel from '@/components/SidePanel.vue';
import Badge from '@/components/Badge.vue';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import TabsList from '@/components/Page/TabsList.vue';
import CustomHTML from '@/components/CustomHTML.vue';
import { mapGetters } from 'vuex';
import { ADVERT_TYPES } from '@/helpers/constants';

export default {
  name: 'Vacancies',
  components: {
    Search,
    SidePanel,
    Badge,
    CheckboxGroup,
    CheckboxItem,
    CustomHTML,
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
          ref: 'closed',
          title: 'Closed for applications',
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
    vacancies() {
      let result = [];
      if (this.activeTab === 'open') {
        result = this.openVacancies;
      } else if (this.activeTab === 'future') {
        result = this.futureVacancies;
      } else if (this.activeTab === 'closed') {
        result = this.inProgressVacancies;
      }
      return result;
    },
    filterVacancies() {
      let result = this.vacancies;
      if (!result || !result.length) return [];

      // do not show the invite-only vacancies
      if (this.activeTab === 'open') {
        result = result.filter(vacancy => !vacancy.inviteOnly);
      }

      if (!this.isEmptyString(this.searchTerm)) {
        result = result.filter(vacancy => vacancy.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.appliedFilter && this.appliedFilter.length) {
        result = result.filter(vacancy => vacancy.typeOfExercise && this.appliedFilter.includes(vacancy.typeOfExercise));
      }
      return result;
    },
    isEmailVerified() {
      return this.$store.getters['auth/isEmailVerified'];
    },
  },
  created() {
    this.$store.dispatch('vacancies/bind');
    this.initActiveTab();
  },
  methods: {
    initActiveTab() {
      const hash = this.$route.hash;
      if (hash.includes('open')) {
        this.activeTab = 'open';
      } else if (hash.includes('future')) {
        this.activeTab = 'future';
      } else if (hash.includes('closed')) {
        this.activeTab = 'closed';
      }
    },
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
    useSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
};
</script>

<style scoped>
.tag {
  padding: 5px 8px 0;
  background: #EEEFEF;
  color: #383F43;
}
.tag-text {
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
