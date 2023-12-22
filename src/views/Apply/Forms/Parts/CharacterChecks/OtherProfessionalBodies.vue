<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Other professional bodies
      </h1>

      <ErrorSummary :errors="errors" />

      <p class="govuk-body govuk-!-margin-bottom-6">
        For some applications, you will need to provide details of other professional bodies where you hold
        membership/s. Please use this section to provide details of these organisations and your membership,
        such as a registration number and status, e.g. associate, fellow etc.
      </p>

      <CheckboxGroup
        id="professional-memberships"
        v-model="formData.professionalMemberships"
        label="What professional memberships do you have?"
        required
      >
        <CheckboxItem
          v-if="showMembershipOption('chartered-association-of-building-engineers')"
          id="chartered-association-of-building-engineers"
          value="chartered-association-of-building-engineers"
          label="Chartered Association of Building Engineers"
        >
          <DateInput
            id="chartered-association-of-building-engineers-date"
            v-model="formData.charteredAssociationBuildingEngineersDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="chartered-association-of-building-engineers-number"
            v-model="formData.charteredAssociationBuildingEngineersNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="chartered-institute-of-building-engineers-status"
            v-model="formData.charteredAssociationBuildingEngineersStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('chartered-institute-of-building')"
          id="chartered-institute-of-building"
          value="chartered-institute-of-building"
          label="Chartered Institute of Building"
        >
          <DateInput
            id="chartered-institute-of-building-date"
            v-model="formData.charteredInstituteBuildingDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="chartered-institute-of-building-number"
            v-model="formData.charteredInstituteBuildingNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="chartered-institute-of-building-status"
            v-model="formData.charteredInstituteBuildingStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('chartered-institute-of-environmental-health')"
          id="chartered-institute-of-environmental-health"
          value="chartered-institute-of-environmental-health"
          label="Chartered Institute of Environmental Health"
        >
          <DateInput
            id="chartered-institute-of-environmental-health-date"
            v-model="formData.charteredInstituteEnvironmentalHealthDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="chartered-institute-of-environmental-health-number"
            v-model="formData.charteredInstituteEnvironmentalHealthNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="chartered-institute-of-environmental-health-information"
            v-model="formData.charteredInstituteEnvironmentalHealthStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('general-medical-council')"
          id="general-medical-council"
          value="general-medical-council"
          label="General Medical Council"
        >
          <DateInput
            id="general-medical-council-date"
            v-model="formData.generalMedicalCouncilDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="general-medical-council-number"
            v-model="formData.generalMedicalCouncilNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="general-medical-council-information"
            v-model="formData.generalMedicalCouncilStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('royal-college-of-psychiatrists')"
          id="royal-college-of-psychiatrists"
          value="royal-college-of-psychiatrists"
          label="Royal College of Psychiatrists"
        >
          <DateInput
            id="royal-college-of-psychiatrists-date"
            v-model="formData.royalCollegeOfPsychiatristsDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="royal-college-of-psychiatrists-number"
            v-model="formData.royalCollegeOfPsychiatristsNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="royal-college-of-psychiatrists-information"
            v-model="formData.royalCollegeOfPsychiatristsStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('royal-institution-of-chartered-surveyors')"
          id="royal-institution-of-chartered-surveyors"
          value="royal-institution-of-chartered-surveyors"
          label="Royal Institution of Chartered Surveyors"
        >
          <DateInput
            id="royal-institution-of-chartered-surveyors-date"
            v-model="formData.royalInstitutionCharteredSurveyorsDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="royal-institution-of-chartered-surveyors-number"
            v-model="formData.royalInstitutionCharteredSurveyorsNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="royal-institution-of-chartered-surveyors-information"
            v-model="formData.royalInstitutionCharteredSurveyorsStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
        <CheckboxItem
          v-if="showMembershipOption('royal-institute-of-british-architects')"
          id="royal-institute-of-british-architects"
          value="royal-institute-of-british-architects"
          label="Royal Institute of British Architects"
        >
          <DateInput
            id="royal-institute-of-british-architects-date"
            v-model="formData.royalInstituteBritishArchitectsDate"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            id="royal-institute-of-british-architects-number"
            v-model="formData.royalInstituteBritishArchitectsNumber"
            label="Membership number"
            required
          />
          <TextareaInput
            id="royal-institute-of-british-architects-information"
            v-model="formData.royalInstituteBritishArchitectsStatus"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>

        <CheckboxItem
          v-for="membership in otherMemberships"
          :id="membership.value"
          :key="membership.value"
          :value="membership.value"
          :label="membership.label"
        >
          <DateInput
            :id="`${membership.value}-date`"
            v-model="formData.memberships[membership.value].date"
            label="Date when membership started"
            type="month"
            required
          />
          <TextField
            :id="`${membership.value}-number`"
            v-model="formData.memberships[membership.value].number"
            label="Membership number"
            required
          />
          <TextareaInput
            :id="`${membership.value}-status`"
            v-model="formData.memberships[membership.value].status"
            label="Status"
            rows="1"
            required
          />
        </CheckboxItem>
      </CheckboxGroup>
      <button
        class="govuk-button info-btn--professional-bodies--save-and-continue"
      >
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink.vue';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';

