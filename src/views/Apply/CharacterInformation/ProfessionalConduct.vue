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
              :label="isCharacterInformationV3
                ? '12. Have you ever been, or are you currently, the subject of a complaint or an allegation of professional misconduct? You do not need to declare any complaint that was dismissed in full.'
                : '11. Have you ever been, or are you currently, subject of an allegation or claim of professional misconduct?'
              "
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconductDetails"
                  required
                  :component="repeatableFields.ProfessionalMisconductDetails"
                  :component-props="{
                    hint: isCharacterInformationV3
                      ? 'Please add details of the complaint or allegation of professional misconduct here, including any findings against you and the resulting penalty.'
                      : 'Please add details of your professional misconduct here'
                  }"
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
              :label="isCharacterInformationV3
                ? '13. Have you ever been, or are you currently, the subject of an allegation or claim of professional negligence? You do not need to declare any claim that was dismissed or withdrawn without a settlement.'
                : '12. Have you ever been, or are you currently, subject of an allegation or claim of negligence?'
              "
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.subjectOfAllegationOrClaimOfNegligenceDetails"
                  required
                  :component="repeatableFields.NegligenceDetails"
                  :component-props="{
                    label: isCharacterInformationV3
                      ? 'Is the claim ongoing?'
                      : 'Is the investigation ongoing?',
                    hint: isCharacterInformationV3
                      ? 'Please add details of the allegation or claim of professional negligence here, including any findings against you or any settlement.'
                      : 'Please add details of your negligence here'
                  }"
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
              :label="`${isCharacterInformationV3 ? '14' : '13'}. Have you ever been, or are you currently, subject of an allegation or claim of wrongful dismissal?`"
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
              :label="`${isCharacterInformationV3 ? '15' : '14'}. Have you ever been, or are you currently, subject of an allegation or claim of discrimination proceedings?`"
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
              :label="`${isCharacterInformationV3 ? '16' : '15'}. Have you ever been, or are you currently, subject of an allegation or claim of harassment proceedings?`"
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
              :label="`${isCharacterInformationV3 ? '17' : '16'}. Have you ever been, or are you currently, subject of complaints or disciplinary action?`"
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
              :label="`${isCharacterInformationV3 ? '18' : '17'}. Have you ever been asked to resign from a position?`"
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
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import ProfessionalMisconductDetails from '@/components/RepeatableFields/CharacterInformation/ProfessionalMisconductDetails.vue';
import NegligenceDetails from '@/components/RepeatableFields/CharacterInformation/NegligenceDetails.vue';
import WrongfulDismissalDetails from '@/components/RepeatableFields/CharacterInformation/WrongfulDismissalDetails.vue';
import HarassmentProceedingDetails from '@/components/RepeatableFields/CharacterInformation/HarassmentProceedingDetails.vue';
import DiscriminationProceedingDetails from '@/components/RepeatableFields/CharacterInformation/DiscriminationProceedingDetails.vue';
import RequestedToResignDetails from '@/components/RepeatableFields/CharacterInformation/RequestedToResignDetails.vue';
import ComplaintOrDisciplinaryActionDetails from '@/components/RepeatableFields/CharacterInformation/ComplaintOrDisciplinaryActionDetails.vue';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import BackLink from '@/components/BackLink.vue';
import InfoIcon from '@/components/ModalViews/InfoIcon.vue';
import { PROFESSIONAL_CONDUCT_URL } from './character-information-constants';

export default {
  name: 'ProfessionalConduct',
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
        const data = this.initCharacterInformation(this.characterInformation);
        data[`progress.${this.formId}`] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else if (this.isCharacterInformationV3) {
          this.$router.push({ name: 'character-information-civil-proceedings' });
        } else {
          this.$router.push({ name: 'character-information-further-information' });
        }
      }
    },
  },
};
</script>

