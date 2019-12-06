<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1
          v-if="unknownVariable !== 'non-legal'"
          class="govuk-heading-xl"
        >
          Qualifications
        </h1>

        <h1
          v-if="unknownVariable === 'non-legal'"
          class="govuk-heading-xl"
        >
          Memberships
        </h1>

        <RepeatableFields
          v-if="unknownVariable !== 'non-legal'"
          v-model="application.qualifications"
          :component="repeatableFields.Qualification"
        />

        <RadioGroup
          v-if="unknownVariable === 'non-legal'"
          id="professional-memberships"
          v-model="application.professionalMemberships"
          label="What professional memberships do you have?"
        >
          <RadioItem
            value="chartered-association-of-building-engineers"
            label="Chartered Association of Building Engineers"
          >
            <TextField
              v-model="application.charteredAssociationBuildingEngineersDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="application.charteredAssociationBuildingEngineersNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="chartered-institute-of-building"
            label="Chartered Institute of Building"
          >
            <TextField
              v-model="application.charteredInstituteBuildingDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="application.charteredInstituteBuildingNumber"
              label="Membership number?"
            />
          </RadioItem>

          <RadioItem
            value="chartered-institute-of-environmental-health"
            label="Chartered Institute of Environmental Health"
          >
            <TextField
              v-model="application.charteredInstituteEnvironmentalHealthDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="application.charteredInstituteEnvironmentalHealthNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="general-medical-council"
            label="General Medical Council"
          >
            <RadioGroup
              id="general-medical-council-conditional-registration"
              v-model="application.GeneralMedicalCouncilConditionalRegistration"
              label="Is your registration conditional?"
            >
              <RadioItem
                :value="true"
                label="Yes (if you do have this you might not be successful in this post)"
              >
                <DateInput
                  id="gmc-yes-date"
                  v-model="application.gmcConditionalYesDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="application.gmcConditionalYesNumber"
                  label="Membership number?"
                />
                <TextField
                  v-model="application.gmcConditionalYesDetails"
                  label="Give details of the conditions and dates"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              >
                <DateInput
                  id="gmc-no-date"
                  v-model="application.gmcConditionalNoDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="application.gmcConditionalNoNumber"
                  label="Membership number?"
                />
              </RadioItem>
            </RadioGroup>
          </RadioItem>
          <RadioItem
            value="royal-college-of-psychiatrists"
            label="Royal College of Psychiatrists"
          >
            <RadioGroup
              id="royal-college-of-psychiatrists-fellow-3-years"
              v-model="application.royalCollegePsychiatristsFellow3Years"
              label="You have been a member or fellow for 3 years?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextField
                  v-model="application.rcpYesDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="application.rcpYesNumber"
                  label="Membership number?"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No (if less than 3 years you might not be successful in this post)"
              >
                <TextField
                  v-model="application.rcpNoDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="application.rcpNoNumber"
                  label="Membership number?"
                />
              </RadioItem>
            </RadioGroup>
          </RadioItem>
          <RadioItem
            value="royal-institution-of-chartered-surveyors"
            label="Royal Institution of Chartered Surveyors"
          >
            <TextField
              v-model="application.royalInstitutionCharteredSurveyorsDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="application.royalInstitutionCharteredSurveyorsNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="other"
            label="Other"
          >
            <TextField
              v-model="application.otherProfessionalMemberships"
              label="Associations or Institutes"
            />
            <TextField
              v-model="application.otherProfessionalMembershipsDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="application.otherProfessionalMembershipsNumber"
              label="Membership number?"
            />
          </RadioItem>
        </RadioGroup>

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RepeatableFields from '@/components/RepeatableFields';
import Qualification from '@/components/RepeatableFields/Qualification';
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

export default {
  components: {
    RepeatableFields,
    RadioItem,
    RadioGroup,
    TextField,
    DateInput,
  },
  data(){
    const defaults = {
      qualifications: null,
      professionalMemberships: null,
      charteredAssociationBuildingEngineersDate: null,
      charteredAssociationBuildingEngineersNumber: null,
      charteredInstituteBuildingDate: null,
      charteredInstituteBuildingNumber: null,
      charteredInstituteEnvironmentalHealthDate: null,
      charteredInstituteEnvironmentalHealthNumber: null,
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
      otherProfessionalMemberships: null,
      otherProfessionalMembershipsDate: null,
      otherProfessionalMembershipsNumber: null,
      unknownVariable: 'non-legal',
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
      repeatableFields: {
        Qualification,
      },

    };
  },
  methods: {
    async save() {
      this.application.progress.relevantQualifications = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
