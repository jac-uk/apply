<template>
  <template v-if="vacancy.jurisdictionPreferences">
    <dl
      v-for="(item, index) in vacancy.jurisdictionPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionRenderer
        section="jurisdictionPreferences"
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
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        {{ vacancy.jurisdictionQuestion }}
      </dt>
      <dd
        v-if="vacancy.jurisdictionQuestionType == 'single-choice'"
        class="govuk-summary-list__value"
      >
        {{ application.jurisdictionPreferences }}
      </dd>
      <dd
        v-else
        class="govuk-summary-list__value"
      >
        <p
          v-for="(item, index) in application.jurisdictionPreferences"
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
    </div>
  </dl>
</template>

<script>
import QuestionRenderer from '@jac-uk/jac-kit/draftComponents/Page/QuestionRenderer.vue';

export default {
  name: 'CandidateFormViewJurisdictionPreferences',
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
