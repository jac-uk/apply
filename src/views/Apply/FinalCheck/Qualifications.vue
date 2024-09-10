<template>
  <div>
    <dl
      v-for="(qualification, index) in application.qualifications"
      :key="qualification.name"
      class="govuk-summary-list govuk-!-margin-bottom-0"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Qualification
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ $filters.lookup(qualification.type) }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Location
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>{{ $filters.lookup(qualification.location) }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="qualification.type !== 'barrister' && qualification.date"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Date qualified
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ $filters.formatDate(qualification.date) }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="qualification.type === 'barrister' && qualification.calledToBarDate"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Date called to the Bar
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li> {{ $filters.formatDate(qualification.calledToBarDate) }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="qualification.type === 'barrister' && (qualification.hasOwnProperty('completedPupillage'))"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Completed pupillage
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li>
              {{ $filters.toYesNo(qualification.completedPupillage) }}
            </li>
          </ul>
        </dd>
      </div>

      <div
        v-if="qualification.type === 'barrister' && qualification.completedPupillage && (qualification.hasOwnProperty('date'))"
        class="govuk-summary-list__row"
      >
        <dt
          v-if="qualification.type === 'barrister'"
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
            <li> {{ $filters.formatDate(qualification.date) }}</li>
          </ul>
        </dd>
      </div>

      <div
        v-if="qualification.type === 'barrister' && !qualification.completedPupillage && qualification.details"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Did not complete pupillage notes
        </dt>
        <dd class="govuk-summary-list__value">
          <ul class="govuk-list">
            <li v-if="qualification.notCompletePupillageReason === NOT_COMPLETE_PUPILLAGE_REASONS.OTHER">
              {{ qualification.details }}
            </li>
            <li v-else>
              {{ $filters.lookup(qualification.notCompletePupillageReason) }}
            </li>
          </ul>
        </dd>
      </div>
      <hr
        v-if="index < application.qualifications.length - 1"
        class="govuk-section-break govuk-section-break--l"
      >
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
