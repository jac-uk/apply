<script>
import Form from '@/components/Form/Form';

export default {
<<<<<<< HEAD
  name: 'CharacterInformationStatus',
=======
  name: 'CharacterInformationForm',
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
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
<<<<<<< HEAD
        this.application.characterInformation.fixedPenalties !== undefined
=======
        this.characterInformation.fixedPenalties === true
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
<<<<<<< HEAD
        this.application.characterInformation.drivingDisqualifications !== undefined &&
        this.application.characterInformation.drivingUnderInfluenceConvictions !== undefined &&
        this.application.characterInformation.drivingLicenceEndorsements !== undefined &&
        this.application.characterInformation.recentDrivingConvictions !== undefined) {
=======
        this.characterInformation.drivingDisqualifications === true &&
        this.characterInformation.drivingUnderInfluenceConvictions === true &&
        this.characterInformation.drivingLicenceEndorsements === true &&
        this.characterInformation.recentDrivingConvictions === true) {
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
<<<<<<< HEAD
        this.application.characterInformation.bankruptcies !== undefined &&
        this.application.characterInformation.ivas !== undefined &&
        this.application.characterInformation.lateTaxReturns !== undefined &&
        this.application.characterInformation.lateVatReturns !== undefined &&
        this.application.characterInformation.hmrcFines !== undefined) {
=======
        this.characterInformation.bankruptcies === true &&
        this.characterInformation.ivas === true &&
        this.characterInformation.lateTaxReturns === true &&
        this.characterInformation.lateVatReturns === true &&
        this.characterInformation.hmrcFines === true) {
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete() {
      if (this.application.characterInformation !== undefined &&
<<<<<<< HEAD
        this.application.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfNegligence !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding !== undefined &&
        this.application.characterInformation.complaintOrDisciplinaryAction !== undefined &&
        this.application.characterInformation.requestedToResign !== undefined){
=======
        this.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfNegligence === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding === true &&
        this.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding === true &&
        this.characterInformation.complaintOrDisciplinaryAction === true &&
        this.characterInformation.requestedToResign === true){
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete() {
      if (this.application.characterInformation !== undefined &&
<<<<<<< HEAD
        this.application.characterInformation.furtherInformation !== undefined) {
=======
        this.characterInformation.furtherInformation === true) {
>>>>>>> origin/epic/563-changes-to-character-section-of-application-form
        return true;
      }
      return false;
    },
  },
};
</script>

