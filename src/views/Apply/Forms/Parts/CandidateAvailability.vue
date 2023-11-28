<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink class=" govuk-!-margin-top-0" />
      <h1 class="govuk-heading-xl govuk-!-margin-bottom-4">
        Candidate Availability
      </h1>

      <CheckboxGroup
        id="availability"
        v-model="formData.availableDays"
        label="Please tick all of the dates you are available"
        required
      >
        <CheckboxItem
          v-for="item in candidateForm.candidateAvailabilityDates"
          :key="item"
          :value="item"
          :label="`${$filters.formatDate(item.date)}. ${item.location}`"
        />
      </CheckboxGroup>

      <button
        class="govuk-button info-btn--candidate-availability--save-and-continue"
        @click="save()"
      >
        Save and continue
      </button>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import BackLink from '@/components/BackLink.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';

export default {
  name: 'CandidateFormCandidateAvailability',
  components: {
    BackLink,
    CheckboxGroup,
    CheckboxItem,
  },
  mixins: [CandidateFormsMixIn],
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.CANDIDATE_AVAILABILITY, true);
  },
};
</script>
