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
          v-model="qualifications"
          :component="repeatableFields.Qualification"
        />

        <RadioGroup
          v-if="unknownVariable === 'non-legal'"
          id="professional-memberships"
          v-model="professionalMemberships"
          label="What professional memberships do you have?"
        >
          <RadioItem
            value="chartered-association-of-building-engineers"
            label="Chartered Association of Building Engineers"
          >
            <TextField
              v-model="charteredAssociationBuildingEngineersDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="charteredAssociationBuildingEngineersNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="chartered-institute-of-building"
            label="Chartered Institute of Building"
          >
            <TextField
              v-model="charteredInstituteBuildingDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="charteredInstituteBuildingNumber"
              label="Membership number?"
            />
          </RadioItem>

          <RadioItem
            value="chartered-institute-of-environmental-health"
            label="Chartered Institute of Environmental Health"
          >
            <TextField
              v-model="charteredInstituteEnvironmentalHealthDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="charteredInstituteEnvironmentalHealthNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="general-medical-council"
            label="General Medical Council"
          >
            <RadioGroup
              id="general-medical-council-conditional-registration"
              v-model="GeneralMedicalCouncilConditionalRegistration"
              label="Is your registration conditional?"
            >
              <RadioItem
                :value="true"
                label="Yes (if you do have this you might not be successful in this post)"
              >
                <DateInput
                  id="gmc-yes-date"
                  v-model="gmcConditionalYesDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="gmcConditionalYesNumber"
                  label="Membership number?"
                />
                <TextField
                  v-model="gmcConditionalYesDetails"
                  label="Give details of the conditions and dates"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              >
                <DateInput
                  id="gmc-no-date"
                  v-model="gmcConditionalNoDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="gmcConditionalNoNumber"
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
              v-model="royalCollegePsychiatristsFellow3Years"
              label="You have been a member or fellow for 3 years?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextField
                  v-model="rcpYesDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="rcpYesNumber"
                  label="Membership number?"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No (if less than 3 years you might not be successful in this post)"
              >
                <TextField
                  v-model="rcpNoDate"
                  label="When did you become a member?"
                />
                <TextField
                  v-model="rcpNoNumber"
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
              v-model="royalInstitutionCharteredSurveyorsDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="royalInstitutionCharteredSurveyorsNumber"
              label="Membership number?"
            />
          </RadioItem>
          <RadioItem
            value="other"
            label="Other"
          >
            <TextField
              v-model="otherProfessionalMemberships"
              label="Associations or Institutes"
            />
            <TextField
              v-model="otherProfessionalMembershipsDate"
              label="When did you become a member?"
            />
            <TextField
              v-model="otherProfessionalMembershipsNumber"
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
    return {
      repeatableFields: {
        Qualification,
      },
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
      unknownVariable: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
