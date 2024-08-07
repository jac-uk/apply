/*eslint func-style: ["error", "declaration"]*/
import clone from 'clone';
import { ASSESSMENT_METHOD, EXERCISE_STAGE, APPLICATION_STATUS } from '@/helpers/constants';

/** Used in Admin:-
APPLICATION_STEPS,
isEditable,
isLegal,
isNonLegal,
isTribunal,
hasQualifyingTests,
hasRelevantMemberships,
hasStatementOfSuitability,
hasIndependentAssessments,
hasLeadershipJudgeAssessment,
hasCV,
hasCoveringLetter,
hasSelfAssessment,
exerciseApplicationParts,
configuredApplicationParts,
applicationContentList,
unselectedApplicationParts,
*/

export {
  APPLICATION_STEPS,
  exerciseStates,
  applicationContentSteps,
  configuredApplicationContentSteps,
  isEditable,
  isProcessing,
  hasIndependentAssessments,
  hasLeadershipJudgeAssessment,
  hasQualifyingTests,
  hasRelevantMemberships,
  hasStatementOfSuitability,
  hasCoveringLetter,
  hasCV,
  hasStatementOfEligibility,
  hasSelfAssessment,
  isLegal,
  isNonLegal,
  isTribunal,
  isWelshAdministrationRequired,
  isSpeakWelshRequired,
  isReadWriteWelshRequired,
  isApplyingForWelshPost,
  currentState,
  applicationContentList,
  exerciseApplicationParts, // TODO review naming of applicationParts methods :)
  applicationPartsMap,
  applicationParts,
  selectedApplicationParts,
  unselectedApplicationParts,
  configuredApplicationParts,
  currentApplicationParts,
  isMoreInformationNeeded,
  isApplicationComplete,
  hasApplicationProcess,
  informationDeadline,
  getApplicationTotalJudicialDays,
  isApplicationVersionGreaterThan,
  isApplicationVersionLessThan
};

// const EXERCISE_STATES = ['draft', 'ready', 'approved', 'shortlisting', 'selection', 'recommendation', 'handover', 'archived'];
// const APPLICATION_CONTENT = {
//   _currentStep: {
//     step: 'passedTests',
//     start: Date,
//     end: Date,
//   },
//   registration: {
//     personalDetails: true,
//   },
//   passedTests: {
//     characterInformation: true,
//   },
// };

// application process config
const APPLICATION_STEPS = [
  'registration',
  'passedTests', 
  EXERCISE_STAGE.SHORTLISTED,  // v1
  EXERCISE_STAGE.SELECTED,   // v1
  EXERCISE_STAGE.RECOMMENDED, // v1
  EXERCISE_STAGE.SELECTION, // v2
  EXERCISE_STAGE.SCC, // v2
  EXERCISE_STAGE.RECOMMENDATION, // v2
];
const APPLICATION_PARTS = [
  'personalDetails',
  'characterInformation',
  'equalityAndDiversitySurvey',
  'partTimeWorkingPreferences',
  'locationPreferences',
  'jurisdictionPreferences',
  'additionalWorkingPreferences',
  'welshPosts',
  'relevantQualifications',
  'relevantMemberships',
  'postQualificationWorkExperience',
  'judicialExperience',
  'relevantExperience',
  'employmentGaps',
  'reasonableLengthOfService',
  'assessorsDetails',
  'leadershipJudgeDetails',
  'statementOfSuitability',
  'coveringLetter',
  'cv',
  'statementOfEligibility',
  'selfAssessmentCompetencies',
  'additionalInfo',
  'commissionerConflicts',
];

// application helpers
function applicationCurrentStep(exercise, application) {
  if (!application._processing) { return null; }
  let currentStep;
  if (exercise._processingVersion >= 2) {
    switch (application._processing.stage) {
      case EXERCISE_STAGE.SHORTLISTING:
        if (hasQualifyingTests(exercise)) {
          if (hasScenarioTest(exercise)) {
            if (application._processing.status === APPLICATION_STATUS.SCENARIO_TEST_PASSED) {
              currentStep = 'passedTests';
            }
          } else {
            if (application._processing.status === APPLICATION_STATUS.QUALIFYING_TEST_PASSED) {
              currentStep = 'passedTests';
            }
          }
        }
        break;
      case EXERCISE_STAGE.SELECTION:
      case EXERCISE_STAGE.SCC:
      case EXERCISE_STAGE.RECOMMENDATION:
        currentStep = application._processing.stage;
        break;
      default:
        currentStep = null;
    }
  } else {
    switch (application._processing.stage) {
      case 'review':
        if (hasQualifyingTests(exercise)) {
          if (hasScenarioTest(exercise)) {
            if (application._processing.status === APPLICATION_STATUS.PASSED_SCENARIO_TEST) {
              currentStep = 'passedTests';
            }
          } else {
            if (application._processing.status === APPLICATION_STATUS.PASSED_FIRST_TEST) {
              currentStep = 'passedTests';
            }
          }
        }
        break;
      case 'shortlisted':
      case 'selected':
      case 'recommended':
        currentStep = application._processing.stage;
        break;
      default:
        currentStep = null;
    }
  }
  return currentStep;
}

