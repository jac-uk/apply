<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Review
      </h1>

      <div 
        v-for="part in parts"
        :key="part"
        class="govuk-!-margin-bottom-9"
      >
        <h2
          class="govuk-heading-l"
          style="display:inline-block;"
        >
          {{ $filters.lookup(part) }}
        </h2>
        <RouterLink
          class="govuk-link govuk-body-m change-link"
          style="display:inline-block;"
          :to="{name: `candidate-form-tasks-${part}`}"
        >
          Change
        </RouterLink>
        <div>
          <component 
            :is="viewComponents[part]" 
            :application="application"
            :local-data="candidateFormResponse[part]"
          />
        </div>
      </div>
      
      <button
        class="govuk-button info-btn--task-list--review-application"
        :disabled="!isFormComplete"
        @click="submitForm"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import BackLink from '@/components/BackLink.vue';
import candidateAvailability from '@/components/CandidateFormViews/CandidateAvailability.vue';
import characterChecks from '@/components/CandidateFormViews/CharacterChecks.vue';
import commissionerConflicts from '@/components/CandidateFormViews/CommissionerConflicts.vue';
import panelConflicts from '@/components/CandidateFormViews/PanelConflicts.vue';
import reasonableAdjustments from '@/components/CandidateFormViews/ReasonableAdjustments.vue';
import welshPosts from '@/components/CandidateFormViews/WelshPosts.vue';
import workingPreferences from '@/components/CandidateFormViews/WorkingPreferences.vue';
export default {
  name: 'CandidateFormReview',
  components: {
    BackLink,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    return {
      viewComponents: {
        candidateAvailability,
        characterChecks,
        commissionerConflicts,
        panelConflicts,
        reasonableAdjustments,
        welshPosts,
        workingPreferences,
      },
    };
  },
};
</script>
