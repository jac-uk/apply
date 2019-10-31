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
          />
          <RadioItem
            value="royal-college-of-psychiatrists"
            label="Royal College of Psychaitrists"
          />
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
            value="royal-institute-of-british-architects"
            label="Royal Institute of British Architects"
          />
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

export default {
  components: {
    RepeatableFields,
    RadioItem,
    RadioGroup,
    TextField
  },
  data(){
    return {
      repeatableFields: {
        Qualification,
      },
      qualifications: null,
      professionalMemberships: null,
      otherProfessionalMemberships: null,
      unknownVariable: 'non-legal',
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
