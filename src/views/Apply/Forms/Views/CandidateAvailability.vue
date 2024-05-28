<template>
  <div>
    <dl class="govuk-summary-list">
      <dt class="govuk-summary-list__key">
        You are available on the following days
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        <div
          v-for="item in localData.availableDays"
          :key="item"
        >
          {{ item.location }}. {{ $filters.formatDate(item.date) }}
        </div>        
      </dd>
    </dl>    
  </div>
</template>

<script>
export default {
  name: 'CandidateFormViewCandidateAvailability',
  props: {
    application: {
      type: Object,
      required: false,
      default: () => {},
    },
    localData: {
      type: Object,
      required: false,
      default: () => {},
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
</style>