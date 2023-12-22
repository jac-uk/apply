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
        data-welsh="applying-for-welsh-post"
      >
        {{ $filters.toYesNo(application.applyingForWelshPost) }}
      </dd>
    </div>
    <div v-if="application.applyingForWelshPost">
      <div
        v-if="application.canSpeakWelsh != null"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Can you speak Welsh?
        </dt>
        <dd
          class="govuk-summary-list__value"
          data-welsh="speak-welsh"
        >
          {{ $filters.toYesNo(application.canSpeakWelsh) }}
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
            data-welsh="read-and-write-welsh"
          >
            {{ $filters.toYesNo(application.canReadAndWriteWelsh) }}
          </p>
          <p
            v-if="application.canReadAndWriteWelsh"
            data-welsh="read-and-write-welsh"
          >
            {{ $filters.lookup(application.canReadAndWriteWelsh) }}
          </p>
        </dd>
      </div>
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
