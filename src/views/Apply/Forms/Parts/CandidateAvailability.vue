<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Candidate Availability
      </h1>

      <MultiCheckboxGroup
        v-for="(combined, index) in combinedData"
        :arr-values="combined.selectionDates"
        v-model="combined.dates"
        :index="index"
        :key="index"
        :label="`Candidate availability for ${combined.location}`"
      />

      <button
        class="govuk-button info-btn--candidate-availability--save-and-continue"
        @click="save('candidateAvailability')"
      >
        Save and continue
      </button>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import BackLink from '@/components/BackLink.vue';
import MultiCheckboxGroup from '@/components/Form/MultiCheckboxGroup.vue';
import { dateRange } from '@/helpers/date';
import _has from 'lodash/has';

export default {
  name: 'CandidateFormCandidateAvailability',
  mixins: [CandidateFormsMixIn],
  components: {
    BackLink,
    MultiCheckboxGroup,
  },
  data(){
    return {
      combinedData: [],
    };
  },
  methods: {
    // Combines the data according to the location field
    // Each object in the array contains the location, candidate availability date(s) and selection date(s)
    mapData(selectionDays, candidateAvailability) {
      let combined = [];
      if (Array.isArray(selectionDays) && selectionDays.length) {
        for (const selectionDay of selectionDays) {
          if (_has(selectionDay, 'selectionDayLocation')) { // Only account for selection dates with a location set!
            const location = selectionDay.selectionDayLocation;
            const startTimestamp = _has(selectionDay, 'selectionDayStart') ? selectionDay.selectionDayStart : '';
            const endTimestamp = _has(selectionDay, 'selectionDayEnd') ? selectionDay.selectionDayEnd : '';
            const selectionDates = this.generateSelectionDates(startTimestamp, endTimestamp);
            const locationAvailability = candidateAvailability.find(item => item.location === location);
            const locationAvailabilityDates = (locationAvailability && _has(locationAvailability, 'dates') && locationAvailability.dates.length) ?
              locationAvailability.dates : [];
            combined.push({
              location: location,
              dates: locationAvailabilityDates,
              selectionDates: selectionDates,
            });
          }
        }
      }
      return combined;
    },
    // Generates an array of date strings from a start and end timestamp (inclusive)
    generateSelectionDates(startTimestamp, endTimestamp) {
      let selectionDates = [];
      if (startTimestamp) {
        if (startTimestamp && (endTimestamp !== startTimestamp)) {
          selectionDates = dateRange(startTimestamp, endTimestamp).map(date => date.toLocaleDateString('en-GB'));
        }
        else {
          selectionDates = [startTimestamp].map(date => date.toLocaleDateString('en-GB'));
        }
      }
      return selectionDates;
    },
  },
  created() {
    const selectionDays = this.$store.getters['vacancy/getSelectionDays'];

    console.log('selectionDays', selectionDays);

    const candidateAvailability = this.candidateFormResponse.candidateAvailability;

    console.log('candidateAvailability', candidateAvailability);

    this.combinedData = this.mapData(selectionDays, candidateAvailability);

    console.log('combinedData', this.combinedData);
  },
};
</script>
