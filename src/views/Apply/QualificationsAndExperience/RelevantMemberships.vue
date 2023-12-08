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

        <ErrorSummary :errors="errors" />

        <CheckboxGroup
          id="professional-memberships"
          v-model="formData.professionalMemberships"
          label="What professional memberships do you have?"
          :required="isJAC00187"
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
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="chartered-association-of-building-engineers-number"
              v-model="formData.charteredAssociationBuildingEngineersNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="chartered-association-of-building-engineers-information"
              v-model="formData.charteredAssociationBuildingEngineersInformation"
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
              v-model="formData.charteredInstituteBuildingDate"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="chartered-institute-of-building-number"
              v-model="formData.charteredInstituteBuildingNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="chartered-institute-of-building-information"
              v-model="formData.charteredInstituteBuildingInformation"
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
              v-model="formData.charteredInstituteEnvironmentalHealthDate"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="chartered-institute-of-environmental-health-number"
              v-model="formData.charteredInstituteEnvironmentalHealthNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="chartered-institute-of-environmental-health-information"
              v-model="formData.charteredInstituteEnvironmentalHealthInformation"
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
              v-model="formData.generalMedicalCouncilDate"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="general-medical-council-number"
              v-model="formData.generalMedicalCouncilNumber"
              label="Membership number?"
              required
            />
            <RadioGroup
              id="general-medical-council-conditional-registration"
              v-model="formData.generalMedicalCouncilConditional"
              label="Is your registration conditional?"
              required
            >
              <RadioItem
                :value="true"
                label="Yes (if you do have this you might not be successful in this post)"
              >
                <DateInput
                  id="general-medical-council-conditional-registration-start-date"
                  v-model="formData.generalMedicalCouncilConditionalStartDate"
                  label="Start date"
                />
                <DateInput
                  id="general-medical-council-conditional-registration-end-date"
                  v-model="formData.generalMedicalCouncilConditionalEndDate"
                  label="End date"
                />
                <TextareaInput
                  id="general-medical-council-conditional-registration-details"
                  v-model="formData.generalMedicalCouncilConditionalDetails"
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
              v-model="formData.generalMedicalCouncilInformation"
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
              v-model="formData.royalCollegeOfPsychiatristsDate"
              label="When did you become a member?"
              hint="If this was less than 3 years ago you may not be eligible for this post"
              type="month"
              required
            />
            <TextField
              id="royal-college-of-psychiatrists-number"
              v-model="formData.royalCollegeOfPsychiatristsNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="royal-college-of-psychiatrists-information"
              v-model="formData.royalCollegeOfPsychiatristsInformation"
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
              v-model="formData.royalInstitutionCharteredSurveyorsDate"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="royal-institution-of-chartered-surveyors-number"
              v-model="formData.royalInstitutionCharteredSurveyorsNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="royal-institution-of-chartered-surveyors-information"
              v-model="formData.royalInstitutionCharteredSurveyorsInformation"
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
              v-model="formData.royalInstituteBritishArchitectsDate"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              id="royal-institute-of-british-architects-number"
              v-model="formData.royalInstituteBritishArchitectsNumber"
              label="Membership number?"
              required
            />
            <TextareaInput
              id="royal-institute-of-british-architects-information"
              v-model="formData.royalInstituteBritishArchitectsInformation"
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
              v-model="formData.memberships[membership.value].date"
              label="When did you become a member?"
              type="month"
              required
            />
            <TextField
              :id="`${membership.value}-number`"
              v-model="formData.memberships[membership.value].number"
              label="Membership number?"
              required
            />
            <TextareaInput
              :id="`${membership.value}-information`"
              v-model="formData.memberships[membership.value].information"
              label="Any information about your membership we need to be aware of?"
              rows="2"
            />
          </CheckboxItem>
        </CheckboxGroup>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--relevant-membership--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextField from '@/components/Form/TextField.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import DateInput from '@/components/Form/DateInput.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'RelevantMemberships',
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
  mixins: [ApplyMixIn],
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
      progress: {},
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

    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'relevantMemberships',
      formData: formData,
    };
  },
  computed: {
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
  },
};
</script>
