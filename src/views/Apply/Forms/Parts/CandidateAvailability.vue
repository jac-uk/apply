<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Candidate Availability
      </h1>

      <CheckboxGroup
        id="availability"
        v-model="formData.availableDays"
        label="Please tick all dates you are available"
        required
      >
        <CheckboxItem
          v-for="item in selectionDays"
          :key="item"
          :value="item"
          :label="`${item.location}. ${$filters.formatDate(item.date)}`"
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
import { dateRange } from '@/helpers/date';
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
  computed: {
    selectionDays() {
      const options = [];
      if (!this.vacancy) return options;
      if (!this.vacancy.selectionDays) return options;
      this.vacancy.selectionDays.forEach(selectionDay => {
        const dates = dateRange(selectionDay.selectionDayStart, selectionDay.selectionDayEnd);
        dates.forEach(item => {
          options.push({
            location: selectionDay.selectionDayLocation,
            date: item,
          });
        });
      });
      return options;
    },
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.CANDIDATE_AVAILABILITY, true);
  },
};
</script>
