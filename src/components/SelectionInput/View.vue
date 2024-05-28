<template>
  <div
    class="govuk-summary-list__row"
  >
    <dt class="govuk-summary-list__key">
      {{ question }}
    </dt>
    <dd
      v-if="type == 'single-choice'"
      class="govuk-summary-list__value"
    >
      {{ data }}
    </dd>
    <dd
      v-if="type == 'multiple-choice'"
      class="govuk-summary-list__value"
    >
      <p
        v-for="item in data"
        :key="item.name"
        class="govuk-body"
      >
        {{ item }}
      </p>
    </dd>
    <dd
      v-if="type == 'ranked-choice'"
      class="govuk-summary-list__value"
    >
      <p
        v-for="(item, index) in data"
        :key="item.name"
        class="govuk-body"
      >
        <strong>
          {{ index + 1 }}
        </strong>
        {{ item }}
      </p>
    </dd>
  </div>
</template>

<script>
export default {
  name: 'SelectionView',
  props: {
    question: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: [String, Array, Object],
      required: true,
    },
  }
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