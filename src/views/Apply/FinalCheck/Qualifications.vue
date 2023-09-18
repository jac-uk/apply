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
            <li>{{ $filters.lookup(item.type) }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Location
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ $filters.lookup(item.location) }}</li>
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
            <li> {{ $filters.formatDate(item.calledToBarDate) }}</li>
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
              {{ $filters.toYesNo(item.completedPupillage) }}
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
            <li> {{ $filters.formatDate(item.date) }}</li>
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
            <li v-if="item.notCompletePupillageReason === NOT_COMPLETE_PUPILLAGE_REASONS.OTHER">
              {{ item.details }}
            </li>
            <li v-else>
              {{ $filters.lookup(item.notCompletePupillageReason) }}
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
  name: 'Qualifications',
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
