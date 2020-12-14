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
        this.characterInformation.drivingUnderInfluenceConvictions !== undefined &&
        this.characterInformation.drivingLicenceEndorsements !== undefined &&
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
        this.characterInformation.furtherInformation !== undefined;
    },
    isCriminalOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.criminalCautions !== undefined &&
        this.application.characterInformation.criminalConvictions === true
      ) {
        return true;
      }
      return false;
    },
    isFixedPenaltiesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.fixedPenalties === true
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.drivingDisqualifications === true &&
        this.application.characterInformation.drivingUnderInfluenceConvictions === true &&
        this.application.characterInformation.drivingLicenceEndorsements === true &&
        this.application.characterInformation.recentDrivingConvictions === true) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.bankruptcies === true &&
        this.application.characterInformation.ivas === true &&
        this.application.characterInformation.lateTaxReturns === true &&
        this.application.characterInformation.lateVatReturns === true &&
        this.application.characterInformation.hmrcFines === true) {
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct === true &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfNegligence === true &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal === true &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding === true &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding === true &&
        this.application.characterInformation.complaintOrDisciplinaryAction === true &&
        this.application.characterInformation.requestedToResign === true){
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.furtherInformation === true) {
        return true;
      }
      return false;
    },
  },
};
</script>

