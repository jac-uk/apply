<template>
  <dl
    v-for="(item, index) in vacancy.additionalWorkingPreferences"
    :key="item"
    class="govuk-summary-list"
  >
    <QuestionRenderer
      section="additionalWorkingPreferences"
      :application="application"
      :vacancy="vacancy"
      :index="index"
    />
  </dl>
</template>

<script>
import { getDataWelshId, getDataWelsh } from '@/helpers/language';
import QuestionRenderer from '@/components/Page/QuestionRenderer.vue';

export default {
  name: 'AdditionalWorkingPreferences',
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
  methods: {
    getDataWelsh(topic, answer) {
      return getDataWelsh({ id: getDataWelshId(topic), answer });
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
