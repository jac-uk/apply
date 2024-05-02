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
  name: 'LocationPreferences',
  components: {
    QuestionRenderer,
  },
  props: {
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
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
