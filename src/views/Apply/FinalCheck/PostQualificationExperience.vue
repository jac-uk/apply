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
              {{ item.startDate | formatDate('month') }} to {{ item.endDate | formatDate('month') }}
            </li>
            <li v-else>
              {{ item.startDate | formatDate('month') }} — current
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
                {{ task | lookup }}
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
  </div>
</template>

<script>
export default {
  name: 'PostQualificationExperience',
  props: {
    application: {
      type: Object,
      required: true,
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
