<template>
  <dl
    v-if="vacancy.jurisdictionQuestion"
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
          v-for="item in application.jurisdictionPreferences"
          :key="item.name"
          class="govuk-body"
        >
          {{ item }}
        </p>
      </dd>
    </div>
  </dl>
  <template v-else-if="vacancy.jurisdictionPreferences">
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
</template>

<script>
import QuestionRenderer from '@jac-uk/jac-kit/draftComponents/Page/QuestionRenderer.vue';

export default {
  name: 'JurisdictionPreferences',
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
