<template>
  <div>
    <div
      v-if="hasEmploymentGaps"
    >
      <dl
        v-for="item in application.employmentGaps"
        :key="item.name"
        class="govuk-summary-list govuk-!-margin-bottom-8"
      >
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Date of gap
          </dt>
          <dd class="govuk-summary-list__value">
            <ul
              v-if="item.startDate"
              class="govuk-list"
            >
              <li v-if="item.endDate">
                {{ $filters.formatDate(item.startDate) }} to {{ $filters.formatDate(item.endDate) }}
              </li>
              <li v-else>
                {{ $filters.formatDate(item.startDate) }} — current
              </li>
            </ul>
          </dd>
        </div>

        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Details
          </dt>
          <dd class="govuk-summary-list__value">
            <ul class="govuk-list">
              <li>{{ item.details }}</li>
            </ul>
          </dd>
        </div>

        <div
          v-if="isLegal"
          class="govuk-summary-list__row"
        >
          <dt class="govuk-summary-list__key">
            Law-related tasks
          </dt>
          <dd
            v-if="item.tasks && item.tasks.length"
            class="govuk-summary-list__value"
          >
            <ul class="govuk-list">
              <li
                v-for="task in item.tasks"
                :key="task.name"
              >
                <p
                  v-if="task == 'other'"
                  class="govuk-body govuk-!-margin-bottom-0"
                >
                  <span class="govuk-caption-m">
                    {{ $filters.lookup(task) }}
                  </span>
                  {{ item.otherTasks }}
                </p>
                <span v-else>{{ $filters.lookup(task) }}</span>
              </li>
            </ul>
          </dd>
          <dd
            v-else
            class="govuk-summary-list__value"
          >
            No Law-related tasks provided
          </dd>
        </div>
      </dl>
    </div>
    <div
      v-else
    >
      No employment gaps declared.
    </div>
  </div>
</template>

<script>
export default {
  name: 'GapsInEmployment',
  props: {
    application: {
      type: Object,
      required: true,
    },
    isLegal: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    hasEmploymentGaps() {
      return this.application.employmentGaps && this.application.employmentGaps.length;
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
