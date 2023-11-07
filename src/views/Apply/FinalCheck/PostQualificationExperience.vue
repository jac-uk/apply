<template>
  <div>
    <dl
      v-for="item in application.experience"
      :key="item.name"
      class="govuk-summary-list govuk-!-margin-bottom-8"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Job title
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ item.jobTitle }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Organisation or business
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ item.orgBusinessName }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Dates worked
        </dt>
        <dd class="govuk-summary-list__value">
          <ul
            v-if="item.startDate"
            class="govuk-list"
          >
            <li v-if="item.endDate">
              {{ $filters.formatDate(item.startDate, 'month') }} to {{ $filters.formatDate(item.endDate, 'month') }}
            </li>
            <li v-else>
              {{ $filters.formatDate(item.startDate, 'month') }} — current
            </li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Law-related tasks
        </dt>
        <dd class="govuk-summary-list__value">
          <ul
            v-if="item.tasks && item.tasks.length"
            class="govuk-list"
          >
            <li
              v-for="task in item.tasks"
              :key="task.name"
            >
              <p class="govuk-body govuk-!-margin-bottom-0">
                {{ $filters.lookup(task) }}
              </p>
              <p
                v-if="task == 'other'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                {{ item.otherTasks }}
              </p>
              <hr>
            </li>
          </ul>
          <div v-else>
            No Answers provided
          </div>
        </dd>
      </div>

      <template v-if="isApplicationVersion3 && hasJudicialFunctions(item)">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Is this a judicial or quasi-judicial post?
          </dt>
          <dd class="govuk-summary-list__value">
            {{ $filters.lookup(item.judicialFunctions.type) }}
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            How many sitting days have you accumulated in this post?
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.judicialFunctions.duration }}
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Is a legal qualification a requisite for appointment?
          </dt>
          <dd class="govuk-summary-list__value">
            {{ $filters.toYesNo(item.judicialFunctions.isLegalQualification) }}
          </dd>
        </div>
        <div
          v-if="item.judicialFunctions.type === 'quasi-judicial'"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            The powers, procedures and main responsibilities
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.judicialFunctions.details }}
          </dd>
        </div>
      </template>

      <template v-if="item.taskDetails">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Base location and/or region where you predominately operate/d
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.taskDetails.location }}
          </dd>
        </div>

        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Jurisdiction/area of law
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.taskDetails.jurisdiction }}
          </dd>
        </div>

        <div
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            Working Basis
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.taskDetails.workingBasis }}
          </dd>
        </div>

        <div
          v-if="item.taskDetails.totalDaysInRole"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            Total number of days engaged in this role
          </dt>
          <dd class="govuk-summary-list__value">
            {{ item.taskDetails.totalDaysInRole }}
          </dd>
        </div>
      </template>
    </dl>

    <dl
      v-if="isApplicationVersion3 && totalJudicialDays < vacancy.pjeDays"
      class="govuk-summary-list govuk-!-margin-bottom-8"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Details
        </dt>
        <dd class="govuk-summary-list__value">
          {{ application.experienceDetails }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { getApplicationTotalJudicialDays } from '@/helpers/exerciseHelper';

export default {
  name: 'PostQualificationExperience',
  props: {
    vacancy: {
      type: Object,
      required: true,
    },
    application: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isApplicationVersion3() {
      return this.vacancy._applicationVersion && this.vacancy._applicationVersion === 3;
    },
    totalJudicialDays() {
      return getApplicationTotalJudicialDays(this.application);
    },
  },
  methods: {
    hasJudicialFunctions(experience) {
      return Array.isArray(experience.tasks) && experience.tasks.includes('judicial-functions');
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
