<template>
  <div>
    <dl
      v-for="item in application.qualifications"
      :key="item.name"
      class="govuk-summary-list govuk-!-margin-bottom-0"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Qualification
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ item.type | lookup }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Location
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ item.location | lookup }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="item.type === 'barrister' && item.calledToBarDate"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Date called to the Bar 
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ item.calledToBarDate | formatDate }}</li>
          </ul>
        </dd>
      </div>

      <div
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Completed pupillage
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>
              {{ item.completedPupillage | toYesNo }}
            </li>
          </ul>
        </dd>
      </div>

      <div
        v-if="item.completedPupillage && item.date"
        class="govuk-summary-list__row"
      >
        <dt
          v-if="item.type === 'barrister'"
          class="govuk-summary-list__key"
        >
          Date completed pupillage
        </dt>
        <dt
          v-else
          class="govuk-summary-list__key"
        >
          Date qualified
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ item.date | formatDate }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="!item.completedPupillage && item.details"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Did not complete pupillage notes
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li v-if="item.qualificationNotCompleteReason === NOT_COMPLETE_PUPILLAGE_REASONS.OTHER">
              {{ item.details }}
            </li>
            <li v-else>
              {{ item.qualificationNotCompleteReason | lookup }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { NOT_COMPLETE_PUPILLAGE_REASONS } from '@/helpers/constants';

export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      NOT_COMPLETE_PUPILLAGE_REASONS,
    };
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
