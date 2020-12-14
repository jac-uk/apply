<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-three-quarters">
            <h2 class="govuk-heading-l">
              Motoring Offences
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="driving-disqualifications"
              v-model="characterInformation.drivingDisqualifications"
              required
              label="4. Have you ever been disqualified from driving?"
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
              label="5. Have you ever been convicted for driving under the influence of drink or drugs?"
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
              label="6. Do you have any endorsements on your licence?"
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
              label="7. Were you convicted of any motoring offences in the past 4 years?"
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
          </div>
          <div class="govuk-grid-column-one-quarter">
            <InfoIcon
              url="https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#motoring-offences"
            />
          </div>
        </div>
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
import DrivingDisqualificationDetails from '@/components/RepeatableFields/CharacterInformation/DrivingDisqualificationDetails';
import DrivingUnderInfluenceConvictionDetails from '@/components/RepeatableFields/CharacterInformation/DrivingUnderInfluenceConvictionDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
    InfoIcon,
  },
  extends: CharacterInformationStatus,
  data() {
    const defaults = {
      drivingDisqualifications: null,
      drivingDisqualificationDetails: null,
      drivingUnderInfluenceConvictions: null,
      drivingUnderInfluenceConvictionDetails: null,
      drivingLicenceEndorsements: null,
      recentDrivingConvictions: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      repeatableFields: {
        DrivingDisqualificationDetails,
        DrivingUnderInfluenceConvictionDetails,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();

        if (this.characterInformation.drivingDisqualifications === false ) {
          this.characterInformation.drivingDisqualificationDetails = null;
        }
        if (this.characterInformation.drivingUnderInfluenceConvictions === false ) {
          this.characterInformation.drivingUnderInfluenceConvictionDetails = null;
        }
        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);

        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-financial-matters' });
        }
      }
    },
  },
};
</script>

