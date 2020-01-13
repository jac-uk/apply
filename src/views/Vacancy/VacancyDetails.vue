<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">
        {{ vacancy.name }}
      </h1>

      <p><span class="govuk-body govuk-!-font-weight-bold">Number of vacancies:</span> <span class="govuk-body"> {{ vacancy.immediateStart }} </span></p>
      <p><span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> {{ vacancy.location }}</span></p>
      <p><span class="govuk-body govuk-!-font-weight-bold">Salary:</span> <span class="govuk-body"> {{ vacancy.salaryGrouping | lookup }}</span></p>
      <p class="govuk-!-margin-bottom-8">
        <span class="govuk-body govuk-!-font-weight-bold">Contact: </span>
        <a 
          :href="`mailto:${vacancy.exerciseMailbox}?subject=Re:${vacancy.referenceNumber}`"
          class="govuk-body govuk-link"
        >{{ vacancy.exerciseMailbox }}</a>
      </p>

      <h2 class="govuk-heading-l">
        Timeline
      </h2>
      <Timeline :data="timeline" />

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
      <h2 class="govuk-heading-m">
        Related content
      </h2>
      <p class="govuk-body">
        <a
          class="govuk-link"
          href="https://www.judicialappointments.gov.uk/overview-selection-process"
          target="_blank"
        >
          How we shortlist candidates
        </a>
      </p>

      <p class="govuk-body">
        <a
          class="govuk-link"
          href="https://www.judicialappointments.gov.uk/completing-your-self-assessment"
          target="_blank"
        >
          How to write your self-assessment competency statements
        </a>
      </p>

      <p class="govuk-body">
        <a
          class="govuk-link"
          href="https://www.judicialappointments.gov.uk/references-guidance-candidates"
          target="_blank"
        >
          How to choose your independent assessors
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Page/Timeline';
import createTimeline from '@/helpers/Timeline/createTimeline';
import exerciseTimeline from '@/helpers/Timeline/exerciseTimeline';

export default {
  components: {
    Timeline,
  },
  computed: {
    vacancy () {
      return this.$store.state.exercise.record;
    },
    timeline() {
      let timeline = exerciseTimeline(this.vacancy);
      return createTimeline(timeline);
    },
    showSubscribeForAlerts() {
      if (this.vacancy.subscriberAlertsUrl) {
        if (this.vacancy.applicationOpenDate) {
          const today = new Date();
          return this.vacancy.applicationOpenDate > today;
        }
        return true;
      }
      return false;
    },
  },
};
</script>
