<script>
import Form from '@/components/Form/Form.vue';
import ApplyMixIn from '../ApplyMixIn';

export default {
  name: 'CharacterInformationStatus',
  extends: Form,
  mixins: [ApplyMixIn],
  methods: {
    isCharacterInformationComplete(data) {
      return this.isCriminalOffencesSectionComplete(data) &&
        this.isFixedPenaltiesSectionComplete(data) &&
        this.isMotoringOffencesSectionComplete(data) &&
        this.isFinancialOffencesSectionComplete(data) &&
        this.isProfessionalConductSectionComplete(data) &&
        this.isFurtherInformationSectionComplete(data) &&
        this.isDeclarationCompleted(data);
    },
    isCriminalOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.criminalCautions !== undefined &&
        dataToCheck.criminalConvictions !== undefined
      ) {
        return true;
      }
      return false;
    },
    isFixedPenaltiesSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.fixedPenalties !== undefined
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.drivingDisqualifications !== undefined &&
        dataToCheck.recentDrivingConvictions !== undefined) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.bankruptcies !== undefined &&
        dataToCheck.ivas !== undefined &&
        dataToCheck.lateTaxReturns !== undefined &&
        dataToCheck.lateVatReturns !== undefined &&
        dataToCheck.hmrcFines !== undefined) {
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
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
    isFurtherInformationSectionComplete(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.furtherInformation !== undefined) {
        return true;
      }
      return false;
    },
    isDeclarationCompleted(data) {
      const dataToCheck = data ? data : this.application.characterInformationV2;
      if (dataToCheck !== undefined &&
        dataToCheck.declaration1 === true &&
        dataToCheck.declaration2 === true &&
        dataToCheck.declaration3 === true
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

