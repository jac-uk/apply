<script>
import Form from '@/components/Form/Form';

export default {
  name: 'CharacterInformationForm',
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
        this.application.characterInformation.criminalConvictions !== undefined
      ) {
        return true;
      }
      return false;
    },
    isFixedPenaltiesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.characterInformation.fixedPenalties === true
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.characterInformation.drivingDisqualifications === true &&
        this.characterInformation.drivingUnderInfluenceConvictions === true &&
        this.characterInformation.drivingLicenceEndorsements === true &&
        this.characterInformation.recentDrivingConvictions === true) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.characterInformation.bankruptcies === true &&
        this.characterInformation.ivas === true &&
        this.characterInformation.lateTaxReturns === true &&
        this.characterInformation.lateVatReturns === true &&
        this.characterInformation.hmrcFines === true) {
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfNegligence === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding === true &&
        this.characterInformation.complaintOrDisciplinaryAction === true &&
        this.characterInformation.requestedToResign === true){
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.characterInformation.furtherInformation === true) {
        return true;
      }
      return false;
    },
  },
};
</script>

