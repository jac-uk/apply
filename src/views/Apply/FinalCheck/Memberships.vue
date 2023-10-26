<template>
  <dl
    class="govuk-summary-list govuk-!-margin-bottom-8"
  >
    <div
      v-if="showMembershipOption('chartered-association-of-building-engineers')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Chartered Association of Building Engineers
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.charteredAssociationBuildingEngineersDate) }}</li>
          <li>{{ application.charteredAssociationBuildingEngineersNumber }}</li>
          <li>{{ application.charteredAssociationBuildingEngineersInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('chartered-institute-of-building')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Chartered Association of Building Engineers
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.charteredInstituteBuildingDate) }}</li>
          <li>{{ application.charteredInstituteBuildingNumber }}</li>
          <li>{{ application.charteredInstituteBuildingInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('chartered-institute-of-environmental-health')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Chartered Institute of Environmental Health
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.charteredInstituteEnvironmentalHealthDate) }}</li>
          <li>{{ application.charteredInstituteEnvironmentalHealthNumber }}</li>
          <li>{{ application.charteredInstituteEnvironmentalHealthInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('general-medical-council')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        General Medical Council
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.generalMedicalCouncilDate) }}</li>
          <li>{{ application.generalMedicalCouncilNumber }}</li>
          <li>{{ application.generalMedicalCouncilInformation }}</li>
        </ul>

        <ul
          v-if="application.generalMedicalCouncilConditional"
          class="govuk-list"
        >
          <p class="govuk-hint">
            Conditions
          </p>
          <li
            v-if="application.generalMedicalCouncilConditionalStartDate
              && application.generalMedicalCouncilConditionalEndDate"
          >
            {{ $filters.formatDate(application.generalMedicalCouncilConditionalStartDate) }}
            to {{ $filters.formatDate(application.generalMedicalCouncilConditionalEndDate) }}
          </li>
          <li
            v-if="application.generalMedicalCouncilConditionalStartDate
              && !application.generalMedicalCouncilConditionalEndDate"
          >
            {{ $filters.formatDate(application.generalMedicalCouncilConditionalStartDate) }} — current
          </li>
          <li>
            {{ application.generalMedicalCouncilConditionalDetails }}
          </li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('royal-college-of-psychiatrists')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Royal College of Psychiatrists
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.royalCollegeOfPsychiatristsDate) }}</li>
          <li>{{ application.royalCollegeOfPsychiatristsNumber }}</li>
          <li>{{ application.royalCollegeOfPsychiatristsInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('royal-institution-of-chartered-surveyors')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Royal Institution of Chartered Surveyors
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.royalInstitutionCharteredSurveyorsDate) }}</li>
          <li>{{ application.royalInstitutionCharteredSurveyorsNumber }}</li>
          <li>{{ application.royalInstitutionCharteredSurveyorsInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('royal-institute-of-british-architects')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Royal Institute of British Architects
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.royalInstituteBritishArchitectsDate) }}</li>
          <li>{{ application.royalInstituteBritishArchitectsNumber }}</li>
          <li>{{ application.royalInstituteBritishArchitectsInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-if="showMembershipOption('other')"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Other membership
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(application.otherProfessionalMembershipsDate) }}</li>
          <li>{{ application.otherProfessionalMembershipsNumber }}</li>
          <li>{{ application.otherProfessionalMembershipsInformation }}</li>
        </ul>
      </dd>
    </div>

    <div
      v-for="(membership, key) in otherMemberships"
      :key="key"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        {{ membership.label }}
      </dt>
      <dd class="govuk-summary-list__value">
        <ul class="govuk-list">
          <li>{{ $filters.formatDate(membership.date) }}</li>
          <li>{{ membership.number }}</li>
          <li>{{ membership.information }}</li>
        </ul>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  name: 'Memberships',
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
    otherMemberships() {
      // @NOTE this is a bit ugly as we can't just lookup label
      const selected = {};

      if (this.application.professionalMemberships) {
        this.application.professionalMemberships.forEach(membership => {
          if (this.application.memberships[membership]) {
            const otherMembership = this.vacancy.otherMemberships.find(m => m.value === membership);
            selected[membership] = {
              ...this.application.memberships[membership],
              label: otherMembership.label,
            };
          }
        });
      }

      return selected;
    },
  },
  methods: {
    showMembershipOption(ref) {
      const professionalMemberships = this.application.professionalMemberships;
      return professionalMemberships && professionalMemberships.indexOf(ref) >= 0;
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
