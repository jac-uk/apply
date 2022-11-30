<template>
  <dl class="govuk-summary-list">
    <div
      v-if="application.applyingForWelshPost != null"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Are you applying for a Welsh post?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ application.applyingForWelshPost | toYesNo }}
      </dd>
    </div>
    <div
      v-if="application.canSpeakWelsh != null"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Can you speak Welsh?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ application.canSpeakWelsh | toYesNo }}
      </dd>
    </div>
    <div
      v-if="application.canReadAndWriteWelsh != null"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Can you read and write in Welsh?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        <p
          v-if="application.canReadAndWriteWelsh == false"
        >
          {{ application.canReadAndWriteWelsh | toYesNo }}
        </p>
        <p
          v-if="application.canReadAndWriteWelsh"
        >
          {{ application.canReadAndWriteWelsh | lookup }}
        </p>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  name: 'WelshRequirement',
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