// exercise helpers
function isEditable(data) {
  if (data === null) return false;
  switch (data.state) {
    case 'draft':
    case 'ready':
      return true;
    default:
      return false;
  }
}
function isProcessing(exercise) {
  if (!exercise) { return false; }
  return exercise.applicationRecords ? true : false;
}
function exerciseStates(exercise) {
  if (!exercise) { return []; }
  const states = [];
  states.push('shortlisting');
  states.push('selection');
  states.push('recommendation');
  states.push('recommended');
  states.push('handover');
  return states;
}
function applicationContentSteps(data) {
  if (!data) { return []; }
  const exercise = data;
  const steps = [];
  if (exercise._processingVersion >= 2) {
    if (hasQualifyingTests(data)) {
      steps.push('passedTests');
    }
    steps.push(EXERCISE_STAGE.SELECTION);
    steps.push(EXERCISE_STAGE.SCC);
    steps.push(EXERCISE_STAGE.RECOMMENDATION);
  } else {
    if (hasQualifyingTests(data)) {
      steps.push('passedTests');
    }
    steps.push(EXERCISE_STAGE.SHORTLISTED);
    steps.push(EXERCISE_STAGE.SELECTED);
    steps.push(EXERCISE_STAGE.RECOMMENDED);
  }
  return steps;
}
function configuredApplicationContentSteps(exercise) {
  if (!exercise) { return []; }
  if (!exercise._applicationContent) { return []; }
  return applicationContentSteps(exercise)
    .filter(step => {
      if (exercise._applicationContent[step]) {
        return Object.values(exercise._applicationContent[step]).filter(value => value === true).length;
      }
      return false;
    });
}
function hasIndependentAssessments(data) {
  return !(data.assessmentMethods && data.assessmentMethods.independentAssessments === false);
}
function hasLeadershipJudgeAssessment(data) {
  return data.assessmentMethods && data.assessmentMethods.leadershipJudgeAssessment;
}
function hasQualifyingTests(data) {
  if (!data.shortlistingMethods || data.shortlistingMethods.length === 0) return false;
  if (data.shortlistingMethods.indexOf('situational-judgement-qualifying-test') >= 0) return true;
  if (data.shortlistingMethods.indexOf('critical-analysis-qualifying-test') >= 0) return true;
  if (data.shortlistingMethods.indexOf('scenario-test-qualifying-test') >= 0) return true;
  return false;
}
function hasScenarioTest(data) {
  if (!data.shortlistingMethods || data.shortlistingMethods.length === 0) return false;
  if (data.shortlistingMethods.indexOf('scenario-test-qualifying-test') >= 0) return true;
  return false;
}
function hasRelevantMemberships(data) {
  if (isNonLegal(data)) {
    if (data.memberships && data.memberships.length) {
      if (data.memberships.indexOf('none') === -1) {
        return true;
      }
    }
  }
  return false;
}

function hasStatementOfSuitability(data) {
  return data.assessmentMethods && (
    data.assessmentMethods[ASSESSMENT_METHOD.STATEMENT_OF_SUITABILITY_WITH_COMPETENCIES] ||
    data.assessmentMethods[ASSESSMENT_METHOD.STATEMENT_OF_SUITABILITY_WITH_SKILLS_AND_ABILITIES]
  );
}
function hasCoveringLetter(data) {
  return data.assessmentMethods && data.assessmentMethods[ASSESSMENT_METHOD.COVERING_LETTER];
}
function hasCV(data) {
  return data.assessmentMethods && data.assessmentMethods[ASSESSMENT_METHOD.CV];
}
function hasStatementOfEligibility(data) {
  return data.assessmentMethods && data.assessmentMethods[ASSESSMENT_METHOD.STATEMENT_OF_ELIGIBILITY] && !!(data.aSCApply && data.selectionCriteria && data.selectionCriteria.length);
}
function hasSelfAssessment(data) {
  return data.assessmentMethods && data.assessmentMethods[ASSESSMENT_METHOD.SELF_ASSESSMENT_WITH_COMPETENCIES];
}

