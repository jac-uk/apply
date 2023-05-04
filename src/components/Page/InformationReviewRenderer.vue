<template>
  <div
    v-if="data"
    :id="id"
    class="govuk-body"
  >
    <div
      v-for="item in data"
      :key="item.name"
      class="govuk-list"
    >
      <div :data-welsh="id ? `${id}-yes` : ''">
        Yes
      </div>

      <div
        v-if="item.financialYear"
        class="govuk-!-margin-top-1"
      >
        {{ item.financialYear }}
      </div>

      <div
        v-if="item.title"
        class="govuk-!-margin-top-1"
      >
        {{ item.title }}
      </div>

      <div
        v-if="item.date"
        class="govuk-!-margin-top-1"
      >
        {{ displayDate(item.date) }}
      </div>

      <div
        v-if="item.details"
        class="govuk-!-margin-top-1"
      >
        {{ item.details }}
      </div>

      <div
        v-if="item.investigationConclusionDate"
        class="govuk-!-margin-top-1"
      >
        {{ item.investigationConclusionDate | formatDate }}
      </div>
    </div>
  </div>
  <div
    v-else
    :id="id"
    class="govuk-body"
    :data-welsh="id ? `${id}-no` : ''"
  >
    No
  </div>
</template>

<script>
import { formatDate } from '@/helpers/date';

export default {
  name: 'InformationReviewRenderer',
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
    isDraftApplication: {
      type: Boolean,
      required: true,
      default: false,
    },
    displayMonthYearOnly: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    displayDate(date) {
      return this.displayMonthYearOnly ? formatDate(date, 'month') : formatDate(date);
    },
  },
};
</script>
