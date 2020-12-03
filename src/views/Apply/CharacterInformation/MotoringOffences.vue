<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <HeaderTitle
          title="Motoring Offences"
          url-to-good-character-section="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
        />

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <RadioGroup
          id="driving-disqualifications"
          v-model="characterInformation.drivingDisqualifications"
          required
          label="Have you ever been disqualified from driving?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.drivingDisqualificationDetails"
              required
              :component="repeatableFields.DrivingDisqualificationDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="driving-under-influence-convictions"
          v-model="characterInformation.drivingUnderInfluenceConvictions"
          required
          label="Have you ever been convicted for driving under the influence of drink or drugs?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.drivingUnderInfluenceConvictionDetails"
              required
              :component="repeatableFields.DrivingUnderInfluenceConvictionDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="driving-licence-endorsements"
          v-model="characterInformation.drivingLicenceEndorsements"
          label="Do you have any endorsements on your licence?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="recent-driving-convictions"
          v-model="characterInformation.recentDrivingConvictions"
          label="Were you convicted of any motoring offences in the past 4 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--character-information--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import RepeatableFields from '@/components/RepeatableFields';
import FixedPenaltyDetails from '@/components/RepeatableFields/FixedPenaltyDetails';
import CharacterInformationForm from '@/views/Apply/CharacterInformation/CharacterInformationForm';
import BackLink from '@/components/BackLink';
import HeaderTitle from './HeaderTitle';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
    HeaderTitle,
  },
  extends: CharacterInformationForm,
  data() {
    const defaults = {
      fixedPenalties: null,
      fixedPenaltyDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      repeatableFields: {
        FixedPenaltyDetails,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();
        if (this.characterInformation.fixedPenalties === false ) {
          this.characterInformation.fixedPenaltyDetails = null;
        }
        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'character-information-motoring-offences' });
      }
    },
  },
};
</script>