function isLegal(data) {
  return data.typeOfExercise === 'legal' || data.typeOfExercise === 'leadership';
}
function isNonLegal(data) {
  return data.typeOfExercise === 'non-legal' || data.typeOfExercise === 'leadership-non-legal';
}
function isTribunal(data) {
  return data.isCourtOrTribunal === 'tribunal';
}
function isWelshAdministrationRequired(exercise) {
  return exercise.welshRequirementType.includes('welsh-administration-questions');
}
function isSpeakWelshRequired(exercise) {
  return exercise.welshRequirementType.includes('welsh-speaking');
}
function isReadWriteWelshRequired(exercise) {
  return exercise.welshRequirementType.includes('welsh-reading-writing');
}
function isApplyingForWelshPost(exercise, application) {
  return exercise.welshRequirement && application.applyingForWelshPost;
}

function currentState(data) { // default to registration
  if (data._applicationContent && data._applicationContent._currentStep) {
    if (APPLICATION_STEPS.indexOf(data._applicationContent._currentStep.step) >= 0) {
      return data._applicationContent._currentStep.step;
    }
  }
  return 'registration';
}
function applicationContentList(data) {  // returns applicationContent map as an array
  const applicationContentList = [];
  if (data && data._applicationContent) {
    const steps = ['registration'].concat(applicationContentSteps(data));
    steps.forEach(step => {
      if (data._applicationContent[step]) {
        const selectedParts = [];
        APPLICATION_PARTS.forEach(part => {
          if (data._applicationContent[step][part]) {
            selectedParts.push(part);
          }
        });
        applicationContentList.push({
          ref: step,
          parts: selectedParts,
        });
      } else {
        applicationContentList.push({
          ref: step,
          parts: [],
        });
      }
    });
  }
  return applicationContentList;
}

function exerciseApplicationParts(data, newValues) {
  const exercise = clone(data);
  if (newValues) {  // override exercise values with passed in data
    Object.keys(newValues).forEach(key => {
      exercise[key] = newValues[key];
    });
  }
  const applicationParts = [];
  applicationParts.push('personalDetails');
  applicationParts.push('characterInformation');
  applicationParts.push('equalityAndDiversitySurvey');
  if (exercise.isSPTWOffered) {
    applicationParts.push('partTimeWorkingPreferences');
  }
  if (exercise.locationQuestion) {
    applicationParts.push('locationPreferences');
  }
  if (exercise.jurisdictionQuestion) {
    applicationParts.push('jurisdictionPreferences');
  }
  if (exercise.additionalWorkingPreferences && exercise.additionalWorkingPreferences.length) {
    applicationParts.push('additionalWorkingPreferences');
  }
  if (exercise.welshRequirement) {
    applicationParts.push('welshPosts');
  }
  if (isLegal(exercise)) {
    applicationParts.push('relevantQualifications');
    applicationParts.push('postQualificationWorkExperience');
    if (exercise.previousJudicialExperienceApply) {
      applicationParts.push('judicialExperience');
    }
    applicationParts.push('employmentGaps');
    applicationParts.push('reasonableLengthOfService');
  }
  if (isNonLegal(exercise)) {
    if (hasRelevantMemberships(exercise)) {
      applicationParts.push('relevantMemberships');
    }
    applicationParts.push('relevantExperience');
    applicationParts.push('employmentGaps');
    applicationParts.push('reasonableLengthOfService');
  }
  if (hasIndependentAssessments(exercise)) {
    applicationParts.push('assessorsDetails');
  }
  if (hasLeadershipJudgeAssessment(exercise)) {
    applicationParts.push('leadershipJudgeDetails');
  }
  if (hasStatementOfSuitability(exercise)) {
    applicationParts.push('statementOfSuitability');
  }
  if (hasCV(exercise)) {
    applicationParts.push('cv');
  }
  if (hasCoveringLetter(exercise)) {
    applicationParts.push('coveringLetter');
  }
  if (hasStatementOfEligibility(exercise)) {
    applicationParts.push('statementOfEligibility');
  }
  if (hasSelfAssessment(exercise)) {
    applicationParts.push('selfAssessmentCompetencies');
  }
  applicationParts.push('additionalInfo');
  applicationParts.push('commissionerConflicts');
  return applicationParts;
}