export default {
  name: 'OtherProfessionalBodies',
  components: {
    BackLink,
    ErrorSummary,
    TextField,
    DateInput,
    CheckboxItem,
    CheckboxGroup,
    TextareaInput,
  },
  extends: Form,
  data() {
    const defaults = {
      charteredAssociationBuildingEngineersDate: null,
      charteredAssociationBuildingEngineersStatus: null,
      charteredAssociationBuildingEngineersNumber: null,
      charteredInstituteBuildingDate: null,
      charteredInstituteBuildingStatus: null,
      charteredInstituteBuildingNumber: null,
      charteredInstituteEnvironmentalHealthDate: null,
      charteredInstituteEnvironmentalHealthStatus: null,
      charteredInstituteEnvironmentalHealthNumber: null,
      generalMedicalCouncilConditional: null,
      generalMedicalCouncilConditionalDetails: null,
      generalMedicalCouncilConditionalEndDate: null,
      generalMedicalCouncilConditionalStartDate: null,
      generalMedicalCouncilDate: null,
      generalMedicalCouncilStatus: null,
      generalMedicalCouncilNumber: null,
      otherProfessionalMemberships: null,
      otherProfessionalMembershipsDate: null,
      otherProfessionalMembershipsStatus: null,
      otherProfessionalMembershipsNumber: null,
      professionalMemberships: null,
      royalCollegeOfPsychiatristsDate: null,
      royalCollegeOfPsychiatristsStatus: null,
      royalCollegeOfPsychiatristsNumber: null,
      royalInstituteBritishArchitectsDate: null,
      royalInstituteBritishArchitectsStatus: null,
      royalInstituteBritishArchitectsNumber: null,
      royalInstitutionCharteredSurveyorsDate: null,
      royalInstitutionCharteredSurveyorsStatus: null,
      royalInstitutionCharteredSurveyorsNumber: null,
      memberships: {},
    };
    const vacancy = this.$store.state.vacancy.record;

    if (Array.isArray(vacancy.otherMemberships)) {
      vacancy.otherMemberships.forEach(membership => {
        if (vacancy.memberships.includes(membership.value)) {
          defaults.memberships[membership.value] = {
            date: null,
            number: null,
            information: null,
            status: null,
          };
        }
      });
    }

    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formData: formData,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    otherMemberships() {
      if (Array.isArray(this.vacancy.otherMemberships)) {
        return this.vacancy.otherMemberships.filter(membership => this.vacancy.memberships.includes(membership.value));
      }
      return null;
    },
  },
  mounted() {
    // back to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  methods: {
    showMembershipOption(ref) {
      return this.vacancy.memberships.indexOf(ref) >= 0;
    },
    async save() {
      this.validate();
      if (this.isValid()) {
        if (!this.formData.professionalMemberships.includes('chartered-association-of-building-engineers')) {
          this.formData.charteredAssociationBuildingEngineersDate = null;
          this.formData.charteredAssociationBuildingEngineersStatus = null;
          this.formData.charteredAssociationBuildingEngineersNumber = null;
          this.formData.charteredAssociationBuildingEngineersInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('chartered-institute-of-building')) {
          this.formData.charteredInstituteBuildingDate = null;
          this.formData.charteredInstituteBuildingStatus = null;
          this.formData.charteredInstituteBuildingNumber = null;
          this.formData.charteredInstituteBuildingInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('chartered-institute-of-environmental-health')) {
          this.formData.charteredInstituteEnvironmentalHealthDate = null;
          this.formData.charteredInstituteEnvironmentalHealthStatus = null;
          this.formData.charteredInstituteEnvironmentalHealthNumber = null;
          this.formData.charteredInstituteEnvironmentalHealthInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('general-medical-council')) {
          this.formData.generalMedicalCouncilConditional = null;
          this.formData.generalMedicalCouncilConditionalDetails = null;
          this.formData.generalMedicalCouncilConditionalEndDate = null;
          this.formData.generalMedicalCouncilConditionalStartDate = null;
          this.formData.generalMedicalCouncilDate = null;
          this.formData.generalMedicalCouncilStatus = null;
          this.formData.generalMedicalCouncilNumber = null;
          this.formData.generalMedicalCouncilInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('royal-college-of-psychiatrists')) {
          this.formData.royalCollegeOfPsychiatristsDate = null;
          this.formData.royalCollegeOfPsychiatristsStatus = null;
          this.formData.royalCollegeOfPsychiatristsNumber = null;
          this.formData.royalCollegeOfPsychiatristsInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('royal-institution-of-chartered-surveyors')) {
          this.formData.royalInstituteBritishArchitectsDate = null;
          this.formData.royalInstituteBritishArchitectsStatus = null;
          this.formData.royalInstituteBritishArchitectsNumber = null;
          this.formData.royalInstituteBritishArchitectsInformation = null;
        }

        if (!this.formData.professionalMemberships.includes('royal-institute-of-british-architects')) {
          this.formData.royalInstitutionCharteredSurveyorsDate = null;
          this.formData.royalInstitutionCharteredSurveyorsStatus = null;
          this.formData.royalInstitutionCharteredSurveyorsNumber = null;
          this.formData.royalInstitutionCharteredSurveyorsInformation = null;
        }

        const membershipList = this.otherMemberships;

        if (Array.isArray(membershipList) && Array.isArray(this.formData.professionalMemberships)) {
          membershipList.forEach(membership => {
            if (!this.formData.professionalMemberships.includes(membership.value)) {
              this.formData.memberships[membership.value] = {
                date: null,
                number: null,
                information: null,
                status: null,
              };
            }
          });
        }
        await this.$store.dispatch('application/save', this.formData);
        this.$router.push({ name: 'candidate-form-tasks-characterChecks-review' });
      }
    },
  },
};
</script>

