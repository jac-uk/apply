<template>
  <dl
    v-if="application"
    class="govuk-summary-list"
  >
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
  </dl>
</template>

<script>
export default {
  name: 'CandidateFormViewWelshPosts',
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
