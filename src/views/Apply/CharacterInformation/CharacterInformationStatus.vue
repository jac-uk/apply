<script>
import Form from '@/components/Form/Form';

export default {
  name: 'CharacterInformationStatus',

  extends: Form,
  methods: {
    updateProgress() {
      this.application.progress.characterInformation =
        this.characterInformation.criminalCautions !== undefined &&
        this.characterInformation.criminalConvictions !== undefined &&
        this.characterInformation.fixedPenalties !== undefined &&
        this.characterInformation.drivingDisqualifications !== undefined &&
        this.characterInformation.recentDrivingConvictions !== undefined &&
        this.characterInformation.bankruptcies !== undefined &&
        this.characterInformation.ivas !== undefined &&
        this.characterInformation.lateTaxReturns !== undefined &&
        this.characterInformation.lateVatReturns !== undefined &&
        this.characterInformation.hmrcFines !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfNegligence !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding !== undefined &&
        this.characterInformation.complaintOrDisciplinaryAction !== undefined &&
        this.characterInformation.requestedToResign !== undefined &&
        this.characterInformation.furtherInformation !== undefined &&
        this.characterInformation.declaration1 !== undefined &&
        this.characterInformation.declaration2 !== undefined &&
        this.characterInformation.declaration3 !== undefined;
    },
    isCriminalOffencesSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.criminalCautions !== undefined &&
        this.application.characterInformationV2.criminalConvictions !== undefined
      ) {
        return true;
      }
      return false;
    },
    isFixedPenaltiesSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.fixedPenalties !== undefined
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.drivingDisqualifications !== undefined &&
        this.application.characterInformationV2.recentDrivingConvictions !== undefined) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.bankruptcies !== undefined &&
        this.application.characterInformationV2.ivas !== undefined &&
        this.application.characterInformationV2.lateTaxReturns !== undefined &&
        this.application.characterInformationV2.lateVatReturns !== undefined &&
        this.application.characterInformationV2.hmrcFines !== undefined) {
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.subjectOfAllegationOrClaimOfProfessionalMisconduct !== undefined &&
        this.application.characterInformationV2.subjectOfAllegationOrClaimOfNegligence !== undefined &&
        this.application.characterInformationV2.subjectOfAllegationOrClaimOfWrongfulDismissal !== undefined &&
        this.application.characterInformationV2.subjectOfAllegationOrClaimOfDiscriminationProceeding !== undefined &&
        this.application.characterInformationV2.subjectOfAllegationOrClaimOfHarassmentProceeding !== undefined &&
        this.application.characterInformationV2.complaintOrDisciplinaryAction !== undefined &&
        this.application.characterInformationV2.requestedToResign !== undefined){
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.furtherInformation !== undefined) {
        return true;
      }
      return false;
    },
    isDeclarationCompleted() {
      if (this.application.characterInformationV2 !== undefined &&
        this.application.characterInformationV2.declaration1 === true &&
        this.application.characterInformationV2.declaration2 === true &&
        this.application.characterInformationV2.declaration3 === true
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

