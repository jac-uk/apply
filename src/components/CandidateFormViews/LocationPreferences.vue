<template>
  <dl class="govuk-summary-list">
    <dt class="govuk-summary-list__key">
      {{ vacancy.locationQuestion }}
    </dt>
    <dd
      v-if="vacancy.locationQuestionType == 'single-choice'"
      class="govuk-summary-list__value"
    >
      {{ application.locationPreferences }}
    </dd>
    <dd
      v-else
      class="govuk-summary-list__value"
    >
      <p
        v-for="(item, index) in application.locationPreferences"
        :key="item.name"
        class="govuk-body"
      >
        {{ item }}
        <strong>
          {{ index + 1 }}
        </strong>
        {{ item }}
      </p>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'CandidateFormViewLocationPreferences',
  props: {
    vacancy: {
      type: Object,
      required: false,
      default: () => {},
    },
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
