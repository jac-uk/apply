<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">
        {{ vacancy.name }}
      </h1>

      <p v-if="vacancy.immediateStart">
        <span class="govuk-body govuk-!-font-weight-bold">Number of vacancies:</span> <span class="govuk-body"> {{ vacancy.immediateStart }} </span>
      </p>
      <p v-if="vacancy.location">
        <span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> {{ vacancy.location }}</span>
      </p>
      <p v-if="vacancy.salaryGrouping">
        <span class="govuk-body govuk-!-font-weight-bold">Salary:</span> <span class="govuk-body"> {{ vacancy.salaryGrouping | lookup }}</span>
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

      <!-- 
      <h2 class="govuk-heading-l">
        The selection process
      </h2>

      <p class="govuk-body">
        There are 3 stages to the selection process.
      </p>

      <h3 class="govuk-heading-m">
        1. Check if you're eligible
      </h3>
      <p class="govuk-body">
        Check you meet all the eligibility requirements for this
        role. It's not a guarantee you're eligible – it's to give you an idea of whether you
        might be.
      </p>

      <h3 class="govuk-heading-m">
        2. The application form
      </h3>

      <p class="govuk-body">
        You'll need to complete your:
      </p>
      <ul class="govuk-list govuk-list--bullet">
        <li>qualifications</li>
        <li>work experience</li>
        <li> self-assessment competency statements</li>
        <li>independent assessor's details</li>
      </ul>

      <h3 class="govuk-heading-m">
        3. Selection day
      </h3>
      <p class="govuk-body">
        Shortlisted candidates are invited to selection days. These
        allow us to meet you in person to assess your suitability for the role. If you’re selected, we’ll email you a
        week before with
        details about what you’ll need to prepare for the day.
      </p> -->

      <RouterLink
        v-if="isVacancyOpen"
        class="govuk-button"
        data-module="govuk-button"
        :to="{ name: 'vacancy-message' }"
      >
        Check if you're eligible and apply
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
          </ul>
          <!-- <ul class="govuk-list govuk-!-font-size-16">
            <li>
              <a
                class="govuk-link govuk-link govuk-body-m"
                href="https://www.judicialappointments.gov.uk/overview-selection-process"
                target="_blank"
              >
                How we shortlist candidates
              </a>
            </li>
            <li>
              <a
                class="govuk-link govuk-link govuk-body-m"
                href="https://www.judicialappointments.gov.uk/completing-your-self-assessment"
                target="_blank"
              >
                How to write your self-assessment competency statements
              </a>
            </li>
            <li>
              <a
                class="govuk-link govuk-link govuk-body-m"
                href="https://www.judicialappointments.gov.uk/references-guidance-candidates"
                target="_blank"
              >
                How to choose your independent assessors
              </a>
            </li>
          </ul> -->
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
    timeline() {
      const timeline = exerciseTimeline(this.vacancy);
      return createTimeline(timeline);
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
