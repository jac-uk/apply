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
              id="criminal-offenses-cautions"
              v-model="characterInformation.criminalCautions"
              required
              label="1. Have you ever been cautioned for a criminal offence?"
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

            <RadioGroup
              id="criminal-offenses-convictions"
              v-model="characterInformation.criminalConvictions"
              required
              label="2. Have you ever been convicted for a criminal offence? This includes spent convictions."
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
          </div>
          <div class="govuk-grid-column-one-quarter">
            <InfoIcon
              url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
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
import CriminalCautionDetails from '@/components/RepeatableFields/CriminalCautionDetails';
import CriminalConvictionDetails from '@/components/RepeatableFields/CriminalConvictionDetails';
import CharacterInformationForm from '@/views/Apply/CharacterInformation/CharacterInformationForm';
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
  extends: CharacterInformationForm,
  data() {
    const defaults = {
      criminalCautions: null,
      criminalCautionDetails: null,
      criminalConvictions: null,
      criminalConvictionDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      repeatableFields: {
        CriminalCautionDetails,
        CriminalConvictionDetails,
      },
    };
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
        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'character-information-fixed-penalty-notices' });
      }
    },
  },
};
</script>

