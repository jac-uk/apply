<template>
  <div
    class="govuk-grid-row"
    style="margin: 0;"
  >
    <div style="display: flex; flex-wrap: wrap; gap: 20px 44px; margin: 20px 0 64px 0;">
      <div>
        <a
          class="govuk-back-link"
          style="margin: 0; cursor: pointer;"
          @click="$router.push('/vacancies')"
        >
          Back
        </a>
      </div>
      <h1
        class="govuk-heading-xl"
        style="margin: 0"
      >
        {{ vacancy.name }}
      </h1>
    </div>

    <div class="govuk-grid-column-one-third">
      <nav
        class="moj-side-navigation"
        aria-label="Side navigation"
        style="padding: 0; margin-bottom: 40px;"
      >
        <ul class="moj-side-navigation__list">
          <li
            v-for="(item, index) in sideNavigation"
            :key="item.hash"
            class="moj-side-navigation__item"
            :class="isSideNavigationActive(item, index) ? 'moj-side-navigation__item--active' : null"
          >
            <a
              class="govuk-link"
              :href="`${$route.path}${item.hash}`"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="govuk-grid-column-two-thirds">
      <div id="overview">
        <h2 class="govuk-heading-l">
          Overview of the role
        </h2>

        <CustomHTML
          :value="vacancy.roleSummary"
          class="govuk-body govuk-!-font-weight-bold"
        />

        <p>
          <span class="govuk-body govuk-!-font-weight-bold">
            Launch Date:
          </span>
          <span
            v-if="vacancy.applicationOpenDate"
            class="govuk-body"
          >
            {{ vacancy.applicationOpenDate | formatDate('datetime') }}
          </span>
          <span
            v-else-if="vacancy.estimatedLaunchDate"
            class="govuk-body"
          >
            {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
          </span>
        </p>
        <p v-if="vacancy.immediateStart && showNumberOfVacancies">
          <span class="govuk-body govuk-!-font-weight-bold">
            Number of vacancies:
          </span>
          <span class="govuk-body">
            {{ vacancy.immediateStart }}
          </span>
        </p>
        <p v-if="vacancy.location && showLocation">
          <span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> {{ vacancy.location }}</span>
        </p>
        <p v-if="vacancy.appointmentType == 'salaried' && showAppointmentType">
          <span class="govuk-body govuk-!-font-weight-bold">
            Salary/Fee:
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
        <p
          v-if="vacancy.exerciseMailbox"
          class="govuk-!-margin-bottom-8"
        >
          <span class="govuk-body govuk-!-font-weight-bold">Contact: </span>
          <a
            :href="`mailto:${vacancy.exerciseMailbox}?subject=Re:${vacancy.referenceNumber}`"
            class="govuk-body govuk-link"
          >{{ vacancy.exerciseMailbox }}</a>
        </p>

        <div v-if="!advertTypeFull">
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
        </div>

        <div class="btn-group">
          <RouterLink
            v-if="showApplyButton && isVacancyOpen && !vacancy.inviteOnly"
            class="govuk-button info-link--vacancy-details--check-if-you-are-eligible-and-apply"
            style="margin-bottom: 0;"
            data-module="govuk-button"
            :to="{ name: 'eligibility' }"
          >
            Apply
          </RouterLink>
          <RouterLink
            v-else-if="userIsInvited && hasOpenInvite"
            class="govuk-button info-link--vacancy-details--you-been-invited-to-this-exercise"
            style="margin-bottom: 0;"
            data-module="govuk-button"
            :to="{ name: 'eligibility' }"
          >
            You've been invited to this exercise, click here to apply
          </RouterLink>

          <button
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            style="margin-bottom: 0;"
            @click="toggleExpandAllInformation(true)"
          >
            Expand all information
          </button>

          <button
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            style="margin-bottom: 0;"
            @click="print"
          >
            Print all information
          </button>
        </div>

        <p
          v-if="showSubscribeForAlerts"
          class="govuk-body"
        >
          <a
            class="govuk-link"
            :href="vacancy.subscriberAlertsUrl"
            target="_blank"
          >Or get email updates about this role</a>
        </p>

        <div
          class="jac-related-items"
          role="complementary"
          style="margin-top: 64px; padding: 32px 20px; background-color: #F3F2EE;"
        >
          <h2 class="govuk-heading-m">
            Relevant information (downloads):
          </h2>
          <nav
            role="navigation"
            aria-labelledby="subsection-title"
          >
            <ul
              v-if="vacancy.downloads"
              class="govuk-list govuk-!-font-size-16"
            >
              <li
                v-for="file in vacancy.downloads.jobDescriptions"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.termsAndConditions"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.pensionsInformation"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.competencyFramework"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.welshTranslation"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.skillsAndAbilitiesCriteria"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
              <li
                v-for="file in vacancy.downloads.statutoryConsultationGuidanceLetter"
                :key="file.file"
              >
                <DownloadLink
                  :file-name="file.file"
                  :exercise-id="vacancy.id"
                  :title="file.title"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        v-if="timeline.length && advertTypeFull"
        id="timeline"
        style="margin-top: 64px;"
      >
        <h2 class="govuk-heading-l">
          Timeline
        </h2>
        <Timeline :data="timeline" />
        <a
          v-if="!sections.isExpandTimeline"
          href="#" 
          class="govuk-link"
          @click.prevent="toggleExpandTimeline"
        >
          View more...
        </a>
      </div>

      <div
        id="description"
        class="govuk-!-margin-top-9"
      >
        <h2 class="govuk-heading-l">
          Description
        </h2>
        <CustomHTML
          :value="vacancy.aboutTheRole"
          class="govuk-body"
          :class="{ 'line-clamp': !sections.isExpandDescription }"
        />
        <a
          v-if="!sections.isExpandDescription"
          href="#" 
          class="govuk-link"
          @click.prevent="toggleExpandDescription"
        >
          View more...
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Page/Timeline';
import createTimeline from '@/helpers/Timeline/createTimeline';
import exerciseTimeline from '@/helpers/Timeline/exerciseTimeline';
import DownloadLink from '@/components/DownloadLink';
import { ADVERT_TYPES } from '@/helpers/constants';
import CustomHTML from '@/components/CustomHTML';

export default {
  name: 'VacancyDetails',
  components: {
    Timeline,
    DownloadLink,
    CustomHTML,
  },
  data() {
    return {
      isVacancyOpen: false,
      sections: {
        isExpandTimeline: false,
        isExpandDescription: false,
      },
    };
  },
  computed: {
    sideNavigation() {
      return [
        {
          title: 'Overview of the role',
          hash: '#overview',
        },
        {
          title: 'Timeline',
          hash: '#timeline',
        },
        {
          title: 'Description',
          hash: '#description',
        },
      ];
    },
    vacancy () {
      return this.$store.state.vacancy.record;
    },
    user() {
      return this.$store.state.auth.currentUser;
    },
    timeline() {
      const timeline = exerciseTimeline(this.vacancy);
      const timelines = createTimeline(timeline);
      return this.sections.isExpandTimeline ? timelines : timelines.slice(0, 2);
    },
    invitations() {
      return this.$store.state.invitations.records;
    },
    userIsInvited() {
      return this.vacancy.inviteOnly && !!this.user && this.invitations.some((invite) => invite.vacancy.id === this.vacancy.id);
    },
    hasOpenInvite() {
      return this.invitations.some((invite) => ['created', 'invited'].indexOf(invite.status) !== -1);
    },
    showSubscribeForAlerts() {
      if (this.vacancy.subscriberAlertsUrl) {
        const openDate = this.$store.getters['vacancy/getOpenDate'];
        if (openDate) {
          const today = new Date();
          return openDate > today;
        }
        return true;
      }
      return false;
    },
    advertType() {
      return this.vacancy.advertType ? this.vacancy.advertType : ADVERT_TYPES.FULL;
    },
    advertTypeFull() {
      return this.advertType === ADVERT_TYPES.FULL;
    },
    showApplyButton() {
      return this.advertTypeFull || this.advertType === ADVERT_TYPES.BASIC;
    },
    showAppointmentType() {
      return this.advertTypeFull || this.advertType === ADVERT_TYPES.BASIC ? true : false;
    },
    showNumberOfVacancies() {
      return this.advertTypeFull || this.advertType === ADVERT_TYPES.BASIC ? true : false;
    },
    showLocation() {
      return this.advertTypeFull || this.advertType === ADVERT_TYPES.BASIC ? true : false;
    },
  },
  mounted() {
    this.isVacancyOpen = this.$store.getters['vacancy/isOpen']();

    if (this.$store.getters['vacancy/isOpen']()) {
      const self = this;
      setInterval(() => {
        self.isVacancyOpen = self.$store.getters['vacancy/isOpen']();
      }, 60 * 1000);
    }
  },
  methods: {
    isSideNavigationActive(item, index) {
      return (!this.$route.hash && index === 0) || (this.$route.hash === item.hash);
    },
    toggleExpandAllInformation(isExpand) {
      Object.keys(this.sections).forEach(key => {
        this.sections[key] = isExpand;
      });
      this.isExpandAllInformation = !this.isExpandAllInformation;
    },
    toggleExpandTimeline() {
      this.sections.isExpandTimeline = !this.sections.isExpandTimeline;
    },
    toggleExpandDescription() {
      this.sections.isExpandDescription = !this.sections.isExpandDescription;
    },
    print() {
      window.print();
    },
  },
};
</script>

<style scoped>
.btn-group {
  display: flex;
  gap: 20px;
}

.btn-outline {
  height: 40px;
  color: #753880;
  background-color: white;
  border: 1px solid #753880;
  cursor: pointer;
}

@media only screen and (max-width: 640px) {
  .btn-group {
    flex-direction: column;
  }
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
