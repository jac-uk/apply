<template>
  <dl
    v-if="isV1"
    class="govuk-summary-list"
  >
    <SelectionView
      v-for="(item, index) in vacancy.additionalWorkingPreferences"
      :key="index"
      :question="item.question"
      :type="item.questionType"
      :data="application.additionalWorkingPreferences[index].selection"
    />
  </dl>

  <template v-else>
    <dl
      v-for="item in vacancy.additionalWorkingPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionInputView
        :config="item"
        :data="application.additionalWorkingPreferences[item.id]"
      />
    </dl>
  </template>
</template>

<script>
import { getDataWelshId, getDataWelsh } from '@/helpers/language';
import SelectionView from '@/components/SelectionInput/View.vue';
import QuestionInputView from '@/components/QuestionInputView/QuestionInputView.vue';
import { filteredPreferences, isVersion1 } from '../WorkingPreferences/workingPreferencesHelper';

export default {
  name: 'AdditionalWorkingPreferences',
  components: {
    SelectionView,
    QuestionInputView,
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
  data() {
    const isV1 = isVersion1(this.$store.state.vacancy.record.additionalWorkingPreferences);
    return {
      isV1: isV1,
    };
  },
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.application, 'additionalWorkingPreferences');
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

  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
