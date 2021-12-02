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
              Professional Conduct
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="professional-conduct"
              v-model="characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct"
              required
              label="11. Have you ever been, or are you currently, subject of an allegation or claim of professional misconduct?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconductDetails"
                  required
                  :component="repeatableFields.ProfessionalMisconductDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="negligence-details"
              v-model="characterInformation.subjectOfAllegationOrClaimOfNegligence"
              required
              label="12. Have you ever been, or are you currently, subject of an allegation or claim of negligence?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfNegligenceDetails"
                  required
                  :component="repeatableFields.NegligenceDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="wrongful-dismissal"
              v-model="characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal"
              required
              label="13. Have you ever been, or are you currently, subject of an allegation or claim of wrongful dismissal?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissalDetails"
                  required
                  :component="repeatableFields.WrongfulDismissalDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="discrimination"
              v-model="characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding"
              required
              label="14. Have you ever been, or are you currently, subject of an allegation or claim of discrimination proceedings?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceedingDetails"
                  required
                  :component="repeatableFields.DiscriminationProceedingDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="harassment"
              v-model="characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding"
              required
              label="15. Have you ever been, or are you currently, subject of an allegation or claim of harassment proceedings?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfHarassmentProceedingDetails"
                  required
                  :component="repeatableFields.HarassmentProceedingDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="complaint-or-disciplinary-actions"
              v-model="characterInformation.complaintOrDisciplinaryAction"
              required
              label="16. Have you ever been, or are you currently, subject of complaints or disciplinary action?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.complaintOrDisciplinaryActionDetails"
                  required
                  :component="repeatableFields.ComplaintOrDisciplinaryActionDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="request-to-resign"
              v-model="characterInformation.requestedToResign"
              required
              label="17. Have you ever been asked to resign from a position?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.requestedToResignDetails"
                  required
                  :component="repeatableFields.RequestedToResignDetails"
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
              :url="professionalConduct"
            />
          </div>
        </div>
        <button
          :disabled="!canSave(formId)"
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
import ProfessionalMisconductDetails from '@/components/RepeatableFields/CharacterInformation/ProfessionalMisconductDetails';
import NegligenceDetails from '@/components/RepeatableFields/CharacterInformation/NegligenceDetails';
import WrongfulDismissalDetails from '@/components/RepeatableFields/CharacterInformation/WrongfulDismissalDetails';
import HarassmentProceedingDetails from '@/components/RepeatableFields/CharacterInformation/HarassmentProceedingDetails';
import DiscriminationProceedingDetails from '@/components/RepeatableFields/CharacterInformation/DiscriminationProceedingDetails';
import RequestedToResignDetails from '@/components/RepeatableFields/CharacterInformation/RequestedToResignDetails';
import ComplaintOrDisciplinaryActionDetails from '@/components/RepeatableFields/CharacterInformation/ComplaintOrDisciplinaryActionDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { PROFESSIONAL_CONDUCT_URL } from './character-information-constants';

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
      subjectOfAllegationOrClaimOfProfessionalMisconduct: null,
      subjectOfAllegationOrClaimOfProfessionalMisconductDetails: null,
      subjectOfAllegationOrClaimOfNegligence: null,
      subjectOfAllegationOrClaimOfNegligenceDetails: null,
      subjectOfAllegationOrClaimOfWrongfulDismissal: null,
      subjectOfAllegationOrClaimOfWrongfulDismissalDetails: null,
      subjectOfAllegationOrClaimOfHarassmentProceeding: null,
      subjectOfAllegationOrClaimOfHarassmentProceedingDetails: null,
      subjectOfAllegationOrClaimOfDiscriminationProceeding: null,
      subjectOfAllegationOrClaimOfDiscriminationProceedingDetails: null,
      complaintOrDisciplinaryAction: null,
      complaintOrDisciplinaryActionDetails: null,
      requestedToResign: null,
      requestedToResignDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
      repeatableFields: {
        ProfessionalMisconductDetails,
        NegligenceDetails,
        WrongfulDismissalDetails,
        HarassmentProceedingDetails,
        DiscriminationProceedingDetails,
        ComplaintOrDisciplinaryActionDetails,
        RequestedToResignDetails,
      },
      professionalConductUrl: PROFESSIONAL_CONDUCT_URL,
    };
  },
  computed: {
    professionalConduct() {
      return this.professionalConductUrl;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();
        if (this.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct === false ) {
          this.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconductDetails = null;
        }

        if (this.characterInformation.subjectOfAllegationOrClaimOfNegligence === false ) {
          this.characterInformation.subjectOfAllegationOrClaimOfNegligenceDetails = null;
        }

        if (this.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding === false ) {
          this.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceedingDetails = null;
        }

        if (this.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding === false ) {
          this.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceedingDetails = null;
        }
        if (this.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal === false ) {
          this.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissalDetails = null;
        }
        if (this.characterInformation.complaintOrDisciplinaryAction === false ) {
          this.characterInformation.complaintOrDisciplinaryActionDetails = null;
        }
        if (this.characterInformation.requestedToResign === false ) {
          this.characterInformation.requestedToResignDetails = null;
        }

        await this.$store.dispatch('application/save', { ...this.application, ...{ characterInformationV2: this.characterInformation } });
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-further-information' });
        }
      }
    },
  },
};
</script>

