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
              required
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.drivingLicenceEndorsementDetails"
                  required
                  :component="repeatableFields.DrivingLicenceEndorsementDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="recent-driving-convictions"
              v-model="characterInformation.recentDrivingConvictions"
              label="7. Were you convicted of any motoring offences in the past 4 years?"
              required
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.recentDrivingConvictionDetails"
                  required
                  :component="repeatableFields.RecentDrivingConvictionDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
          <div class="govuk-grid-column-one-quarter">
            <InfoIcon
              :url="motoringOffences"
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
import DrivingLicenceEndorsementDetails from '@/components/RepeatableFields/CharacterInformation/DrivingLicenceEndorsementDetails';
import RecentDrivingConvictionDetails from '@/components/RepeatableFields/CharacterInformation/RecentDrivingConvictionDetails';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { MOTORING_OFFENCES_URL } from './character-information-constants';

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
      drivingLicenceEndorsementDetails: null,
      recentDrivingConvictions: null,
      recentDrivingConvictionDetails: null,
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
        DrivingLicenceEndorsementDetails,
        RecentDrivingConvictionDetails,
      },
      motoringOffencesUrl: MOTORING_OFFENCES_URL,
    };
  },
  computed: {
    motoringOffences() {
      return this.motoringOffencesUrl;
    },
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
        if (this.characterInformation.drivingLicenceEndorsements === false ) {
          this.characterInformation.drivingLicenceEndorsementDetails = null;
        }
        if (this.characterInformation.recentDrivingConvictions === false ) {
          this.characterInformation.recentDrivingConvictionDetails = null;
        }
        this.application.characterInformationV2 = this.characterInformation;
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

