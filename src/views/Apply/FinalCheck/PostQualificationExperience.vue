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
              {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
            </li>
            <li v-else>
              {{ item.startDate | formatDate }} — current
            </li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Law-related tasks
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li
              v-for="task in item.tasks"
              :key="task.name"
            >
              <p
                v-if="task == 'other'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                <span class="govuk-caption-m">{{ task | lookup }}</span>
                {{ item.otherTasks }}
              </p>
              <span v-else>{{ task | lookup }}</span>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
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
