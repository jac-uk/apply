<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">
        {{ vacancy.name }}
      </h1>

      <p v-if="vacancy.immediateStart">
        <span class="govuk-body govuk-!-font-weight-bold">
          Number of vacancies:
        </span>
        <span class="govuk-body">
          {{ vacancy.immediateStart }}
        </span>
      </p>
      <p v-if="vacancy.location">
        <span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> {{ vacancy.location }}</span>
      </p>
      <p v-if="vacancy.appointmentType == 'salaried'">
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

      <div
        v-if="timeline.length"
      >
        <h2 class="govuk-heading-l">
          Timeline
        </h2>
        <Timeline :data="timeline" />
      </div>

      <h2 class="govuk-heading-l">
        Overview of the role
      </h2>

      <!-- eslint-disable -->
      <div
        class="govuk-body"
        v-html="vacancy.aboutTheRole"
      />
      <!-- eslint-enable -->

      <RouterLink
        v-if="isVacancyOpen && !vacancy.inviteOnly"
        class="govuk-button info-link--vacancy-details--check-if-you-are-eligible-and-apply"
        data-module="govuk-button"
        :to="{ name: 'eligibility' }"
      >
        Apply
      </RouterLink>

      <RouterLink
        v-else-if="userIsInvited && hasOpenInvite"
        class="govuk-button info-link--vacancy-details--you-been-invited-to-this-exercise"
        data-module="govuk-button"
        :to="{ name: 'eligibility' }"
      >
        You've been invited to this exercise, click here to apply
      </RouterLink>

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
    </div>

    <div class="govuk-grid-column-one-third govuk-!-padding-bottom-8 container-border-bottom">
      <aside
        class="jac-related-items"
        role="complementary"
      >
        <h2 class="govuk-heading-m">
          Related content
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
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Page/Timeline';
import createTimeline from '@/helpers/Timeline/createTimeline';
import exerciseTimeline from '@/helpers/Timeline/exerciseTimeline';
import DownloadLink from '@/components/DownloadLink';

export default {
  components: {
    Timeline,
    DownloadLink,
  },
  data() {
    return {
      isVacancyOpen: false,
    };
  },
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
    user() {
      return this.$store.state.auth.currentUser;
    },
    timeline() {
      const timeline = exerciseTimeline(this.vacancy);
      return createTimeline(timeline);
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
};
</script>
