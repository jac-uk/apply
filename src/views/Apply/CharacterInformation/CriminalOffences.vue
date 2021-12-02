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
              Criminal Offences
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />
            <RadioGroup
              id="criminal-offences-convictions"
              v-model="characterInformation.criminalConvictions"
              required
              label="1. Have you ever been convicted for a criminal offence? This includes spent convictions."
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.criminalConvictionDetails"
                  required
                  :component="repeatableFields.CriminalConvictionDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="criminal-offences-cautions"
              v-model="characterInformation.criminalCautions"
              required
              label="2. Have you ever been cautioned for a criminal offence?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.criminalCautionDetails"
                  required
                  :component="repeatableFields.CriminalCautionDetails"
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
              :url="criminalOffences"
            />
          </div>
        </div>
        <button
          :disabled="!canSave('characterInformation')"
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
import CriminalCautionDetails from '@/components/RepeatableFields/CharacterInformation/CriminalCautionDetails';
import CriminalConvictionDetails from '@/components/RepeatableFields/CharacterInformation/CriminalConvictionDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { CRIMINAL_OFFENCES_URL } from './character-information-constants';

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
      criminalCautions: null,
      criminalCautionDetails: null,
      criminalConvictions: null,
      criminalConvictionDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    return {
      characterInformation: characterInformation,
      repeatableFields: {
        CriminalCautionDetails,
        CriminalConvictionDetails,
      },
      criminalOffencesUrl: CRIMINAL_OFFENCES_URL,
    };
  },
  computed: {
    criminalOffences() {
      return this.criminalOffencesUrl;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();
        if (this.characterInformation.criminalCautions === false ) {
          this.characterInformation.criminalCautionDetails = null;
        }
        if (this.characterInformation.criminalConvictions === false ) {
          this.characterInformation.criminalConvictionDetails = null;
        }
<<<<<<< HEAD
=======
        
>>>>>>> character-check-bugfix
        await this.$store.dispatch('application/save', { ...this.application, ...{ characterInformationV2: this.characterInformation } });
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);

        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-fixed-penalty-notices' });
        }
      }
    },
  },
};
</script>

