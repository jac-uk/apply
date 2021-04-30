/*
The purpose of this Mix-in is to share code between TaskList.vue and Review.vue
*/
export default {
  data() {
    return {
      isVacancyOpen: false, // see mounted() for more info
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    application () {
      return this.$store.state.application.record;
    },
    vacancyCloseTime() {
      const applicationCloseDate = this.$store.getters['vacancy/getCloseDate'];
      const candidateDateExtension = this.application.dateExtension;
      return candidateDateExtension ? candidateDateExtension : applicationCloseDate;
    },
    isLegal() {
      return this.vacancy.typeOfExercise === 'legal' || this.vacancy.typeOfExercise === 'leadership';
    },
    isNonLegal() {
      return this.vacancy.typeOfExercise === 'non-legal' || this.vacancy.typeOfExercise === 'leadership-non-legal';
    },
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    isApplicationComplete() {
      let isComplete = false;
      if (this.application && this.application.progress) {
        isComplete = true;
        if (!this.application.progress.personalDetails) { isComplete = false; }
        if (!this.application.progress.characterInformation) { isComplete = false; }
        if (!this.application.progress.equalityAndDiversitySurvey) { isComplete = false; }
        if (this.vacancy.isSPTWOffered) {
          if (!this.application.progress.partTimeWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.locationQuestion) {
          if (!this.application.progress.locationPreferences) { isComplete = false; }
        }
        if (this.vacancy.jurisdictionQuestion) {
          if (!this.application.progress.jurisdictionPreferences) { isComplete = false; }
        }
        if (this.vacancy.additionalWorkingPreferences && this.vacancy.additionalWorkingPreferences.length) {
          if (!this.application.progress.additionalWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.welshRequirement) {
          if (!this.application.progress.welshPosts) { isComplete = false; }
        }
        if (this.isLegal) {
          if (!this.application.progress.relevantQualifications) { isComplete = false; }
          if (!this.application.progress.postQualificationWorkExperience) { isComplete = false; }
          if (this.vacancy.previousJudicialExperienceApply) {
            if (!this.application.progress.judicialExperience) { isComplete = false; }
          }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (this.isNonLegal) {
          if (this.vacancy.memberships && this.vacancy.memberships.length) {
            if (this.vacancy.memberships.indexOf('none') === -1) {
              if (!this.application.progress.relevantMemberships) { isComplete = false; }
            }
          }
          if (!this.application.progress.relevantExperience) { isComplete = false; }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (!this.application.progress.reasonableLengthOfService) { isComplete = false; }

        if (this.showAssessorsDetails && !this.application.progress.assessorsDetails) { isComplete = false; }
        if (this.showLeadershipJudgeDetails && !this.application.progress.leadershipJudgeDetails) { isComplete = false; }
        if (this.showStatementOfSuitability && !this.application.progress.statementOfSuitability) { isComplete = false; }
        if (this.showCV && !this.application.progress.cv) { isComplete = false; }
        if (this.showCoveringLetter && !this.application.progress.coveringLetter) { isComplete = false; }
        if (this.showStatementOfEligibility && !this.application.progress.statementOfEligibility) { isComplete = false; }
        if (this.showSelfAssessment && !this.application.progress.selfAssessmentCompetencies) { isComplete = false; }
        if (!this.application.progress.additionalInfo) { isComplete = false; }
      }
      return isComplete;
    },
    canApply () {
      return this.isDraftApplication && this.isVacancyOpen && this.isApplicationComplete;
    },
    showAssessorsDetails() {
      // show IAs unless it has been turned off
      return !(this.vacancy.assessmentMethods && this.vacancy.assessmentMethods.independentAssessments === false);
    },
    showLeadershipJudgeDetails() {
      return this.vacancy.assessmentMethods && this.vacancy.assessmentMethods.leadershipJudgeAssessment;
    },
    showStatementOfSuitability() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-competencies':
      case 'statement-of-suitability-with-skills-and-abilities':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
      case 'statement-of-suitability-with-skills-and-abilities-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
    showCoveringLetter() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-skills-and-abilities-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
      case 'self-assessment-with-competencies-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
    showCV() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
        return true;
      default:
        return false;
      }
    },
    showStatementOfEligibility() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-eligibility':
        return true;
      default:
        return false;
      }
    },
    showSelfAssessment() {
      switch (this.vacancy.assessmentOptions) {
      case 'self-assessment-with-competencies':
      case 'self-assessment-with-competencies-and-cv':
      case 'self-assessment-with-competencies-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
  },
  mounted() {
    // isVacancyOpen should flick to 'false' automatically when the deadline is reached
    this.isVacancyOpen = this.$store.getters['vacancy/isOpen']();
    if (this.isVacancyOpen) {
      const self = this;
      setInterval(() => {
        self.isVacancyOpen = self.$store.getters['vacancy/isOpen']();
      }, 60 * 1000);
    }
  },
};
