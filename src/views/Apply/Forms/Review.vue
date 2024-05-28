<template>
  <div
    v-if="candidateFormResponse"
    class="govuk-grid-row"
  >
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl govuk-!-margin-bottom-4">
        Review your answers
      </h1>

      <div
        v-for="part in parts"
        :key="part"
        class="govuk-!-margin-bottom-9"
      >
        <h2
          class="govuk-heading-l govuk-!-margin-bottom-2"
          style="display:inline-block;"
        >
          {{ $filters.lookup(part) }}
        </h2>
        <RouterLink
          v-if="!isFormCompleted"
          class="govuk-link govuk-body-m change-link"
          style="display:inline-block;"
          :to="{name: `candidate-form-tasks-${part}`, query: { referrer: 'review' }}"
        >
          Change
        </RouterLink>
        <div>
          <component
            :is="viewComponents[part]"
            :vacancy="vacancy"
            :application="application"
            :local-data="candidateFormResponse[part]"
          />
        </div>
      </div>

      <button
        v-if="!isFormCompleted"
        class="govuk-button info-btn--task-list--review-application"
        :disabled="!areAllPartsDone"
        @click="submitForm"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import { shallowRef } from 'vue';
import candidateAvailability from './Views/CandidateAvailability.vue';
import characterChecks from './Views/CharacterChecks.vue';
import commissionerConflicts from './Views/CommissionerConflicts.vue';
import panelConflicts from './Views/PanelConflicts.vue';
import reasonableAdjustments from './Views/ReasonableAdjustments.vue';
import welshPosts from './Views/WelshPosts.vue';
import locationPreferences from './Views/LocationPreferences.vue';
import jurisdictionPreferences from './Views/JurisdictionPreferences.vue';
export default {
  name: 'CandidateFormReview',
  mixins: [CandidateFormsMixIn],
  data() {
    return {
      viewComponents: shallowRef({
        candidateAvailability,
        characterChecks,
        commissionerConflicts,
        panelConflicts,
        reasonableAdjustments,
        welshPosts,
        locationPreferences,
        jurisdictionPreferences,
      }),
    };
  },
};
</script>
