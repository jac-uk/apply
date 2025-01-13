<template>
  <dl
    v-if="vacancy.jurisdictionQuestion"
    class="govuk-summary-list"
  >
    <SelectionView
      :question="vacancy.jurisdictionQuestion"
      :type="vacancy.jurisdictionQuestionType"
      :data="application.jurisdictionPreferences"
    />
  </dl>
  <template v-else>
    <dl
      v-for="item in filteredPreferences"
      :key="item"
      class="govuk-summary-list"
    >
      <QuestionInputView
        :config="item"
        :data="application.jurisdictionPreferences[item.id]"
        :answer-sources="vacancy"
      />
    </dl>
  </template>
</template>

<script>
import SelectionView from '@/components/SelectionInput/View.vue';
import QuestionInputView from '@/components/QuestionInput/QuestionInputView.vue';
import { filteredPreferences } from '@/helpers/workingPreferencesHelper.js';

export default {
  name: 'CandidateFormViewJurisdictionPreferences',
  components: {
    SelectionView,
    QuestionInputView,
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
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.application, 'jurisdictionPreferences');
    },
  },
};
</script>