function applicationPartsMap(data) {
  const applicationParts = exerciseApplicationParts(data);
  const applicationPartsMap = {};
  applicationParts.forEach(part => applicationPartsMap[part] = true);
  return applicationPartsMap;
}

function selectedApplicationParts(data) {
  let selectedParts = [];
  if (data && data._applicationContent) {
    Object.entries(data._applicationContent).forEach((keyValue) => {
      selectedParts = selectedParts.concat(Object.entries(keyValue[1]).filter((part) => part[1] === true).map(part => part[0]));
    });
  }
  return selectedParts;
}
function unselectedApplicationParts(data) {
  const availableParts = exerciseApplicationParts(data);
  const selectedParts = selectedApplicationParts(data);
  return availableParts.filter((el) => !selectedParts.includes(el));
}
function configuredApplicationParts(data) {
  let configuredParts = [];
  if (data && data._applicationContent) {
    Object.entries(data._applicationContent).forEach((keyValue) => {
      configuredParts = configuredParts.concat(Object.entries(keyValue[1]).map(part => part[0]).filter(part => configuredParts.indexOf(part) === -1));
    });
  }
  return configuredParts;
}

// application parts up to and including current stage
function applicationParts(data) {
  if (data._applicationContent) {
    const applicationContent = applicationContentList(data);
    const applicationParts = {};
    const state = currentState(data);
    let stateFound = false;
    for (let i = applicationContent.length - 1; i >= 0; --i) {
      if (stateFound || applicationContent[i].ref === state) {
        stateFound = true;
        applicationContent[i].parts.forEach(part => applicationParts[part] = true);
      }
    }
    return applicationParts;
  }
  return applicationPartsMap(data); // default to all relevant parts
}
// application parts in current stage (n.b. returns registration by default)
function currentApplicationParts(data) {
  if (data._applicationContent) {
    return data._applicationContent[currentState(data)];
  }
  return applicationPartsMap(data); // default to all relevant parts
}
// are there application parts in current stage (not registration)
function isMoreInformationNeeded(exercise, application) {
  if (exercise._applicationContent && exercise._applicationContent._currentStep && exercise._applicationContent._currentStep.step) {
    if (
      exercise._applicationContent._currentStep.step !== 'registration'
      && APPLICATION_STEPS.indexOf(exercise._applicationContent._currentStep.step) >= 0
      && Object.keys(currentApplicationParts(exercise)).length
      && exercise._applicationContent._currentStep.start <= new Date()
      && exercise._applicationContent._currentStep.end >= new Date()
      && applicationCurrentStep(exercise, application) === exercise._applicationContent._currentStep.step
    ) {
      return true;
    }
  }
  return false;
}
function isApplicationComplete(vacancy, application) {
  if (!(application && application.progress)) return false;
  const requiredParts = applicationParts(vacancy);
  if (!requiredParts) return false;
  const partsToComplete = Object.keys(requiredParts).filter(part => requiredParts[part] === true);
  const incompleteParts = partsToComplete.filter(part => application.progress[part] !== true);
  return incompleteParts.length === 0;
}

// does the exercise have an application process configured
function hasApplicationProcess(exercise) {
  if (!exercise) { return false; }
  const applicationSteps = configuredApplicationContentSteps(exercise);
  return applicationSteps.length >= 1;
}

function informationDeadline(exercise) {
  if (!exercise) { return null; }
  if (hasApplicationProcess(exercise)) {
    if (exercise._applicationContent && exercise._applicationContent._currentStep && exercise._applicationContent._currentStep.end) {
      return exercise._applicationContent._currentStep.end;
    }
  }
  return null;
}

function getApplicationTotalJudicialDays(application) {
  let total = 0;
  if (Array.isArray(application.experience)) {
    application.experience.forEach((experience) => {
      if (
        Array.isArray(experience.tasks) &&
        experience.tasks.includes('judicial-functions') &&
        experience?.judicialFunctions?.duration
      ) {
        total += parseInt(experience.judicialFunctions.duration, 10);
      }
    });
  }
  return total;
}

function isApplicationVersionGreaterThan(exercise, version) {
  return exercise?._applicationVersion > version;
}
function isApplicationVersionLessThan(exercise, version) {
  return exercise?._applicationVersion < version;
}
