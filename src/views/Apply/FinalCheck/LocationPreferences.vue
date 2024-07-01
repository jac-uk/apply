<template>
  <dl
    v-if="vacancy.locationQuestion"
    class="govuk-summary-list"
  >
    <SelectionView
      :question="vacancy.locationQuestion"
      :type="vacancy.locationQuestionType"
      :data="application.locationPreferences"
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
        :data="application.locationPreferences[item.id]"
      />
    </dl>
  </template>
</template>

<script>
import SelectionView from '@/components/SelectionInput/View.vue';
import QuestionInputView from '@/components/QuestionInput/QuestionInputView.vue';
import { filteredPreferences } from '../WorkingPreferences/workingPreferencesHelper';

export default {
  name: 'LocationPreferences',
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
  computed: {
    filteredPreferences() {
      return filteredPreferences(this.vacancy, this.application, 'locationPreferences');
    },
  },
};
</script>

