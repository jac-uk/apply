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
        this.characterInformation.furtherInformation !== undefined &&
        this.characterInformation.declaration1 !== undefined &&
        this.characterInformation.declaration2 !== undefined &&
        this.characterInformation.declaration3 !== undefined;
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
        this.application.characterInformation.fixedPenalties !== undefined
      ) {
        return true;
      }
      return false;
    },
    isMotoringOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.drivingDisqualifications !== undefined &&
        this.application.characterInformation.drivingUnderInfluenceConvictions !== undefined &&
        this.application.characterInformation.drivingLicenceEndorsements !== undefined &&
        this.application.characterInformation.recentDrivingConvictions !== undefined) {
        return true;
      }
      return false;
    },
    isFinancialOffencesSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.bankruptcies !== undefined &&
        this.application.characterInformation.ivas !== undefined &&
        this.application.characterInformation.lateTaxReturns !== undefined &&
        this.application.characterInformation.lateVatReturns !== undefined &&
        this.application.characterInformation.hmrcFines !== undefined) {
        return true;
      }
      return false;
    },
    isProfessionalConductSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconduct !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfNegligence !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissal !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceeding !== undefined &&
        this.application.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceeding !== undefined &&
        this.application.characterInformation.complaintOrDisciplinaryAction !== undefined &&
        this.application.characterInformation.requestedToResign !== undefined){
        return true;
      }
      return false;
    },
    isFurtherInformationSectionComplete() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.furtherInformation !== undefined) {
        return true;
      }
      return false;
    },
    isDeclarationCompleted() {
      if (this.application.characterInformation !== undefined &&
        this.application.characterInformation.declaration1 === true &&
        this.application.characterInformation.declaration2 === true &&
        this.application.characterInformation.declaration3 === true
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

