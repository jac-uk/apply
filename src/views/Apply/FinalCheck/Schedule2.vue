<template>
  <div>
    <dl
      v-if="vacancy.schedule2Apply"
      class="govuk-summary-list govuk-!-margin-bottom-8"
    >
      <div
        v-if="vacancy.appliedSchedule == 'schedule-2-3'"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Are you applying under Schedule 2(3)?
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ application.applyingUnderSchedule2Three | toYesNo }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="vacancy.appliedSchedule == 'schedule-2-d'"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Are you applying under Schedule 2(d)?
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ application.applyingUnderSchedule2d | toYesNo }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="
          (vacancy.appliedSchedule=='schedule-2-3' && application.applyingUnderSchedule2Three)
            || (vacancy.appliedSchedule=='schedule-2-d' && application.applyingUnderSchedule2d)"
        class="govuk-summary-list__row"
      >
        <dt
          class="govuk-summary-list__key"
        >
          Explain how you've gained experience in law.
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li v-if="vacancy.appliedSchedule=='schedule-2-3'">
              {{ application.experienceUnderSchedule2Three }}
            </li>
            <li v-if="vacancy.appliedSchedule=='schedule-2-d'">
              {{ application.experienceUnderSchedule2D }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
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
