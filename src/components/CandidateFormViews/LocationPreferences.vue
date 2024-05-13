<template>
  <template v-if="vacancy.locationPreferences">
    <dl
      v-for="(item, index) in vacancy.locationPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionRenderer
        section="locationPreferences"
        :application="application"
        :vacancy="vacancy"
        :index="index"
      />
    </dl>
  </template>
  <dl
    v-else
    class="govuk-summary-list"
  >
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
import QuestionRenderer from '@jac-uk/jac-kit/draftComponents/Page/QuestionRenderer.vue';

export default {
  name: 'CandidateFormViewLocationPreferences',
  components: {
    QuestionRenderer,
  },
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
