<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
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
          label="What professional memberships do you have?"
        >
          <CheckboxItem
            v-if="showMembershipOption('chartered-association-of-building-engineers')"
            id="chartered-association-of-building-engineers"
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
              id="chartered-association-of-building-engineers-number"
              v-model="application.charteredAssociationBuildingEngineersNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="chartered-association-of-building-engineers-information"
              v-model="application.charteredAssociationBuildingEngineersInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.charteredInstituteBuildingDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              id="chartered-institute-of-building-number"
              v-model="application.charteredInstituteBuildingNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="chartered-institute-of-building-information"
              v-model="application.charteredInstituteBuildingInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.charteredInstituteEnvironmentalHealthDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              id="chartered-institute-of-environmental-health-number"
              v-model="application.charteredInstituteEnvironmentalHealthNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="chartered-institute-of-environmental-health-information"
              v-model="application.charteredInstituteEnvironmentalHealthInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.generalMedicalCouncilDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              id="general-medical-council-number"
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
                  id="general-medical-council-conditional-registration-details"
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
              id="general-medical-council-information"
              v-model="application.generalMedicalCouncilInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.royalCollegeOfPsychiatristsDate"
              label="When did you become a member?"
              hint="If this was less than 3 years ago you may not be eligible for this post"
              type="month"
            />
            <TextField
              id="royal-college-of-psychiatrists-number"
              v-model="application.royalCollegeOfPsychiatristsNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="royal-college-of-psychiatrists-information"
              v-model="application.royalCollegeOfPsychiatristsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.royalInstitutionCharteredSurveyorsDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              id="royal-institution-of-chartered-surveyors-number"
              v-model="application.royalInstitutionCharteredSurveyorsNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="royal-institution-of-chartered-surveyors-information"
              v-model="application.royalInstitutionCharteredSurveyorsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.royalInstituteBritishArchitectsDate"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              id="royal-institute-of-british-architects-number"
              v-model="application.royalInstituteBritishArchitectsNumber"
              label="Membership number?"
            />
            <TextareaInput
              id="royal-institute-of-british-architects-information"
              v-model="application.royalInstituteBritishArchitectsInformation"
              label="Any information about your membership we need to be aware of?"
              rows="2"
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
              v-model="application.memberships[membership.value].date"
              label="When did you become a member?"
              type="month"
            />
            <TextField
              :id="`${membership.value}-number`"
              v-model="application.memberships[membership.value].number"
              label="Membership number?"
            />
            <TextareaInput
              :id="`${membership.value}-information`"
              v-model="application.memberships[membership.value].information"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
        </CheckboxGroup>

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
        >
          Save and continue
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
  data() {
    const defaults = {
      charteredAssociationBuildingEngineersDate: null,
      charteredAssociationBuildingEngineersInformation: null,
      charteredAssociationBuildingEngineersNumber: null,
      charteredInstituteBuildingDate: null,
      charteredInstituteBuildingInformation: null,
      charteredInstituteBuildingNumber: null,
      charteredInstituteEnvironmentalHealthDate: null,
      charteredInstituteEnvironmentalHealthInformation: null,
      charteredInstituteEnvironmentalHealthNumber: null,
      generalMedicalCouncilConditional: null,
      generalMedicalCouncilConditionalDetails: null,
      generalMedicalCouncilConditionalEndDate: null,
      generalMedicalCouncilConditionalStartDate: null,
      generalMedicalCouncilDate: null,
      generalMedicalCouncilInformation: null,
      generalMedicalCouncilNumber: null,
      otherProfessionalMemberships: null,
      otherProfessionalMembershipsDate: null,
      otherProfessionalMembershipsInformation: null,
      otherProfessionalMembershipsNumber: null,
      professionalMemberships: null,
      royalCollegeOfPsychiatristsDate: null,
      royalCollegeOfPsychiatristsInformation: null,
      royalCollegeOfPsychiatristsNumber: null,
      royalInstituteBritishArchitectsDate: null,
      royalInstituteBritishArchitectsInformation: null,
      royalInstituteBritishArchitectsNumber: null,
      royalInstitutionCharteredSurveyorsDate: null,
      royalInstitutionCharteredSurveyorsInformation: null,
      royalInstitutionCharteredSurveyorsNumber: null,
      memberships: {},
    };

    // @NOTE fields for custom memberships
    const vacancy = this.$store.state.vacancy.record;
    if (Array.isArray(vacancy.otherMemberships)) {
      vacancy.otherMemberships.forEach(membership => {
        if (vacancy.memberships.includes(membership.value)) {
          defaults.memberships[membership.value] = {
            date: null,
            number: null,
            information: null,
          };
        }
      });
    }

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
    otherMemberships() {
      if (Array.isArray(this.vacancy.otherMemberships)) {
        return this.vacancy.otherMemberships.filter(membership => this.vacancy.memberships.includes(membership.value));
      }
      return null;
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
