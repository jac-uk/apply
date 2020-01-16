<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <h1 class="govuk-heading-xl">
          Memberships
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <CheckboxGroup
          id="professional-memberships"
          v-model="application.professionalMemberships"
          required
          label="What professional memberships do you have?"
        >
          <CheckboxItem
            v-if="showMembershipOption('chartered-association-of-building-engineers')"
            value="chartered-association-of-building-engineers"
            label="Chartered Association of Building Engineers"
          >
            <DateInput
              id="chartered-association-of-building-engineers-date"
              v-model="application.charteredAssociationBuildingEngineersDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.charteredAssociationBuildingEngineersNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.charteredAssociationBuildingEngineersInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('chartered-institute-of-building')"
            value="chartered-institute-of-building"
            label="Chartered Institute of Building"
          >
            <DateInput
              id="chartered-institute-of-building-date"
              v-model="application.charteredInstituteBuildingDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.charteredInstituteBuildingNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.charteredInstituteBuildingInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('chartered-institute-of-environmental-health')"
            value="chartered-institute-of-environmental-health"
            label="Chartered Institute of Environmental Health"
          >
            <DateInput
              id="chartered-institute-of-environmental-health-date"
              v-model="application.charteredInstituteEnvironmentalHealthDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.charteredInstituteEnvironmentalHealthNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.charteredInstituteEnvironmentalHealthInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('general-medical-council')"
            value="general-medical-council"
            label="General Medical Council"
          >
            <DateInput
              id="general-medical-council-date"
              v-model="application.generalMedicalCouncilDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.generalMedicalCouncilNumber"
              label="Membership number?"
            />
            <RadioGroup
              id="general-medical-council-conditional-registration"
              v-model="application.generalMedicalCouncilConditional"
              label="Is your registration conditional?"
            >
              <RadioItem
                :value="true"
                label="Yes (if you do have this you might not be successful in this post)"
              >
                <DateInput
                  id="general-medical-council-conditional-registration-start-date"
                  v-model="application.generalMedicalCouncilConditionalStartDate"
                  label="Start date"
                />
                <DateInput
                  id="general-medical-council-conditional-registration-end-date"
                  v-model="application.generalMedicalCouncilConditionalEndDate"
                  label="End date"
                />
                <TextareaInput
                  v-model="application.generalMedicalCouncilConditionalDetails"
                  label="Give details of the conditions"
                  rows="2"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
            <TextareaInput
              v-model="application.generalMedicalCouncilInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('royal-college-of-psychiatrists')"
            value="royal-college-of-psychiatrists"
            label="Royal College of Psychiatrists"
          >
            <DateInput
              id="royal-college-of-psychiatrists-date"
              v-model="application.royalCollegeOfPsychiatristsDate"
              label="When did you become a member?"
              hint="If this was less than 3 years ago you may not be eligible for this post"
              type="month"
            />
            <TextField
              v-model="application.royalCollegeOfPsychiatristsNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.royalCollegeOfPsychiatristsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('royal-institution-of-chartered-surveyors')"
            value="royal-institution-of-chartered-surveyors"
            label="Royal Institution of Chartered Surveyors"
          >
            <DateInput
              id="royal-institution-of-chartered-surveyors-date"
              v-model="application.royalInstitutionCharteredSurveyorsDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.royalInstitutionCharteredSurveyorsNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.royalInstitutionCharteredSurveyorsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
          <CheckboxItem
            v-if="showMembershipOption('other')"
            value="other"
            :label="vacancy.otherMemberships"
          >
            <DateInput
              id="other-date"
              v-model="application.otherProfessionalMembershipsDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              v-model="application.otherProfessionalMembershipsNumber"
              label="Membership number?"
            />
            <TextareaInput
              v-model="application.otherProfessionalMembershipsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
        </CheckboxGroup>

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import DateInput from '@/components/Form/DateInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    CheckboxGroup,
    CheckboxItem,
    RadioGroup,
    RadioItem,
    TextField,
    TextareaInput,
    DateInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      professionalMemberships: null,
      charteredAssociationBuildingEngineersDate: null,
      charteredAssociationBuildingEngineersNumber: null,
      charteredAssociationBuildingEngineersInformation: null,
      charteredInstituteBuildingDate: null,
      charteredInstituteBuildingNumber: null,
      charteredInstituteBuildingInformation: null,
      charteredInstituteEnvironmentalHealthDate: null,
      charteredInstituteEnvironmentalHealthNumber: null,
      charteredInstituteEnvironmentalHealthInformation: null,
      GeneralMedicalCouncilConditionalRegistration: null,
      gmcConditionalYesDate: null,
      gmcConditionalYesNumber: null,
      gmcConditionalYesDetails: null,
      gmcConditionalNoDate: null,
      gmcConditionalNoNumber: null,
      royalCollegePsychiatristsFellow3Years: null,
      rcpYesDate: null,
      rcpYesNumber: null,
      rcpNoDate: null,
      rcpNoNumber: null,
      royalInstitutionCharteredSurveyorsDate: null,
      royalInstitutionCharteredSurveyorsNumber: null,
      royalInstitutionCharteredSurveyorsInformation: null,
      otherProfessionalMemberships: null,
      otherProfessionalMembershipsDate: null,
      otherProfessionalMembershipsNumber: null,
      otherProfessionalMembershipsInformation: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    showMembershipOption(ref) {
      return this.vacancy.memberships.indexOf(ref) >= 0;
    },
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.relevantMemberships = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
