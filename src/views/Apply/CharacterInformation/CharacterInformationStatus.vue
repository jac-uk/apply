<script>
import Form from '@/components/Form/Form.vue';
import ApplyMixIn from '../ApplyMixIn';

export default {
  name: 'CharacterInformationStatus',
  extends: Form,
  mixins: [ApplyMixIn],
  computed: {
    applicationCharacterInformation() {
      return this.isCharacterInformationV3 ? this.application.characterInformationV3 : this.application.characterInformationV2;
    },
  },
  methods: {
    initCharacterInformation(characterInformation) {
      const data = {};
      if (this.isCharacterInformationV3)
        data.characterInformationV3 = characterInformation;
      else
        data.characterInformationV2 = characterInformation;
      return data;
    },
    isCharacterInformationComplete(data) {
      return this.isCriminalOffencesSectionComplete(data) &&
        this.isFixedPenaltiesSectionComplete(data) &&
        this.isMotoringOffencesSectionComplete(data) &&
        this.isFinancialOffencesSectionComplete(data) &&
        this.isProfessionalConductSectionComplete(data) &&
        this.isCivilProceedingsSectionComplete(data) &&
        this.isFurtherInformationSectionComplete(data) &&
        this.isDeclarationCompleted(data);
    },
    isCriminalOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.criminalCautions !== undefined &&
        dataToCheck.criminalConvictions !== undefined
      ) {
        return true;
      }
      return false;
    },
    isFixedPenaltiesSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.fixedPenalties !== undefined
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.drivingDisqualifications !== undefined &&
        dataToCheck.recentDrivingConvictions !== undefined) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.bankruptcies !== undefined &&
        dataToCheck.ivas !== undefined &&
        dataToCheck.lateTaxReturns !== undefined &&
        dataToCheck.lateVatReturns !== undefined &&
        dataToCheck.hmrcFines !== undefined
      ) {
        if (this.isCharacterInformationV3) {
          return dataToCheck.hmrcTax !== undefined;
        }
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.subjectOfAllegationOrClaimOfProfessionalMisconduct !== undefined &&
        dataToCheck.subjectOfAllegationOrClaimOfNegligence !== undefined &&
        dataToCheck.subjectOfAllegationOrClaimOfWrongfulDismissal !== undefined &&
        dataToCheck.subjectOfAllegationOrClaimOfDiscriminationProceeding !== undefined &&
        dataToCheck.subjectOfAllegationOrClaimOfHarassmentProceeding !== undefined &&
        dataToCheck.complaintOrDisciplinaryAction !== undefined &&
        dataToCheck.requestedToResign !== undefined){
        return true;
      }
      return false;
    },
    isCivilProceedingsSectionComplete(data) {
      // civilProceedings is only required for Character Information V3
      if (!this.isCharacterInformationV3) return true;

      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.civilProceedings !== undefined) {
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.furtherInformation !== undefined) {
        return true;
      }
      return false;
    },
    isDeclarationCompleted(data) {
      const dataToCheck = data ? data : this.applicationCharacterInformation;
      if (dataToCheck !== undefined &&
        dataToCheck.declaration1 === true &&
        dataToCheck.declaration2 === true &&
        dataToCheck.declaration3 === true
      ) {
        if (this.isCharacterInformationV3) {
          return dataToCheck.declaration4 === true;
        }
        return true;
      }
      return false;
    },
  },
};
</script>

